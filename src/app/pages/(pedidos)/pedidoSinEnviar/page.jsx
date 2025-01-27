"use client";

import { Box, IconButton, Modal, TextField, useMediaQuery } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import NavBar from "@/app/components/navbar/nav";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import DatosPedido from "./datosPedido/page";
import { useAuth } from "@/context/authContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%", 
  maxHeight: "90vh",  
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "auto",  
  p: 4,
}; 

const PedidoSinEnviar = () => {
  const [open, setOpen] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const { clienteV, setPedidosV } = useAuth();
  const [busqueda, setBusqueda] = useState([]);
  const [tablaPedido, setTablaPedido] = useState([]);
  const [seleccionarPedido, setSeleccionarPedido] = useState(null);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const handleOpen = (pedido) => {
    setSeleccionarPedido(pedido); 
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos")) || [];
    const pedidosFiltrados = pedidosGuardados.filter(pedido => pedido.NitC === clienteV.NIT);
    const pedidosConFechaFormateada = pedidosGuardados.map(pedido => ({
      ...pedido,
      fechaFormateada: formatearFecha(pedido.Fecha)
    }));
    setPedidos(pedidosConFechaFormateada); 
    setPedidosV(pedidosConFechaFormateada); 
    setTablaPedido(pedidosConFechaFormateada);
  }, [setPedidosV, clienteV.NIT]);

  const formatearFecha = (fecha) => {
    const fechaActual = new Date(fecha);
    const dias = fechaActual.getDate().toString().padStart(2, '0');
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const anio = fechaActual.getFullYear();
    return `${mes}/${dias}/${anio}`;
  };

  const columns = [
    { field: "pkid", headerName: "No", width: 80, headerClassName: 'header-bold' },
    { field: "fechaFormateada", headerName: "FECHA", width: 150, headerClassName: 'header-bold' },
    { field: 'NitC', headerName: 'NIT', width: 150, headerClassName: 'header-bold' },
    { field: "nombreC", headerName: "NOMBRE O RAZON SOCIAL", width: 400, headerClassName: 'header-bold' },
    { field: "actions", headerName: "", width: 70, 
      renderCell: (params) => (
        <IconButton
          onClick={() => handleDelete(params.row)}
          aria-label="cancel"
          color="error"
          sx={{ fontSize: 40 }}
        >
          <CancelIcon />
        </IconButton>
      ),
    }
  ];

  const handleDelete = (row) => {
    const pedidosFiltrados = pedidos.filter((pedido) => pedido.PKId !== row.PKId);
    localStorage.setItem("pedidos", JSON.stringify(pedidosFiltrados));
    setPedidos(pedidosFiltrados);
    setPedidosV(pedidosFiltrados);
  };

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
    console.log(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    const resultadoBusqueda = tablaPedido.filter((elemento) => {
      const valores = Object.values(elemento).map((value) => 
        value ? value.toString().toLowerCase() : ""
      );
      return valores.some((valor) => valor.includes(terminoBusqueda.toLowerCase()));
    });
    setPedidos(resultadoBusqueda);
  };

  return (
    <>
      <NavBar />
      <Grid container direction="column" sx={{ minHeight: "100vh", backfroundColor: "#ffffff", padding: 2 }}>
        <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", alignItems: "center" }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <h2><strong>PEDIDOS POR ENVIAR</strong></h2>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", alignItems: "center", marginLeft: isSmallScreen ? 0 : "auto", padding: 2  }}>
              <TextField
                id="outlined-basic" 
                variant="outlined"
                value={busqueda}
                onChange={handleChange}
                placeholder="Buscar..." 
                sx={{ width: "100%" }} 
              />
            </Box>
          </Grid>
          </Box>
          
        <Grid size={12} sx={{ flexGrow: 1, marginBottom: 2 }}>
          <Box sx={{ width: "100%", heigth: isSmallScreen ? 500 : 750 }}>
            <DataGrid
              rows={pedidos}
              columns={columns}
              getRowId={(row) => row.pkid}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
              onRowDoubleClick={(params) => handleOpen(params.row)} 
            />
          </Box>
        </Grid>
      </Grid>


      <Modal 
        open={open} 
        onClose={handleClose} 
        BackdropProps={{
          onClick: (event) => event.stopPropagation()
        }}
        aria-labelledby="modal-modal-title" 
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <DatosPedido pedido={seleccionarPedido} handleClose={handleClose} /> 
        </Box>
      </Modal>
    </>
  );
};

export default PedidoSinEnviar;



