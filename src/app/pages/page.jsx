"use client";

import Image from "next/image";
import Grid from "@mui/material/Grid2";
import NavBar from "../components/navbar/nav";
import { useState } from "react";
import { Global } from "@/conexion";
import { Box, Typography, useMediaQuery } from "@mui/material";


export function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Departamento de Sistemas © - "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
};

const Inicio = () => {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

    return (
    <>
      <NavBar />
      <Box sx={{ minHeight: "100vh", backfroundColor: "#ffffff", padding: 2, alignItems: "center" }}>
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", margin: 2, color: "red", textAlign: "center" }}>
          <h2><strong>¿YA REALIZASTE EL RUTERO DEL DÍA DE HOY?</strong></h2>
        </Box>
        
        <Box sx={{ textAlign: "center", margin: 2  }}>
          <Image
            src="/LOGO.png"
            width={isSmallScreen ? 250 : 650}
            height={isSmallScreen ? 100 : 350}
            alt="Logo"
            priority={true}
          />
        </Box>
        <Copyright sx={{ mt: 5, mb: 5 }} />
      </Box>
    </>
  )
}

export default Inicio;
