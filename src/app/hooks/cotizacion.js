"use client";

import "jspdf-autotable";
import jsPDF from "jspdf";
import { format } from "date-fns";


const Cotizacion = (articulosSeleccionados = {}, auth, nombre, nit, telefono, fecha, direccion, municipio, notas, subTotal, descuento, impuesto, total) => {

  const fechaActual = () => {
    const now = new Date();
    return format(now, "yyyy-MM-dd HH:mm:ss");
  };

  const generarPDF = () => {
    const pdf = new jsPDF("portrait", "pt", "letter");
    const columnsParaPDF = [
      { field: "PKcodigo", headerName: "REF.", width: 120 },
      { field: "cantped", headerName: "CANT", width: 70 },
      { field: "Unidad_Empaque", headerName: "UND", width: 70 },
      { field: "Nombre", headerName: "DESCRIPCIÓN", width: 450 },
      { field: "Iva", headerName: "IVA", width: 60 },
      { field: "Descuento", headerName: "DESC", width: 70 },
      { field: "Precio", headerName: "VALOR UNI", width: 70, },
      { field: "Total", headerName: "TOTAL", width: 100 }
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

    const dataToPrint = articulosSeleccionados.map((row) => {
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
      pdf.setFontSize(12);
      pdf.setFont("times", "normal");
      pdf.addImage("/logo_factura.png", "PNG", 16, 20, 200, 25);
      pdf.text("NIT. 890.900.137-1",  50, 55)
      pdf.setFontSize(8);
      pdf.setFont("courier", "italic");
      pdf.text(`NOMBRE VENDEDOR: ${auth?.UserFullName}`, 450, 25);
      pdf.text(`${fechaActual()}`, 450, 35);
      pdf.setFontSize(10);
      pdf.text("_________________________________________________________________________________________________", 14, 60);
      pdf.setFont("times", "italic");
      pdf.setFontSize(10);
      pdf.text(`CLIENTE: ${nombre}`, 16, 85);
      pdf.text(`NIT: ${nit}`, 16, 105);
      pdf.text(`TELÉFONO: ${telefono}`, 200, 105);
      pdf.text(`FECHA: ${fecha}`, 400, 105);
      pdf.text(`DIRECCIÓN: ${direccion}`, 16, 125);
      pdf.text(`MUNICIPIO: ${municipio}`, 200, 125);
      pdf.text(`NOTAS: ${notas}`, 16, 145);
    }

    function agregarContenido() {
      pdf.setFontSize(10);
      pdf.setFont("times", "italic")
      pdf.text(`TOTAL ITEMS:        ${articulosSeleccionados.length}`, 350, pdf.autoTable.previous.finalY + 80);
      pdf.text(`SubTotal:     $${subTotal.toLocaleString("es-ES")}`, 470, pdf.autoTable.previous.finalY + 20);
      pdf.text(`Desc:         $${descuento.toLocaleString("es-ES")}  `,470,pdf.autoTable.previous.finalY + 40);
      pdf.text(`IVA:          $${impuesto.toLocaleString("es-ES")}   `, 470, pdf.autoTable.previous.finalY + 60);
      pdf.text(`TOTAL:        $${total.toLocaleString("es-ES")}`, 470,pdf.autoTable.previous.finalY + 80);

      pdf.rect(10, pdf.autoTable.previous.finalY + 9, 450, 88);
      pdf.rect(463, pdf.autoTable.previous.finalY + 9, 120, 88);
    }

    agregarContenido();
    
    pdf.output('dataurlnewwindow');
    
  };
  
  return { generarPDF };
}

export default Cotizacion;








/*
const pdfBlob = pdf.output("blob");
const fileURL = URL.createObjectURL(pdfBlob);
window.open(fileURL);


const pdfBlob = pdf.output("blob");
return pdfBlob
*/