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
    self.skipWaiting();
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
    self.clients.claim();
});


self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }

            return fetch(event.request).catch(() => {
                if (event.request.destination === 'document') {
                    return caches.match('/');
                }
                
                return new Response('Offline content unavailable', {
                    status: 503,
                    statusText: 'Service Unavailable',
                    headers: { 'Content-Type' : 'text/plain' },
                });
            });
        })
    );
});