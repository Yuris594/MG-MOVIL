
import "./globals.css";
import { Montserrat } from "next/font/google";
import AuthProvider from "@/context/authContext";


const inter = Montserrat({ 
  subsets: ["latin"],
  weight: ['400', '700']
});

export const metadata = {
  title: 'MG-MOVIL',
  description: '.....',
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
