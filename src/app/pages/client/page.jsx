"use client";


import { Box, Button, Divider, Modal, Stack, Typography, TextField, IconButton, InputBase, useMediaQuery } from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CancelIcon  from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import { initDB } from "@/app/components/base/db"; 
import NavBar from "@/app/components/navbar/nav";
import { useAuth } from "@/context/authContext";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Global } from "@/conexion";
import Swal from "sweetalert2";
import Link from "next/link";


const columns = [
  { field: 'NIT', headerName: 'NIT', width: 150, headerClassName: 'header-bold' },
  { field: 'RazonSocial', headerName: 'NOMBRE', width: 400, headerClassName: 'header-bold' },
  { field: 'Direccion', headerName: 'DIRECCIÓN', width: 200, headerClassName: 'header-bold' },
  { field: 'Telefono', headerName: 'TELEFONO', width: 150, headerClassName: 'header-bold' },
  { field: 'PER_Nom', headerName: 'VENDEDOR', width: 150, headerClassName: 'header-bold' },
  { field: 'TotalCartera', headerName: 'CARTERA', width: 150, align: "right", headerClassName: 'header-bold' },
];

const ClienteVendedor = () => {
  const { auth, setClienteV } = useAuth();
  const [open, setOpen] = useState(false);
  const [openE, setOpenE] = useState(false);
  const [clientes, setClientes] = useState([]); 
  const [busqueda, setBusqueda] = useState("");
  const [tablaClientes, setTablaClientes] = useState([]); 
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [correo, setCorreo] = useState(clienteSeleccionado ? clienteSeleccionado.Email : "");
  const isSmallScreen = useMediaQuery("(max-width: 600px)");


  const handleOpen = (cliente) => {
    setClienteSeleccionado(cliente); 
    setCorreo(cliente.Email) 
    setClienteV(cliente);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setClienteSeleccionado(null); 
  };

  const handleOpenE = () => {
    setOpenE(true);
  };

  const handleCloseE = () => {
    setOpenE(false);
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = await initDB(); 
        const clientesGuardados = await db.getAll('customers'); 
        if (clientesGuardados.length > 0) {
          setClientes(clientesGuardados);
          setTablaClientes(clientesGuardados);
          console.log("Datos cargados desde IndexedDB");
        } else {
          const response = await fetch(Global.url + '/customers/Customers');
          const data = await response.json();
          const filtrados = data.filter((item) =>  item.IDVendedor === auth.IDSaler);

          setClientes(filtrados);
          setTablaClientes(filtrados);
          
          for (const cliente of filtrados) {
            await db.add('customers', cliente); 
          } 

          console.log("Datos guardados/actualizados en IndexedDB");
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    const resultadoBusqueda = tablaClientes.filter((elemento) => {
      const valores = Object.values(elemento).map((value) => 
        value ? value.toString().toLowerCase() : ""
      );
      return valores.some((valor) => valor.includes(terminoBusqueda.toLowerCase()));
    });
    setClientes(resultadoBusqueda);
  };

  const actualizarCorreo = async () => {
    const editarCorreo = {
      NIT: clienteSeleccionado.NIT,
      Email: clienteSeleccionado.Email,
      PutEmail: correo, 
    };

    console.log("Enviando correo actualizado: ", editarCorreo);

    try {
      const response = await fetch(Global.url + `/customers/updatemail`, {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(editarCorreo),
      }); 
      
      if(response.ok) {
        const datos = await response.json();
        Swal.fire({
          position: "top-end",
          icom: "success",
          title: "Email Actualizado con Exito!.",
          text: `${datos.text}`,
          showConfirmButton: false,
          timer: 2500
        });
        handleCloseE(); 
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...!",
          text: "Error al Actualizar el Email.",
        });
      }
    } catch (error) {
      console.error("Error al actualizar el correo:", error);
      Swal.fire({
        icon: "error",
        title: "Error en la Red",
        text: "No se pudo Actualizar el Correo debido a un Problema de Red.",
      });
    }
  };


  return (
    <>
      <NavBar />
      <Grid container direction="column" sx={{ minHeight: "100vh", backfroundColor: "#ffffff", padding: 2 }}>
        <Grid size={12}>
          <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", alignItems: "center" }}>
            <h2><strong>LISTADO DE CLIENTES</strong></h2>
            <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", alignItems: "center", marginLeft: isSmallScreen ? 0 : "auto", padding: 2  }}>
              <TextField
                id="outlined-basic"
                value={busqueda}
                onChange={handleChange}
                placeholder="Buscar..."
                sx={{ width: isSmallScreen ? 300 : 400 }}
              />
            </Box>
          </Box>
        </Grid>
      
        <Grid size={12} sx={{ flexGrow: 1, marginBottom: 2 }}>
          <Box sx={{ width: '100%', height: isSmallScreen ? 500 : 660 }}>
            <DataGrid
              rows={clientes}  
              columns={columns}
              getRowId={(row) => row.NIT}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10 }
                }
              }}
              pageSizeOptions={[10]}
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
        <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: '8px', maxWidth: '750px', width: "90%", height: "90vh", overflowY: "auto", margin: 'auto', mt: 4, p:2 }}>
        {clienteSeleccionado && ( 
          <>
            <h3><strong style={{ fontSize: 20, color: "#1be0e7" }}>
              {clienteSeleccionado.RazonSocial}
            </strong></h3>
            <Divider />
            <Grid container rowSpacing={1.5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ p: 1 }}>
              <Grid size={{ xs: 9, sm: 6, md: 3 }}>
                <strong>NIT</strong>
                <Typography sx={{ mb: 1.5, display: "flex" }}>
                  {clienteSeleccionado.NIT}
                </Typography>
              </Grid>
              <Grid size={{ xs: 9, sm: 6, md: 3 }}>
                <strong>Cupo</strong>
                <Typography sx={{ mb: 1.5, display: "flex" }}>
                  {clienteSeleccionado.CupoCreditoCliente}
                </Typography>
              </Grid>
              <Grid size={{ xs: 9, sm: 6, md: 3 }}>
                <strong>Debe</strong>
                <Typography sx={{ mb: 1.5, display: "flex", color: "#f01212" }}>
                  {clienteSeleccionado.TotalCartera}
                </Typography>
              </Grid>
              
              <Grid size={{ xs: 9, sm: 6, md: 3 }}>
                <strong>Teléfono</strong>
                <Typography sx={{ mb: 1.5, display: "flex"}}>
                {clienteSeleccionado.Telefono}
                </Typography>
              </Grid>
              <Grid size={{ xs: 9, sm: 6, md: 3 }}>
                <strong>Celular</strong>
                <Typography sx={{ mb: 1.5, display: "flex" }}>
                {clienteSeleccionado.Celular}
                </Typography>
              </Grid>
              <Grid size={{ xs: 9, sm: 6, md: 3 }}>
                <strong>Fax</strong>
                <Typography sx={{ mb: 1.5, display: "flex" }}>
                {clienteSeleccionado.Fax}
                </Typography>
              </Grid>
              <Grid size={{ xs: 9, sm: 6, md: 3 }}>
                <strong>Dirección</strong>
                <Typography sx={{ mb: 1.5, display: "flex" }}>
                {clienteSeleccionado.Direccion}
                </Typography>
              </Grid>
              <Grid size={{ xs: 9, sm: 6, md: 3 }}>
                <strong>Ciudad</strong>
                <Typography sx={{ mb: 1.5, display: "flex" }}>
                {clienteSeleccionado.CityName}
                </Typography>
              </Grid>
              <Grid size={{ xs: 9, sm: 6, md: 3 }}>
                <strong>Departamento</strong>
                <Typography sx={{ mb: 1.5, display: "flex" }}>
                {clienteSeleccionado.DepartmentName}
                </Typography>
              </Grid>
             
              <Grid size={{ xs: 18, sm: 12, md: 6 }}>
                <strong>Email</strong>
                <Typography sx={{ mb: 1.5, display: "flex" }}>
                {clienteSeleccionado.Email}
                </Typography>
              </Grid>
            </Grid>
            <TextField
              id="outlined-basic"
              multiline
              rows={3}
              defaultValue={clienteSeleccionado.Comentarios}
              variant="outlined"
              sx={{ width: "100%", border: "2px solid #1be0e7", }}
            />
          </>
        )}

        <Divider sx={{ margin: 2 }}  />
          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", justifyContent: "center", p: 2 }}>
            <Button variant="outlined" startIcon={<AssignmentIcon />} sx={{ color: "#29e5ad", margin: "2px" }} LinkComponent={Link} href="./client/pedidos">Pedidos</Button>
            <Button variant="outlined" startIcon={<DirectionsRunIcon />} sx={{ color: "#e52990", margin: "2px" }} LinkComponent={Link} href="./client/rutero">Realizar Rutero</Button>
            <Button variant="outlined" startIcon={<EmailIcon />} color="success" onClick={handleOpenE}>Actualizar Correo</Button>
            <Button variant="outlined" startIcon={<ReceiptIcon />} color="secondary" LinkComponent={Link} href="./client/recibo">Ver Recibos</Button>
            <Button variant="outlined" startIcon={<ReceiptLongIcon />} sx={{ color: "#2948e5", margin: "2px" }} LinkComponent={Link} href="./client/crearRecibo">Realizar Recibo</Button>
            <Button variant="contained" startIcon={<CloseIcon />} color="error" onClick={handleClose}>Cerrar</Button>
          </Stack>
        </Box>
      </Modal>

        <Modal
          open={openE}
          onClose={handleCloseE}
          BackdropProps={{
            onClick: (event) => event.stopPropagation()
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description" >
          <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: '8px', maxWidth: '550px', width: "90%", height: "52vh", overflowY: "auto", margin: 'auto', mt: 4 }}>
            <strong>Actualizar Correo Electrónico</strong>
            <Divider />
            <h3 sx={{ p: 2, color: "#fff" }}>{clienteSeleccionado && clienteSeleccionado.RazonSocial}</h3>
            <Divider />
            <strong>EMAIL: </strong>
            <TextField
              label="Correo Electrónico"
              variant="outlined"
              fullWidth
              margin="normal"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <IconButton color="success" onClick={actualizarCorreo}>
                <CheckCircleIcon sx={{ fontSize: 40 }} />
              </IconButton>
              <IconButton color="error" onClick={handleCloseE}>
                <CancelIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </Box>
          </Box>
        </Modal>
    </>
  );
}

export default ClienteVendedor;
