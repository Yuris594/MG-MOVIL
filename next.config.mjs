/** @type {import('next').NextConfig} */
import nextPWA from 'next-pwa';

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: "export",
    trailingSlash: true,

};

const withPWA = nextPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
});

export default withPWA(nextConfig);






