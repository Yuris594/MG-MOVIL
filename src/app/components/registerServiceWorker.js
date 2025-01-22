'use client';

import { useEffect } from "react";

const RegisterServiceWorkers = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').then((registration) => {
        console.log('Service Worker registrado:', registration);
      }).catch((error) => {
        console.error('Error al registrar el Service Worker:', error);
      });

      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data.type === 'NO_INTERNET') {
          alert('No hay conexión a internet. No puedes acceder a esta página hasta que te reconectes.');
        }
      });
    }
  }, []);

  return null;
};

export default RegisterServiceWorkers;
