'use client';

import { Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import MuiAlert from "@mui/material/Alert";
import { Global } from "@/conexion";
import { useState } from "react";
import * as React from "react";


const Alert = React.forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert elevation={6} ref={ref} {...props} />
  );
});

export function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Departamento de Sistemas © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


const Iniciar = async (usuario, clave) => {
  const response = await fetch(Global.url + `/users/username`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ UserName: usuario, UserPass: clave }),
  });

  if (!response.ok) {
    if (response.status === 404) {
      return { error: { detail: "Credenciales incorrectas" } };
    } else {
      return { error: { detail: "Error desconocido" } };
    }
  }
  return response.json();
};


function Login() {
  const router = useRouter();
  const { login, auth } = useAuth();
  const [clave, setClave] = useState('');
  const [open, setOpen] = useState(false);
  const [openE, setOpenE] = useState(false);
  const [error, setError] = useState(false);
  const [usuario, setUsuario] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultado = await Iniciar(usuario, clave);
        if (resultado.error) {
          setError(true);
          setOpenE(true);
        } else {
          setOpen(true);
          const token = resultado
          login(token);
          router.push("../pages");
        }
    } catch (error) {
          setError(true);
          setOpenE(true);
          console.log("Error en la pagina Iniciar Sesión", error)
    }
  };


  const handleClose = (reason) => {
    if (reason === "clicaway") {
      return;
    }
    setOpen(false);
    setOpenE(false);
  };

  return (
      <>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh", backgroundColor: "#f4f4f4" }}>
          <Box sx={{ display: "flex", width: "900px",  height: "500px", boxShadow: 3, borderRadius: "15px", overflow: "hidden", backgroundColor: "white" }}>
            <Box sx={{ flex: 1, backgroundColor: "#000", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: { xs: "20px", sm: "40px" }, color: "white" }}>
              <Typography variant="h5" color="white" sx={{ fontWeight: "bold" }}>¡Bienvenido! </Typography>
              <Box sx={{ textAlign: "center", marginBottom: "20px", width: { xs: "100px", sm: "200px", md: "300px" }, height: "auto" }}>
                <img src="/LOGO.png" alt="LOGO" style={{ width: "100%", height: "auto", objectFit: "contain" }} />
              </Box>
            </Box>

            <Box component="form" noValidate onSubmit={handleSubmit}  sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "20px" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "10px" }}>Iniciar Sesión</Typography>

              <Typography variant="body2" align="center" sx={{ color: "#757575", marginBottom: "20px" }}>
                Utilice su Usuario y Contraseña
              </Typography>

              <TextField
                error={error}
                id="usuario"
                label="Usuario"
                margin="normal"
                fullWidth
                name="PER_Usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />

              <TextField
                error={error}
                margin="normal"
                required
                fullWidth
                type="password"
                name="PER_Clave"
                id="contraseña"
                label="Contraseña"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
              />

              <Button type="submit" fullWidth sx={{ mt: 2, backgroundColor: "#000", color: "white", "$:hover": { backgroundColor: "#339d82" }, }}>
                    Iniciar sesión
              </Button>
            </Box>
          </Box>
        </Box>
       
        {open ? (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert onClose={handleClose} variant="filled" icon={<CheckIcon fontSize="inherit" />} severity="success" sx={{ width: "100%" }}>
              {`Inicio de sesión exitosa. ¡Bienvenido, ${auth.UserFullName}!`}
            </Alert>
          </Snackbar>
        ) : ( "" )}

        {openE ? ( 
          <Snackbar open={openE} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} variant="filled" severity="error" sx={{ width: "100%" }}>
              {'Usuario o contraseñas incorrectas. Por favor, inténtalo nuevamente.'}
            </Alert>
          </Snackbar>
        ) : ( "" )}
    </>
  );
}

export default Login;








