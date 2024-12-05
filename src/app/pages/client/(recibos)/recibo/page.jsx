"use client";

import { Box, Button, Divider, IconButton, Modal, Paper, styled, Table, TableBody, 
  TableContainer, TableHead, TableRow, TextField, Typography, useMediaQuery } from "@mui/material";
import CheckCircleOutlineIcon  from "@mui/icons-material/CheckCircleOutline";
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CancelIcon from "@mui/icons-material/Cancel";
import NavBar from "@/app/components/navbar/nav";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "@/context/authContext";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Grid2"
import { Global } from "@/conexion";
import Swal from "sweetalert2";


const recibo = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "No hay recibos para este cliente"
  })
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const obtenerDatos = async (recibos) => {
  try {
    const response = await fetch(Global.url + `/receipts/getCustomersReceipts/${recibos.nit}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};


const VerRecibo = () => {
  const router = useRouter();
  const { auth, clienteV } = useAuth();
  const [nit, setNit] = useState(null);
  const [open, setOpen] = useState(false);
  const [openC, setOpenC] = useState(false);
  const [openE, setOpenE] = useState(false);
  const [numero, setNumero] = useState([]);
  const [recibos, setRecibos] = useState([]);
  const [verCheque, setVerCheque] = useState([]);
  const [documento, setDocumento] = useState([]);
  const [consecutivo, setConsecutivo] = useState(null);
  const [recibosCliente, setRecibosCliente] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    const conseguirDatos = async () => {
      if (clienteV && clienteV.NIT) {
        const datos = await obtenerDatos({ nit: clienteV.NIT });
        if (datos && datos.length > 0) {
          setRecibos(datos);
          setRecibosCliente(datos);
        } else {
          recibo();
        }
      }
    };
    conseguirDatos();
  }, [clienteV]);


  const handleOpen = async (cliente) => {
    setClienteSeleccionado(cliente); 
    setConsecutivo(cliente.CONSECUTIVO);
    setNit(cliente.NIT);
    setOpen(true);


    try {
      const response = await fetch(Global.url + `/receipts/receiptdetail/${cliente.CONSECUTIVO}?action=Consult`, {
        method: "GET",
        headers: { "Content-Type" : "applicatiojn/json" }
      });
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      } 
      const datos = await response.json();
      setDocumento(datos.receipts);
    } catch (error) {
      console.log("Error al obtener los datos del recibo", error)
    }

    if(cliente.HasChecks === "Si") {
      try {
        const response = await fetch(Global.url + `/receipts/receiptdetail/${cliente.CONSECUTIVO}?ProfileName=Administrador&action=Gettle&checks=Si`, {
          method: "GET", 
          headers: { "Content-Type" : "application/json" },
        });
    
        const datos = await response.json();
        setVerCheque(datos.checks);
        console.log(datos.checks);
      } catch (error) {
        console.log("Error al obtener los datos del cheque", error);
      }
    } else {
      setVerCheque([]);
    }
  };

  const handleClose = () => {
    setClienteSeleccionado(null);
    setOpen(false);
  };

  const regresar = () => {
    router.push("/pages/client");
  };

  const handleOpenC = () => {
    setOpenC(true);
  };

  const handleCloseC = () => {
    setOpenC(false);
  };

  const enviarCorreo = async () => {
    if (!consecutivo || !nit ) {
      Swal.fire({
        icon: "warning",
        title: "Datos Faltantes",
        text: "Por favor, asegurarse de que el Número de Recibo y el Nit estén definidos."
      });
      return;
    };

    const idvend = auth.ID;

    try {
      const response = await fetch('http://localhost:3001/api/receipts/sendmail/', {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ consecutivo, nit, idvend }),
      });
      if (response.ok) {
        const datos = await response.json();

        handleClose();

        Swal.fire({
          position: "top-end",
          icom: "success",
          title: "Email Enviado con Exito!.",
          text: `${datos.text}`,
          showConfirmButton: false,
          timer: 2500
        });
        console.log("Respuesta Exitosa", datos);
      } else {
        const datos = await response.json();
        console.log("Respuesta del servidor", datos);
        Swal.fire({
          icon: "error",
          title: "Oops...!",
          text: "Error al Enviar el Email.",
        });
      }
    } catch (error) {
      console.error("Error al enviar correo", error)
      Swal.fire({
        icon: "error",
        title: "Error en la Red",
        text: "No se pudo Enviar el Correo debido a un Problema de Red.",
      });
    }
  };


  const handleOpenE = () => {
    setNumero(clienteSeleccionado.ReciboFisico);
    setOpenE(true);
  };

  const handleCloseE = () => {
    setOpenE(false);
  };

  const actualizarNumero = async () => {
    if (!numero) {
      Swal.fire({
        icon: "warning",
        title: "Falta el Número de Recibo",
        text: "Por Favor, Ingresa el Número de Recibo."
      });
      return;
    }
    const actualRecibo = {
      NumeroRecibo: clienteSeleccionado.ReciboFisico,
      NuevoRecibo: numero,
    };
    
    try {
      const response = await fetch(Global.url + `/receipts/edit/${consecutivo}`, {
        method: "PUT",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(actualRecibo),
      });
      const datos = await response.json();

      handleCloseE();

      if(datos) {
        Swal.fire({
          icon: "success",
          title: "Número Actualizado!",
          text: "El Número de Recibo fue Actualizado Correctamente."
        });
      } else {
        throw new Error("Failed to update");
      }
    } catch (error) {
      console.error("Error al actualizar el número", error);
      Swal.fire({
        icon: "error",
        title: "Error de Actualización.",
        text: "No se pudo actualizar el número de recibo."
      });
    }
  };

 
  const columns = [
    { field: 'CONSECUTIVO', headerName: 'Recibo', width: 150 },
    { field: 'ReciboFisico', headerName: 'Recibo Fisico', width: 150 },
    { field: 'FECHA', headerName: 'Fecha Recibo', width: 190},
    { field: 'U1', headerName: 'Registrado Por', width: 150},
    { field: 'U2', headerName: 'Asentado Por', width: 150},
    { field: 'TOTAL', headerName: 'Total Recibo', width: 150},
    { field: 'HasChecks', headerName: 'Cheques', width: 150},
    { field: 'StateName', headerName: 'Estado', width: 150},
  ];

  return (
    <>
      <NavBar />
      <Grid container direction="column" sx={{ minHeight: "100vh", backfroundColor: "#ffffff", padding: 2 }}>
        <Grid size={12}>
          <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", alignItems: "center" }}>
            <strong>Recibos de </strong> {clienteV.RazonSocial}, 
              <strong> Nit: </strong> {clienteV.NIT} 
            <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", alignItems: "center", marginLeft: isSmallScreen ? 0 : "auto", padding: 2  }}>
              <Button onClick={regresar} startIcon={<ArrowBackIcon />} variant="outlined" color="secondary">Regresar</Button>
            </Box>
          </Box>
        </Grid>      

        <Divider />

        <Grid size={12} sx={{ flexGrow: 1, marginBottom: 2 }}>
          <Box sx={{ width: '100%', height: isSmallScreen ? 500 : 660 }}>
          {recibosCliente.length > 0 && (
            <DataGrid 
              rows={recibos}  
              columns={columns}
              getRowId={(row) => row.CONSECUTIVO}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10 }
                }
              }}
              pageSizeOptions={[10]}
              onRowClick={(params) => handleOpen(params.row)}
            />
          )}
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
          <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: '8px', maxWidth: '850px', width: "90%", height: "90vh", overflowY: "auto", margin: 'auto', mt: 4, p:2 }}>
            <>
            <strong>DETALLE DE RECIBO</strong>
              <Divider />
              {clienteSeleccionado && (
                <Grid container rowSpacing={1.5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ p: 1 }}>
                  <Grid size={{ xs: 9, sm: 6, md: 3 }}>
                    <strong>Recibo: </strong>{clienteSeleccionado.CONSECUTIVO}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 8, md: 4 }}>
                    <strong>Fecha: </strong>{clienteSeleccionado.FECHA}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 8, md: 4 }}>
                    <strong>Nit: </strong>{clienteSeleccionado.NIT}
                  </Grid>
                  <Grid size={{ xs: 27, sm: 18, md: 9 }}>
                    <strong>Razón Social: </strong>{clienteSeleccionado.RazonSocial}
                  </Grid>
                  <Grid size={{ xs: 18, sm: 12, md: 6 }}>
                    <strong>Registrado Por: </strong>{clienteSeleccionado.U1}
                  </Grid>
                  <Grid size={{ xs: 18, sm: 12, md: 6 }}>
                    <strong>Asentado Por: </strong>{clienteSeleccionado.U2}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 8, md: 4 }}>
                    <strong>Estado: </strong>{clienteSeleccionado.StateName}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 8, md: 4 }}>
                    <strong>Recibo Fisico: </strong>{clienteSeleccionado.ReciboFisico}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 8, md: 4 }}>
                    <strong>Recibo SoftLand: </strong>{clienteSeleccionado.ReciboSoftland}
                  </Grid>
                </Grid>
              )}
              {clienteSeleccionado && (
                <TextField
                  id="outlined-basic"
                  multiline
                  size="small"
                  defaultValue={clienteSeleccionado.Comentarios}
                  variant="outlined"
                  label="Comentarios"
                  sx={{ width: "100%", mb: 2 }}
                />
              )}
            </>
            <TableContainer component={Paper}>
              <Table sx={{ width: "100%", maxHeight: "6ovh", overflowY: "auto" }} size="small" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Documento</StyledTableCell>
                    <StyledTableCell>Valor Cancelado</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {Array.isArray(documento) && documento.map((index) => (
                  <TableRow key={index.NumeroDocumento}>
                    <TableCell>{index.NumeroDocumento}</TableCell>
                    <TableCell>{index.ValorCancelado}</TableCell>
                  </TableRow>
                ))}
                  <TableRow>
                    <TableCell align="right"><strong>TOTAL</strong></TableCell>
                    <TableCell align="right"><strong>{clienteSeleccionado?.TOTAL}</strong></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {clienteSeleccionado?.HasChecks === "Si" && (
                <IconButton onClick={handleOpenC} title="Ver Cheques"><MonetizationOnIcon sx={{ fontSize: 40, color: "#f31919" }} /></IconButton>
              )}
              <IconButton onClick={enviarCorreo} title="Reenviar Por Correo"><MailOutlineIcon sx={{ fontSize: 40 }} color="primary" /></IconButton>
              <IconButton onClick={handleOpenE} title="Editar Recibo"><EditIcon sx={{ fontSize: 40 }} color="secondary" /></IconButton>
              <IconButton onClick={handleClose} title="Salir"><CheckCircleOutlineIcon sx={{ fontSize: 40 }} color="success" /></IconButton>
            </Box>
          </Box>
        </Modal>

        <Modal
          open={openC}
          onClose={handleCloseC}
          BackdropProps={{
            onClick: (event) => event.stopPropagation()
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: '8px', maxWidth: '650px',  width: "90%", height: "32vh",  overflowY: "auto", margin: 'auto', mt: 4, p:2 }}>
            <>
              <strong>RELACIÓN DE CHEQUES</strong>
              <Divider />
              {Array.isArray(verCheque) && verCheque.map((cheque, index) => (
                  <Grid container rowSpacing={1.5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ p: 1 }} key={index}>
                  <Grid size={{ xs: 18, sm: 12, md: 6 }}>
                    <strong>Banco: </strong>{cheque.bank}
                  </Grid>
                  <Grid size={{ xs: 18, sm: 12, md: 6 }}>
                    <strong>Número de Cheque: </strong>{cheque.checkNumber}
                  </Grid>
                  <Grid size={{ xs: 18, sm: 12, md: 6 }}>
                    <strong>Fecha: </strong>{cheque.checkDate}
                  </Grid>
                  <Grid size={{ xs: 18, sm: 12, md: 6 }}>
                    <strong>Valor: </strong>{cheque.value}
                  </Grid>
                </Grid>
              ))}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button onClick={handleCloseC} color="success">Cerrar</Button>
                </Box>
            </>
          </Box>
        </Modal>

        <Modal
          open={openE}
          onClose={handleCloseE}
          BackdropProps={{
            onClick: (event) => event.stopPropagation()
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={{ p: 4, backgroundColor: "white", borderRadius: "8px", maxWidth: "500px", margin: "auto", mt: 4 }}>
            <strong>Editar Recibo Fisico</strong>
            <Divider />
            <Typography>Número de Recibo: </Typography>
            <TextField 
              variant="outlined"
              fullWidth
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}> 
              <IconButton color="success" onClick={actualizarNumero}>
                <CheckCircleIcon sx={{ fontSize: 40 }} />
              </IconButton>
              <IconButton color="error" onClick={handleCloseE}>
                <CancelIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </Box>
          </Box>
        </Modal>
    </>
  )  
}

export default VerRecibo;