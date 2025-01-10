"use client";

import { Box, Button, Divider, useMediaQuery } from "@mui/material";
import NavBar from "@/app/components/navbar/nav";
import { useAuth } from "@/context/authContext";
import FacturaV from "@/app/hooks/useFacturaV";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid2";
import { Global } from "@/conexion";
import Swal from "sweetalert2";


const columns = [
  { field: "FKcodigo_articles", headerName: "CODIGO", width: 150, headerClassName: 'header-bold'},
  { field: "Nombre", headerName: "REFERENCIA", width: 400, headerClassName: 'header-bold' },
  { field: "Cantidad", headerName: "CANTIDAD", width: 100, headerClassName: 'header-bold' },
  { field: "Precio", headerName: "PRECIO", width: 150,  
    valueFormatter: (value) => {
      const precio = parseFloat(value).toFixed(0);
      return `${parseFloat(precio).toLocaleString()}`;
    }, headerClassName: 'header-bold'
  },
  { field: "Descuento", headerName: "DESCUENTO", width: 150,
    valueFormatter: (value) => {
      const descuento = parseFloat(value).toLocaleString();
      return `${parseFloat(descuento).toFixed(1)}`;
    }, headerClassName: 'header-bold' 
  },
  { field: "Iva", headerName: "IVA", width: 150,
    valueFormatter: (value) => {
      const iva = parseFloat(value).toLocaleString();
      return `${parseFloat(iva).toFixed(1)}`;
    }, headerClassName: 'header-bold' 
  },
  { field: "Total", headerName: "TOTAL", width: 150, cellClassName: 'total-cell', 
    valueFormatter: (value) => {
      const precio = parseFloat(value).toFixed(0);
      return `${parseFloat(precio).toLocaleString()}`;
    }, headerClassName: 'header-bold'
  },
];

