"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { serialize, parse } from "cookie";


const AuthContext = createContext({
    login: (authTokens) => {},
    logout: () => {},
});

const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [auth, setAuth] = useState(null);
    const [clienteV, setClienteV] = useState({});
    const [pedidosV, setPedidosV] = useState({});
    const [carteraV, setCarteraV] = useState({});
 
    const login = useCallback(function (authTokens) {
      const maxAge = 7 * 24 * 60 * 60 ;
      const cookieOptions = {
        maxAge, 
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "produccion",
        sameSite: "Strict",
      }

      document.cookie = serialize("auth", JSON.stringify(authTokens.signedUser), cookieOptions);

      localStorage.setItem("auth", JSON.stringify(authTokens.signedUser));
      localStorage.setItem("Tokens", JSON.stringify(authTokens.token)); 
      setAuth(authTokens.signedUser);
    }, []);

    const logout = useCallback(function (authTokens) {
      document.cookie = serialize("auth", "", { maxAge: -1, path: "/" });

      localStorage.removeItem("auth");
      localStorage.removeItem("Tokens");
    }, []);

    useEffect(() => {
      const storeAuth = localStorage.getItem("auth");
      const storeCliente = localStorage.getItem("clienteV");
      const storePedidos = localStorage.getItem("pedidoV");
      const storeCartera = localStorage.getItem("cartera");

      if (storeAuth) {
        setAuth(JSON.parse(storeAuth));
      }

      if (storeCliente) {
        setClienteV(JSON.parse(storeCliente));
      }

      if (storePedidos) {
        setPedidosV(JSON.parse(storePedidos));
      }

      if (storeCartera) {
        setCarteraV(JSON.parse(storeCartera));
      }

    }, []);

    useEffect(() => {
      const cookies = parse(document.cookie || "");
      if (cookies.auth) {
        setAuth(JSON.parse(cookies.auth));
      }
    }, []);

    const value = useMemo(() => ({
      auth,
      login, 
      logout,
      clienteV,
      setClienteV, 
      pedidosV,
      setPedidosV, 
      carteraV,
      setCarteraV, 
    }), [auth, clienteV, pedidosV, carteraV, login, logout]);

    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
};

export default AuthProvider;


export const useAuth = () => useContext(AuthContext);

