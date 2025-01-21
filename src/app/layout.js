
import "./globals.css";
import { Roboto } from "next/font/google";
import AuthProvider from "@/context/authContext";
import RegisterServiceWorkers from "./components/registerServiceWorker";

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
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body className={inter.className}>
        <RegisterServiceWorkers />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout;
