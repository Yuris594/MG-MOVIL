"use client";

import { Alert, Box, Button, Divider, IconButton, Modal, Snackbar, Stack, TextField, Typography, useMediaQuery } from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CancelIcon  from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import NavBar from "@/app/components/navbar/nav";
import { useAuth } from "@/context/authContext";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { initDB } from "@/app/components/base/db"; 
import { Global } from "@/conexion";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import { useRouter } from "next/navigation";



const CarteraCliente = () => {
  const { setClienteV } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openE, setOpenE] = useState(false);
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);
  const [cartera, setCartera] = useState([]);
  const [clientes, setClientes] = useState([]); 
  const [busqueda, setBusqueda] = useState("");
  const [tablaCartera, setTablaCartera] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState([]);
  const [correo, setCorreo] = useState(clienteSeleccionado ? clienteSeleccionado.Email : "");
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const handleOpenE = () => {
    setOpenE(true);
  };

  const handleCloseE = () => {
    setOpenE(false);
  }

  const handleOpen = (clienteTabla) => {
    const clienteCompleto = clientes.find((c) => c.NIT === clienteTabla.Cliente); 
  
    if (clienteCompleto) {
      setClienteSeleccionado(clienteCompleto);
      setCorreo(clienteCompleto.Email); 
      setOpen(true);
      setClienteV(clienteCompleto);
    }
  };


  const handleClose = () => {
    setClienteSeleccionado(null); 
    setOpen(false);
  };


  useEffect(() => {
    const conseguirCartera = async () => {
      try {
        const db = await initDB(); 
        const datosGuardados = await db.getAll('cartera'); 

        if (datosGuardados) {
          setCartera(datosGuardados);
          setTablaCartera(datosGuardados);
          console.log("Datos cargados desde IndexedDB Cartera");
        } else {
          console.log("Error al cargar los datos de cartera");
        }
      } catch (error) {
        console.log("Error al obtener los productos", error);
      }
    };
    conseguirCartera();
  }, []);

  const columns = [
    { field: 'Cliente', headerName: 'NIT', width: 150, headerClassName: 'header-bold' },
    { field: 'RazonSocial', headerName: 'RAZON SOCIAL', width: 350, headerClassName: 'header-bold' },
    { field: 'Documento', headerName: 'DOCUMENTO', width: 150, headerClassName: 'header-bold' },
    { field: 'TipoDocumento', headerName: 'TIPO', width: 80, headerClassName: 'header-bold' },
    { field: 'Monto', headerName: 'MONTO', width: 150, headerClassName: 'header-bold' },
    { field: 'FechaDocumento', headerName: 'FECHA DOCUMENTO', width: 150, headerClassName: 'header-bold' },
    { field: 'FechaVencimiento', headerName: 'FECHA VENCIMIENTO', width: 150, headerClassName: 'header-bold' },
    { field: 'Plazo', headerName: 'PLAZO (días)', width: 90, headerClassName: 'header-bold' },
    { field: 'DiasVencimiento', headerName: 'DÍAS VENCIDOS', width: 100, headerClassName: 'header-bold' },
    { field: 'Saldo', headerName: 'SALDO', width: 150, headerClassName: 'header-bold' },
  ];

  const handleChange = (e) => {
    e.preventDefault();
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    const resultadoBusqueda = tablaCartera.filter((elemento) => {
      const valores = Object.values(elemento).map((value) => 
        value ? value.toString().toLowerCase() : ""
      );
      return valores.some((valor) => valor.includes(terminoBusqueda.toLowerCase()));
    });
    setCartera(resultadoBusqueda);
  };

  useEffect(() => {
    const conseguirDatos = async () => {
      try {
        const db = await initDB(); 
        const clientesGuardados = await db.getAll('customers'); 
  
        if (clientesGuardados) {
          setClientes(clientesGuardados); 
          console.log("Datos cargados desde la base de datos");
        } else {
          console.log("No se encontraron artículos en la base de datos.");
        }
      } catch (error) {
        console.log("Error al obtener los clientes:", error);
      }
    };
    conseguirDatos();
  }, [])


  const actualizarCorreo = async () => {
    const editarCorreo = {
      Nit: clienteSeleccionado.NIT,
      Email: correo,
    };

    console.log("Enviando correo actualizado: ", editarCorreo);

    try {
      const response = await fetch(Global.url + `/customers/updatemail`, {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(editarCorreo),
      }); 
      
      if(response.ok) {

        handleCloseE(); 
        handleClose();
        setOpenB(true);

        const datos = await response.json();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Email Actualizado con Exito!.",
          text: `${datos.text}`,
          showConfirmButton: false,
          timer: 2500
        });
        console.log(datos)
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...!",
          text: "Error al Actualizar el Email.",
        });
      }
    } catch (error) {
      setOpenA(true);
      console.error("Error al actualizar el correo:", error);
      Swal.fire({
        icon: "error",
        title: "Error en la Red",
        text: "No se pudo Actualizar el Correo debido a un Problema de Red.",
      });
    }
  };

  const handleCloseA = (reason) => {
    if (reason === "clicaway") {
      return;
    }
    setOpenB(false);
    setOpenA(false);
  }

  return (
    <>
      <NavBar />    
      <Grid container direction="column" sx={{ minHeight: "100vh", backfroundColor: "#ffffff", padding: 2 }}>
        <Grid size={12}>
          <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", alignItems: "center" }}>
            <h2><strong>CARTERA CLIENTES</strong></h2>
            <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", alignItems: "center", marginLeft: isSmallScreen ? 0 : "auto", padding: 2  }}>
              <TextField 
                id="outlined-basic"
                label="Buscar..."
                variant="outlined"
                value={busqueda}
                onChange={handleChange}
                sx={{ width: isSmallScreen ? 300 : 500 }}
              />
            </Box>
          </Box>
        </Grid>

        <Grid size={12} sx={{ flexGrow: 1, marginBottom: 2 }}>
          <Box sx={{ width: "100%", height: isSmallScreen ? 500 : 650 }}>
            <DataGrid 
              rows={cartera}
              columns={columns}
              getRowId={(row) => row.Documento}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10 }
                }
              }}
              pageSizeOptions={[10, 20, 30]}
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

      <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: '8px', maxWidth: '750px', width: "90%", height: "70vh", overflowY: "auto", margin: 'auto', mt: 4, p:2 }}>
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
              <Grid size={{ xs: 6, sm: 4, md: 3 }}>
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
            <Button variant="outlined" startIcon={<AssignmentIcon />} sx={{ color: "#29e5ad", margin: "5px" }} onClick={() => router.push("../client/pedidos/")}>Pedidos</Button>
            <Button variant="outlined" startIcon={<DirectionsRunIcon />} sx={{ color: "#e52990", margin: "5px" }} component={Link} href="../client/rutero/">Realizar Rutero</Button>
            <Button variant="outlined" startIcon={<AssignmentIcon />} sx={{ color: "#f07d30", margin: "5px" }} component={Link} href="../client/cotizacion/">Cotización</Button>
            <Button variant="outlined" startIcon={<ReceiptIcon />} sx={{ margin: "5px" }} color="secondary" component={Link} href="../client/recibo/">Ver Recibos</Button>
            <Button variant="outlined" startIcon={<EmailIcon />} sx={{ margin: "5px" }} color="success" onClick={handleOpenE}>Actualizar Correo</Button>
            <Button variant="outlined" startIcon={<ReceiptLongIcon />} sx={{ color: "#2948e5", margin: "5px" }} component={Link} href="../client/crearRecibo/">Realizar Recibo</Button>
            <Button variant="contained" startIcon={<CloseIcon />} sx={{ margin: "5px" }} color="error" onClick={handleClose}>Cerrar</Button>
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
        <Box sx={{ p: 2, backgroundColor: 'white', borderRadius: '8px', maxWidth: '555px', width: "90%", height: "35vh", overflowY: "auto", margin: 'auto', mt: 2 }}>
          <h3>Actualizar Correo Electrónico</h3>
          <Divider />
          <h3>{clienteSeleccionado && clienteSeleccionado.RazonSocial}</h3>
          <h3>EMAIL: </h3>
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


      {/* Alertas Para Mostrar Si el Correo Se Actualizo Correctamente o No */}
      {openB ? (
      <Snackbar open={openB} autoHideDuration={6000} onClose={handleCloseA}>
        <Alert onClose={handleCloseA} severity="success" sx={{ width: "100%" }}>
          Correo actualizado con éxito
        </Alert>
      </Snackbar>
      ) : ("")}

      {openA ? (
      <Snackbar open={openA} autoHideDuration={6000} onClose={handleCloseA}>
        <Alert onClose={handleCloseA} severity="error" sx={{ width: "100%" }}>
          Hubo un error al actualizar el correo
        </Alert>
      </Snackbar>
      ): ("")}

    </>
  );
}

export default CarteraCliente;
