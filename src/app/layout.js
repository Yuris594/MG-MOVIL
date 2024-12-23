
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

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout;
