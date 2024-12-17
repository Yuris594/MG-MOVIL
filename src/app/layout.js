
import "./globals.css";
//import { Montserrat, Roboto } from "next/font/google";
import AuthProvider from "@/context/authContext";


/*const inter = Roboto({ 
  subsets: ["latin"],
  weight: ['400', '700']
});*/

export const metadata = {
  title: 'MG-MOVIL',
  description: '.....',
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
