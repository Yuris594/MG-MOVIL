"use client";

import { Box, Button, Modal, TextField, useMediaQuery } from "@mui/material";
import NavBar from "@/app/components/navbar/nav";
import { useAuth } from "@/context/authContext";
import DetallesPedido from "./detalles/page";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Grid2";
import { Global } from "@/conexion";
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
  const { auth } = useAuth();
  const router = useRouter();
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
    if (!navigator.onLine) {
      Swal.fire({
        icon: "info",
        title: "Sin Conexión",
        text: "Revisar la conexión a Internet o conectar a la VPN."
      });
      return;
    }
    
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

    const alertaCarga = Swal.fire ({
      title: "Enviando...",
      text: "Por favor, espere mientras se envía la cotización.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(Global.url + "/cotizacion/enviarPdf", { 
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ ...pedido }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.close();
        Swal.fire({
          title: "¡Éxito!",
          text: "La Cotización fue Enviada.",
          icon: "success",
          timer: 3000, 
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops..!",
          text: data.message
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


  const enviarPedido = async () => {
    const resultado = await Swal.fire({
      title: "¿Estás Seguro?",
      text: "El pedido será movido de Cotizaciones a Pedidos Por Enviar.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, mover",
      cancelButtonText: "Cancelar",
    }); 
    
    if(!resultado.isConfirmed) {
      Swal.fire({
        text: "El Pedido no se movió y permance en Cotizaciones.",
        icon: "info",
        timer: 3000, 
        showConfirmButton: false,
      });
      return; 
    }

    try {
      const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
      const cotizaciones = JSON.parse(localStorage.getItem("cotizacion")) || [];

      const pedidoGuardado = cotizaciones.find(pedido => pedido.PKId === pedido.PKId);

      if (!pedidoGuardado) {
        Swal.fire({
          title: "Pedido no encontrado",
          text: "No se pudo localizar el pedido en las cotizaciones. Por favor, revisa nuevamente.",
          icon: "error",
        });
        return;
      }

      const pedido = {
        PKId: pedidoGuardado.PKId,
        Fecha: pedidoGuardado.fecha,
        nombreC: pedidoGuardado.nombreC,
        NitC: pedidoGuardado.nit,
        total: pedidoGuardado.total,
        NombreV: auth.UserFullName,
        FKID_sellers: pedidoGuardado.FKID_sellers,
        Notas: pedidoGuardado.notas,
        NUMPED: "",
        Documento1: pedidoGuardado.Documento1, 
        pkid: pedidoGuardado.PKId,
        FKId_clientes: pedidoGuardado.nit,
        articulos: pedidoGuardado.articulosSeleccionados
      };

      const pedidoExiste = pedidos.some(p => p.PKId === pedido.PKId);

      if (!pedidoExiste) {
        pedidos.push(pedido);
        
        localStorage.setItem("pedidos", JSON.stringify(pedidos));
        
        const pedidosRestantes = cotizaciones.filter(p => p.PKId !== pedidoGuardado.PKId);
        localStorage.setItem("cotizacion", JSON.stringify(pedidosRestantes));
        
        await Swal.fire({
          title: "¡Movimiento Exitoso!",
          text: "El pedido ha sido guardado correctamente en Pedidos Por Enviar.",
          icon: "success",
          timer: 3000, 
          showConfirmButton: false,
        });
  
        router.push("../pedidoSinEnviar/")
      } else {
        Swal.fire({
          title: "Pedido dupliado",
          text: "El pedido ya fue movido anteriormente a Pedidos Por Enviar.",
          icon: "info",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Oops...!",
        text: "Ocurrió un problema al intentar guardar el pedido. Intenta nuevamente.",
        icon: "error",
      });
    }
  }


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
        <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <h2><strong>LISTA DE COTIZACIONES</strong></h2>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField 
              variant="outlined"
              value={busqueda}
              onChange={handleChange}
              label="Buscar" 
              sx={{ width: "100%", backgroundColor: "#fff" }} 
            />
          </Grid>
        </Box>
          
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
              pageSizeOptions={[10, 20, 30]}
            /> 
          </Box>
        </Grid>
      </Grid>


      <Modal 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="modal-modal-title" 
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <DetallesPedido pedido={seleccionarPedido} handleClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

export default VerCotizacion;

