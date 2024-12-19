"use client";

import { Box, Button, Modal, TextField, useMediaQuery } from "@mui/material";
import NavBar from "@/app/components/navbar/nav";
import { useAuth } from "@/context/authContext";
import DetallesPedido from "./detalles/page";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid2";
import Swal from "sweetalert2";

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
    try {
      const response = await fetch(Global.url + "/cotizacion/enviarPdf", { 
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ ...pedido }),
      });

    if (response.ok) {
      Swal.fire({
        title: "¡Éxito!",
        text: "La Cotización fue Enviada.",
        icon: "success",
        timer: 3000, 
      });
    }
    } catch (error) {
      console.error("Error generando el PDF:", error);
      Swal.fire({
        icon: "error",
        title: "Oops..!",
        text: "Revisar el Email del cliente, No se puede enviar la cotización."
      });
    }
  };


  const obtenerConse = async () => {
    try {
      const response = await fetch(Global.url + `/pedidos/${auth.IDSaler}`, {
        method: "GET",
        headers: { "Content-Type" : "application/json" },
      });
      
      if (!response.ok) {
        throw new Error(`Error al obtener el consecutivo: ${response.status} ${response.statusText}`);
      }

      const datos = await response.json();
      if (!datos[0].consecutivo || !datos[0].Prefijo) {
        throw new Error("Los campos 'consecutivo' o 'Prefijo' no se encontraron en la respuesta.");
      }

      return datos[0];
    } catch (error) {
      console.error("Error al obtener el consecutivo:", error);
      throw error;
    }
  };

  const enviarPedido = async () => {

    handleClose(); 

    const resultado = await Swal.fire({
      title: "Almacenar!",
      text: "¿Desea almacenar el Pedido?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }); 
    
    if(!resultado.isConfirmed) {
      Swal.fire({
        text: "El Pedido no se almacenó.",
        icon: "info",
        timer: 3000, 
      });
      return; 
    }
  
    try {
      const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos")) || [];
      const pedidoGuardado = pedidosGuardados.find(pedido => pedido.PKId === pedido.PKId);

      if (!pedidoGuardado) {
        throw new Error("El pedido no se encontró en el almacenamiento local.")
      }

      const datosConse = await obtenerConse();
      const conseActualizado = datosConse.consecutivo + 1;
      const NUMPED = `${datosConse.Prefijo}${conseActualizado}`; 

      const response = await fetch(Global.url + `/pedidos/PEDIDOS/${auth.IDSaler}`, {
        method: "PUT",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ Consecutivo: conseActualizado })
      }); 

      if (!response.ok) {
        console.log("Error al actualizar el consecutivo:", response.statusText);
        throw new Error("Error al actualizar el consecutivo");
      } 

      console.log("Consecutivo actualizado correctamente");
      
      const pedido = {
        FKID_sellers: pedidoGuardado.FKID_sellers,
        Notas: pedidoGuardado.Notas,
        FKId_clientes: pedidoGuardado.FKId_clientes,
        NUMPED,
        Documento1: pedidoGuardado.Documento1,
      };

      const encabezadoResponse = await fetch(Global.url + '/pedidos/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });
  
      if(!encabezadoResponse.ok) {
        const errorResponse = await encabezadoResponse.json();
        console.error("Error al crear el pedido", errorResponse);
        throw new Error("Error al crear el encabezado del pedido");
      } 
        
      console.log("Pedido creado correctamente");

      const detallePedido = articulosSeleccionados.map(art => ({
        FKid_pedidos2: art.FKid_pedidos2.toString(), 
        FKcodigo_articles: art.PKcodigo,
        Cantidad: art.cantped,
        Precio: art.Precio.toString(),
        Descuento: art.Descuento.toString(),
        Iva: art.Iva.toString(),
        Total: art.Total, 
        FKNUMPED: NUMPED,
        BODEGA: art.BODEGA
      }));
      
      for (const detalle of detallePedido) {
        const detalleResponse = await fetch(Global.url + `/pedidos/${NUMPED}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(detalle)
        });
        
        if (!detalleResponse.ok) {
          const errorResponse = await detalleResponse.text(); 
          console.error("Error al crear el detalle del pedido:", errorResponse);
          throw new Error(`Error al crear el detalle del pedido: ${detalleResponse.status} - ${detalleResponse.statusText}`);
        }
      }
      console.log("Detalle del pedido creado correctamente");

      const pedidosRestantes = pedidosGuardados.filter(p => p.PKId !== pedidoGuardado.PKId);
      localStorage.setItem("pedidos", JSON.stringify(pedidosRestantes));

      Swal.fire({
        title: "¡Éxito!",
        text: "Pedido Fue Almacenado Correctamente.",
        icon: "success",
        timer: 3000, 
      });


    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Oops...!",
        text: "Hubo un Problema al Enviar el Pedido.",
        icon: "error",
      });
    }
  };


  const columns = [
    { field: "PKId", headerName: "No", width: 80, headerClassName: 'header-bold' },
    { field: "fechaFormateada", headerName: "FECHA", width: 150, headerClassName: 'header-bold' },
    { field: 'nit', headerName: 'NIT', width: 150, headerClassName: 'header-bold' },
    { field: "nombreC", headerName: "NOMBRE O RAZON SOCIAL", width: 400, headerClassName: 'header-bold' },
    { field: "enviar", headerName: "", width: 100,  
      renderCell: (params) => (
        <Button
          onClick={() => enviarPDF(params.row)}
          aria-label="enviar"
          color="secondary"
          sx={{ fontSize: 12 }}
        >
          Enviar PDF
        </Button>
      )
    },
    { field: "crearPedido", headerName: "", width: 160, 
      renderCell: (params) => (
        <Button
          onClick={() => enviarPedido(params.row)}
          aria-label="crear"
          color="success"
          sx={{ fontSize: 12 }}
        >
          Convertir a Pedido
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
"use client";


import Swal from 'sweetalert2';
import { Modal, Box, Button } from '@mui/material';
import React, { useState } from 'react';

export default function App() {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const showAlert = () => {
    Swal.fire({
      title: 'Alerta encima del modal',
      text: 'Esta alerta ahora aparece correctamente.',
      icon: 'success',
      customClass: {
        popup: 'swal-custom-zindex', 
      },
    });
  };

  return (
    <div>
      <Button onClick={handleOpenModal}>Abrir Modal</Button>
      <Modal open={open} onClose={handleCloseModal} disableEnforceFocus>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Este es un modal</h2>
          <Button onClick={showAlert}>Mostrar Alerta</Button>
        </Box>
      </Modal>
    </div>
  );
}


*/