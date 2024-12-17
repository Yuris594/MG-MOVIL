/** @type {import('next').NextConfig} */
import nextPWA from 'next-pwa';


const withPWA = nextPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    cacheOnFrontEndNav: true,
    runtimeCaching: [
        {
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
                cacheName: 'google-fonts',
                expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                },
            }
        },
        {
            urlPattern: /.*/,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'offline-cache',
                expiration: {
                    maxEntries: 200,
                    maxAgeSeconds: 60 * 60 * 24 * 30, 
                },
            },
        },
    ]
});


const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: "export",

};


export default withPWA(nextConfig);