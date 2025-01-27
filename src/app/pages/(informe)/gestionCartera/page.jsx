"use client";

import { Box, CircularProgress, Modal, TextField, useMediaQuery } from "@mui/material";
import NavBar from "@/app/components/navbar/nav";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid2";
import { Global } from "@/conexion";


const GestionCartera = () => {
  const { auth } = useAuth();
  const [open, setOpen] = useState(false);
  const [rutero, setRutero] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true); 
  const [tablaVentas, setTablaVentas] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");


  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await fetch(Global.url + `/gestioncartera/${auth.IDSaler}`, {
          method: "GET",
          headers: { "Content-Type" : "application/json" }
        });

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const datos = await response.json();
        setRutero(datos.data);
        setTablaVentas(datos.data);
        setCargando(false);
      } catch (error) {
        console.log("Error al obtener datos", error);
      }
    };

    if (auth?.IDSaler) {
      obtenerDatos();
    }
  }, [auth?.IDSaler]);


  const handleOpen = (cliente) => {
    setClienteSeleccionado(cliente); 
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    setRutero(resultadoBusqueda);
  };

  const columns = [
    { field: 'Fecha_realizacion', headerName: 'FECHA', width: 200, headerClassName: 'header-bold' },
    { field: 'Hora', headerName: 'HORA', width: 150, headerClassName: 'header-bold' },
    { field: 'FKNitCliente', headerName: 'NIT', width: 150, headerClassName: 'header-bold' },
    { field: 'RazonSocial', headerName: 'NOMBRE', width: 500, headerClassName: 'header-bold' },
    { field: 'Agenda', headerName: 'AGENDADOS', width: 150, headerClassName: 'header-bold' },
  ];

  
  return (
    <>
      <NavBar />
      {cargando === true ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress sx={{ color: "#000" }} />
        </Box>
      ) : (
      <Grid container direction="column" sx={{ minHeight: "100vh", backfroundColor: "#ffffff", padding: 2 }}>
        <Grid size={12}>
          <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", alignItems: "center" }}>
            <h2><strong>RUTERO Y GESTIÓN DE CARTERA</strong></h2>
            <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", alignItems: "center", marginLeft: isSmallScreen ? 0 : "auto", padding: 2  }}>
              <TextField
                id="outlined-basic"
                type="text" 
                value={busqueda}
                onChange={handleChange}
                placeholder="Buscar..."
                sx={{ width: isSmallScreen ? 300 : 400 }}
                />
            </Box>
          </Box>
        </Grid>

        <Grid size={12} sx={{ flexGrow: 1, marginBottom: 2 }}>
          <Box sx={{ width: '100%', height: isSmallScreen ? 500 : 650 }}>
            <DataGrid 
              rows={rutero}
              columns={columns}
              getRowId={(row) => row.PKid}
              initialState={{
                  pagination: {
                      paginationModel: { page: 0, pageSize: 10 }
                  }
              }}
              pageSizeOptions={[10, 20, 30]}
              onRowClick={(params) => handleOpen(params.row)} 
            />
          </Box>
        </Grid>
      </Grid>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: '8px', maxWidth: '650px',  width: "90%", height: "40vh", overflowY: "auto", margin: 'auto', mt: 4, p:2 }}>
          <>
            {clienteSeleccionado && (
              <Grid container rowSpacing={1.5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ p: 1 }}>
                <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                  <strong>Razón Social: </strong>{clienteSeleccionado.RazonSocial}
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                  <strong>Realizada Por: </strong>{clienteSeleccionado.FKUsuario}
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                  <strong>Tipo Gestión: </strong>{clienteSeleccionado.Tipo}
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                  <strong>¿Realiza Pedido? </strong>{clienteSeleccionado.Realiza_pedido}
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                  <strong>¿Cobró? </strong>{clienteSeleccionado.Cobro}
                </Grid>
              </Grid>
            )}
            {clienteSeleccionado && (
              <TextField
                id="outlined-basic"
                multiline
                rows={3}
                defaultValue={clienteSeleccionado.Comentario}
                variant="outlined"
                sx={{ width: "100%", border: "2px solid #1be0e7" }}
              />
            )}
          </>
        </Box>
      </Modal>
    </>
  );
}

export default GestionCartera;
