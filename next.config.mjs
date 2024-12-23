import nextPWA from 'next-pwa';

const withPWA = nextPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
});


/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        appDir: true,
    },
    compiler: {
        removeConsole: process.env.NODE_ENV !== 'development',
    },
    //output: "export",

}

export default withPWA(nextConfig);














/*


/** @type {import('next').NextConfig} 
const nextConfig = {
    
    //output: "export",

}

export default withPWA(nextConfig);

*/