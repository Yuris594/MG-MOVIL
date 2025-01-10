"use client";

import { AppBar, Box, Button, CssBaseline, IconButton, Menu, Toolbar, Typography } from "@mui/material";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { clearDatabase, initDB } from "@/app/components/base/db";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReceiptIcon from '@mui/icons-material/Receipt';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Global } from "@/conexion";
import Swal from "sweetalert2";
import Link from "next/link";
import MenuBar from "./bar";



const pages = [
  {
    title: "VENTAS",
    subPages: [
      { title: "Clientes", url: "/pages/client/", icon: <PersonIcon /> },
      { title: "Pedidos Por Enviar", url: "/pages/pedidoSinEnviar/", icon: <LocalShippingIcon /> },
      { title: "Pedidos Enviados", url: "/pages/pedidoEnviado/", icon: <LocalShippingIcon /> },
      { title: "Cotizaciones", url: "/pages/cotizacion/", icon: <AttachMoneyIcon /> },
    ],
  },
  {
    title: "CARTERA",
    subPages: [
      { title: "Cartera Clientes", url: "/pages/cartera/", icon: <AccountBalanceIcon /> },
      { title: "Recibos", url: "/pages/cartera/recibo/", icon: <ReceiptIcon /> },
      { title: "Consultar Consignaciones", url: "/pages/cartera/consignacion/", icon: <AccountBalanceIcon /> },
      { title: "Elaborar Consignaciones", url: "/pages/cartera/elaborarCo/", icon: <ArticleIcon /> },
    ],
  },
  {
    title: "INFORMES",
    subPages: [
      { title: "Ruteros Enviados", url: "/pages/gestionCartera/", icon: <DirectionsRunIcon /> },
      { title: "Historico de Ventas", url: "/pages/historicoVenta/", icon: <ReceiptIcon /> },
      { title: "Resumen Ventas Actual", url: "/pages/resumenVenta/", icon: <ReceiptLongIcon /> },
    ],
  },
  {
    title: "INVENTARIOS",
    subPages: [
      { title: "Consultar Articulos", url: "/pages/inventario/", icon: <InventoryIcon /> },
    ],
  },
];


