(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1324],{7842:(e,a,t)=>{Promise.resolve().then(t.bind(t,89411))},52035:(e,a,t)=>{"use strict";t.d(a,{A:()=>i});var o=t(12983),r=t(95155);let i=(0,o.A)((0,r.jsx)("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12z"}),"Cancel")},54941:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>u});var o=t(95155),r=t(23165),i=t(19293),l=t(2572),n=t(22282),s=t(2241),d=t(6283),c=t(30251),h=t(12115),m=t(48097);let u=e=>{let{handleClose:a,onAgregarArticulo:t}=e,[u,p]=(0,h.useState)([]),[g,x]=(0,h.useState)(""),[f,C]=(0,h.useState)({}),[w,N]=(0,h.useState)([]),b=(0,r.A)("(max-width: 600px)");(0,h.useEffect)(()=>{(async()=>{try{let e=await (0,d.Xv)(),a=await e.getAll("articles");a.length>0?(p(a),N(a),console.log("Datos cargados desde la base de datos")):console.log("No se encontraron art\xedculos en la base de datos.")}catch(e){console.log("Error al obtener los productos:",e)}})()},[]);let S=(e,a)=>{C({...f,[e]:a})},A=e=>{p(w.filter(a=>Object.values(a).map(e=>e?e.toString().toLowerCase():"").some(a=>a.includes(e.toLowerCase()))))},j=[{field:"PKcodigo",headerName:"COD",width:100,headerClassName:"header-bold"},{field:"Nombre",headerName:"REFERENCIA",width:280,headerClassName:"header-bold"},{field:"Unidad_Empaque",headerName:"EMP",width:80,headerClassName:"header-bold"},{field:"Precio",headerName:"PRECIO",width:90,editable:!0,valueFormatter:e=>{let a=parseFloat(e).toFixed(0);return"$".concat(parseFloat(a).toLocaleString())},headerClassName:"header-bold"},{field:"Iva",headerName:"IVA",width:80,headerClassName:"header-bold"},{field:"Descuento",headerName:"DESC",width:80,editable:!0,headerClassName:"header-bold"},{field:"cantped",headerName:"CANT",width:100,headerClassName:"header-bold",renderCell:e=>(0,o.jsx)(i.A,{size:"small",value:f[e.id]||"",onChange:a=>S(e.id,a.target.value),sx:{width:"70px",height:"20px"}})},{field:"Precio_Neto",headerName:"NETO",width:80,valueFormatter:e=>{let a=parseFloat(e).toFixed(0);return"$".concat(parseFloat(a).toLocaleString())},headerClassName:"header-bold"},{field:"Disp",headerName:"DISP",width:80,headerClassName:"header-bold"}];return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)(m.A,{container:!0,direction:"column",sx:{minHeight:"100vh",backfroundColor:"#ffffff",padding:2},children:[(0,o.jsx)(m.A,{size:12,children:(0,o.jsxs)(l.A,{sx:{display:"flex",flexDirection:b?"column":"row",alignItems:"center",gap:2,marginBottom:2},children:[(0,o.jsx)("h2",{children:(0,o.jsx)("strong",{children:"SELECCIONAR ARTICULO"})}),(0,o.jsxs)(l.A,{sx:{display:"flex",flexDirection:b?"column":"row",alignItems:"center",gap:2,marginLeft:b?0:"auto",width:b?"100%":"auto"},children:[(0,o.jsx)(n.A,{variant:"outlined",color:"success",sx:{margin:1},onClick:()=>{t(u.filter(e=>f[e.PKcodigo]).map(e=>({...e,cantped:f[e.PKcodigo]}))),a()},children:"Agregar"}),(0,o.jsx)(n.A,{variant:"contained",color:"error",onClick:a,children:"Cerrar"})]})]})}),(0,o.jsx)(s.A,{}),(0,o.jsx)(m.A,{size:12,sx:{padding:2},children:(0,o.jsx)(i.A,{id:"outlined-basic",label:"Digite Codigo o Referencia para Buscar",multiline:!0,rows:1,variant:"outlined",value:g,onChange:e=>{e.preventDefault(),x(e.target.value),A(e.target.value)},sx:{width:"100%"}})}),(0,o.jsx)(m.A,{size:12,sx:{flexGrow:1,marginBottom:2},children:(0,o.jsx)(l.A,{sx:{width:"100%",height:b?500:820},children:(0,o.jsx)(c.z,{density:"compact",rows:u,columns:j,getRowId:e=>e.PKcodigo,processRowUpdate:e=>{let a=u.map(a=>a.PKcodigo===e.PKcodigo?{...a,...e}:a);return p(a),N(a),e},initialState:{pagination:{paginationModel:{pageSize:20}}},pageSizeOptions:[20]})})})]})})}},89411:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>v});var o=t(95155),r=t(23165),i=t(2572),l=t(22282),n=t(2241),s=t(9561),d=t(19293),c=t(92608),h=t(52035),m=t(51991),u=t(70689),p=t(30251),g=t(12115),x=t(76046),f=t(894),C=t(54941),w=t(48097),N=t(8889),b=t(78897),S=t.n(b),A=t(67396);let j={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",maxHeight:"90vh",maxWidth:"80vw",overflowY:"auto",overflowX:"hidden",padding:"16px",bgcolor:"#fff",border:"2px solid #000",boxShadow:24},v=()=>{let e=(0,x.useRouter)(),{auth:a,clienteV:t}=(0,u.A)(),[b,v]=(0,g.useState)(""),[I,E]=(0,g.useState)(""),[D,P]=(0,g.useState)(""),[F,y]=(0,g.useState)(!1),[T,O]=(0,g.useState)(""),[z,K]=(0,g.useState)(""),[k,B]=(0,g.useState)(""),[R,_]=(0,g.useState)(""),[L,U]=(0,g.useState)([]),M=()=>y(!1),G=(0,r.A)("(max-width: 600px)"),J=[{field:"PKcodigo",headerName:"CODIGO",width:150,headerClassName:"header-bold"},{field:"Nombre",headerName:"REFERENCIA",width:350,headerClassName:"header-bold"},{field:"Unidad_Empaque",headerName:"UND EMPAQUE",width:100,headerClassName:"header-bold"},{field:"Precio",headerName:"PRECIO",width:100,valueFormatter:e=>{let a=parseFloat(e).toFixed(0);return"".concat(parseFloat(a).toLocaleString())},headerClassName:"header-bold"},{field:"Iva",headerName:"IVA",width:90,headerClassName:"header-bold"},{field:"Descuento",headerName:"DESC",width:90,headerClassName:"header-bold"},{field:"cantped",headerName:"CANT",width:90,headerClassName:"header-bold"},{field:"Total",headerName:"TOTAL",width:100,valueFormatter:e=>{let a=parseFloat(e).toFixed(0);return"".concat(parseFloat(a).toLocaleString("es-ES"))},cellClassName:"total-cell",headerClassName:"header-bold"},{field:"actions",headerName:"",width:70,renderCell:e=>(0,o.jsx)(f.A,{onClick:()=>q(e.row),"aria-label":"cancel",color:"error",sx:{fontSize:40},children:(0,o.jsx)(h.A,{})})}],q=e=>{S().fire({title:"\xbfSeguro que desea eliminar el articulo?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Aceptar"}).then(a=>{if(a.isConfirmed){let a=L.filter(a=>a.PKcodigo!==e.PKcodigo);U(a),H(a),S().fire("Eliminado","El art\xedculo ha sido eliminado","success")}})},H=e=>{let a=0,t=0,o=0,r=0;e.forEach(e=>{let i=parseFloat(e.Precio),l=parseFloat(e.cantped),n=parseFloat(e.Descuento)/100,s=parseFloat(e.Iva)/100;a+=i*l,o+=i*l*n,r+=i*l*s,t+=parseFloat(e.Total)}),_(o),O(r),K(a),E(t)},W=async()=>{try{let e=await fetch(N.m.url+"/pedidos/".concat(a.IDSaler),{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok)throw Error("Error al obtener el consecutivo: ".concat(e.status," ").concat(e.statusText));let t=await e.json();if(!t[0].consecutivo||!t[0].Prefijo)throw Error("Los campos 'consecutivo' o 'Prefijo' no se encontraron en la respuesta.");return t[0]}catch(e){throw console.error("Error al obtener el consecutivo:",e),e}},$=async()=>{if(!(await S().fire({title:"Almacenar!",text:"\xbfDesea almacenar el Pedido?",icon:"question",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Aceptar",cancelButtonText:"Cancelar"})).isConfirmed){S().fire({text:"El Pedido no se almacen\xf3.",icon:"info",timer:3e3});return}try{let o=await W(),r=o.consecutivo+1,i="".concat(o.Prefijo).concat(r),l=await fetch(N.m.url+"/pedidos/PEDIDOS/".concat(a.IDSaler),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({Consecutivo:r})});if(l.ok)console.log("Consecutivo actualizado correctamente");else throw console.log("Error al actualizar el consecutivo:",l.statusText),Error("Error al actualizar el consecutivo");let n={FKID_sellers:a.IDSaler,Notas:D,FKId_clientes:t.NIT,NUMPED:i,Documento1:k},s=await fetch(N.m.url+"/pedidos/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!s.ok){let e=await s.json();throw console.error("Error al crear el pedido",e),Error("Error al crear el encabezado del pedido")}console.log("Pedido creado correctamente");let d=(parseInt(localStorage.getItem("ultimoFKidPedidos"),10)||0)+1;for(let e of L.map(e=>({FKid_pedidos2:d,FKcodigo_articles:e.PKcodigo,Cantidad:e.cantped,Precio:e.Precio,Descuento:e.Descuento,Iva:e.Iva,Total:e.Total,FKNUMPED:i,BODEGA:e.BODEGA}))){let a=await fetch(N.m.url+"/pedidos/".concat(i),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!a.ok){let e=await a.json();throw console.error("Error al crear el detalle del pedido:",e),Error("Error al crear el detalle del pedido: ".concat(a.status," - ").concat(a.statusText))}}console.log("Detalle del pedido creado correctamente"),localStorage.setItem("ultimoFKidPedidos",d),S().fire({title:"\xa1\xc9xito!",text:"Pedido Fue Almacenado Correctamente.",icon:"success",timer:3e3}),e.push("../../pages/pedidoSinEnviar")}catch(e){console.error("Error:",e.message),console.error("Detalles del error:",e),S().fire({title:"Oops...!",text:"Hubo un problema al enviar el pedido.",icon:"error"})}};return(0,g.useEffect)(()=>{(()=>{let e=new Date,a=e.getDate(),t=e.toLocaleString("es-CO",{month:"short"}),o=t.charAt(0).toUpperCase()+t.slice(1),r=e.getFullYear();v("".concat(o," ").concat(a,", ").concat(r))})()},[]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(m.A,{}),(0,o.jsxs)(w.A,{container:!0,spacing:2,direction:G?"column":"row",alignItems:"center",justifyContent:"space-between",children:[(0,o.jsx)("h2",{style:{margin:4},children:(0,o.jsx)("strong",{children:"DIGITAR PEDIDO"})}),(0,o.jsx)(w.A,{size:{xs:12,sm:8},sx:{padding:2},children:(0,o.jsxs)(i.A,{sx:{display:"flex",flexDirection:G?"column":"row",justifyContent:"center",alignItems:"center"},children:[(0,o.jsx)(l.A,{onClick:()=>y(!0),variant:"contained",sx:{margin:1,backgroundColor:"#4eeacb",color:"white"},children:"Articulos"}),(0,o.jsx)(l.A,{onClick:()=>{let o=JSON.parse(localStorage.getItem("pedidos"))||[],r=0;o.length>0&&(r=Math.max(...o.map(e=>e.PKId)));let i=r+1;localStorage.setItem("ultimoFKidPedidos",i);let l={PKId:i,Fecha:new Date().toISOString(),nombreC:t.RazonSocial,NitC:t.NIT,total:I,NombreV:a.UserFullName,FKID_sellers:a.IDSaler,Notas:D,NUMPED:"",Documento1:k,pkid:i,FKId_clientes:t.NIT,articulos:L.map(e=>({...e,FKid_pedidos2:i}))};o.push(l),localStorage.setItem("pedidos",JSON.stringify(o)),e.push("../../pages/pedidoSinEnviar"),S().fire({title:"Pedido guardado",text:"El pedido ha sido guardado correctamente.",icon:"success",showConfirmButton:!1,timer:3e3})},variant:"contained",sx:{margin:1,backgroundColor:"#8334f0",color:"white"},children:"Guardar"}),(0,o.jsx)(l.A,{onClick:()=>{let o=JSON.parse(localStorage.getItem("cotizacion"))||[],r=0;o.length>0&&(r=Math.max(...o.map(e=>e.PKId)));let i=r+1;localStorage.setItem("ultimoFKidPedidos",i);let l={PKId:i,fecha:new Date().toISOString(),nombreC:t.RazonSocial,nit:t.NIT,telefono:t.Telefono,direccion:t.Direccion,municipio:t.CityName,email:t.Email,total:I,subTotal:z,impuesto:T,descuento:R,idvend:a.ID,FKID_sellers:a.IDSaler,notas:D,NUMPED:"",Documento1:k,articulosSeleccionados:L.map(e=>({...e,FKid_pedidos2:i}))};o.push(l),localStorage.setItem("cotizacion",JSON.stringify(o)),e.push("../../pages/cotizacion"),S().fire({title:"Se creo la Cotizaci\xf3n",text:"Cotizaci\xf3n creada correctamente.",icon:"success",showConfirmButton:!1,timer:3e3})},variant:"contained",sx:{margin:1,backgroundColor:"#e15215",color:"white"},children:"Cotizaci\xf3n"}),(0,o.jsx)(l.A,{onClick:$,variant:"contained",sx:{margin:1},color:"success",children:"Enviar"}),(0,o.jsx)(l.A,{variant:"contained",sx:{ml:1,mr:2},color:"error",LinkComponent:A.default,href:"../client",children:"Cerrar"})]})})]}),(0,o.jsx)(n.A,{}),(0,o.jsx)(w.A,{size:{xs:12,sm:6},sx:{padding:2},children:(0,o.jsxs)(i.A,{sx:{display:"flex",flexDirection:G?"column":"row",justifyContent:"center",alignItems:"center"},children:[(0,o.jsx)(s.A,{sx:{color:"#1947ee",fontWeight:"bold",margin:1},variant:"subtitle2",gutterBottom:!0,children:b}),(0,o.jsx)(s.A,{sx:{color:"#1947ee",fontWeight:"bold",margin:1},variant:"subtitle2",gutterBottom:!0,children:t.RazonSocial}),(0,o.jsx)(s.A,{sx:{color:"#1947ee",fontWeight:"bold",margin:1},variant:"subtitle2",gutterBottom:!0,children:t.NIT})]})}),(0,o.jsx)(w.A,{size:{xs:12,sm:6},sx:{padding:2},children:(0,o.jsxs)(i.A,{sx:{display:"flex",flexDirection:G?"column":"row",justifyContent:"center",alignItems:"center",gap:2,width:G?"100%":"auto"},children:[(0,o.jsx)(d.A,{id:"standard-multiline-flexible",label:"Ingresar Notas",multiline:!0,maxRows:5,variant:"outlined",value:D,onChange:e=>P(e.target.value),sx:{width:500},inputProps:{maxLength:255}}),(0,o.jsx)(d.A,{id:"standard-multiline-flexible",label:"Documento",multiline:!0,maxRows:3,variant:"outlined",value:k,onChange:e=>B(e.target.value),sx:{width:200},inputProps:{maxLength:50}}),(0,o.jsxs)(s.A,{variant:"body1",children:["SubTotal: ",(0,o.jsxs)("span",{style:{color:"red"},children:["$",z]})]}),(0,o.jsxs)(s.A,{variant:"body1",children:["Total: ",(0,o.jsxs)("span",{style:{color:"red"},children:["$",I]})]})]})}),(0,o.jsx)(w.A,{size:12,sx:{flexGrow:1,margin:2},children:(0,o.jsx)(i.A,{sx:{width:"100%",heigth:G?500:750},children:(0,o.jsx)(p.z,{rows:L,columns:J,getRowId:e=>e.PKcodigo,rowHeight:40,pageSizeOptions:[10],initialState:{pagination:{paginationModel:{pageSize:10}}},sx:{bgColor:"#ffffff"}})})}),(0,o.jsx)(c.A,{open:F,onClose:M,"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",disableEnforceFocus:!0,children:(0,o.jsx)(i.A,{sx:j,children:(0,o.jsx)(C.default,{handleClose:M,onAgregarArticulo:e=>{let a=[...L,...e.map(e=>{let a=e.Precio*(1+e.Iva/100),t=parseFloat(e.cantped),o=parseFloat(e.Descuento)/100;return{...e,Total:(a*t*(1-o)).toFixed(0)}})];U(a),H(a)}})})})]})}}},e=>{var a=a=>e(e.s=a);e.O(0,[8320,6121,9293,4269,6251,251,1647,1991,8441,1517,7358],()=>a(7842)),_N_E=e.O()}]);