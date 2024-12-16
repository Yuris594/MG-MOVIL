"use client";

import { Autocomplete, Box, Divider, IconButton, TextField, useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import NavBar from "@/app/components/navbar/nav";
import { useAuth } from "@/context/authContext";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Grid2";
import { Global } from "@/conexion";
import Swal from "sweetalert2";


const option = async () => {
  const response = await fetch(Global.url + "/banks/list", {
    method: "GET",
    headers: { "Content-Type" : "application/json" }
  });
  const data = await response.json();
  return data;
}


const columns = [
  { field: "CONSECUTIVO", headerName: "RECIBO", width: 100, headerClassName: 'header-bold' },
  { field: "NIT", headerName: "NIT", width: 150, headerClassName: 'header-bold' },
  { field: "RazonSocial", headerName: "RAZÓN SOCIAL", width: 400, headerClassName: 'header-bold' },
  { field: "FECHA", headerName: "FECHA RECIBO", width: 200, headerClassName: 'header-bold' },
  { field: "TOTAL", headerName: "TOTAL RECIBO", width: 150, headerClassName: 'header-bold' },
];


const ElaborarConsignacion = () => {
  const { auth } = useAuth();
  const router = useRouter();
  const [bancos, setBancos] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [boton, setBoton] = useState(false);
  const [comentarios, setComentarios] = useState("");
  const [selectedBankId, setSelectedBankId] = useState(null);
  const [totalConsignacion, setTotalConsignacion] = useState(0);
  const [numeroConsignacion, setNumeroConsignacion] = useState("");
  const [selectedReceipts, setSelectedReceipts] = useState([]);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  
  useEffect(() => {
    const opciones = async () => {
      const datos = await option();
        try {
          if(datos) {
            setBancos(datos)
          }
        } catch (error) {
          console.log("Error al obtener los datos del banco", error);
        }
    };
    opciones();
  }, []);


  useEffect(() => {
    const reciboPendiente = async () => {
      try {
        const response = await fetch(Global.url + `/receipts/consult/Consignment?ProfileName=Vendedor&ID=${auth.ID }&data=Pendiente`, {
          method: "GET",
          headers: { "Content-Type" : "application/json" }
        });

        if(!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        const datos = await response.json();
        setPedido(datos);
      } catch (error) {
        console.log("Error al obtener los datos de Pedidos Pendientes", error)
      }
    }
    reciboPendiente();
  }, []);


  const handleRowSelection = useCallback((valores) => {
    setSelectedReceipts(valores)
    const total = valores.reduce((acc, id) => {
      const selectedRow = pedido.find((row) => row.CONSECUTIVO === id);
      if (selectedRow && selectedRow.TOTAL) {
        let valor = selectedRow.TOTAL.toString().replace(/[$,]/g, "");
        valor = parseFloat(valor) || 0;
        return acc + valor; 
      }
      return acc;
    }, 0);

    const totalFormateado = `${Number(total.toFixed(2)).toLocaleString()}`;
    setTotalConsignacion(totalFormateado);
    setBoton(total > 0);
  }, [pedido]);

 
  const crearConsignacion = async () => {

    const detalle = {
      BankId:  selectedBankId,
      UserId: auth.IDSaler,
      ConsignmentNumber: numeroConsignacion,
      Total: totalConsignacion,
      Comments: comentarios,
      Receipts: selectedReceipts,
    };

    try {
      const response = await fetch(Global.url + '/consignments/add', {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(detalle),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error del Servidor", errorData);

        Swal.fire({
          icon: "error",
          title: "Error al crear la consignación",
          text: errorData.error || "Error Desconocido.",
        });
        return;
      }

      const data = await response.json();
      console.log("Respuesta exitosa", data);

      Swal.fire({
        icon: "success",
        title: "Consignación creada con éxito",
        text: data.text,
      });

      router.push("./consignacion");
    } catch (error) {
      console.error("Error de conexión", error);
      Swal.fire({
        icon: "error",
        title: "Error de Red",
        text: "No se pudo conectar al servidor. Intente nuevamente más tarde."
      });
    }
  };
  

  return (
    <>
      <NavBar /> 
      <Box sx={{ padding: 2 }}>
        <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", justifyContent: "space-between", alignItems: "center" }}>
          <h2><strong>ELABORAR CONSIGNACIÓN</strong></h2>
          <IconButton onClick={crearConsignacion} title="Generar Consignación" disabled={!boton}>
            <LocalAtmIcon sx={{ fontSize: 60 }} color="primary" />
          </IconButton>
        </Box>

        <Divider />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}> 
          <Grid container spacing={2} sx={{ flexDirection: isSmallScreen ? "column" : "row" }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <strong>Banco: </strong>
              <Autocomplete 
                id="bank-selector"
                fullWidth
                size="small"  
                disablePortal
                options={bancos}
                getOptionLabel={(option) => option.BankName || ""}
                aria-required
                onChange={(event, newValue) => {setSelectedBankId(newValue ? newValue.ID : null)}}
                renderInput={(params) => <TextField {...params} label="Seleccione el Banco" />}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <strong>Numero de Consignación: </strong>
              <TextField 
                value={numeroConsignacion}
                onChange={(e) => setNumeroConsignacion(e.target.value)}
                size="small"  
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>         
         
          <strong>Comentarios: </strong>
          <TextField 
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
            id="outlined-basic"
            multiline
            size="small"  
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box sx={{ height: 295, width: "100%", mt: 4 }}>
          <DataGrid 
            rows={pedido}
            columns={columns}
            getRowId={(row) => row.CONSECUTIVO}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            density="compact"
            onRowSelectionModelChange={(selectionModel) => handleRowSelection(selectionModel)}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5
                }
              }
            }}
            />
        </Box>
        
        <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", alignItems: "center", gap: 2, mt: 4 }}>
          <strong>Total Consignación: </strong>
          <TextField
            value={totalConsignacion}
            variant="outlined"  
            size="small"  
            fullWidth={isSmallScreen}
            sx={{ width: isSmallScreen ? "100%" : 250 }}  
          />
        </Box>
      </Box>
    </> 
  )
}

export default ElaborarConsignacion;


