'use client';

import { useEffect } from "react";


const RegisterServiceWorkers = () => {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
            .register('/serviceworker.js')
            .then((registration) => {
                console.log('Service worker registrado con exito', registration);
            })
            .catch((error) => {
                console.error('Error al registar el service worker', error);
            })
        }
    }, []);

    return null;
}

export default RegisterServiceWorkers;