/** @type {import('next').NextConfig} */
//import nextPWA from 'next-pwa';
//import { GenerateSW } from 'workbox-webpack-plugin';

//const production = process.env.NODE_ENV === 'production';

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: "export",
    trailingSlash: true,

    /*webpack(config, { isServer }) {
        if (!isServer) {
            config.plugins.push(
                new GenerateSW({
                    swDest: 'public/service-worker.js',
                    clientsClaim: true,
                    skipWaiting: true,
                    maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
                    runtimeCaching: [
                        {
                            urlPattern: /^http:\/\/192.168.1.3:3010\\/,
                            handler: 'NetworkFirst',
                            options: {
                                cacheName: 'api-cache',
                                expiration: {
                                    maxEntries: 50,
                                    maxAgeSeconds: 7 * 24 * 60 * 60,
                                },
                            },
                        },

                        {
                            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|css|js)$/,
                            handler: 'CacheFirst',
                            options: {
                                cacheName: 'static-assets',
                                expiration: {
                                    maxEntries: 100,
                                    maxAgeSeconds: 30 * 24 * 60 * 60,
                                },
                            },
                        },
                    ],
                })
            );
        }
        return config;
    },*/

};

/*const withPWA = nextPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
});
*/

export default nextConfig;






