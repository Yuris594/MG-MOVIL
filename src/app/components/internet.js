"use client";

import { useEffect } from "react";
import Swal from "sweetalert2";

const AlertInternet = () => {
  
  useEffect(() => {
    const handleOfflice = () => {
      Swal.fire({
        icon: "info",
        title: "Sin Conexión.",
        text: "Verificar la conexión con la empresa o el Internet."
      });
    }

    const handleOnline = () => {
      Swal.fire({
        icon: "success",
        title: "Conexión Establecida.",
        text: "La conexión a Internet ha sido restaurada."
      });
    }



    window.addEventListener("offline", handleOfflice);
    window.addEventListener("online", handleOnline);


    if(!navigator.onLine) {
      handleOfflice();
    }


    return () => {
      window.addEventListener("offline", handleOfflice);
      window.addEventListener("online", handleOnline);
    }

  }, []);

  return null;
}

export default AlertInternet;