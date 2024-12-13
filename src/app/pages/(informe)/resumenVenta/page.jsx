"use client";

import { Global } from "@/conexion";
import Grid from "@mui/material/Grid2";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import NavBar from "@/app/components/navbar/nav";
import { Box, CircularProgress, TextField, useMediaQuery } from "@mui/material";


const columns = [
  { field: 'TIPO', headerName: 'DESCRIPCIÓN', width: 250, headerClassName: 'header-bold' },
  { field: 'VENTA', headerName: 'VENTA REAL', width: 150, 
    valueFormatter: (value) => {
      const precioRedondeado = Number(value).toFixed(0);
      return `${parseFloat(precioRedondeado).toLocaleString()}`;
    }, align: "right", headerClassName: 'header-bold'
  },
  { field: 'CUOTA', headerName: 'CUOTA', width: 150, 
    valueFormatter: (value) => {
      const precioRedondeado = Number(value).toFixed(0);
      return `${parseFloat(precioRedondeado).toLocaleString()}`;
    }, align: "right", headerClassName: 'header-bold'
  },
  { field: 'CUM', headerName: 'CUM', width: 100, cellClassName: 'total-cell', 
    valueFormatter: (value) => {
      return value !== null && value !== undefined ? `${Number(value).toFixed(1)}%` : '0%';
    }, align: "right", headerClassName: 'header-bold'
  },
  { field: 'PORFACTURAR', headerName: 'POR FACTURAR', width: 170, 
    valueFormatter: (value) => {
      const precioRedondeado = Number(value).toFixed(0);
      return `${parseFloat(precioRedondeado).toLocaleString()}`;
    }, align: "right", headerClassName: 'header-bold'
  },
  { field: 'VENTAEST', headerName: 'VENTA ESTIMADA', width: 190, 
    valueFormatter: (value) => {
      const precioRedondeado = Number(value).toFixed(0);
      return `${parseFloat(precioRedondeado).toLocaleString()}`;
    }, align: "right", headerClassName: 'header-bold'
  },
  { field: 'CUMEST', headerName: 'CUM EST', width: 100, cellClassName: 'total-cell', 
    valueFormatter: (value) => {
      return value !== null && value !== undefined ? `${Number(value).toFixed(1)}%` : '0%';
    }, align: "right", headerClassName: 'header-bold'
  },
  { field: 'NOTAS', headerName: 'OTROS', width: 120, headerClassName: 'header-bold' },
];

const GestionCartera = () => {
  const { auth } = useAuth();
  const [resumen, setResumen] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [tablaResumen, setTablaResumen] = useState([]);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await fetch(Global.url + `/informes/ventas/${auth.IDSaler}`, {
          method: "GET",
          headers: { "Content-Type" : "application/json" }
        });

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const datos = await response.json();
        datos.sort((a, b) => a.TIPO.localeCompare(b.TIPO));

        setResumen(datos);
        setTablaResumen(datos);
      } catch (error) {
        console.log("Error al obtener datos", error)
      }
    };
    obtenerDatos();
  }, []);


  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    const resultadoBusqueda = tablaResumen.filter((elemento) => {
      const valores = Object.values(elemento).map((value) => 
        value ? value.toString().toLowerCase() : ""
      );
      return valores.some((valor) => valor.includes(terminoBusqueda.toLowerCase()));
    });
    setResumen(resultadoBusqueda);
  };


  return (
    <>
      <NavBar />
      <Grid container direction="column" sx={{ minHeight: "100vh", backfroundColor: "#ffffff", padding: 2 }}>
        <Grid size={12}>
          <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", alignItems: "center" }}>
            <h2><strong>RESUMEN VENTA ACTUAL</strong></h2>
            <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", alignItems: "center", marginLeft: isSmallScreen ? 0 : "auto", padding: 2  }}>
              <TextField
              id="outlined-basic" 
              type="text"
              value={busqueda}
              onChange={handleChange} 
              placeholder="Buscar..."
              sx={{ width: isSmallScreen ? 300 : 500 }}
              />
            </Box>
          </Box>
        </Grid>

        <Grid size={12} sx={{ flexGrow: 1, marginBottom: 2 }}>
          <Box sx={{ width: '100%', heigth: isSmallScreen ? 500 : 750 }}>
            <DataGrid 
              rows={resumen}
              columns={columns}
              getRowId={(row) => row.TIPO}
              initialState={{
                  pagination: {
                      paginationModel: { page: 0, pageSize: 12 }
                  }
              }}
              pageSizeOptions={[12]}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default GestionCartera;

