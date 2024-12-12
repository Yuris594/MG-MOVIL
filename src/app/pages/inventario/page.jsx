"use client";

import { Box, Divider, TextField, useMediaQuery } from "@mui/material";
import { initDB } from "@/app/components/base/db";
import NavBar from "@/app/components/navbar/nav";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Global } from "@/conexion";


const Articulos = () => {
  const [producto, setProducto] = useState([]);
  const [busqueda, setBusqueda] = useState([]);
  const [tablaProducto, setTablaProducto] = useState([]);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");


  useEffect(() => {
    const conseguirProducto = async () => {
      try {
      const db = await initDB();
      
      if (!navigator.onLine) {
        const productosGuardados = await db.getAll("articles");
        setProducto(productosGuardados);
        setTablaProducto(productosGuardados);
        console.log("Datos cargados desde IndexedDB");
      } else {
        const response = await fetch(Global.url + "/articles/articles/inventario", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
  
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        
        const data = await response.json();
        setProducto(data.data);
        setTablaProducto(data.data);

        for (const item of data.data) {
          const existeItem = await db.get('articles', item.PKcodigo); 
          if (!existeItem) {
            await db.add("articles", item)
          }
        }
        console.log("Datos guardados en IndexedDB y Datos cargados desde la API");
      }
      } catch (error) {
        console.log("Error al obtener los datos", error);
      }
    }
    conseguirProducto();
  }, []);

  
  const columns = [
    { field: 'PKcodigo', headerName: 'COD', width: 100, headerClassName: 'header-bold' },
    { field: 'Nombre', headerName: 'REFERENCIA', width: 400, headerClassName: 'header-bold' },
    { field: 'Sublinea', headerName: 'SUBLINEA', width: 200, headerClassName: 'header-bold' },
    { field: 'Unidad_Empaque', headerName: 'EMP', width: 80, headerClassName: 'header-bold' },
    { field: 'Precio', headerName: 'PRECIO', width: 90, headerClassName: 'header-bold', 
      valueFormatter: (value) => {
        const precio = parseFloat(value).toFixed(0);
        return `$${parseFloat(precio).toLocaleString('es-ES')}`;
      },
    },
    { field: 'Iva', headerName: 'IVA', width: 80, headerClassName: 'header-bold' },
    { field: 'Descuento', headerName: 'DES', width: 90, headerClassName: 'header-bold' },
    { field: 'Precio_Neto', headerName: 'NETO', width: 80, headerClassName: 'header-bold', 
      valueFormatter: (value) => {
        const precio = parseFloat(value).toFixed(0);
        return `$${parseFloat(precio).toLocaleString('es-ES')}`;
      },
    },
    { field: 'Disp', headerName: 'DISP', width: 80, headerClassName: 'header-bold', 
      valueFormatter: (value) => {
        const precio = parseFloat(value).toFixed(0);
        return `$${parseFloat(precio).toLocaleString('es-ES')}`;
      },
    },
  ];

  const handleChange = (e) => {
    e.preventDefault();
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    const resultadoBusqueda = tablaProducto.filter((elemento) => {
      const valores = Object.values(elemento).map((value) => 
        value ? value.toString().toLowerCase() : ""
      );
      return valores.some((valor) => valor.includes(terminoBusqueda.toLowerCase()));
    });
    setProducto(resultadoBusqueda);
  };


  return (
    <>
      <NavBar />  
      <Grid container direction="column" sx={{ minHeight: "100vh", backgroundColor: "#ffffff", padding: 2 }}>
        <Grid size={12}>
          <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
            <h2><strong>LISTADO DE ARTICULO</strong></h2>
          </Box>
          <Divider />
        </Grid>

        <Grid size={12} sx={{ padding: 2 }}>
          <TextField 
            id="outlined-basic"
            label="Digite Codigo o Referencia para Buscar"
            multiline
            rows={1}
            variant="outlined"
            value={busqueda}
            onChange={handleChange}
            sx={{ width: "100%", marginBottom: 2 }}
          />
        </Grid>

        <Grid size={12} sx={{ flexGrow: 1, marginBottom: 2 }}>
          <Box sx={{ width: "100%", height: isSmallScreen ? 500 : 1170  }}>
            <DataGrid 
              rows={producto}
              columns={columns}
              getRowId={(row) => row.PKcodigo}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 20 }
                }
              }}
              pageSizeOptions={[20]}
              sx={{
                "&.MuiDataGrid-columnHeader": { fontSize: isSmallScreen ? "0.75rem" : "1rem" },
                "&.MuiDataGrid-cell": { fontSize: isSmallScreen ? "0.75rem" : "0.875rem" },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Articulos;



