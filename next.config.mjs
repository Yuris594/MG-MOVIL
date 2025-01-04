import nextPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    /*compiler: {
        removeConsole: process.env.NODE_ENV !== 'development',
    },*/
    //output: "export",

}

const withPWA = nextPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
});


export default withPWA(nextConfig);






