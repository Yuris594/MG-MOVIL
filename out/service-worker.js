const CACHE_NAME = 'MG-MOVIL';
const STATIC_ASSETS = [
    '/globals.css',
    '/favicon.ico',
    '/LOGO.png',


    '/',
    '/pages/',
    '/pages/client/',
    '/pages/client/pedidos/',
    '/pages/pedidoSinEnviar/',
    '/pages/cartera/',
    '/pages/inventario/',
    '/pages/client/cotizacion/',
    '/pages/cotizacion/',
];

self.addEventListener('install', (event) => {
    console.log('Service Worker: Instalado');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Archivos en caché');
            return cache.addAll(STATIC_ASSETS);
        }).catch((error) => {
            console.error('Error al agregar archivos al caché:', error);
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activado');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Eliminando caché antigua', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('Interceptando solicitud:', event.request.url);

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;  
            }

            return fetch(event.request)
                .then((response) => {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });

                    return response;
                })
                .catch(() => {
                    if (!navigator.onLine) {
                    event.respondWith(
                    caches.match(event.request).then((response) => {
                        if (response) {
                        return response;
                        } else {
                        return caches.open(CACHE_NAME).then((cache) => {
                            return cache.match(event.request);
                        });
                        
                        }
                    })
                    );
                    self.clients.matchAll().then((clients) => {
                        clients.forEach((client) => {
                            client.postMessage({ type: 'NO_INTERNET' });
                        });
                    });
                    return caches.match('/pages');
                } 
            });
        })
    );
});