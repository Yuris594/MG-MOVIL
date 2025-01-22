'use client';

import { useEffect } from "react";


const RegisterServiceWorkers = () => {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            console.log('Service Worker registrado:', registration);
          });
    
          navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data.type === 'OFFLINE') {
              alert(event.data.message);
            }
          });
        }
      }, []);

    return null;
};

export default RegisterServiceWorkers;