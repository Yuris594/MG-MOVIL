"use client";

import { Box, CircularProgress, Divider, TextField, useMediaQuery } from "@mui/material";
import NavBar from "@/app/components/navbar/nav";
import { useAuth } from "@/context/authContext";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Global } from "@/conexion";


const columns = [
  { field: 'FechaDoc', headerName: 'FECHA', width: 150, headerClassName: 'header-bold' },
  { field: 'Documento', headerName: 'DOCUMENTO', width: 100, headerClassName: 'header-bold' },
  { field: 'IdCliente', headerName: 'NIT', width: 150, headerClassName: 'header-bold' },
  { field: 'NombreCliente', headerName: 'NOMBRE', width: 400, headerClassName: 'header-bold' },
  { field: 'Linea', headerName: 'LINEA', width: 150, headerClassName: 'header-bold' },
  { field: 'IdArticulo', headerName: 'COD. ARTICULO', width: 170, headerClassName: 'header-bold' },
  { field: 'NombreArticulo', headerName: 'REFERENCIA', width: 250, headerClassName: 'header-bold' },
  { field: 'Cantidad', headerName: 'CANTIDAD', width: 130, headerClassName: 'header-bold', align: "right" },
  { field: 'PrecioUnitario', headerName: 'VALOR UNI', width: 150, headerClassName: 'header-bold', align: "right" },
  { field: 'Descuento', headerName: 'DESC', width: 100, headerClassName: 'header-bold', align: "right" },
  { field: 'Impuesto', headerName: 'IVA', width: 100, headerClassName: 'header-bold', align: "right" },
  { field: 'VENTA', headerName: 'TOTAL VENTA', width: 150, headerClassName: 'header-bold', align: "right" },

];

const HistoricoVenta = () => {
  const { auth } = useAuth();
  const [ventas, setVentas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true); 
  const [tablaVentas, setTablaVentas] = useState([]);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");


  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await fetch(Global.url + `/informes/${auth.IDSaler}`, {
          method: "GET",
          headers: { "Content-Type" : "application/json" }
        });

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const datos = await response.json();
        const datosOrdenados = datos.data.sort((a, b) => new Date(a.FechaDoc) - new Date(b.FechaDoc))
        setVentas(datosOrdenados);
        setTablaVentas(datosOrdenados);
        setCargando(false);
      } catch (error) {
        console.log("Error al obtener datos", error)
      }
    };
    obtenerDatos();
  }, [auth?.IDSaler]);


  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };


  const filtrar = (terminoBusqueda) => {
    const resultadoBusqueda = tablaVentas.filter((elemento) => {
      const valores = Object.values(elemento).map((value) => 
        value ? value.toString().toLowerCase() : ""
      );
      return valores.some((valor) => valor.includes(terminoBusqueda.toLowerCase()));
    });
    setVentas(resultadoBusqueda);
  };
  

  return (
    <>
      <NavBar />
      {cargando === true ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress sx={{ color: "#000" }} />
        </Box>
      ) : (
      <Grid container direction="column" sx={{ minHeight: "100vh", backfroundColor: "#ffffff", padding: 2 }}>
        <Grid container direction={isSmallScreen ? "column" : "row"} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: isSmallScreen ? "flex-start" : "space-between", alignItems: "center" }}>
              <h2><strong>HISTORICO DE VENTAS</strong></h2>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: isSmallScreen ? "flex-start" : "flex-end", alignItems: "center"  }}>
              <h3><strong>Últimos 6 Meses</strong></h3>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ marginTop: 2 }} />

        <Grid size={12} sx={{ padding: 2 }}>
          <TextField 
            id="outlined-basic"
            label="Buscar..."
            multiline
            size="small" 
            variant="outlined"
            value={busqueda}
            onChange={handleChange}
            sx={{ width: "100%" }}
          />
        </Grid>

        <Grid size={12} sx={{ flexGrow: 1, marginBottom: 2 }}>
          <Box sx={{ width: '100%', height: isSmallScreen ? 500 : 650, }}>
            <DataGrid 
              rows={ventas}
              columns={columns}
              getRowId={(row) => row.IdArticulo}
              initialState={{
                  pagination: {
                      paginationModel: { page: 0, pageSize: 10 }
                  }
              }}
              pageSizeOptions={[10, 20, 30]}
            />
          </Box>
        </Grid>
      </Grid>
      )}
    </>
  );
}

export default HistoricoVenta;