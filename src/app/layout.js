
import "./globals.css";
import { Lora } from "next/font/google";
import AuthProvider from "@/context/authContext";


const inter = Lora({ subsets: ["latin"] });

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
