"use client";

import { Box, Button, Modal, TextField, useMediaQuery } from "@mui/material";
import NavBar from "@/app/components/navbar/nav";
import { useAuth } from "@/context/authContext";
import DetallesPedido from "./detalles/page";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid2";


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


const VerCotizacion = () => {
  const { auth, setPedidosV  } = useAuth();
  const [open, setOpen] = useState(false);
  const [pedidos, setPedidos] = useState([]);
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
    setSeleccionarPedido(null);
  };

  useEffect(() => {
    const pedidosGuardados = JSON.parse(localStorage.getItem("cotizacion")) || [];
    const pedidosConFechaFormateada = pedidosGuardados.map(pedido => ({
      ...pedido,
      fechaFormateada: formatearFecha(pedido.fecha)
    }));
    setPedidos(pedidosConFechaFormateada); 
    setTablaPedido(pedidosConFechaFormateada);
    
  }, []);

  const formatearFecha = (fecha) => {
    const fechaActual = new Date(fecha);
    const dias = fechaActual.getDate().toString().padStart(2, '0');
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const anio = fechaActual.getFullYear();
    return `${mes}/${dias}/${anio}`;
  };

  const handleDelete = (row) => {
    const pedidosFiltrados = pedidos.filter((pedido) => pedido.PKId !== row.PKId);
    localStorage.setItem("cotizacion", JSON.stringify(pedidosFiltrados));
    setPedidos(pedidosFiltrados);
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


  const enviarPDF = async (pedido) => {
    const resultado = await Swal.fire({
      title: "Enviar PDF!",
      text: "¿Desea Enviar la Cotización al Cliente?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }); 

    if(!resultado.isConfirmed) {
      Swal.fire({
        text: "El PDF no se envió.",
        icon: "info",
        timer: 3000, 
      });
      return; 
    }

    const correoUsuario = await auth.UserEmail;
    const correoCliente = pedido?.email;
    
    try {
      const response = await fetch("", { //Añadir la nueva url cuando el bakend este listo
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ ...pedido, correoUsuario, correoCliente }),
      });

      Swal.fire({
        title: "¡Éxito!",
        text: "La Cotización fue Enviada.",
        icon: "success",
        timer: 3000, 
      });
    } catch (error) {
      console.error("Error generando el PDF:", error);
      Swal.fire({
        title: "Oops...!",
        text: "Hubo un problema al Enviar la Cotización.",
        icon: "error",
      });
    }
  }


  const columns = [
    { field: "PKId", headerName: "No", width: 80 },
    { field: "fechaFormateada", headerName: "Fecha", width: 150 },
    { field: 'nit', headerName: 'NIT', width: 150 },
    { field: "nombreC", headerName: "Nombre o Razon Social", width: 400 },
    { field: "enviar", headerName: "", width: 100,  
      renderCell: (params) => (
        <Button
          onClick={() => enviarPDF(params.row)}
          aria-label="enviar"
          color="success"
          sx={{ fontSize: 12 }}
        >
          Enviar PDF
        </Button>
      )
    },
    { field: "editar", headerName: "", width: 100,  
      renderCell: (params) => (
        <Button
          onClick={() => handleOpen(params.row)}
          aria-label="editar" 
          sx={{ fontSize: 12 }}
        >
          Modificar
        </Button>
      )
    },
    { field: "actions", headerName: "", width: 100, 
      renderCell: (params) => (
        <Button
          onClick={() => handleDelete(params.row)}
          aria-label="cancel"
          color="error"
          sx={{ fontSize: 12 }}
        >
          Eliminar
        </Button>
      ),
    }
  ];

  
  return (
    <>
      <NavBar />
      <Grid container direction="column" sx={{ minHeight: "100vh", backfroundColor: "#ffffff", padding: 3 }}>
        <Grid size={12}>
          <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
            <h2><strong>COTIZACIÓN</strong></h2>
            <TextField 
              variant="outlined"
              value={busqueda}
              onChange={handleChange}
              label="Buscar" 
              sx={{ width: isSmallScreen ? "100%" : 350, backgroundColor: "#fff", borderRadius: 2 }} 
            />
          </Box>
        </Grid>
          
        <Grid size={12} sx={{ flexGrow: 1 }}>
          <Box sx={{ width: "100%", heigth: isSmallScreen ? 500 : 750, borderRadius: 2 }}>
            <DataGrid
              rows={pedidos}
              columns={columns}
              getRowId={(row) => row.PKId}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[5, 10, 15]}
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
         <DetallesPedido pedido={seleccionarPedido} handleClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

export default VerCotizacion;


/*
 { field: "ver", headerName: "", width: 100,  
      renderCell: (params) => (
        <Button
          onClick={() => generarPDF(params.row)}
          ara-label="verPDF"
          color="secondary"
          sx={{ fontSize: 12 }}
        >
          Ver PDF
        </Button>
      )
    },
*/