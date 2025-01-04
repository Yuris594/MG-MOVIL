
import "./globals.css";
import { Roboto } from "next/font/google";
import AuthProvider from "@/context/authContext";
import RegisterServiceWorkers from "./components/registerService";
import AlertInternet from "./components/internet";

const inter = Roboto({ 
  subsets: ["latin"],
  weight: ['300', '500']
});

export const metadata = {
  title: 'MG-MOVIL',
  description: '..',
  manifest: '/manifest.json'
}

function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <RegisterServiceWorkers />
        <AlertInternet />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout;
