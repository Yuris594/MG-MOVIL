"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3462],{74853:function(e,t,a){var o=a(94630),r=a(57437);t.Z=(0,o.Z)((0,r.jsx)("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12z"}),"Cancel")},13462:function(e,t,a){a.r(t);var o=a(57437),r=a(70899),i=a(2069),l=a(94013),n=a(8350),s=a(46387),c=a(77584),d=a(58004),u=a(45451),h=a(74853),m=a(10932),p=a(93769),x=a(2265),g=a(59832),f=a(29239),w=a(41698),C=a(5515),b=a.n(C);let S={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"80%",maxHeight:"80vh",bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,overflow:"auto",p:4,zIndex:1200};t.default=e=>{let{pedido:t,handleClose:a}=e,{auth:C}=(0,m.a)(),[N,j]=(0,x.useState)(""),[F,v]=(0,x.useState)(""),[P,I]=(0,x.useState)(""),[E,D]=(0,x.useState)(""),[Z,y]=(0,x.useState)(!1),[z,O]=(0,x.useState)(""),[K,T]=(0,x.useState)(""),[A,L]=(0,x.useState)(""),[B,k]=(0,x.useState)(""),[R,_]=(0,x.useState)(""),[J,U]=(0,x.useState)([]),G=(0,r.Z)("(max-width: 600px)"),M=()=>y(!1);(0,x.useEffect)(()=>{if(t){let e=(JSON.parse(localStorage.getItem("cotizacion"))||[]).find(e=>e.PKId===t.PKId);e&&(j(e.nit),v(e.notas),I(e.total),O(e.nombreC),L(e.impuesto),k(e.descuento),_(e.Documento1),D(q(e.fecha)),Y(e.articulosSeleccionados),U(e.articulosSeleccionados))}},[t]);let q=e=>{let t=new Date(e),a=t.getDate(),o=t.toLocaleString("es-CO",{month:"short"}),r=o.charAt(0).toUpperCase()+o.slice(1),i=t.getFullYear();return"".concat(r," ").concat(a,", ").concat(i)},H=e=>{let t=J.map(t=>t.PKcodigo===e.PKcodigo?{...t,Precio:e.Precio,Descuento:e.Descuento,cantped:e.cantped,Total:W(e)}:t);return U(t),Y(t),e},W=e=>{let t=parseFloat(e.cantped)||0,a=parseFloat(e.Precio)||0,o=(parseFloat(e.Iva)||0)/100,r=(parseFloat(e.Descuento)||0)/100,i=t*a,l=i*r;return(i-l+(i-l)*o).toFixed(0)},V=e=>{b().fire({title:"\xbfSeguro que desea eliminar el art\xedculo?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Aceptar",customClass:{popup:"swal-custom-zindex"}}).then(a=>{if(a.isConfirmed){let a=J.filter(t=>t.PKcodigo!==e.PKcodigo);U(a),Y(a);let o=JSON.parse(localStorage.getItem("cotizacion"))||[],r=o.findIndex(e=>e.PKId===t.PKId);-1!==r&&(o[r].articulosSeleccionados=a,localStorage.setItem("cotizacion",JSON.stringify(o))),b().fire({text:"Art\xedculo eliminado correctamente.",icon:"success",timer:2e3,customClass:{popup:"swal-custom-zindex"}})}})},Y=e=>{let t=0,a=0,o=0,r=0;e.forEach(e=>{let i=parseFloat(e.cantped)||0,l=parseFloat(e.Precio)||0,n=(parseFloat(e.Descuento)||0)/100,s=(parseFloat(e.Iva)||0)/100,c=i*l,d=c*n;o+=l*i*n,r+=l*i*s,t+=c-d+(c-d)*s,a+=c-d}),I(Number(t.toFixed(0)).toLocaleString()),T(Number(a.toFixed(0)).toLocaleString()),L(r.toFixed(0)),k(o.toFixed(0))},$=async()=>{try{let e=await fetch(w.x.url+"/pedidos/".concat(C.IDSaler),{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok)throw Error("Error al obtener el consecutivo: ".concat(e.status," ").concat(e.statusText));let t=await e.json();if(!t[0].consecutivo||!t[0].Prefijo)throw Error("Los campos 'consecutivo' o 'Prefijo' no se encontraron en la respuesta.");return t[0]}catch(e){throw console.error("Error al obtener el consecutivo:",e),e}},Q=async()=>{if(a(),!(await b().fire({title:"Almacenar!",text:"\xbfDesea almacenar el Pedido?",icon:"question",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Aceptar",cancelButtonText:"Cancelar"})).isConfirmed){b().fire({text:"El Pedido no se almacen\xf3.",icon:"info",timer:3e3});return}try{let e=JSON.parse(localStorage.getItem("cotizacion"))||[],t=e.find(e=>e.PKId==e.PKId);if(!t)throw Error("El pedido no se encontr\xf3 en el almacenamiento local.");let a=await $(),o=a.consecutivo+1,r="".concat(a.Prefijo).concat(o),i=await fetch(w.x.url+"/pedidos/PEDIDOS/".concat(C.IDSaler),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({Consecutivo:o})});if(!i.ok)throw console.log("Error al actualizar el consecutivo:",i.statusText),Error("Error al actualizar el consecutivo");console.log("Consecutivo actualizado correctamente");let l={FKID_sellers:t.FKID_sellers,Notas:t.notas,FKId_clientes:t.nit,NUMPED:r,Documento1:t.Documento1},n=await fetch(w.x.url+"/pedidos/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});if(!n.ok){let e=await n.json();throw console.error("Error al crear el pedido",e),Error("Error al crear el encabezado del pedido")}for(let e of(console.log("Pedido creado correctamente"),J.map(e=>({FKid_pedidos2:e.FKid_pedidos2,FKcodigo_articles:e.PKcodigo,Cantidad:e.cantped,Precio:e.Precio,Descuento:e.Descuento,Iva:e.Iva,Total:e.Total,FKNUMPED:r,BODEGA:e.BODEGA})))){let t=await fetch(w.x.url+"/pedidos/".concat(r),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!t.ok){let e=await t.text();throw console.error("Error al crear el detalle del pedido:",e),Error("Error al crear el detalle del pedido: ".concat(t.status," - ").concat(t.statusText))}}console.log("Detalle del pedido creado correctamente");let s=e.filter(e=>e.PKId!==t.PKId);localStorage.setItem("cotizacion",JSON.stringify(s)),b().fire({title:"\xa1\xc9xito!",text:"Pedido Fue Almacenado Correctamente.",icon:"success",timer:3e3})}catch(e){console.error("Error:",e),b().fire({title:"Oops...!",text:"Hubo un Problema al Enviar el Pedido.",icon:"error"})}};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(f.Z,{container:!0,spacing:2,direction:G?"column":"row",alignItems:"center",justifyContent:"space-between",children:(0,o.jsx)(f.Z,{size:12,children:(0,o.jsxs)(i.Z,{sx:{display:"flex",flexDirection:G?"column":"row",alignItems:"center",gap:2,marginBottom:2},children:[(0,o.jsx)("h3",{children:(0,o.jsx)("strong",{children:"EDITAR PEDIDOS"})}),(0,o.jsxs)(i.Z,{sx:{display:"flex",flexDirection:G?"column":"row",alignItems:"center",gap:2,marginLeft:G?0:"auto",width:G?"100%":"auto"},children:[(0,o.jsx)(l.Z,{onClick:()=>y(!0),variant:"contained",sx:{margin:1,backgroundColor:"#841dec",color:"white"},children:"Articulos"}),(0,o.jsx)(l.Z,{onClick:Q,variant:"contained",sx:{margin:1,backgroundColor:"#25ba25",color:"white"},children:"Convertir a Pedido"}),(0,o.jsx)(l.Z,{onClick:()=>{try{if(0===J.length){b().fire({title:"Oops...!",text:"Error al guardar el pedido. Debe incluir articulos.",icon:"error"});return}let e=JSON.parse(localStorage.getItem("cotizacion"))||[],o=e.findIndex(e=>e.PKId===t.PKId);if(-1!==o){let t={...e[o],articulosSeleccionados:J,impuesto:A,descuento:B,total:P,subTotal:K,notas:F,Documento1:R};e[o]=t,localStorage.setItem("cotizacion",JSON.stringify(e)),a(),b().fire({position:"top-end",title:"\xc9xito",text:"Los cambios se han guardado correctamente.",icon:"success",showConfirmButton:!1,timer:2e3})}}catch(e){b().fire({title:"Error",text:"No se encontr\xf3 el pedido a actualizar.",icon:"error",confirmButtonText:"Aceptar"})}},variant:"contained",sx:{margin:1,backgroundColor:"#d92020",color:"white"},children:"Guardar y Cerrar"})]})]})})}),(0,o.jsx)(n.Z,{}),(0,o.jsx)(f.Z,{size:{xs:12,sm:6},sx:{marginRigth:4,padding:2},children:(0,o.jsxs)(i.Z,{sx:{display:"flex",flexDirection:G?"column":"row",justifyContent:"center",alignItems:"center"},children:[(0,o.jsx)(s.Z,{sx:{color:"#1947ee",fontWeight:"bold",margin:1},variant:"subtitle2",gutterBottom:!0,children:E}),(0,o.jsx)(s.Z,{sx:{color:"#1947ee",fontWeight:"bold",margin:1},variant:"subtitle2",gutterBottom:!0,children:z}),(0,o.jsx)(s.Z,{sx:{color:"#1947ee",fontWeight:"bold",margin:1},variant:"subtitle2",gutterBottom:!0,children:N})]})}),(0,o.jsx)(f.Z,{size:{xs:12,sm:6},sx:{padding:2},children:(0,o.jsxs)(i.Z,{sx:{display:"flex",flexDirection:G?"column":"row",justifyContent:"center",alignItems:"center",gap:2,width:G?"100%":"auto"},children:[(0,o.jsx)(c.Z,{id:"standard-multiline-flexible",label:"Ingresar Notas",multiline:!0,maxRows:5,variant:"outlined",value:F,onChange:e=>v(e.target.value),sx:{width:400},inputProps:{maxLength:255}}),(0,o.jsx)(c.Z,{id:"standard-multiline-flexible",label:"Documento",multiline:!0,maxRows:3,variant:"outlined",value:R,onChange:e=>_(e.target.value),sx:{width:200},inputProps:{maxLength:50}}),(0,o.jsxs)(s.Z,{variant:"body1",children:["SubTotal: ",(0,o.jsx)("span",{style:{color:"red"},children:K})]}),(0,o.jsxs)(s.Z,{variant:"body1",children:["Total: ",(0,o.jsx)("span",{style:{color:"red"},children:P})]})]})}),(0,o.jsx)(f.Z,{size:12,sx:{flexGrow:1,marginBottom:2},children:(0,o.jsx)(i.Z,{sx:{width:"100%",heigth:G?500:750},children:(0,o.jsx)(p._,{rows:J,columns:[{field:"PKcodigo",headerName:"CODIGO",width:100,headerClassName:"header-bold"},{field:"Nombre",headerName:"REFERENCIA",width:320,headerClassName:"header-bold"},{field:"Unidad_Empaque",headerName:"UND",width:80,headerClassName:"header-bold"},{field:"Precio",headerName:"PRECIO",width:100,valueFormatter:e=>{let t=parseFloat(e).toFixed(0);return"".concat(parseFloat(t).toLocaleString())},headerClassName:"header-bold",editable:!0},{field:"Iva",headerName:"IVA",width:80,valueFormatter:e=>{let t=parseFloat(e).toLocaleString();return"".concat(parseFloat(t).toFixed(1))},headerClassName:"header-bold"},{field:"Descuento",headerName:"DESC",width:80,valueFormatter:e=>{let t=parseFloat(e).toLocaleString();return"".concat(parseFloat(t).toFixed(1))},headerClassName:"header-bold",editable:!0},{field:"cantped",headerName:"CANT",width:80,headerClassName:"header-bold",editable:!0},{field:"Total",headerName:"TOTAL",width:90,valueFormatter:e=>{let t=Number(e).toFixed(0);return"".concat(parseFloat(t).toLocaleString())},headerClassName:"header-bold"},{field:"actions",headerName:"",width:70,renderCell:e=>(0,o.jsx)(g.Z,{onClick:()=>V(e.row),"aria-label":"cancel",color:"error",sx:{fontSize:40},children:(0,o.jsx)(h.Z,{})})}],getRowId:e=>e.PKcodigo,rowHeight:40,pageSizeOptions:[10],initialState:{pagination:{paginationModel:{pageSize:10}}},processRowUpdate:e=>H(e),onProcessRowUpdateError:e=>{console.error("Error durante la actualizaci\xf3n de la fila:",e),alert("Ocurri\xf3 un error al actualizar la fila. Intenta nuevamente.")}})})}),(0,o.jsx)(d.Z,{open:Z,onClose:M,children:(0,o.jsx)(i.Z,{sx:S,children:(0,o.jsx)(u.default,{handleClose:M,onAgregarArticulo:e=>{let t=[...J,...e.map(e=>{let t=e.Precio*(1+e.Iva/100)*e.cantped;return{...e,Total:t.toFixed(0)}})];U(t),Y(t)}})})})]})}},45451:function(e,t,a){a.r(t);var o=a(57437),r=a(70899),i=a(77584),l=a(2069),n=a(94013),s=a(8350),c=a(42569),d=a(93769),u=a(2265),h=a(29239);t.default=e=>{let{handleClose:t,onAgregarArticulo:a}=e,[m,p]=(0,u.useState)([]),[x,g]=(0,u.useState)(""),[f,w]=(0,u.useState)({}),[C,b]=(0,u.useState)([]),S=(0,r.Z)("(max-width: 600px)");(0,u.useEffect)(()=>{(async()=>{try{let e=await (0,c.zK)(),t=await e.getAll("articles");t.length>0?(p(t),b(t),console.log("Datos cargados desde la base de datos")):console.log("No se encontraron art\xedculos en la base de datos.")}catch(e){console.log("Error al obtener los productos:",e)}})()},[]);let N=(e,t)=>{w({...f,[e]:t})},j=e=>{p(C.filter(t=>Object.values(t).map(e=>e?e.toString().toLowerCase():"").some(t=>t.includes(e.toLowerCase()))))};return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)(h.Z,{container:!0,direction:"column",sx:{minHeight:"100vh",backfroundColor:"#ffffff",padding:2},children:[(0,o.jsx)(h.Z,{size:12,children:(0,o.jsxs)(l.Z,{sx:{display:"flex",flexDirection:S?"column":"row",alignItems:"center",gap:2,marginBottom:2},children:[(0,o.jsx)("h2",{children:(0,o.jsx)("strong",{children:"SELECCIONAR ARTICULO"})}),(0,o.jsxs)(l.Z,{sx:{display:"flex",flexDirection:S?"column":"row",alignItems:"center",gap:2,marginLeft:S?0:"auto",width:S?"100%":"auto"},children:[(0,o.jsx)(n.Z,{variant:"outlined",color:"success",sx:{margin:1},onClick:()=>{a(m.filter(e=>f[e.PKcodigo]).map(e=>({...e,cantped:f[e.PKcodigo]}))),t()},children:"Agregar"}),(0,o.jsx)(n.Z,{variant:"contained",color:"error",onClick:t,children:"Cerrar"})]})]})}),(0,o.jsx)(s.Z,{}),(0,o.jsx)(h.Z,{size:12,sx:{padding:2},children:(0,o.jsx)(i.Z,{id:"outlined-basic",label:"Digite Codigo o Referencia para Buscar",multiline:!0,rows:1,variant:"outlined",value:x,onChange:e=>{e.preventDefault(),g(e.target.value),j(e.target.value)},sx:{width:"100%"}})}),(0,o.jsx)(h.Z,{size:12,sx:{flexGrow:1,marginBottom:2},children:(0,o.jsx)(l.Z,{sx:{width:"100%",height:S?500:820},children:(0,o.jsx)(d._,{density:"compact",rows:m,columns:[{field:"PKcodigo",headerName:"COD",width:100,headerClassName:"header-bold"},{field:"Nombre",headerName:"REFERENCIA",width:280,headerClassName:"header-bold"},{field:"Unidad_Empaque",headerName:"EMP",width:80,headerClassName:"header-bold"},{field:"Precio",headerName:"PRECIO",width:90,editable:!0,valueFormatter:e=>{let t=parseFloat(e).toFixed(0);return"".concat(parseFloat(t).toLocaleString())},headerClassName:"header-bold"},{field:"Iva",headerName:"IVA",width:80,valueFormatter:e=>{let t=parseFloat(e).toLocaleString();return"".concat(parseFloat(t).toFixed(1))},headerClassName:"header-bold"},{field:"Descuento",headerName:"DESC",width:80,valueFormatter:e=>{let t=parseFloat(e).toLocaleString();return"".concat(parseFloat(t).toFixed(1))},editable:!0,headerClassName:"header-bold"},{field:"cantped",headerName:"CANT",width:100,headerClassName:"header-bold",renderCell:e=>(0,o.jsx)(i.Z,{size:"small",value:f[e.id]||"",onChange:t=>{let a=t.target.value;/^\d*$/.test(a)&&N(e.id,a)},sx:{width:"70px",height:"20px"},type:"text",inputProps:{inputMode:"numeric"}}),type:"number"},{field:"Precio_Neto",headerName:"NETO",width:80,valueFormatter:e=>{let t=parseFloat(e).toFixed(0);return"".concat(parseFloat(t).toLocaleString())},headerClassName:"header-bold"},{field:"Disp",headerName:"DISP",width:80,valueFormatter:e=>{let t=parseFloat(e).toFixed(0);return"".concat(parseFloat(t).toLocaleString())},headerClassName:"header-bold"}],getRowId:e=>e.PKcodigo,processRowUpdate:e=>{let t=m.map(t=>t.PKcodigo===e.PKcodigo?{...t,...e}:t);return p(t),b(t),e},initialState:{pagination:{paginationModel:{pageSize:20}}},pageSizeOptions:[20]})})})]})})}}}]);