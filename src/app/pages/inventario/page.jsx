"use client";

import { Box, TextField, useMediaQuery } from "@mui/material";
import { initDB } from "@/app/components/base/db";
import NavBar from "@/app/components/navbar/nav";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";

const Articulos = () => {
  const [producto, setProducto] = useState([]);
  const [busqueda, setBusqueda] = useState([]);
  const [tablaProducto, setTablaProducto] = useState([]);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");


  useEffect(() => {
    const conseguirProducto = async () => {
      try {
        const db = await initDB();
        const productosGuardados = await db.getAll("articles");
        if (productosGuardados) {
          setProducto(productosGuardados);
          setTablaProducto(productosGuardados);
          console.log("Datos cargados desde IndexedDB Inventario");
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
        return `${parseFloat(precio).toLocaleString()}`;
      },
    },
    { field: 'Iva', headerName: 'IVA', width: 80, headerClassName: 'header-bold' },
    { field: 'Descuento', headerName: 'DES', width: 90, headerClassName: 'header-bold' },
    { field: 'Precio_Neto', headerName: 'NETO', width: 80, headerClassName: 'header-bold', 
      valueFormatter: (value) => {
        const precio = parseFloat(value).toFixed(0);
        return `${parseFloat(precio).toLocaleString()}`;
      },
    },
    { field: 'Disp', headerName: 'DISP', width: 80, headerClassName: 'header-bold', 
      valueFormatter: (value) => {
        const precio = parseFloat(value).toFixed(0);
        return `${parseFloat(precio).toLocaleString()}`;
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
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
          <Grid size={6}>
              <h2><strong>LISTADO DE ARTICULO</strong></h2>
          </Grid>
          <Grid size={6} sx={{ padding: 2 }}>
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
      </Box>


        <Grid size={12} sx={{ flexGrow: 1, marginBottom: 2 }}>
          <Box sx={{ width: "100%", height: isSmallScreen ? 500 : 750  }}>
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