const NavBar = () => {
  const [selectedPage, setSelectedPage] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [internet, setInternet] = useState(false);
  const { auth, logout } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    const verificarConexion = async () => {
      try {
        const response = await fetch(Global.url + '/users/verificar', {
          method: "GET",
          headers: { "Content-Type" : "application/json" },
        });
  
        if (response.ok) {
          const data = await response.json()

          if (data.conectado === true) {
            setInternet(true);
            console.log("Conexión autorizada:", true);
          } else {
            setInternet(false);
            console.log("Conexión no autorizada:", false);
            Swal.fire({
              title: "Sin conexion",
              text: "No se ha podido establecer una conexión, revisar el Internet.",
              icon: "error"
            });
          }
        } else {
          throw new Error ("Error en la respuesta del servidor");
        }
      } catch (error) {
        setInternet(false);
        console.log("Conexion sin autorizada:", false);
      }
    };
    verificarConexion();
  }, []);

  const handlePageClick = (page) => {
    setSelectedPage(page);
    setAnchorEl(null); 
  };


  const handleBackClick = () => {
    setSelectedPage(null); 
  };

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget); 
  };

  const handleClose = () => {
    setAnchorEl(null); 
  };

  const handleRefresh = async () => { 
    router.push("/pages");

    if (!internet) {
      Swal.fire({
        title: "Sin Conexión.",
        text: "Revisar la conexión con la empresa o no tiene internet.",
        icon: "error",
      });
      return;
    }

    Swal.fire({
      title: "¿Deseas Actualizar?",
      text: "Se actualizará la base de datos local!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Actualizando, este proceso tardara poco tiempo, espere por favor.",
          icon: "warning",
          allowOutsideClick: false,
          didOpen: async () => {
            Swal.showLoading();
  
            try {
              const db = await initDB();
              await clearDatabase();
  
              const actualizarAlmacen = async (storeName, data, keyPath) => {
                if (!Array.isArray(data)) {
                  console.error(`Error: Los datos para ${storeName} no son un array`, data);
                  return;
                }
  
                for (const item of data) {
                  try {
                    await db.put(storeName, item);
                  } catch (error) {
                    console.error(`Error al insertar ${item[keyPath]}:`, error);
                  }
                }
              };
  
              const [articlesResponse, carteraResponse, customersResponse] = await Promise.all([
                fetch(`${Global.url}/articles/articles/inventario`),
                fetch(`${Global.url}/carterasellers/${auth.IDSaler}`),
                fetch(`${Global.url}/customers/customers`),
              ]);
  
              const [articlesData, carteraData, customersData] = await Promise.all([
                articlesResponse.json(),
                carteraResponse.json(),
                customersResponse.json(),
              ]);
  
              const articles = Array.isArray(articlesData) ? articlesData : articlesData.data || [];
              const cartera = Array.isArray(carteraData) ? carteraData : carteraData.cxc || [];
              const filteredCustomers = Array.isArray(customersData)
                ? customersData.filter((item) => item.IDVendedor === auth.IDSaler)
                : [];
  
              await actualizarAlmacen("articles", articles, "id");
              await actualizarAlmacen("cartera", cartera, "id");
              await actualizarAlmacen("customers", filteredCustomers, "id");
  
              console.log("Datos actualizados en IndexedDB");
  
              Swal.close(); 
              Swal.fire({
                title: "Actualización Exitosa!",
                icon: "success",
              }).then(() => {
                router.push("/pages");
              });
            } catch (error) {
              console.error("Error al actualizar los datos:", error);
              Swal.fire({
                title: "Error al actualizar los datos",
                text: "Inténtalo de nuevo más tarde.",
                icon: "error",
              });
            }
          },
        });
      }
    });
  };
  

  const cerrarSesion = () => {
    Swal.fire({
      title: "¿Cerrara Sesión?",
      text: "Desea salir de la aplicación, Recuerde que para ingresar nuevamente debe tener conexión con la empresa e internet.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar"
    }).then((result) => {
      if(result.isConfirmed) {
        clearDatabase();
        logout();
        router.push("/");
      }
    })
  };
    
  return (
    <>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "#262626" }}>
          <Toolbar>
            <IconButton color="inherit" onClick={handleOpen} sx={{ display: { xs: "flex", md: "none" } }}>
              <WidgetsIcon />
            </IconButton>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: { xs: "none", md: "flex" }, width: "100%" }}>
                {selectedPage ? (
                  <>
                    <IconButton color="inherit" onClick={handleBackClick}>
                      <ExitToAppIcon />
                    </IconButton>
                    {selectedPage.subPages.map((subPage) => (
                      <Button
                        color="inherit"
                        key={subPage.title}
                        LinkComponent={Link}
                        href={subPage.url}
                      >
                        {subPage.title}
                      </Button>
                    ))}
                  </>
                ) : (
                  pages.map((page) => (
                    <Button
                      color="inherit"
                      key={page.title}
                      onClick={() => handlePageClick(page)}>
                      {page.title}
                    </Button>
                  ))
                )}
              </Box>
              <Button onClick={handleRefresh} color="inherit">Actualizar</Button>
            </Box>
            <Typography variant="h6" sx={{ flexGrow: 1 }}></Typography>
              <Button LinkComponent={Link} href="/pages/" color="inherit">
                <ArrowBackIcon />
              </Button>
              <Button color="inherit" sx={{ width: "15%" }}>{auth && auth.UserFullName}</Button>
              <Button onClick={cerrarSesion} color="inherit">Salir</Button>
          </Toolbar>
        </AppBar>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuBar pages={pages} onClose={handleClose} />
        </Menu>
      </Box>
    </>
  );
};

export default NavBar;