const obtenerDatos = async(clienteD) => {
    const response = await fetch(Global.url + `/pedidos/Pedidos_Enviados/${clienteD.NUMPED}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
      if (response.status === 400) {
        console.log("No hay articulos para este cliente");
        return [];
      }
    }
    return response.json();
};


const DetallePedido = () => {
  const router = useRouter();
  const { auth } = useAuth();
  const [total, setTotal] = useState("");
  const [fecha, setFecha] = useState("");
  const [subTotal, setSubTotal] = useState("");
  const [impuesto, setImpuesto] = useState("");
  const [descuento, setDescuento] = useState("");
  const [articulos, setArticulos] = useState([]);
  const [clienteD, setClienteD] = useState(null);
  const { generarPDF } = FacturaV(clienteD, auth, articulos, total, subTotal, impuesto, descuento);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
 
  useEffect(() => {
    if (clienteD) {
      adquirirProductos(clienteD.NUMPED)
    }
  }, [clienteD]);

  useEffect(() => {
    const datosPedido = localStorage.getItem("detallePedido");
    if (datosPedido) {
      setClienteD(JSON.parse(datosPedido)[0]); 
    }
  }, []);

  useEffect(() => {
    if (clienteD?.Fecha) {
      const obtenerFechaActual = () => {
        const fechaPedido = new Date(clienteD.Fecha); 
        const dias = fechaPedido.getDate();
        const mes = fechaPedido.toLocaleString("es-CO", { month: "short" });
        const mesCapitalizado = mes.charAt(0).toUpperCase() + mes.slice(1);
        const anio = fechaPedido.getFullYear();
        
        const fechaFormateada = `${mesCapitalizado} ${dias}, ${anio}`;
        setFecha(fechaFormateada);
      };
      obtenerFechaActual();
    }
  }, [clienteD]);

  const adquirirProductos = async () => {
    try {
      const datos = await obtenerDatos(clienteD);
      if (datos) {
        setArticulos(datos);
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (articulos.length > 0) {

      let total = 0;
      let subTotal = 0;
      let totalDescuento = 0;
      let totalImpuesto = 0;
    
      articulos.forEach((art) => {
        const cantidad = parseFloat(art.Cantidad) || 0;
        const precio = parseFloat(art.Precio) || 0;
        const descuento = (parseFloat(art.Descuento) || 0) / 100;
        const iva = (parseFloat(art.Iva) || 0) / 100;

        const totalArt = cantidad * precio;
        const Descuento = totalArt * descuento;
        const Iva = (totalArt - Descuento) * iva;

        totalDescuento += precio * cantidad * descuento;
        totalImpuesto += precio * cantidad * iva;
        total += totalArt - Descuento + Iva;
        subTotal += totalArt - Descuento;
      });

      setDescuento(Number(totalDescuento.toFixed(0)).toLocaleString());
      setImpuesto(Number(totalImpuesto.toFixed(0)).toLocaleString());
      setSubTotal(Number(subTotal.toFixed(0)).toLocaleString()); 
      setTotal(Number(total.toFixed(0)).toLocaleString());     
    }
  }, [articulos]);


  const cerrar = () => {
    localStorage.removeItem("detallePedido");
    router.push("/pages/pedidoEnviado/");
  };

  const enviarPdf = async () => {
    try {
      const response = await fetch(Global.url + '/pedidoPdf/enviar-pdf', {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ 
          FKNUMPED: clienteD?.NUMPED,
          total,
          subTotal,
          descuento,
          impuesto,
          auth: auth.UserFullName,
        }),
      });
      
      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Pedido enviado Correctamente.",
          text: data.message,
        })
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al enviar el correo.",
          text: data.message
        })
      }
    } catch (error) {
      console.error("Error:", error)
      Swal.fire({
        icon: "error",
        title: "Error al Enviar el Correo.",
        text: "Revisar el Email del Cliente, No fue posible enviar el Correo."
      })
    }
  };

  return (
    <>
      <NavBar />
      <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", justifyContent: "space-between", alignItems: "center", width: "auto", margin: 2 }}>
        <Grid container rowSpacing={2} columnSpacing={70}>
          <Grid size={{ xs: 12, sm: 8, md: 12 }}>
            <strong>MIGUEL GÓMEZ Y COMPAÑÍA S.A.S</strong>
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 12 }}>
            <strong>Nombre Vendedor: </strong>{auth?.UserFullName}
          </Grid>
        </Grid>
        <Box sx={{ margin: 2 }}>
          <Button onClick={enviarPdf} color="secondary">Enviar PDF al Cliente</Button>
          <Button onClick={generarPDF} color="success">Generar PDF</Button>
          <Button onClick={cerrar} color="error">Cerrar</Button>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", margin: 2 }}>
        <Grid container rowSpacing={2} columnSpacing={14}>
          <Grid size={{ xs: 12, sm: 8, md: 4 }}>
            <strong>No. Pedido: </strong>{clienteD?.NUMPED || ""}
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 4 }}>
            <strong>Fecha Pedido: </strong>{fecha || ""}
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 4 }}>
            <strong>Nit: </strong>{clienteD?.FKId_clientes || ""}
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 8 }}>
            <strong>R. Social: </strong>{clienteD?.RazonSocial || ""}
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 4 }}>
            <strong>Fecha Factura: </strong>{clienteD?.Fecha_Factura || ""}
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 4 }}>
            <strong>SubTotal: </strong><span style={{ color: "red" }}>{subTotal}</span>
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 4 }}>
            <strong>Total: </strong><span style={{ color: "red" }}>{total}</span>
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 4 }}>
            <strong>Documento1: </strong>{clienteD?.Documento1 || ""}
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 6 }}>
            <strong>Notas: </strong>{clienteD?.Notas || ""}
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ height: "auto", width: 'auto', margin: 2 }}>
        <DataGrid 
          rows={articulos}
          columns={columns}
          getRowId={(row) => row.FKcodigo_articles}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 }
            }
          }}
          pageSizeOptions={[10]}
          sx={{ color: "#000", bgcolor: "#fff" }}
        />
      </Box>
    </>
  );
};

export default DetallePedido;

