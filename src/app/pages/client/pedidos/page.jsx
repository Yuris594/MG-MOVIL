"use client";

import { Box, Button, Divider, Modal, TextField, Typography, useMediaQuery } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import NavBar from "@/app/components/navbar/nav";
import { useAuth } from "@/context/authContext";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IconButton } from '@mui/material';
import Articulos from "./articulo/page";
import Grid from "@mui/material/Grid2";
import { Global } from "@/conexion";
import Swal from "sweetalert2";
import Link from "next/link";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "90vh",  
  maxWidth: "80vw",
  overflowY: "auto",
  overflowX: "hidden",
  padding: "16px",
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24, 
};


const CrearPedido = () => {
  const router  = useRouter();
  const { auth, clienteV } = useAuth();
  const [fecha, setFecha] = useState("");
  const [total, setTotal] = useState("");
  const [notas, setNotas] = useState("");
  const handleOpen = () => setOpen(true);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [subTotal, setSubTotal] = useState("");
  const [documento, setDocumento] = useState("");
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const [articulosSeleccionados, setArticulosSeleccionados] = useState([]);


  const columns = [
    { field: 'PKcodigo', headerName: 'CODIGO', width: 150, 
      headerClassName: 'header-bold' 
    },
    { field: 'Nombre', headerName: 'REFERENCIA', width: 350, 
      headerClassName: 'header-bold' 
    },
    { field: 'Unidad_Empaque', headerName: 'UND EMPAQUE', width: 100, 
      headerClassName: 'header-bold' 
    },
    { field: 'Precio', headerName: 'PRECIO', width: 100,
      valueFormatter: (value) => {
        const precio = parseFloat(value).toFixed(0);
        return `${parseFloat(precio).toLocaleString()}`;
      }, headerClassName: 'header-bold'
    },
    { field: 'Iva', headerName: 'IVA', width: 90,
      valueFormatter: (value) => {
        const iva = parseFloat(value).toLocaleString();
        return `${parseFloat(iva).toFixed(1)}`;
      }, headerClassName: 'header-bold' 
    },
    { field: 'Descuento', headerName: 'DESC', width: 90, 
      valueFormatter: (value) => {
        const descuento = parseFloat(value).toLocaleString();
        return `${parseFloat(descuento).toFixed(1)}`;
      }, headerClassName: 'header-bold' 
    },
    { field: 'cantped', headerName: 'CANT', width: 90, 
      headerClassName: 'header-bold' 
    },
    { field: 'Total', headerName: 'TOTAL', width: 100, 
      valueFormatter: (value) => {
        const precio = parseFloat(value).toFixed(0);
        return `${parseFloat(precio).toLocaleString()}`;
      }, cellClassName: 'total-cell', headerClassName: 'header-bold'
    },
    { field: 'actions', headerName: '', width: 70, 
      renderCell: (params) => (
        <IconButton onClick={() => handleDelete(params.row)} aria-label="cancel" color="error" sx={{ fontSize: 40 }}>
          <CancelIcon />
        </IconButton>
      ),
    },
  ];
  
  const handleDelete = (row) => {
    Swal.fire({
      title: "¿Seguro que desea eliminar el articulo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar"
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedArticulos = articulosSeleccionados.filter((art) => art.PKcodigo !== row.PKcodigo);
        setArticulosSeleccionados(updatedArticulos);
        calcularTotales(updatedArticulos);
        Swal.fire("Eliminado", "El artículo ha sido eliminado", "success");
      }
    });
  };

  const agregarArticulo = (nuevosArticulos) => {
    const articulosConTotal = nuevosArticulos.map((art) => {
      const precioUnitario = art.Precio * (1 + art.Iva / 100);
      const cantidad = parseFloat(art.cantped);
      const descuento = parseFloat(art.Descuento) / 100; 
      const total = precioUnitario * cantidad * (1 - descuento);
      return {
        ...art,
        Total: total.toFixed(0),
      };
    });
    const articulosActualizados = [...articulosSeleccionados, ...articulosConTotal];
    setArticulosSeleccionados(articulosActualizados);
    calcularTotales(articulosActualizados);
  };

  const calcularTotales = (articulos) => {
    let nuevoSubtotal = 0;
    let totalDescuento = 0;
    let totalImpuesto = 0;

    articulos.forEach((art) => {
      const precioBase = parseFloat(art.Precio) || 0;
      const cantidad = parseFloat(art.cantped) || 0;
      const descuento = parseFloat(art.Descuento) / 100 || 0;
      const iva = parseFloat(art.Iva) / 100 || 0;

      const subTotalArticulo = precioBase * cantidad;
      const descuentoArticulo = subTotalArticulo * descuento;
      const impuestoArticulo = (subTotalArticulo - descuentoArticulo) * iva;

      nuevoSubtotal += subTotalArticulo;
      totalDescuento += descuentoArticulo;
      totalImpuesto += impuestoArticulo;
    });

    const nuevoTotal = nuevoSubtotal - totalDescuento + totalImpuesto;
    const subTotal = nuevoSubtotal - totalDescuento;

    setSubTotal(Number(subTotal.toFixed(0)).toLocaleString());
    setTotal(Number(nuevoTotal.toFixed(0)).toLocaleString());
  };

  const guardarPedido = () => {
    try {
      if (articulosSeleccionados.length === 0) {
        Swal.fire({
          title: "Oops...!",
          text: "Error al guardar el pedido. Debe incluir los articulos.",
          icon: "error",
        });
        return;
      };

      const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos")) || [];
      
      let ultimoId = parseInt(localStorage.getItem("ultimoFKidPedidos")) || [];
      
      const nuevoId = ultimoId + 1;
  
      localStorage.setItem("ultimoFKidPedidos", nuevoId);
  
      const pedido = {
        PKId: nuevoId,
        Fecha: new Date().toISOString(),
        nombreC: clienteV.RazonSocial,
        NitC: clienteV.NIT,
        total,
        NombreV: auth.UserFullName,
        FKID_sellers: auth.IDSaler,
        Notas: notas,
        NUMPED: "",
        Documento1: documento, 
        pkid: nuevoId,
        FKId_clientes: clienteV.NIT,
        articulos: articulosSeleccionados.map(art => ({
          ...art,
          FKid_pedidos2: nuevoId
        })),
      };
  
      pedidosGuardados.push(pedido);
      localStorage.setItem("pedidos", JSON.stringify(pedidosGuardados));
    
      router.push("../../pages/pedidoSinEnviar");
  
      Swal.fire({
        title: "Pedido guardado",
        text: "El pedido ha sido guardado correctamente.",
        icon: "success",
        showConfirmButton: false,
        timer: 3000
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al guardar el pedido",
        text: "Ocurrio un error al intentar guardar el pedido. Por favor, inténtalo nuevamente."
      })
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
      } else {
        console.log("Consecutivo actualizado correctamente");
      }
      
      const pedido = {
        FKID_sellers: auth.IDSaler,
        Notas: notas,
        FKId_clientes: clienteV.NIT,
        NUMPED,
        Documento1: documento,
      };

      const encabezadoResponse = await fetch(Global.url + '/pedidos/', {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(pedido),
      });
  
      if (!encabezadoResponse.ok) {
        const errorResponse = await encabezadoResponse.json();
        console.error("Error al crear el pedido", errorResponse);
        throw new Error("Error al crear el encabezado del pedido");
      } 
        
      console.log("Pedido creado correctamente");               
      
      const ultimoFKidPedidos = parseInt(localStorage.getItem("ultimoFKidPedidos"), 10) || 0;
      const nuevoFKidPedidos = ultimoFKidPedidos + 1;

      const detallePedido = articulosSeleccionados.map(art => ({
        FKid_pedidos2: nuevoFKidPedidos,
        FKcodigo_articles: art.PKcodigo,
        Cantidad: art.cantped,
        Precio: art.Precio,
        Descuento: art.Descuento,
        Iva: art.Iva,
        Total: art.Total,
        FKNUMPED: NUMPED,
        BODEGA: art.BODEGA
      }));
      
      for (const detalle of detallePedido) {
        const detalleResponse = await fetch(Global.url + `/pedidos/${NUMPED}`, {
          method: "POST",
          headers: { "Content-Type" : "application/json" },        
          body: JSON.stringify(detalle),
        });
      
        if (!detalleResponse.ok) {
          const errorResponse = await detalleResponse.json(); 
          console.error("Error al crear el detalle del pedido:", errorResponse);
          throw new Error(`Error al crear el detalle del pedido: ${detalleResponse.status} - ${detalleResponse.statusText}`);
        }
      }
      
      console.log("Detalle del pedido creado correctamente");
      localStorage.setItem("ultimoFKidPedidos", nuevoFKidPedidos);
    
      Swal.fire({
        title: "¡Éxito!",
        text: "Pedido Fue Almacenado Correctamente.",
        icon: "success",
        timer: 3000, 
      });

      router.push("../../pages/pedidoSinEnviar");
    } catch (error) {
      console.error("Error:", error.message);
      console.error("Detalles del error:", error); 
      Swal.fire({
        title: "Oops...!",
        text: "Hubo un problema al enviar el pedido.",
        icon: "error",
      });
    }    
  };

  const handleRowClik = (params) => {
    Swal.fire({
      title: "Primero debe guardar el pedido para realizar cambios.",
      icon: "warning",
      confirmButtonText: "Entendido"
    });
  };
  
  useEffect(() => {
    const obtenerFechaActual = () => {
      const fechaActual = new Date();
      const dias = fechaActual.getDate();
      const mes = fechaActual.toLocaleString("es-CO", { month: "short" });
      const mesCapitalizado = mes.charAt(0).toUpperCase() + mes.slice(1);
      const anio = fechaActual.getFullYear();
      
      const fechaFormateada = `${mesCapitalizado} ${dias}, ${anio}`;
      setFecha(fechaFormateada);
    };
    obtenerFechaActual();
  }, []);

  
  return (
    <>
      <NavBar />
        <Grid container spacing={2} direction={isSmallScreen ? "column" : "row"} alignItems="center" justifyContent="space-between">
          <h2 style={{ margin: 4 }}><strong>CREAR PEDIDO</strong></h2>
          <Grid size={{ xs: 12, sm: 8 }} sx={{ padding: 2 }}>
            <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", justifyContent: "center", alignItems: "center" }}>
              <Button onClick={handleOpen} variant="contained" sx={{ margin: 1, backgroundColor:"#4eeacb", color: "white" }}>Articulos</Button>
              <Button onClick={guardarPedido} variant="contained" sx={{ margin: 1, backgroundColor: '#8334f0', color: 'white' }}>Guardar</Button>
              <Button onClick={enviarPedido} variant="contained" sx={{ margin: 1 }} color="success">Enviar</Button>
              <Button variant="contained" sx={{ ml: 1, mr: 2 }} color="error" LinkComponent={Link} href="../client">Cerrar</Button>
            </Box>
          </Grid>
        </Grid>

        <Divider />

        <Grid size={{ xs: 12, sm: 6 }} sx={{ padding: 2 }}>
          <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", justifyContent: "center", alignItems: "center" }}>
            <Typography sx={{ color:"#1947ee", fontWeight: "bold", margin: 1 }} variant="subtitle2" gutterBottom>{fecha}</Typography>
            <Typography sx={{ color:"#1947ee", fontWeight: "bold", margin: 1 }} variant="subtitle2" gutterBottom>{clienteV.RazonSocial}</Typography>
            <Typography sx={{ color:"#1947ee", fontWeight: "bold", margin: 1 }} variant="subtitle2" gutterBottom>{clienteV.NIT}</Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }} sx={{ padding: 2 }}>
          <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", justifyContent: "center", alignItems: "center", gap: 2, width: isSmallScreen ? "100%" : "auto" }}>
            <TextField
              id="standard-multiline-flexible"
              label="Ingresar Notas"
              multiline
              maxRows={5}
              variant="outlined"
              value={notas} 
              onChange={(e) => setNotas(e.target.value)}
              sx={{ width: 500 }}
              inputProps={{ maxLength: 255 }}
            />
            <TextField 
              id="standard-multiline-flexible"
              label="Documento"
              multiline
              maxRows={3}
              variant="outlined"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              sx={{ width: 200 }}
              inputProps={{ maxLength: 50 }}
            />

            <Typography variant="body1">
              SubTotal: <span style={{ color: "red" }}>{subTotal}</span>
            </Typography>
            <Typography variant="body1">
              Total: <span style={{ color: "red" }}>{total}</span>
            </Typography>
          </Box>
        </Grid>

        <Grid size={12} sx={{ flexGrow: 1, margin: 2 }}>
          <Box sx={{ width: "100%", heigth: isSmallScreen ? 500 : 750 }}>
            <DataGrid 
              rows={articulosSeleccionados} 
              columns={columns}
              getRowId={(row) => row.PKcodigo}
              rowHeight={40}
              pageSizeOptions={[10]} 
              initialState={{ 
                pagination: { 
                  paginationModel: { 
                    pageSize: 10 
                  }
                } 
              }}
              onRowDoubleClick={handleRowClik}
              sx={{ bgColor: "#ffffff" }} 
            />
          </Box>
        </Grid>

        <Modal 
          open={open} 
          onClose={handleClose} 
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          disableEnforceFocus>
          <Box sx={style}>
            <Articulos handleClose={handleClose} onAgregarArticulo={agregarArticulo} />
          </Box>
        </Modal>
    </>
  );
};

export default CrearPedido;



