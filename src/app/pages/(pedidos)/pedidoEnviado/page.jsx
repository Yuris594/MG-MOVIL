"use client";

import { Box, TextField, useMediaQuery  } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useCallback, useEffect, useState } from "react";
import NavBar from "@/app/components/navbar/nav";
import { useAuth } from "@/context/authContext";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Grid2";
import { Global } from "@/conexion";


const fDate = (dateString) => {
  const options = { 
    month: "short", 
    year: "numeric", 
    day: "numeric" 
  };
  return new Date(dateString).toLocaleDateString("es-ES", options);
};

const columns = [
  { field: "Fecha", headerName: "FECHA", width: 150, headerClassName: 'header-bold',
    renderCell: (params) => fDate(params.value) 
  },
  { field: "FKId_clientes", headerName: "NIT", width: 150, headerClassName: 'header-bold' },
  { field: "RazonSocial", headerName: "NOMBRE O RAZON SOCIAL", width: 500, headerClassName: 'header-bold' },
  { field: "NUMPED", headerName: "NUMERO PEDIDO", width: 180, headerClassName: 'header-bold' },
  { field: "ESTADO", headerName: "ESTADO", width: 150, headerClassName: 'header-bold' },
];


const PedidoEnviado = () => {
  const router = useRouter();
  const { auth, setClienteV } = useAuth();
  const [pedido, setPedido] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true); 
  const [tablaPedido, setTablaPedido] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");


  const conseguirDatos = async () => {
    const response = await fetch(Global.url + `/pedidos/PEDIDOS/${auth.IDSaler}`, {
      method: "GET",
      headers: { "Content-Type" : "application/json" }
    });
    const data = await response.json(); 
    return data;
  }


  const handleChange = (e) => {
    const terminoBusqueda = e.target.value;
    setBusqueda(terminoBusqueda);
    filtrar(terminoBusqueda);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datos = await conseguirDatos();
        if (Array && Array.isArray(datos)) {
          setPedido(datos);
          setTablaPedido(datos);
          setCargando(false);
        } else {
          console.error('La estructura de los datos no es la esperada.');
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);
  
  const filtrar = (terminoBusqueda) => {
    const resultadoBusqueda = tablaPedido.filter((elemento) => { 
      const valores = Object.values(elemento).map((value) => value?.toString().toLowerCase() || "");
      return valores.some((valor) => valor.includes(terminoBusqueda.toLowerCase()));
    });
    setPedido(resultadoBusqueda);
  };

  const handleSelection = useCallback((selectionModel) => {
    setSelectedRows(selectionModel);
    if (selectionModel.length > 0) {
      const resultadosFiltrados = tablaPedido.filter((elemento) => {
        const PKId = elemento.PKId;
        if (PKId) {
          const pedidoString = PKId.toString();
          return pedidoString.includes(selectionModel[0]);
        }
        return false;
      });
        localStorage.setItem("detallePedido", JSON.stringify(resultadosFiltrados));
        setClienteV(resultadosFiltrados);
        router.push("./pedidoEnviado/detallePedido");
    }
  }, [pedido]);



  return (
    <>
      <NavBar />
      {cargando === true ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress sx={{ color: "#000" }} />
        </Box>
      ) : (
      <Box>
        <Grid container direction="column" sx={{ minHeight: "100vh", backfroundColor: "#ffffff", padding: 2 }}>
          <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", alignItems: "center" }}>
            <Grid size={{ xs: 12, sm: 6 }} sx={{ padding: 2 }}>
              <h2><strong>PEDIDOS ENVIADOS</strong></h2>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", alignItems: "center", marginLeft: isSmallScreen ? 0 : "auto", padding: 2  }}>
                <TextField
                  type="text"
                  id="outlined-basic" 
                  variant="outlined"
                  value={busqueda}
                  onChange={handleChange}
                  placeholder="Buscar..."
                  sx={{ width: "100%" }}
                />
              </Box>
            </Grid>
            </Box>

          <Grid size={12} sx={{ flexGrow: 1, marginBottom: 2 }}>
            <Box sx={{ width: "100%", heigth: isSmallScreen ? 500 : 650 }}> 
              <DataGrid
                rows={pedido}
                columns={columns}
                getRowId={(row) => row.PKId}
                initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                pageSizeOptions={[10, 20]}
                onRowSelectionModelChange={handleSelection}
                rowSelectionModel={selectedRows}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      )}
    </>
  );
}

export default PedidoEnviado;


