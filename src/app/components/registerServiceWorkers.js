'use client';

import { useEffect } from "react";
import Swal from "sweetalert2";


const RegisterServiceWorkers = () => {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
            .register('/serviceworker.js')
            .then((registration) => {
                console.log('Service worker registrado con exito', registration);
                navigator.serviceWorker.addEventListener('message', (event) => {
                    if (event.data?.type === 'offline') {
                        Swal.fire({
                            icon: "error",
                            title: "Sin conexión a Internet",
                            text: "Esta página no está disponible sin conexión",
                            confirmButtonText: "Aceptar",
                            background: "#fefefe",
                            color: "#333",
                            footer: '<a href="/pages">Ir al Inicio</a>'
                        });
                    }
                })
            })
            .catch((error) => {
                console.error('Error al registar el service worker', error);
            })
        }
    }, []);

    return null;
}

export default RegisterServiceWorkers;