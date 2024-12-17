import { Workbox } from "workbox-window";

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js');

    wb.addEventListener('installed', (event) => {
        if (event.isUpdate) {
            console.log('Se ha instalado un anueva versión.');
        }
    });

    wb.register();
}