"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2123],{74853:function(e,t,a){var o=a(94630),r=a(57437);t.Z=(0,o.Z)((0,r.jsx)("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12z"}),"Cancel")},32123:function(e,t,a){a.r(t);var o=a(57437),r=a(70899),i=a(2069),l=a(94013),n=a(8350),s=a(46387),d=a(77584),c=a(58004),u=a(45451),h=a(74853),m=a(10932),p=a(93769),x=a(2265),g=a(59832),f=a(29239),C=a(41698),w=a(5515),b=a.n(w);let N={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"80%",maxHeight:"90vh",bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,overflow:"auto",p:4,zIndex:1300};t.default=e=>{let{pedido:t,handleClose:a}=e,{auth:w}=(0,m.a)(),[S,j]=(0,x.useState)(""),[F,I]=(0,x.useState)(""),[v,P]=(0,x.useState)(""),[E,Z]=(0,x.useState)(""),[D,y]=(0,x.useState)(!1),[K,O]=(0,x.useState)(""),[T,A]=(0,x.useState)(""),[L,z]=(0,x.useState)(""),[B,k]=(0,x.useState)([]),R=(0,r.Z)("(max-width: 600px)"),_=()=>y(!1);(0,x.useEffect)(()=>{if(t){let e=(JSON.parse(localStorage.getItem("pedidos"))||[]).find(e=>e.PKId===t.PKId);e&&(k(e.articulos),P(e.total),G(e.articulos),Z(J(e.Fecha)),O(e.nombreC),j(e.NitC),I(e.Notas),z(e.Documento1))}},[t]);let J=e=>{let t=new Date(e),a=t.getDate(),o=t.toLocaleString("es-CO",{month:"short"}),r=o.charAt(0).toUpperCase()+o.slice(1),i=t.getFullYear();return"".concat(r," ").concat(a,", ").concat(i)},U=e=>{b().fire({title:"\xbfSeguro que desea eliminar el art\xedculo?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Aceptar",customClass:{popup:"swal-custom-zindex"}}).then(a=>{if(a.isConfirmed){let a=B.filter(t=>t.PKcodigo!==e.PKcodigo);k(a),G(a);let o=JSON.parse(localStorage.getItem("pedidos"))||[],r=o.findIndex(e=>e.PKId===t.PKId);-1!==r&&(o[r].articulos=a,localStorage.setItem("pedidos",JSON.stringify(o))),b().fire({text:"Art\xedculo eliminado correctamente.",icon:"success",timer:2e3,customClass:{popup:"swal-custom-zindex"}})}})},G=e=>{let t=0,a=0;e.forEach(e=>{let o=parseFloat(e.cantped)||0,r=parseFloat(e.Precio)||0,i=(parseFloat(e.Descuento)||0)/100,l=(parseFloat(e.Iva)||0)/100,n=o*r,s=n*i;t+=n-s+(n-s)*l,a+=n-s});let o=Number(t.toFixed(0).toLocaleString("es-ES")),r=Number(a.toFixed(0).toLocaleString());P(o),A(r)},M=async()=>{try{let e=await fetch(C.x.url+"/pedidos/".concat(w.IDSaler),{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok)throw Error("Error al obtener el consecutivo: ".concat(e.status," ").concat(e.statusText));let t=await e.json();if(!t[0].consecutivo||!t[0].Prefijo)throw Error("Los campos 'consecutivo' o 'Prefijo' no se encontraron en la respuesta.");return t[0]}catch(e){throw e}},q=async()=>{if(a(),!(await b().fire({title:"Almacenar!",text:"\xbfDesea almacenar el Pedido?",icon:"question",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Aceptar",cancelButtonText:"Cancelar"})).isConfirmed){b().fire({text:"El Pedido no se almacen\xf3.",icon:"info",timer:3e3});return}try{let e=JSON.parse(localStorage.getItem("pedidos"))||[],t=e.find(e=>e.PKId==e.PKId);if(!t)throw Error("El pedido no se encontr\xf3 en el almacenamiento local.");let a=await M(),o=a.consecutivo+1,r="".concat(a.Prefijo).concat(o);if(!(await fetch(C.x.url+"/pedidos/PEDIDOS/".concat(w.IDSaler),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({Consecutivo:o})})).ok)throw Error("Error al actualizar el consecutivo");let i={FKID_sellers:t.FKID_sellers,Notas:t.Notas,FKId_clientes:t.FKId_clientes,NUMPED:r,Documento1:t.Documento1},l=await fetch(C.x.url+"/pedidos/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(!l.ok)throw await l.json(),Error("Error al crear el encabezado del pedido");for(let e of B.map(e=>({FKid_pedidos2:e.FKid_pedidos2.toString(),FKcodigo_articles:e.PKcodigo,Cantidad:e.cantped,Precio:e.Precio.toString(),Descuento:e.Descuento.toString(),Iva:e.Iva.toString(),Total:e.Total,FKNUMPED:r,BODEGA:e.BODEGA}))){let t=await fetch(C.x.url+"/pedidos/".concat(r),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!t.ok)throw await t.text(),Error("Error al crear el detalle del pedido: ".concat(t.status," - ").concat(t.statusText))}let n=e.filter(e=>e.PKId!==t.PKId);localStorage.setItem("pedidos",JSON.stringify(n)),b().fire({title:"\xa1\xc9xito!",text:"Pedido Fue Almacenado Correctamente.",icon:"success",timer:3e3})}catch(e){b().fire({title:"Oops...!",text:"Hubo un Problema al Enviar el Pedido.",icon:"error"})}};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(f.Z,{container:!0,spacing:2,direction:R?"column":"row",alignItems:"center",justifyContent:"space-between",children:[(0,o.jsx)("h3",{children:(0,o.jsx)("strong",{children:"DIGITAR PEDIDO"})}),(0,o.jsx)(f.Z,{size:{xs:12,sm:6},sx:{padding:2},children:(0,o.jsxs)(i.Z,{sx:{display:"flex",flexDirection:R?"column":"row",justifyContent:"center",alignItems:"center"},children:[(0,o.jsx)(l.Z,{onClick:()=>y(!0),variant:"contained",sx:{margin:1,backgroundColor:"#4eeacb",color:"white"},children:"Articulos"}),(0,o.jsx)(l.Z,{onClick:q,variant:"contained",sx:{margin:1,backgroundColor:"#25ba25",color:"white"},children:"Enviar"}),(0,o.jsx)(l.Z,{onClick:()=>{let e=JSON.parse(localStorage.getItem("pedidos"))||[],o=e.findIndex(e=>e.PKId===t.PKId);if(-1!==o){let t={...e[o],articulos:B,total:v,subTotal:T,Notas:F,Documento1:L};e[o]=t,localStorage.setItem("pedidos",JSON.stringify(e)),a(),b().fire({position:"top-end",title:"\xc9xito",text:"Los cambios se han guardado correctamente.",icon:"success",showConfirmButton:!1,timer:2e3})}else b().fire({title:"Error",text:"No se encontr\xf3 el pedido a actualizar.",icon:"error",confirmButtonText:"Aceptar"})},variant:"contained",sx:{margin:1,backgroundColor:"#d92020",color:"white"},children:"Guardar y Cerrar"})]})})]}),(0,o.jsx)(n.Z,{}),(0,o.jsx)(f.Z,{size:{xs:12,sm:6},sx:{marginRigth:4,padding:2},children:(0,o.jsxs)(i.Z,{sx:{display:"flex",flexDirection:R?"column":"row",justifyContent:"center",alignItems:"center"},children:[(0,o.jsx)(s.Z,{sx:{color:"#1947ee",fontWeight:"bold",margin:1},variant:"subtitle2",gutterBottom:!0,children:E}),(0,o.jsx)(s.Z,{sx:{color:"#1947ee",fontWeight:"bold",margin:1},variant:"subtitle2",gutterBottom:!0,children:K}),(0,o.jsx)(s.Z,{sx:{color:"#1947ee",fontWeight:"bold",margin:1},variant:"subtitle2",gutterBottom:!0,children:S})]})}),(0,o.jsx)(f.Z,{size:{xs:12,sm:6},sx:{padding:2},children:(0,o.jsxs)(i.Z,{sx:{display:"flex",flexDirection:R?"column":"row",justifyContent:"center",alignItems:"center",gap:2,width:R?"100%":"auto"},children:[(0,o.jsx)(d.Z,{id:"standard-multiline-flexible",label:"Ingresar Notas",multiline:!0,maxRows:5,variant:"outlined",value:F,onChange:e=>I(e.target.value),sx:{width:400},inputProps:{maxLength:255}}),(0,o.jsx)(d.Z,{id:"standard-multiline-flexible",label:"Documento",multiline:!0,maxRows:3,variant:"outlined",value:L,onChange:e=>z(e.target.value),sx:{width:200},inputProps:{maxLength:50}}),(0,o.jsxs)(s.Z,{variant:"body1",children:["SubTotal: ",(0,o.jsx)("span",{style:{color:"red"},children:T})]}),(0,o.jsxs)(s.Z,{variant:"body1",children:["Total: ",(0,o.jsx)("span",{style:{color:"red"},children:v})]})]})}),(0,o.jsx)(f.Z,{size:12,sx:{flexGrow:1,marginBottom:2},children:(0,o.jsx)(i.Z,{sx:{width:"100%",heigth:R?500:750},children:(0,o.jsx)(p._,{rows:B,columns:[{field:"PKcodigo",headerName:"CODIGO",width:100,headerClassName:"header-bold"},{field:"Nombre",headerName:"REFERENCIA",width:320,headerClassName:"header-bold"},{field:"Unidad_Empaque",headerName:"UND",width:80,headerClassName:"header-bold"},{field:"Precio",headerName:"PECIO",width:100,valueFormatter:e=>{let t=parseFloat(e).toFixed(0);return"".concat(parseFloat(t).toLocaleString())},editable:!0,headerClassName:"header-bold"},{field:"Iva",headerName:"IVA",width:80,valueFormatter:e=>{let t=parseFloat(e).toLocaleString();return"".concat(parseFloat(t).toFixed())},headerClassName:"header-bold"},{field:"Descuento",headerName:"DESC",width:80,valueFormatter:e=>{let t=parseFloat(e).toLocaleString();return"".concat(parseFloat(t).toFixed(1))},editable:!0,headerClassName:"header-bold"},{field:"cantped",headerName:"CANT",width:80,editable:!0,type:"number",headerClassName:"header-bold"},{field:"Total",headerName:"TOTAL",width:90,valueFormatter:e=>{let t=Number(e).toFixed(0);return"".concat(parseFloat(t).toLocaleString())},cellClassName:"total-cell",headerClassName:"header-bold"},{field:"actions",headerName:"",width:70,renderCell:e=>(0,o.jsx)(g.Z,{onClick:()=>U(e.row),"aria-label":"cancel",color:"error",sx:{fontSize:40},children:(0,o.jsx)(h.Z,{})})}],getRowId:e=>e.PKcodigo,rowHeight:40,pageSizeOptions:[10],initialState:{pagination:{paginationModel:{pageSize:10}}},processRowUpdate:e=>{let t=B.map(t=>t.PKcodigo===e.PKcodigo?{...t,...e}:t);return P(t),A(t),e},onProcessRowUpdateError:e=>{alert("Ocurri\xf3 un error al actualizar la fila. Intenta nuevamente.")}})})}),(0,o.jsx)(c.Z,{open:D,onClose:_,children:(0,o.jsx)(i.Z,{sx:N,children:(0,o.jsx)(u.default,{handleClose:_,onAgregarArticulo:e=>{let t=[...B,...e.map(e=>{let t=e.Precio*(1+e.Iva/100)*e.cantped;return{...e,Total:t.toFixed(0)}})];k(t),G(t)}})})})]})}},45451:function(e,t,a){a.r(t);var o=a(57437),r=a(70899),i=a(77584),l=a(2069),n=a(94013),s=a(8350),d=a(42569),c=a(93769),u=a(2265),h=a(29239);t.default=e=>{let{handleClose:t,onAgregarArticulo:a}=e,[m,p]=(0,u.useState)([]),[x,g]=(0,u.useState)(""),[f,C]=(0,u.useState)({}),[w,b]=(0,u.useState)([]),N=(0,r.Z)("(max-width: 600px)");(0,u.useEffect)(()=>{(async()=>{try{let e=await (0,d.zK)(),t=await e.getAll("articles");t.length>0&&(p(t),b(t))}catch(e){}})()},[]);let S=(e,t)=>{C({...f,[e]:t})},j=e=>{p(w.filter(t=>Object.values(t).map(e=>e?e.toString().toLowerCase():"").some(t=>t.includes(e.toLowerCase()))))};return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)(h.Z,{container:!0,direction:"column",sx:{minHeight:"100vh",backfroundColor:"#ffffff",padding:2},children:[(0,o.jsx)(h.Z,{size:12,children:(0,o.jsxs)(l.Z,{sx:{display:"flex",flexDirection:N?"column":"row",alignItems:"center",gap:2,marginBottom:2},children:[(0,o.jsx)("h2",{children:(0,o.jsx)("strong",{children:"SELECCIONAR ARTICULO"})}),(0,o.jsxs)(l.Z,{sx:{display:"flex",flexDirection:N?"column":"row",alignItems:"center",gap:2,marginLeft:N?0:"auto",width:N?"100%":"auto"},children:[(0,o.jsx)(n.Z,{variant:"outlined",color:"success",sx:{margin:1},onClick:()=>{a(m.filter(e=>f[e.PKcodigo]).map(e=>({...e,cantped:f[e.PKcodigo]}))),t()},children:"Agregar"}),(0,o.jsx)(n.Z,{variant:"contained",color:"error",onClick:t,children:"Cerrar"})]})]})}),(0,o.jsx)(s.Z,{}),(0,o.jsx)(h.Z,{size:12,sx:{padding:2},children:(0,o.jsx)(i.Z,{id:"outlined-basic",label:"Digite Codigo o Referencia para Buscar",multiline:!0,rows:1,variant:"outlined",value:x,onChange:e=>{e.preventDefault(),g(e.target.value),j(e.target.value)},sx:{width:"100%"}})}),(0,o.jsx)(h.Z,{size:12,sx:{flexGrow:1,marginBottom:2},children:(0,o.jsx)(l.Z,{sx:{width:"100%",height:N?500:820},children:(0,o.jsx)(c._,{density:"compact",rows:m,columns:[{field:"PKcodigo",headerName:"COD",width:100,headerClassName:"header-bold"},{field:"Nombre",headerName:"REFERENCIA",width:280,headerClassName:"header-bold"},{field:"Unidad_Empaque",headerName:"EMP",width:80,headerClassName:"header-bold"},{field:"Precio",headerName:"PRECIO",width:90,editable:!0,valueFormatter:e=>{let t=parseFloat(e).toFixed(0);return"".concat(parseFloat(t).toLocaleString())},headerClassName:"header-bold"},{field:"Iva",headerName:"IVA",width:80,valueFormatter:e=>{let t=parseFloat(e).toLocaleString();return"".concat(parseFloat(t).toFixed(1))},headerClassName:"header-bold"},{field:"Descuento",headerName:"DESC",width:80,valueFormatter:e=>{let t=parseFloat(e).toLocaleString();return"".concat(parseFloat(t).toFixed(1))},editable:!0,headerClassName:"header-bold"},{field:"cantped",headerName:"CANT",width:100,headerClassName:"header-bold",renderCell:e=>(0,o.jsx)(i.Z,{size:"small",value:f[e.id]||"",onChange:t=>{let a=t.target.value;/^\d*$/.test(a)&&S(e.id,a)},sx:{width:"70px",height:"20px"},type:"text",inputProps:{inputMode:"numeric"}}),type:"number"},{field:"Precio_Neto",headerName:"NETO",width:80,valueFormatter:e=>{let t=parseFloat(e).toFixed(0);return"".concat(parseFloat(t).toLocaleString())},headerClassName:"header-bold"},{field:"Disp",headerName:"DISP",width:80,valueFormatter:e=>{let t=parseFloat(e).toFixed(0);return"".concat(parseFloat(t).toLocaleString())},headerClassName:"header-bold"}],getRowId:e=>e.PKcodigo,processRowUpdate:e=>{let t=m.map(t=>t.PKcodigo===e.PKcodigo?{...t,...e}:t);return p(t),b(t),e},initialState:{pagination:{paginationModel:{pageSize:20}}},pageSizeOptions:[20]})})})]})})}}}]);