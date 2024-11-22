"use client";

import { Box, TextField, Checkbox, FormControlLabel, Button, MenuItem, Divider, useMediaQuery } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import NavBar from '@/app/components/navbar/nav';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import Grid from "@mui/material/Grid2";
import { Global } from '@/conexion';
import { useState } from 'react';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';


const RealizarRutero = () => {
  const router = useRouter()
  const { clienteV, auth } = useAuth();
  const [hora, setHora] = useState(null);
  const [fecha, setFecha] = useState(null);
  const [cobro, setCobro] = useState(false);
  const [gestion, setGestion] = useState('');
  const [pedido, setPedido] = useState(false);
  const [Comentario, setComentario] = useState('');
  const isSmallScreen = useMediaQuery("(max-width: 600px)");


  const pedidoValue = pedido ? "Si" : "No";
  const cobroValue = cobro ? "Si" : "No";

  const handleSave = async () => {
    const ruteroData = {
      Tipo: gestion,  
      Comentario,
      Agenda: fecha ? fecha.format("MM/DD/YYYY") : "0-0-0", 
      FKNitCliente: clienteV.NIT || '',           
      FKUsuario: auth.UserFullName || 'USUARIOS', 
      Hora: hora ? hora.format("HH:mm:ss") : null, 
      Realiza_pedido: pedidoValue,   
      Zona: clienteV.CityName, 
      Cobro: cobroValue,
      CODVENDEDOR: auth.IDSaler, 
    };

    console.log("Datos enviados al bakend", ruteroData);
    
    try {
      const response = await fetch(Global.url + '/gestioncartera/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ruteroData)
      });

      const responseData = await response.json();
      if (response.ok) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Rutero Creado Correctamente",
            showConfirmButton: false,
            timer: 2500,
        });
        router.push("../gestionCartera");
        
        } else {
        console.error("Response not ok", responseData);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: responseData.text || "No se pudo guardar el rutero. Intente de nuevo.",
        });
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "La solicitud está tardando demasiado. Intente nuevamente más tarde.",
        });
        } else {
        console.error('Error details:', error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un error en la conexión. Intente de nuevo.",
        });
      }
    }
  };
  

  return (
    <>
      <NavBar />
      <Box sx={{ width: isSmallScreen ? "90%" : 600, margin: "0 auto", padding: 2, border: "2px solid #000", p: 2, mt: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: isSmallScreen ? "center" : "flex-start" }}>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
            <strong>Nit: </strong>{clienteV.NIT} 
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
            <strong>Razón Social: </strong>{clienteV.RazonSocial} 
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
            <strong>Usuario: </strong>{auth.UserFullName}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ maxWidth: 650, margin: '0 auto', padding: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, sm: 6 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                  <TimePicker 
                    label="Hora"
                    fullWidth
                    value={hora}
                    onChange={(newValue) => setHora(newValue)}
                    minTime={dayjs().hour(7).minute(0)} 
                    maxTime={dayjs().hour(20).minute(0)}
                    slotProps={{ textField: { variant: "outlined", fullWidth: true, } }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Tipo de Gestión"
                select
                fullWidth
                value={gestion}
                onChange={(e) => setGestion(e.target.value)}
                sx={{  width: 250, margin: 1 }}>
                <MenuItem value="Telefonica">Telefónica</MenuItem>
                <MenuItem value="Presencial">Presencial</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
            <Grid size={{ xs: 6, sm: 3 }}>
              <FormControlLabel
                control={<Checkbox checked={pedido} onChange={(e) => setPedido(e.target.checked)} />}
                label="¿Hizo pedido?"
              />
            </Grid>

            <Grid size={{ xs: 6, sm: 3 }}>
              <FormControlLabel
                control={<Checkbox checked={cobro} onChange={(e) => setCobro(e.target.checked)} />}
                label="¿Cobró?"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Agendar"
                  value={fecha}
                  onChange={(newValue) => setFecha(newValue)}
                  slotProps={{ textField: { variant: "outlined", fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>

          <TextField
            label="Comentarios"
            multiline
            rows={3}
            fullWidth
            value={Comentario}
            onChange={(e) => setComentario(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button variant="contained" color="success" onClick={handleSave} sx={{ mt: 2, width: "100%" }}>
            Guardar
          </Button>
        </Box>    
      </Box>
    </>
  )
}

export default RealizarRutero;

