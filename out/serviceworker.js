
const CACHE_NAME = 'MG-MOVIL-v1';
const urlsToCache = [
    '/',
    '/favicon.ico',
    '/manifest.json',
    '/LOGO.png',
    '/logoMG.png',
    '/logo_miguelgomez.png',
    '/pages'
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


self.addEventListener('fest', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});