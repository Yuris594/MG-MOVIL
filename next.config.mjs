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
            urlPattern: /\/_next\//,
            handler: 'CacheFirst',
            options: {
                cacheName: 'next-static-cahe',
                expiration: {
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                },
            }
        },
        {
            urlPattern: /^http:\/\/localhost-pages-client\//,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'api-cache',
                expiration: {
                    maxAgeSeconds: 60 * 60 * 24 * 30, 
                },
            },
        },
        {
            urlPattern: /\/.*/,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'general-cahe'
            }
        }
    ]
});

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: "export",

}

export default withPWA(nextConfig);
