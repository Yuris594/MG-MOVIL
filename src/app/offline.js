"use client";

import { Alert, AlertTitle, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const Internet = () => {
    const [online, setOnline] = useState(undefined);

    useEffect(() => {
        setOnline(navigator.onLine);

        const handleOnline = () => setOnline(true);
        const handleOffline = () => setOnline(false);
    
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        return () => {
          window.removeEventListener("online", handleOnline);
          window.removeEventListener("offline", handleOffline);
        };
    }, []);

    if (online === undefined) return null;


    const Internet = () => {
        Swal.fire({
            icon: "error",
            title: "Sin conexión a Internet",
            text: "Esta página no está disponible sin conexión",
            confirmButtonText: "Aceptar",
            background: "#fefefe",
            color: "#333",
            footer: '<a href="/pages">Ir al Inicio</a>'
        })
    }

  return (
    <>
        <Internet />
    </>
  )
}

export default Internet;