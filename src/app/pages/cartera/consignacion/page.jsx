"use client";

import { Box, Button, Divider, Modal, Paper, styled, Table, TableBody, TableContainer, TableHead, TableRow, TextField, useMediaQuery } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import NavBar from "@/app/components/navbar/nav";
import { useAuth } from "@/context/authContext";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Global } from "@/conexion";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const columns = [
  { field: 'ID', headerName: 'Id Consiganción', width: 150, headerClassName: 'header-bold' },
  { field: 'BankName', headerName: 'Banco', width: 400, headerClassName: 'header-bold' },
  { field: 'ConsignmentNumber', headerName: 'Numero de Consignación', width: 250, headerClassName: 'header-bold' },
  { field: 'UserFullName', headerName: 'Elaborada Por', width: 150, headerClassName: 'header-bold' },
  { field: 'Date', headerName: 'Fecha', width: 180, headerClassName: 'header-bold' },
  { field: 'Ammount', headerName: 'Total Consignación', width: 170, headerClassName: 'header-bold' },
];

const Consignacion = () => {
  const { auth } = useAuth();
  const [monto, setMonto] = useState([]);
  const [open, setOpen] = useState(false);
  const [recibo, setRecibo] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [montoOriginal, setMOntoOriginal] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState([]); 
  const isSmallScreen = useMediaQuery("(max-width: 600px)");


  const handleOpen = async (cliente) => {
    setClienteSeleccionado(cliente); 
    setOpen(true);
    console.log(cliente)
    try {
      const response = await fetch(Global.url + `/receipts/consult/ConsignmentDetail?ID=${auth.IDSaler}&data=${cliente.ID}`, {
        method: "GET",
        headers: { "Content-Type" : "application/json" }
      });
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      const datos = await response.json();
      setRecibo(datos);
      console.log(datos);
    } catch (error) {
      console.log("Error al obtener los datos del recibo", error)
    }
  };

  const handleClose = () => {
    setClienteSeleccionado(null);
    setOpen(false);
  };


  useEffect(() => {
    const adquirirMonto = async () => {
      try {
        const response = await fetch(Global.url + "/consignments/list", {
          method: "GET",
          headers: { "Content-Type" : "application/json" }
        });
  
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        const data = await response.json();  
        const filtrados = data.filter((item) => item.UserFullName === auth.UserFullName);
        setMonto(filtrados);
        setMOntoOriginal(filtrados);
      } catch (error) {
        console.log("Error al adquirir los datos", error);
      }
    }
    adquirirMonto();
  }, []); 
  

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    const resultadoBusqueda = montoOriginal.filter((elemento) => {
      const valores = Object.values(elemento).map((value) => 
        value ? value.toString().toLowerCase() : ""
      );
      return valores.some((valor) => valor.includes(terminoBusqueda.toLowerCase()));
    });
    setMonto(resultadoBusqueda);
  };
  

  return (
    <>
      <NavBar />    
      <Grid container direction="column" sx={{ minHeight: "100vh", backfroundColor: "#ffffff", padding: 2 }}>
        <Grid size={12}>
          <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", alignItems: "center" }}>
            <h2><strong>CONSIGNACIONES</strong></h2>
            <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", alignItems: "center", marginLeft: isSmallScreen ? 0 : "auto", padding: 2  }}>
              <TextField 
                id="outlined-basic"
                label="Buscar..."
                multiline
                rows={1}
                variant="outlined"
                value={busqueda}
                onChange={handleChange}
                sx={{ width: isSmallScreen ? 300 : 400 }}
              />
            </Box>
          </Box>
        </Grid>

        <Grid size={12} sx={{ flexGrow: 1, marginBottom: 2 }}>
          <Box sx={{ width: "100%", height: isSmallScreen ? 500 : 755 }}>
            <DataGrid 
              rows={monto}
              columns={columns}
              getRowId={(row) => row.ID}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 20 }
                }
              }}
              pageSizeOptions={[20]}
              onRowClick={(params) => handleOpen(params.row)} 
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
          <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: '8px', maxWidth: '800px', height: "90%", height: "70vh", overflowY: "auto", margin: 'auto', mt: 4, p:2 }}>
          <>
            <strong>DETALLE DE CONSIGNACIÓN</strong>
            <Divider />
            {clienteSeleccionado && (
              <Grid container rowSpacing={1.5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ p: 1 }}>
                <Grid size={{ xs: 10, sm: 8, md: 6 }}>
                  <strong>Banco: </strong>{clienteSeleccionado.BankName}
                </Grid>
                <Grid size={{ xs: 10, sm: 8, md: 6 }}>
                  <strong>Numero de Consignación: </strong>{clienteSeleccionado.ConsignmentNumber}
                </Grid>
                <Grid size={{ xs: 8, sm: 6, md: 4 }}>
                  <strong>Fecha: </strong>{clienteSeleccionado.Date}
                </Grid>
                <Grid size={{ xs: 8, sm: 6, md: 4 }}>
                  <strong>Elaborada Por: </strong>{clienteSeleccionado.UserFullName}
                </Grid>
                <Grid size={{ xs: 8, sm: 6, md: 4 }}>
                  <strong>Total Consignación: </strong>{clienteSeleccionado.Ammount}
                </Grid>
              </Grid>
            )}
            {clienteSeleccionado && (
              <TextField
                id="outlined-basic"
                multiline
                rows={2}
                defaultValue={clienteSeleccionado.Comentarios}
                variant="outlined"
                label="Comentarios"
                sx={{ width: "100%", mb: 2 }}
              />
            )}
          </>
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%", heigth: "auto" }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>N° Recibo</StyledTableCell>
                <StyledTableCell>Nit</StyledTableCell>
                <StyledTableCell>Razón Social</StyledTableCell>
                <StyledTableCell>Fecha Recibo</StyledTableCell>
                <StyledTableCell>Valor Recibo</StyledTableCell>
                <StyledTableCell>Registrado Por</StyledTableCell>
                <StyledTableCell>Estado</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(recibo) && recibo.map((index) => (
              <TableRow key={index.ID}>
                <TableCell>{index.CONSECUTIVO}</TableCell>
                <TableCell>{index.NIT}</TableCell>
                <TableCell>{index.RazonSocial}</TableCell>
                <TableCell>{index.FECHA}</TableCell>
                <TableCell>{index.TOTAL}</TableCell>
                <TableCell>{index.U1}</TableCell>
                <TableCell>{index.StateName}</TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "flex-end", margin: 2 }}>
          <Button variant="contained" onClick={handleClose}>Cerrar</Button>
        </Box>
        </Box>
      </Modal>
    </>
  )
}

export default Consignacion;