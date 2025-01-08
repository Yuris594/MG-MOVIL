"use client";

import { Box, Button, Checkbox, Divider, FormControlLabel, IconButton, Modal, TextField, useMediaQuery } from "@mui/material";
import CheckCircleIcon  from "@mui/icons-material/CheckCircle";
import { useEffect, useState, useCallback } from "react";
import CancelIcon  from "@mui/icons-material/Cancel";
import NavBar from "@/app/components/navbar/nav";
import { useAuth } from "@/context/authContext";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Grid2";
import { Global } from "@/conexion";
import Swal from "sweetalert2";
import Link from "next/link";


const adquirirDatos = async (recibo) => {
  const response = await fetch(Global.url + `/gestioncartera/cartera/${recibo.nit}`, {
    method: "GET",
    headers: { "Content-Type" : "application/json" }
  });
  const data = await response.json();
  return data;
};


const RealizarRecibo = () => {
  const router = useRouter();
  const { auth, clienteV } = useAuth();
  const [total, setTotal] = useState("");
  const [recibo, setRecibo] = useState([]);
  const [abonar, setAbonar] = useState({});
  const [openC, setOpenC] = useState(false);
  const [boton, setBoton] = useState(false);
  const [recibos, setRecibos] = useState("");
  const [seleccion, setSeleccion] = useState([]);
  const [comentarios, setComentarios] = useState("");
  const [metodosPago, setMetodosPago] = useState({
    Efectivo: false,
    Cheque: false,
    Consignación: false,
  });
  const [campos, setCampos] = useState([{
    banco: "",
    fecha: "",
    valor: "",
    numero: ""
  }]);
  
  const isSmallScreen = useMediaQuery("(max-width: 600px)")

  const handleOpenC = () => {
    setOpenC(true);
  };

  const handleCloseC = () => {
    setOpenC(false);
  };

  const handleAñadir = () => {
    setCampos([
      ...campos,
      { banco: "", fecha: "", valor: "", numero: "" }
    ]);
  };

  const handleEliminar = (index) => {
    const newCampos = [...campos];
    newCampos.splice(index, 1);
    setCampos(newCampos);
  };

  const handleChange = (index, field, value) => {
    const newCampos = [...campos];
    newCampos[index][field] = value;
    setCampos(newCampos);
  };

  const handleGuardar = () => {
    const camposCompletos = campos.every((campo) => 
      campo.banco && campo.fecha && campo.valor && campo.numero
    );

    if(!camposCompletos) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor completa todos los campos antes de guardar.",
      });
      return;
    }

    console.log("Datos guardados: ", campos);

    Swal.fire({
      icon: "success",
      title: "Guardado",
      text: "Los datos se han guardado correctamente."
    });

    setCampos([...campos]);

    handleCloseC();
  };


  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setMetodosPago((prev) => ({ ...prev, [name.toLowerCase()]: checked }));

    if(name === "Cheque" && checked) {
      handleOpenC();
    } else {
      handleCloseC();
    }

    verificar(checked);
  };

  const algunMetodoSeleccionado = Object.values(metodosPago).some((val) => val);

  const verificar = useCallback(() => {
    const totalValido = total && total.trim() !== "";
    const chequeSeleccionado = algunMetodoSeleccionado;
    setBoton(totalValido || chequeSeleccionado)
  }, [total, algunMetodoSeleccionado]);


  useEffect(() => {
    const obtenerDatos = async () => {
      if (clienteV && clienteV.NIT) {
        const data = await adquirirDatos({ nit: clienteV.NIT });
        const datos = data.data;
        if (datos && datos.length > 0) {
          setRecibo(datos);
          console.log("Datos obtenidos correctamente");
        }
      } else {
        console.log("Error al obtener los datos");
      }
    };
    obtenerDatos(); 
  }, [clienteV]);


  const fDate = (dateString) => {
    const options = {
      year: "numeric",
      day: "numeric",
      month: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };


  const handleAbonar = (Documento, value) => {
    const numericValue = parseFloat(value) || 0;
  
    if (numericValue < 0) {
      Swal.fire({
        icon: "error",
        title: "Valor Inválido",
        text: "El valor no puede ser negativo.",
      });
      return;
    }
  
    const newRecibo = recibo.map((item) => {
      if (item.Documento === Documento) {
        let saldoLimpio = parseFloat(item.Saldo.replace(/[$,]/g, "")) || 0;
        if (saldoLimpio <= 0) {
          Swal.fire({
            icon: "error",
            title: "Error, Llamar a Cartera!",
            text: "Esta factura está pendiente por Asentar.",
          });
          return item;
        } else {
          return { ...item, valorAPagar: numericValue || 0 };
        }
      }
      return item;
    });
  
    setRecibo(newRecibo);
  
    setAbonar((prevAbonar) => ({
      ...prevAbonar,
      [Documento]: numericValue || 0,
    }));
  
    calcularTotal(newRecibo);
  
    setSeleccion((prevSeleccion) => {
      if (Array.isArray(prevSeleccion)) {
        return [...prevSeleccion, { NumeroDocumento: Documento, ValorCancelado: numericValue }];
      } else {
        return [{ NumeroDocumento: Documento, ValorCancelado: numericValue }];
      }
    });
  };
  
  const handleCheckboxChange = (event, row) => {
    const isChecked = event.target.checked;
    const updatedRecibo = recibo.map((item) =>
      item.Documento === row.Documento
        ? {
            ...item,
            selected: isChecked,
            valorAPagar: isChecked ? item.Saldo : 0,
            inputDisabled: isChecked,
          }
        : item
    );
 
    setRecibo(updatedRecibo);
    calcularTotal(updatedRecibo);
  
    setSeleccion((prevSeleccion) => {
      if (!Array.isArray(prevSeleccion)) {
        prevSeleccion = [];
      }
      if (isChecked) {
        return [...prevSeleccion, { NumeroDocumento: row.Documento, ValorCancelado: row.Saldo }];
      } else {
        return prevSeleccion.filter((doc) => doc.Documento !== row.Documento);
      }
    });
  };
  
  
  const columns = [
    { field: 'Documento', headerName: 'DOCUMENTO', width: 150, headerClassName: 'header-bold' },
    { field: 'TipoDocumento', headerName: 'TIPO', width: 150, headerClassName: 'header-bold' },
    { field: 'Monto', headerName: 'MONTO', width: 150, headerClassName: 'header-bold' },
    { field: 'FechaDocumento', headerName: 'FECHA DOCUMENTO', width: 150, 
      renderCell: (params) => fDate(params.value), headerClassName: 'header-bold'
    },
    { field: 'FechaVencimiento', headerName: 'FECHA VENCIMIENTO', width: 150, headerClassName: 'header-bold' },
    { field: 'Plazo', headerName: 'PLAZO (Días)', width: 150, headerClassName: 'header-bold' },
    { field: 'DiasVencimiento', headerName: 'DÍAS VENCIDOS', width: 150, 
      //cellClassName: (params) => params.value > 0 ? "saldo_vencido" : "", 
      cellClassName: "plazo-cell", headerClassName: 'header-bold'
    },
    { field: 'Saldo', headerName: 'SALDO', width: 150, headerClassName: 'header-bold' },
    { field: "boton", headerName: "", width: 70, 
      renderCell: (params) => (
        <Checkbox
          checked={params.row.selected || false}
          onChange={(event) => handleCheckboxChange(event, params.row)}
          sx={{ 
            color: params.row.selected ? "green" : undefined,
            '&.Mui-checked': { color: "green" }
          }}
        />
      ),
    },
    { field: "cuadro", headerName: "", width: 150, 
      renderCell: (params) => (
        <TextField
          size="small"
          value={params.row.inputDisabled ? "" : abonar[params.row.Documento] || ""}
          onChange={(e) => handleAbonar(params.row.Documento, e.target.value)}
          disabled={params.row.inputDisabled}
          sx={{ width: "120px" }}
        />
      ),
    },
    { field: 'pago', headerName: 'VALOR A PAGAR', width: 150, headerClassName: 'header-bold',
      renderCell: (params) => (
        <TextField
          size="small"
          value={`${params.row.valorAPagar !== undefined && params.row.valorAPagar !== null ? params.row.valorAPagar : 0}`} 
          sx={{ width: "120px" }}
          InputProps={{
            readOnly: true, 
          }}
        />
      ),
    },
    { field: 'StateName', headerName: 'ESTADO', width: 150, cellClassName: 'total-cell', headerClassName: 'header-bold' } 
  ];


  const calcularTotal = (valores) => {
    const total = valores.reduce((acumulador, item) => {
      let valor = item.valorAPagar ? item.valorAPagar.toString().replace(/[$,]/g, "") : "0";
      valor = parseInt(valor) || 0;
      return acumulador + valor;
    }, 0);

    const totalFormateado = `$${Number(total.toFixed(0))}`;
    setTotal(totalFormateado);
    verificar();
  };


  const crearRecibo = async () => {

    const facturasObj = seleccion.reduce((obj, factura) => {
        obj[factura.NumeroDocumento] = factura.ValorCancelado
      return obj;
    }, {});

    let chequesObj = {};
    if (metodosPago.Cheque && campos.length > 0) {
      chequesObj = campos.redudce((obj, campo, index) => {
        obj[index] = {
          bank: campo.banco,
          checknumber: campo.numero,
          checkdate: campo.fecha,
          value: campo.valor,
        }
        return obj;
      }, {});
    }

    const resultado = await Swal.fire({
      title: "Por Favor Confirmar!",
      text: "¿Desea Guardar el Recibo?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }); 
    
    if(!resultado.isConfirmed) {
      Swal.fire({
        text: "No se guardar el recibo.",
        icon: "info",
        timer: 2000, 
      });
      return; 
    }
    
    const datosRecibo = {
      customer: {
        nit: clienteV.NIT,
        razonSocial: clienteV.RazonSocial,
        email: clienteV.Email,
        ciudad: clienteV.CityName,
        departamento: clienteV.DepartmentName,
      },
      user: {
        ID: auth.ID,
        UserEmail: auth.UserEmail
      },
      TOTAL: total,
      ReciboFisico: recibos,
      Comentarios: comentarios,
      facturas: facturasObj, 
      ...(metodosPago.Cheque && campos.length > 0 && {cheques: chequesObj}),
    };

    
    try {
      const response = await fetch(Global.url + "/receipts/saveCustomersReceipts/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosRecibo),
      });
    
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Respuesta del Servidor:", errorResponse);

        Swal.fire({
          icon: "error",
          title: "Error al crear la consignación",
          text: errorResponse.error || "Error Desconocido.",
        });
        return;
      }
    
      const data = await response.json();
      console.log("Recibo creado correctamente", data);
      Swal.fire({
        icon: "success",
        title: "Recibo Creado",
        text: "El recibo se creó correctamente.",
      });

      router.push("./recibo");
    } catch (error) {
      console.error("Error detallado:", error);
      Swal.fire({
        icon: "error",
        title: "Error de Conexión",
        text: "No se pudo conectar al servidor o los datos enviados no son válidos.",
      });
    }    
  };

  return (
    <>
      <NavBar />
      <Box>
        <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", justifyContent: "space-between", alignItems: "center", m: 2 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <h4>Nit: {clienteV.NIT} </h4>
            <h4>Razón Social: {clienteV.RazonSocial} </h4>
            <h4>Email: {clienteV.Email} </h4>
          </Grid>

          <Grid size={{ xs: 12, sm: "auto" }} container justifyContent={isSmallScreen ? "center" : "flex-end"}>
            <IconButton onClick={crearRecibo} color="success" disabled={!boton}>
              <CheckCircleIcon sx={{ fontSize: 40 }} />
            </IconButton>
            <IconButton color="error" LinkComponent={Link} href="../">
              <CancelIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", m: 2 }}>
          <Grid container spacing={2} sx={{ flexDirection: isSmallScreen ? "column" : "row" }}>
            <TextField 
              id="outlined-basic"
              label="Escribir Comentario"
              multiline
              variant="outlined"
              size="small"  
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
              fullWidth
            />

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField 
                id="standard-multiline-flexible"
                label="Digite Recibo"
                multiline
                fullWidth
                size="small"
                variant="outlined"
                value={recibos}
                onChange={(e) => setRecibos(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField 
                id="standard-multiline-flexible"
                label="Total"
                multiline
                size="small"
                fullWidth
                variant="outlined"
                value={total} 
                sx={{ bgcolor: "#fff", color: "red", fontWeight: "bold" }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 3 }} container spacing={1} sx={{ flexDirection: isSmallScreen ? "column" : "row" }}>
              <Grid size={{ xs: 4 }}>
                <FormControlLabel control={<Checkbox name="Efectivo" onChange={handleCheckbox} sx={{ color: "green", "&.Mui-checked": { color: "green" } }} />} label="Efectivo" />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <FormControlLabel control={<Checkbox name="Cheque" onChange={handleCheckbox} sx={{ color: "blue", "&.Mui-checked": { color: "blue" } }} />} label="Cheque" />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <FormControlLabel control={<Checkbox name="Consignación" onChange={handleCheckbox} sx={{ color: "red", "&.Mui-checked": { color: "red" } }} />} label="Consignación" />
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Grid size={12} sx={{ flexGrow: 1, margin: 2 }}>
          <Box sx={{ width: "100%", heigth: isSmallScreen ? 300 : 500 }}>
            <DataGrid 
              rows={recibo}  
              columns={columns}
              getRowId={(row) => row.Documento}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5 }
                }
              }}
              pageSizeOptions={[5, 10, 20]}
            />
          </Box>
        </Grid>



        <Modal 
          open={openC}
          onClose={handleCloseC}
          BackdropProps={{
            onClick: (event) => event.stopPropagation()
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
            <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: '8px', maxWidth: '950px', width: "90%", height: "50vh", overflowY: "auto", margin: 'auto', mt: 4 }}>
              
              <strong>Información de Cheques</strong>
              <Divider />

              {campos.map((campo, index) => (
              <Box key={index} sx={{ padding: 2 }}>
              <Grid container spacing={2} alignItems="center" >
                <Grid size={{ xs: 12, md: 2.4 }}>
                  <strong>Banco: </strong>
                  <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={campo.banco}
                    onChange={(e) => handleChange(index, "banco", e.target.value)}
                    sx={{ width: 170 }}
                    
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 2.4 }}>
                  <strong>Numero de Cheque: </strong>
                  <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={campo.numero}
                    onChange={(e) => handleChange(index, "numero", e.target.value)}
                    sx={{ width: 170 }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 2.4 }}>
                  <strong>Fecha de Cheque: </strong>
                  <TextField
                    type="date"
                    margin="normal"
                    value={campo.fecha}
                    onChange={(e) =>  handleChange(index, "fecha", e.target.value)}
                    slotProps={{ textField: { variant: "outlined", fullWidth: true, marginTop: 1 }} }
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 2.4 }}>
                  <strong>Valor de Cheque: </strong>
                  <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={campo.valor}
                    onChange={(e) => handleChange(index, "valor", e.target.value)}
                    sx={{ width: 170 }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 2.4 }}>
                  <Button onClick={handleEliminar} variant="outlined" color="error" sx={{ display: 'flex', justifyContent: "center", alignItems: "center", margin: 1 }}>Eliminar</Button>
                </Grid>
              </Grid>
              </Box>
              ))}

              <Divider  />

              <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12, md: 6 }} sx={{ padding: 2 }}>
                  <Box sx={{ flexWrap: "wrap", flexDirection: isSmallScreen ? "column" : "row", justifyContent: "center", alignItems: "center" }}>
                    <Button onClick={handleAñadir} variant="contained" color="secondary" sx={{ margin: 1 }}>Añadir</Button>
                    <Button onClick={handleGuardar} variant="contained" color="success" sx={{ margin: 1 }}>Guardar</Button>
                    <Button onClick={handleCloseC} variant="contained" sx={{ margin: 1 }}>Cerrar</Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
        </Modal>
      </Box>
    </>
  )  
}

export default RealizarRecibo;



