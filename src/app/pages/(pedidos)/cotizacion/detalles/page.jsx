"use client";

import { Box, Button, Divider, Modal, TextField, Typography, useMediaQuery } from "@mui/material";
import Articulos from "@/app/pages/client/pedidos/articulo/page";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAuth } from "@/context/authContext";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IconButton } from '@mui/material';
import Grid from "@mui/material/Grid2"; 
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%", 
  maxHeight: "80vh",  
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "auto",  
  p: 4,
  zIndex: 1200
};

const DetallesPedido = ({ pedido, handleClose }) => {
  const { auth } = useAuth();
  const router = useRouter();
  const [nit, setNit] = useState("");
  const [notas, setNotas] = useState("");
  const [total, setTotal] = useState("");
  const [fecha, setFecha] = useState("");
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [subTotal, setSubTotal] = useState("");
  const [impuesto, setImpuesto] = useState("");
  const [descuento, setDescuento] = useState("");
  const [documento, setDocumento] = useState("");
  const [articulosSeleccionados, setArticulosSeleccionados] = useState([]);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  
  
  const handleOpen = () => setOpen(true);
  const handleCloseA = () => setOpen(false);


  useEffect(() => {
    if (pedido) { 
      const pedidosGuardados = JSON.parse(localStorage.getItem("cotizacion")) || [];
      const pedidoSeleccionado = pedidosGuardados.find(p => p.PKId === pedido.PKId); 
      if (pedidoSeleccionado) {
        setNit(pedidoSeleccionado.nit);
        setNotas(pedidoSeleccionado.notas);
        setTotal(pedidoSeleccionado.total);
        setNombre(pedidoSeleccionado.nombreC);
        setImpuesto(pedidoSeleccionado.impuesto);
        setDescuento(pedidoSeleccionado.descuento);
        setDocumento(pedidoSeleccionado.Documento1);
        setFecha(formatFecha(pedidoSeleccionado.fecha));
        calcularTotales(pedidoSeleccionado.articulosSeleccionados);
        setArticulosSeleccionados(pedidoSeleccionado.articulosSeleccionados);
      }
    }
  }, [pedido]); 


  const formatFecha = (fechaIso) => {
    const fechaActual = new Date(fechaIso);
      const dias = fechaActual.getDate();
      const mes = fechaActual.toLocaleString("es-CO", { month: "short" });
      const mesCapitalizado = mes.charAt(0).toUpperCase() + mes.slice(1);
      const anio = fechaActual.getFullYear();
      
      return `${mesCapitalizado} ${dias}, ${anio}`;
  };


  const handleRowUpdate = (newRow) => {
    const filaActualizada = articulosSeleccionados.map((row) => 
      row.PKcodigo === newRow.PKcodigo 
      ? { 
        ...row, 
        Precio: newRow.Precio,
        Descuento: newRow.Descuento,
        cantped: newRow.cantped,
        Total: calcularTotalArticulo(newRow) 
      } 
      : row
    );

    setArticulosSeleccionados(filaActualizada);
    calcularTotales(filaActualizada);
    return newRow;
  };

  const calcularTotalArticulo = (articulo) => {
    const cantidad = parseFloat(articulo.cantped) || 0;
    const precio = parseFloat(articulo.Precio) || 0;
    const iva = (parseFloat(articulo.Iva) || 0) / 100;
    const descuento = (parseFloat(articulo.Descuento) || 0) / 100;

    const totalArt = cantidad * precio;
    const totalDescuento = totalArt * descuento;
    const totalIva = (totalArt - totalDescuento) * iva;

    return (totalArt - totalDescuento + totalIva).toFixed(0);
  };

  const columns = [
    { field: 'PKcodigo', headerName: 'CODIGO', width: 100, headerClassName: 'header-bold' },
    { field: 'Nombre', headerName: 'REFERENCIA', width: 320, headerClassName: 'header-bold' },
    { field: 'Unidad_Empaque', headerName: 'UND', width: 80, headerClassName: 'header-bold' },
    { field: 'Precio', headerName: 'PRECIO', width: 100,
      valueFormatter: (value) => {
        const precio = parseFloat(value).toFixed(0);
        return `${parseFloat(precio).toLocaleString()}`;
      }, headerClassName: 'header-bold', editable: true,
    },
    { field: 'Iva', headerName: 'IVA', width: 80,
      valueFormatter: (value) => {
        const iva = parseFloat(value).toLocaleString();
        return `${parseFloat(iva).toFixed(1)}`;
      }, headerClassName: 'header-bold' 
    },
    { field: 'Descuento', headerName: 'DESC', width: 80,
      valueFormatter: (value) => {
        const desc = parseFloat(value).toLocaleString();
        return `${parseFloat(desc).toFixed(1)}`;
      }, headerClassName: 'header-bold', editable: true, 
    },
    { field: 'cantped', headerName: 'CANT', width: 80, 
      headerClassName: 'header-bold', editable: true, 
    },
    { field: 'Total', headerName: 'TOTAL', width: 90, 
      valueFormatter: (value) => {
        const precio = Number(value).toFixed(0);
        return `${parseFloat(precio).toLocaleString()}`;
      }, headerClassName: 'header-bold'
    },
    { field: 'actions', headerName: '', width: 70, 
      renderCell: (params) => (
        <IconButton
          onClick={() => handleDelete(params.row)}
          aria-label="cancel"
          color="error"
          sx={{ fontSize: 40 }}>
          <CancelIcon />
        </IconButton>
      ),
    },
  ];

  const handleDelete = (row) => {
    Swal.fire({
      title: "¿Seguro que desea eliminar el artículo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      customClass: {
        popup: 'swal-custom-zindex', 
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedArticulos = articulosSeleccionados.filter((art) => art.PKcodigo !== row.PKcodigo);
        setArticulosSeleccionados(updatedArticulos);
        calcularTotales(updatedArticulos);
  
        const pedidosGuardados = JSON.parse(localStorage.getItem("cotizacion")) || [];
        const pedidoIndex = pedidosGuardados.findIndex(p => p.PKId === pedido.PKId);
        if (pedidoIndex !== -1) {
          pedidosGuardados[pedidoIndex].articulosSeleccionados = updatedArticulos;
          localStorage.setItem("cotizacion", JSON.stringify(pedidosGuardados));
        }
  
        Swal.fire({
          text: "Artículo eliminado correctamente.",
          icon: "success",
          timer: 2000,
          customClass: {
            popup: 'swal-custom-zindex', 
          },
        });
      }
    })
  };

  const calcularTotales = (articulosSeleccionados) => {
    let total = 0;
    let subTotal = 0;
    let totalDescuento = 0;
    let totalImpuesto = 0;

    articulosSeleccionados.forEach((art) => {
      const cantidad = parseFloat(art.cantped) || 0;
      const precio = parseFloat(art.Precio) || 0;
      const descuento = (parseFloat(art.Descuento) || 0) / 100;
      const iva = (parseFloat(art.Iva) || 0) / 100;

      const totalArt = cantidad * precio;
      const Descuento = totalArt * descuento;
      const Iva = (totalArt - Descuento) * iva;

      totalDescuento += precio * cantidad * descuento;
      totalImpuesto += precio * cantidad * iva;
      total += totalArt - Descuento + Iva;
      subTotal += totalArt - Descuento;
    });
    
    setTotal(Number(total.toFixed(0)).toLocaleString());
    setSubTotal(Number(subTotal.toFixed(0)).toLocaleString());
    setImpuesto(totalImpuesto.toFixed(0));
    setDescuento(totalDescuento.toFixed(0));
  };


  const agregarArticulo = (nuevosArticulos) => {
    const articulosConTotal = nuevosArticulos.map((art) => {
      const precioConIva = art.Precio * (1 + art.Iva / 100);
      const total = precioConIva * art.cantped;
      return {
        ...art,
        Total: total.toFixed(0),
      };
    });

    const articulosActualizados = [...articulosSeleccionados, ...articulosConTotal];
    setArticulosSeleccionados(articulosActualizados);
    calcularTotales(articulosActualizados);
  };

  const GuardarCambios = () => {
    try {
      if (articulosSeleccionados.length === 0) {
        Swal.fire({
          title: "Oops...!",
          text: "Error al guardar el pedido. Debe incluir articulos.",
          icon: "error",
        });
        return;
      };
      
      const pedidosGuardados = JSON.parse(localStorage.getItem("cotizacion")) || [];
      const pedidoIndex = pedidosGuardados.findIndex(p => p.PKId === pedido.PKId);
  
      if (pedidoIndex !== -1) {
        const updatedPedido = {
          ...pedidosGuardados[pedidoIndex],
          articulosSeleccionados: articulosSeleccionados,
          impuesto,
          descuento,
          total,
          subTotal,
          notas: notas,
          Documento1: documento,
        };
  
        pedidosGuardados[pedidoIndex] = updatedPedido; 
        localStorage.setItem("cotizacion", JSON.stringify(pedidosGuardados)); 
  
        handleClose(); 
  
        Swal.fire({
          position: 'top-end',
          title: 'Éxito',
          text: 'Los cambios se han guardado correctamente.',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'No se encontró el pedido a actualizar.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };


  const enviarPedido = async () => {

    handleClose(); 

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


 
  
  return (
    <>
      <Grid container spacing={2} direction={isSmallScreen ? "column" : "row"} alignItems="center" justifyContent="space-between">
        <Grid size={12}>
          <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", alignItems: "center", gap: 2, marginBottom: 2 }}>
            <h3><strong>EDITAR PEDIDOS</strong></h3>
            <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", alignItems: "center", gap: 2,  marginLeft: isSmallScreen ? 0 : "auto", width: isSmallScreen ? "100%" : "auto" }}>
              <Button onClick={handleOpen} variant="contained" sx={{ margin: 1, backgroundColor:"#841dec", color: "white" }}>Articulos</Button>
              <Button onClick={enviarPedido} variant="contained" sx={{ margin: 1, backgroundColor:"#25ba25", color: "white" }}>Convertir a Pedido</Button>
              <Button onClick={GuardarCambios} variant="contained" sx={{ margin: 1, backgroundColor:"#d92020", color: "white" }}>Guardar y Cerrar</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Divider />

      <Grid size={{ xs: 12, sm: 6 }} sx={{ marginRigth: 4, padding: 2 }}>
        <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", justifyContent: "center", alignItems: "center" }}>
          <Typography sx={{ color:"#1947ee", fontWeight: "bold", margin: 1 }} variant="subtitle2" gutterBottom>{fecha}</Typography>
          <Typography sx={{ color:"#1947ee", fontWeight: "bold", margin: 1 }} variant="subtitle2" gutterBottom>{nombre}</Typography>
          <Typography sx={{ color:"#1947ee", fontWeight: "bold", margin: 1 }} variant="subtitle2" gutterBottom>{nit}</Typography>
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
            sx={{ width: 400 }}
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

      <Grid size={12} sx={{ flexGrow: 1, marginBottom: 2 }}>
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
            processRowUpdate={(newRow) => handleRowUpdate(newRow)}
            onProcessRowUpdateError={(error) => {
              console.error('Error durante la actualización de la fila:', error);
              alert('Ocurrió un error al actualizar la fila. Intenta nuevamente.');
            }}
          />
        </Box>
      </Grid>

      <Modal open={open} onClose={handleCloseA}>
        <Box sx={style}>
          <Articulos handleClose={handleCloseA} onAgregarArticulo={agregarArticulo}  />
        </Box>
      </Modal>
    </>
  );
};

export default DetallesPedido;
