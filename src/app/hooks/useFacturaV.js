"use client";

import "jspdf-autotable";
import jsPDF from "jspdf";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const FacturaV = (clienteD, auth, articulos, total = {}, subTotal = {}) => {
  const [pdfDataUrl] = useState(null); 
  const [fecha, setFecha] = useState("");
  const [fechaActual] = useState(format(new Date(), "dd/MM/yyyy HH:mm:ss"));

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


  const generarPDF = () => {
    const pdf = new jsPDF("portrait", "pt", "letter");
    const columnsParaPDF = [
      { field: "FKcodigo_articles", headerName: "CODIGO", width: 150 },
      { field: "Nombre", headerName: "REFERENCIA", width: 350 },
      { field: "Cantidad", headerName: "CANTIDAD", width: 100 },
      { field: "Precio", headerName: "PRECIO", width: 100, },
      { field: "Descuento", headerName: "DESC", width: 90 },
      { field: "Iva", headerName: "IVA", width: 90 },
      { field: "Total", headerName: "TOTAL", width: 100, cellClassName: 'total-cell' }
    ];

    const styles = {
      theme: "plain",
      cellWidth: "auto",
      styles: { cellPadding: 5, fontSize: 8 },
      lineColor: [200, 200, 200],
      lineWidth: 0.1,
      font: "times",
      fontStyle: "normal",
      textColor: [0, 0, 0],
      display: "flex",
      fontSize: 8,
    };

    const dataToPrint = articulos.map((row) => {
      const rowData = [];
      columnsParaPDF.forEach((column) => {
        let value = row[column.field];
        
        if (column.field === "Precio" || column.field === "Total") {
          const precioRedondeado = Number(value).toFixed(0);
          value = "$" + parseFloat(precioRedondeado).toLocaleString(); 
        }
    
        rowData.push(value);
      });
      return rowData;
    });

    encabezado();
      pdf.autoTable({
        head: [columnsParaPDF.map((column) => column.headerName)],
        body: dataToPrint,
        startY: 180,
        theme: "plain",
        tableWidth: pdf.internal.pageSize.width - 28,
        margin: { left: 12, right: 16 },
        styles,
        headStyles: {
          font: "courier",
          fontStyle: "bold",
        }
      });
      
    function encabezado() {
      pdf.setFontSize(13);
      pdf.addImage("/logo_factura.png", "PNG", 16, 20, 200, 25);
      pdf.setFontSize(8);
      pdf.setFont("courier", "italic");
      pdf.text(`NOMBRE VENDEDOR: ${auth.UserFullName}`, 450, 25);
      pdf.text(`${fechaActual}`, 450, 35);
      pdf.setFontSize(10);
      pdf.text("___________________________________________________________________________________________________________", 0, 60);
      pdf.setFont("times", "normal");
      pdf.setFontSize(10);
      pdf.text(`R. SOCIAL: ${clienteD?.RazonSocial}`, 16, 85);
      pdf.text(`No. PEDIDO: ${clienteD?.NUMPED}`, 16, 105);
      pdf.text(`FECHA PEDIDO: ${fecha}`, 200, 105);
      pdf.text(`NIT: ${clienteD?.FKId_clientes}`, 400, 105);
      pdf.text(`No. FACTURA: `, 16, 125);
      pdf.text(`FECHA FACTURA: `, 200, 125);
      pdf.text(`DOCUMENTO1: ${clienteD?.Documento1}`, 400, 125);
      pdf.setTextColor(255, 0, 0);
      pdf.text(`SUBTOTAL: $${subTotal}`, 16, 145);
      pdf.text(`TOTAL: $${total}`, 200, 145);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`NOTAS: ${clienteD?.Notas}`, 16, 165);
    }

    pdf.output('dataurlnewwindow');
  };

  return { generarPDF, pdfDataUrl };
}

export default FacturaV;