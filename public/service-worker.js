self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/client',
                'inventario',
                '/cartera',
                '/LOGO.png',
                '/logo_miguelgomez.png',
                '/manifest.json',
                'favicon.ico'
            ]);
        })
    );
});


self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return (
                cachedResponse ||
                fetch(event.request).then((networkResponse) => {
                    return caches.open('my-cache').then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                })
            );
        })
    );
});


self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['my-cache'];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return cache.delete(cacheName);
                    }
                })
            );
        })
    );
});