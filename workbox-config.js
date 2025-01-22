module.exports = {
    globDirectory: 'public/',
    globPatterns: ['*/.{html,js,css,png}'],
    swDest: 'public/service-worker.js',
    runtimeCaching: [
        {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
        },
        {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
        },
    ],
};