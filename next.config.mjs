/** @type {import('next').NextConfig} */
import nextPWA from 'next-pwa';


const withPWA = nextPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
});


const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    //output: "export",

};


export default withPWA(nextConfig);