'use client';

import { Box, Button, Container, createTheme, CssBaseline, Snackbar, TextField, ThemeProvider, Typography, useMediaQuery } from "@mui/material";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import MuiAlert from "@mui/material/Alert";
import { Global } from "@/conexion";
import { useState } from "react";
import * as React from "react";
import Image from "next/image";


const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          backgroundColor: "#32DE0C",
          "&:hover": {
            backgroundColor: "#0CDE1F",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginBottom: "1rem",
        },
      },
    },
  },
});


const Alert = React.forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
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
  const { login } = useAuth();
  const [clave, setClave] = useState('');
  const [open, setOpen] = useState(false);
  const [openE, setOpenE] = useState(false);
  const [error, setError] = useState(false);
  const [usuario, setUsuario] = useState('');
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
    setError(false);
  };

  return (
      <>
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#f5f5f5" }}>
          <CssBaseline />
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs" sx={{ backgroundColor: "#FFFFFF", padding: 4, borderRadius: 2, boxShadow: "0px 5px 15px rgba(0,0,0,0.3)", marginTop: 6 }}>
                <Box sx={{ textAlign: "center" }}>
                  <Image  
                    src="/LOGO.png"
                    width={isSmallScreen ? 200 : 240}
                    height={isSmallScreen ? 120 : 140}
                    alt="Logo"
                    priority={true}
                  />
                </Box>
                  <Typography component="h1" variant="h5" align="center" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                    !Bienvenido¡
                  </Typography>
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    
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

                    <Typography component="h1" variant="h6"></Typography>

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

                    <Button type="submit" fullWidth variant="contained" color="success"
                        sx={{ marginTop: 2 }}>
                          Iniciar sesión
                    </Button>
                  </Box>
                </Container>
              </ThemeProvider>
                  
              {open ? (
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} variant="outlined" severity="success" sx={{ width: "100%" }}>
                    Usuario identificado.
                  </Alert>
                </Snackbar>
              ) : ( "" )}

              {openE ? ( 
                <Snackbar open={openE} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} variant="outlined" severity="error" sx={{ width: "100%" }}>
                    El usuario o la contraseña son incorrectos.
                  </Alert>
                </Snackbar>
              ) : ( "" )}
      </Box>
    </>
  );
}

export default Login;