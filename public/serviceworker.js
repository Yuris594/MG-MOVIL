
const CACHE_NAME = 'MG-MOVIL';
const urlsToCache = [
    '/',
    '/favicon.ico',
    '/manifest.json',
    '/LOGO.png',
    '/logoMG.png',
    '/logo_miguelgomez.png',
    
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});


self.addEventListener('active', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});


self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }

            return fetch(event.request).catch(() => {
                self.clients.matchAll().then(clients => {
                    clients.forEach(client => {
                        client.postMessage({
                            type: 'offline',
                        })
                    })
                })

                return new Response(
                    Swal.fire({
                        icon: "error",
                        title: "Sin conexión a Internet",
                        text: "Esta página no está disponible sin conexión",
                        confirmButtonText: "Aceptar",
                        background: "#fefefe",
                        color: "#333",
                        footer: '<a href="/pages">Ir al Inicio</a>'
                    })
                )
            });
        })
    );
});