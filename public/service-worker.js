const CACHE_NAME = 'MG-MOVIL';
const urlsToCache = [
    '/',
    '/favicon.ico',
    '/manifest.json',
    '/LOGO.png',
    '/logoMG.png',
    '/logo_miguelgomez.png',
    '/globals.css',
    '/pages/',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        (async () => {
            try {
                const cache = await caches.open(CACHE_NAME)
                  for (const url of urlsToCache) {
                    try {
                        await cache.add(url);
                    } catch (error) {
                        console.error(`Failed to cache ${url}:`, error)
                    }
                  }
            } catch (error) {
                console.error('Failed to cache resources', error);
            }
        })()
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