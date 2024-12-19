
import "./globals.css";
import { Roboto, Montserrat } from "next/font/google";
import AuthProvider from "@/context/authContext";
import RegisterServiceWorkers from "./components/registerServiceWorkers";


const inter = Roboto({ 
  subsets: ["latin"],
  weight: ['300', '500']
});

export const metadata = {
  title: 'MG-MOVIL',
  description: '.....',
  manifest: '/manifest.json'
}

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <RegisterServiceWorkers />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout;
