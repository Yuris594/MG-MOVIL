"use client";

import { Box, Button, Divider, Modal, TextField, Typography, useMediaQuery } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import NavBar from "@/app/components/navbar/nav";
import Articulos from "../pedidos/articulo/page";
import { useAuth } from "@/context/authContext";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IconButton } from '@mui/material';
import Grid from "@mui/material/Grid2";
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


const Cotizar = () => {
  const router  = useRouter();
  const { auth, clienteV } = useAuth();
  const [fecha, setFecha] = useState("");
  const [total, setTotal] = useState("");
  const [notas, setNotas] = useState("");
  const [open, setOpen] = useState(false);
  const [impuesto, setImpuesto] = useState("");
  const [subTotal, setSubTotal] = useState("");
  const [documento, setDocumento] = useState("");
  const [descuento, setDescuento] = useState("");
  const [articulosSeleccionados, setArticulosSeleccionados] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");


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
    let nuevoTotal = 0;
    let totalDescuento = 0;
    let totalImpuesto = 0;

    articulos.forEach((art) => {
      const precioBase = parseFloat(art.Precio);
      const cantidad = parseFloat(art.cantped);
      const descuento = parseFloat(art.Descuento) / 100;
      const iva = parseFloat(art.Iva) / 100;

      nuevoSubtotal += precioBase * cantidad;

      totalDescuento += precioBase * cantidad * descuento;

      totalImpuesto += precioBase * cantidad * iva;

      nuevoTotal += parseFloat(art.Total);
    });

    const descuentoTotal = nuevoSubtotal - totalDescuento;

    setDescuento(totalDescuento);
    setImpuesto(totalImpuesto);
    setSubTotal(descuentoTotal.toFixed(0));
    setTotal(nuevoTotal);
    
  };


  const cotizacionPedido = () => {
    try {
      if (articulosSeleccionados.length === 0) {
        Swal.fire({
          title: "Error al guardar.",
          text: "No se puede guardar la cotización. La cotización debe incluir articulos.",
          icon: "error",
        });
        return;
      }
      const pedidosGuardados = JSON.parse(localStorage.getItem("cotizacion")) || [];
      
      let ultimoId = parseInt(localStorage.getItem("ultimoFKidPedidos")) || [];
     
      const nuevoId = ultimoId + 1;
  
      localStorage.setItem("ultimoFKidPedidos", nuevoId);
  
      const pedido = {
        PKId: nuevoId,
        fecha: new Date().toISOString(),
        nombreC: clienteV.RazonSocial,
        nit: clienteV.NIT,
        telefono: clienteV.Telefono,
        direccion: clienteV.Direccion,
        municipio: clienteV.CityName,
        email: clienteV.Email,
        total,
        subTotal,
        impuesto,
        descuento,
        idvend: auth.ID,
        FKID_sellers: auth.IDSaler,
        notas: notas,
        NUMPED: "",
        Documento1: documento, 
        articulosSeleccionados: articulosSeleccionados.map(art => ({
          ...art,
          FKid_pedidos2: nuevoId
        })),
      };
  
      pedidosGuardados.push(pedido);
      localStorage.setItem("cotizacion", JSON.stringify(pedidosGuardados));
    
      router.push("../../cotizacion/");
  
      Swal.fire({
        title: "Cotización Exitosa.",
        text: "Cotización creada correctamente.",
        icon: "success",
        showConfirmButton: false,
        timer: 3000
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al guardar la Cotización",
        text: "La cotizaón debe contener articulos.",
      })
    }
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
        <h2 style={{ margin: 4 }}><strong>CREAR COTIZACIÓN</strong></h2>
        <Grid size={{ xs: 12, sm: 8 }} sx={{ padding: 2 }}>
          <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", justifyContent: "center", alignItems: "center" }}>
            <Button onClick={handleOpen} variant="contained" sx={{ margin: 1, backgroundColor:"#4eeacb", color: "white" }}>Articulos</Button>
            <Button onClick={cotizacionPedido} variant="contained" sx={{ margin: 1, backgroundColor: '#67e947', color: "white" }}>Guardar Cotizacion</Button>
            <Button variant="contained" sx={{ ml: 1, mr: 2 }} color="error" LinkComponent={Link} href="../">Cerrar</Button>
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
  )
}

export default Cotizar;
