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
      <Grid container direction="column" sx={{ minHeight: "100vh", backfroundColor: "#ffffff", padding: 2, alignItems: "center" }}>
        <Grid size={12} sx={{ marginTop: isSmallScreen ? 2 : 4 }}>
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", margin: 2, color: "red", textAlign: "center" }}>
            <h2><strong>¿YA REALIZASTE EL RUTERO DEL DÍA DE HOY?</strong></h2>
          </Box>
        </Grid>
          
        <Grid size={12} sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
          <Box sx={{ textAlign: "center" }}>
            <Image
              src="/logo_miguelgomez.png"
              width={isSmallScreen ? 200 : 300}
              height={isSmallScreen ? 150 : 250}
              alt="Logo"
              priority={true}
            />
          </Box>
        </Grid>

        <Grid size={12}>
          <Copyright sx={{ mt: 5, mb: 5 }} />
        </Grid>
      </Grid>
    </>
  )
}

export default Inicio;
