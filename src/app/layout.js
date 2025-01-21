
import "./globals.css";
import { Roboto } from "next/font/google";
import AuthProvider from "@/context/authContext";

const inter = Roboto({ 
  subsets: ["latin"],
  weight: ['300', '500']
});

export const metadata = {
  title: 'MG-MOVIL',
  description: '..',
  manifest: '/manifest.json'
}

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(reg => console.log('Service Worker registrado:', reg))
      .catch(err => console.error('Error al registrar el Service Worker:', err));
  });
}

function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout;
