import nextPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV !== 'development',
    },
    output: "export",

    runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\//,
          handler: 'CacheFirst', 
          options: {
            cacheName: 'google-fonts',
            expiration: {
              maxEntries: 20, 
              maxAgeSeconds: 60 * 60 * 24 * 365, 
            },
          },
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60, 
            },
          },
        },
        {
          urlPattern: /^http:\/\/192.168.1.3:3000\.com\/.*$/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            networkTimeoutSeconds: 10,
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 5 * 60, 
            },
          },
        },
    ],
}

const withPWA = nextPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
});



export default withPWA(nextConfig);






