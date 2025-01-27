"use client";

import NavBar from "../components/navbar/nav";
import { Box, Typography } from "@mui/material";

export function Copyright(props) {
  return (
    <Typography variant="h5" color="text.secondary" align="center" {...props}>
      {"Departamento de Sistemas © - "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
};

const Inicio = () => {

    return (
    <>
      <NavBar />
      <Box sx={{ backfroundColor: "#ffffff", padding: 2, alignItems: "center" }}>
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", margin: 2, color: "red", textAlign: "center" }}>
          <h1><strong>¿YA REALIZASTE EL RUTERO DEL DÍA DE HOY?</strong></h1>
        </Box>
      </Box>

      <Box component="div" sx={{ width: "75vw", maxWidth: "1500px", minWidth: "320px", margin: "auto" }}>
        <img src="/LOGO.png" alt="LOGO" />
      </Box>

      <Copyright sx={{ mt: 3, mb: 3 }} />
    </>
  )
}

export default Inicio;
