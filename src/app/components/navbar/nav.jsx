"use client";

import { AppBar, Box, Button, CssBaseline, IconButton, Menu, Toolbar, Typography } from "@mui/material";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReceiptIcon from '@mui/icons-material/Receipt';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import { initDB } from "@/app/components/base/db";
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
      { title: "Clientes", url: "/pages/client", icon: <PersonIcon /> },
      { title: "Pedidos Por Enviar", url: "/pages/pedidoSinEnviar", icon: <LocalShippingIcon /> },
      { title: "Pedidos Enviados", url: "/pages/pedidoEnviado", icon: <LocalShippingIcon /> },
      { title: "Cotizaciónes", url: "/pages/cotizacion", icon: <AttachMoneyIcon /> },
    ],
  },
  {
    title: "CARTERA",
    subPages: [
      { title: "Cartera Clientes", url: "/pages/cartera", icon: <AccountBalanceIcon /> },
      { title: "Recibos", url: "/pages/cartera/recibo", icon: <ReceiptIcon /> },
      { title: "Consultar Consignaciones", url: "/pages/cartera/consignacion", icon: <AccountBalanceIcon /> },
      { title: "Elaborar Consignaciones", url: "/pages/cartera/elaborarCo", icon: <ArticleIcon /> },
    ],
  },
  {
    title: "INFORMES",
    subPages: [
      { title: "Ruteros Enviados", url: "/pages/gestionCartera", icon: <DirectionsRunIcon /> },
      { title: "Historico de Ventas", url: "/pages/historicoVenta", icon: <ReceiptIcon /> },
      { title: "Resumen Ventas Actual", url: "/pages/resumenVenta", icon: <ReceiptLongIcon /> },
    ],
  },
  {
    title: "INVENTARIOS",
    subPages: [
      { title: "Consultar Articulos", url: "/pages/inventario", icon: <InventoryIcon /> },
    ],
  },
];


const NavBar = () => {
  const [selectedPage, setSelectedPage] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { auth, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const verificar = async () => {
      try {
        const response = await fetch(Global.url + '/users/verificar', {
          method: "GET",
          headers: { "Content-Type" : "application/json" },
        });

        const data = await response.json();
        console.log("Existe Conexion: ", true);
      } catch (error) {
        console.log("No Existe Conexion: ", false);
      }
    }
    verificar();
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

  const handleRefresh = () => {
    router.push("/pages")
    
    setTimeout(() => {
      Swal.fire({
        title: "¿Deseas Actualizar?",
        text: "Se actualizara la base de datos local!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar"
      }).then((result) => {
        if(result.isConfirmed) {
          const actualizarBase = async () => {
            try {
              const db = await initDB();
          
              const actualizarAlmacen = async (storeName, data, keyPath) => {
                if (!Array.isArray(data)) {
                  console.error(`Error: Los datos para ${storeName} no son un array`, data);
                  return;
                }

                const localData = await db.getAll(storeName);

                const remoteKeys = new Set(data.map((item) => item[keyPath]));
          
                for (const item of data) {
                  const localItem = localData.find((local) => local[keyPath] === item[keyPath]);
                  if (!localItem || JSON.stringify(localItem) !== JSON.stringify(item)) {
                      try {
                        await db.put(storeName, item);
                      } catch (error) {
                        console.error(`Error al insertar ${item[keyPath]}:`, error);
                      }
                    }
                  }
          
                for (const localItem of localData) {
                  if (!remoteKeys.has(localItem[keyPath])) {
                    try {
                      await db.delete(storeName, localItem[keyPath]);
                    } catch (error) {
                      console.error(`Error al eliminar ${localItem[keyPath]}:`, error);
                    }
                  }
                }
              }
          
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
              const filteredCustomers = Array.isArray(customersData) ? customersData.filter((item) => item.IDVendedor === auth.IDSaler) : [];
          
              await actualizarAlmacen("articles", articles, "PKcodigo");
              await actualizarAlmacen("cartera", cartera, "Documento");
              await actualizarAlmacen("customers", filteredCustomers, "ID");
  
              console.log("Datos actualizados en IndexedDB");
            } catch (error) {
              console.log("Error al actualizar IndexedDB", error);
            }
          };
          
          actualizarBase();

          Swal.fire({
            text: "Actualizando, este proceso tardara poco tiempo, espere por favor.",
            icon: "warning",
            timer: 10000,
            didOpen: () => {
              Swal.showLoading();
            },
          }).then(() => {
            Swal.fire({
              title: "Actualización Exitosa!!",
              icon: "success",
            }).then(() => {
              router.push("/pages");
            });
          });
        }
      });
    }, 500);
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
            <Button onClick={handleRefresh} color="inherit">Actualizar</Button>
            </Box>
            <Typography variant="h6" sx={{ flexGrow: 1 }}></Typography>
              <Button LinkComponent={Link} href="/pages" color="inherit">
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