(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4101],{85662:function(e,t,a){Promise.resolve().then(a.bind(a,22961))},74853:function(e,t,a){"use strict";var o=a(94630),r=a(57437);t.Z=(0,o.Z)((0,r.jsx)("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12z"}),"Cancel")},45451:function(e,t,a){"use strict";a.r(t);var o=a(57437),r=a(70899),l=a(77584),i=a(2069),n=a(94013),s=a(8350),d=a(42569),c=a(93769),h=a(2265),u=a(29239);t.default=e=>{let{handleClose:t,onAgregarArticulo:a}=e,[m,p]=(0,h.useState)([]),[x,g]=(0,h.useState)(""),[f,C]=(0,h.useState)({}),[w,b]=(0,h.useState)([]),N=(0,r.Z)("(max-width: 600px)");(0,h.useEffect)(()=>{(async()=>{try{let e=await (0,d.zK)(),t=await e.getAll("articles");t.length>0?(p(t),b(t),console.log("Datos cargados desde la base de datos")):console.log("No se encontraron art\xedculos en la base de datos.")}catch(e){console.log("Error al obtener los productos:",e)}})()},[]);let j=(e,t)=>{C({...f,[e]:t})},F=e=>{p(w.filter(t=>Object.values(t).map(e=>e?e.toString().toLowerCase():"").some(t=>t.includes(e.toLowerCase()))))};return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)(u.Z,{container:!0,direction:"column",sx:{minHeight:"100vh",backfroundColor:"#ffffff",padding:2},children:[(0,o.jsx)(u.Z,{size:12,children:(0,o.jsxs)(i.Z,{sx:{display:"flex",flexDirection:N?"column":"row",alignItems:"center",gap:2,marginBottom:2},children:[(0,o.jsx)("h2",{children:(0,o.jsx)("strong",{children:"SELECCIONAR ARTICULO"})}),(0,o.jsxs)(i.Z,{sx:{display:"flex",flexDirection:N?"column":"row",alignItems:"center",gap:2,marginLeft:N?0:"auto",width:N?"100%":"auto"},children:[(0,o.jsx)(n.Z,{variant:"outlined",color:"success",sx:{margin:1},onClick:()=>{a(m.filter(e=>f[e.PKcodigo]).map(e=>({...e,cantped:f[e.PKcodigo]}))),t()},children:"Agregar"}),(0,o.jsx)(n.Z,{variant:"contained",color:"error",onClick:t,children:"Cerrar"})]})]})}),(0,o.jsx)(s.Z,{}),(0,o.jsx)(u.Z,{size:12,sx:{padding:2},children:(0,o.jsx)(l.Z,{id:"outlined-basic",label:"Digite Codigo o Referencia para Buscar",multiline:!0,rows:1,variant:"outlined",value:x,onChange:e=>{e.preventDefault(),g(e.target.value),F(e.target.value)},sx:{width:"100%"}})}),(0,o.jsx)(u.Z,{size:12,sx:{flexGrow:1,marginBottom:2},children:(0,o.jsx)(i.Z,{sx:{width:"100%",height:N?500:820},children:(0,o.jsx)(c._,{density:"compact",rows:m,columns:[{field:"PKcodigo",headerName:"COD",width:100,headerClassName:"header-bold"},{field:"Nombre",headerName:"REFERENCIA",width:280,headerClassName:"header-bold"},{field:"Unidad_Empaque",headerName:"EMP",width:80,headerClassName:"header-bold"},{field:"Precio",headerName:"PRECIO",width:90,editable:!0,valueFormatter:e=>{let t=parseFloat(e).toFixed(0);return"".concat(parseFloat(t).toLocaleString())},headerClassName:"header-bold"},{field:"Iva",headerName:"IVA",width:80,valueFormatter:e=>{let t=parseFloat(e).toLocaleString();return"".concat(parseFloat(t).toFixed(1))},headerClassName:"header-bold"},{field:"Descuento",headerName:"DESC",width:80,valueFormatter:e=>{let t=parseFloat(e).toLocaleString();return"".concat(parseFloat(t).toFixed(1))},editable:!0,headerClassName:"header-bold"},{field:"cantped",headerName:"CANT",width:100,headerClassName:"header-bold",renderCell:e=>(0,o.jsx)(l.Z,{size:"small",value:f[e.id]||"",onChange:t=>{let a=t.target.value;/^\d*$/.test(a)&&j(e.id,a)},sx:{width:"70px",height:"20px"},type:"text",inputProps:{inputMode:"numeric"}}),type:"number"},{field:"Precio_Neto",headerName:"NETO",width:80,valueFormatter:e=>{let t=parseFloat(e).toFixed(0);return"".concat(parseFloat(t).toLocaleString())},headerClassName:"header-bold"},{field:"Disp",headerName:"DISP",width:80,valueFormatter:e=>{let t=parseFloat(e).toFixed(0);return"".concat(parseFloat(t).toLocaleString())},headerClassName:"header-bold"}],getRowId:e=>e.PKcodigo,processRowUpdate:e=>{let t=m.map(t=>t.PKcodigo===e.PKcodigo?{...t,...e}:t);return p(t),b(t),e},initialState:{pagination:{paginationModel:{pageSize:20}}},pageSizeOptions:[20]})})})]})})}},22961:function(e,t,a){"use strict";a.r(t);var o=a(57437),r=a(70899),l=a(2069),i=a(94013),n=a(8350),s=a(46387),d=a(77584),c=a(58004),h=a(74853),u=a(98730),m=a(10932),p=a(93769),x=a(2265),g=a(99376),f=a(59832),C=a(45451),w=a(29239),b=a(41698),N=a(5515),j=a.n(N),F=a(27648);let v={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",maxHeight:"90vh",maxWidth:"80vw",overflowY:"auto",overflowX:"hidden",padding:"16px",bgcolor:"#fff",border:"2px solid #000",boxShadow:24};t.default=()=>{let e=(0,g.useRouter)(),{auth:t,clienteV:a}=(0,m.a)(),[N,S]=(0,x.useState)(""),[E,I]=(0,x.useState)(""),[P,D]=(0,x.useState)(""),[Z,y]=(0,x.useState)(!1),T=()=>y(!1),[O,K]=(0,x.useState)(""),[A,z]=(0,x.useState)(""),L=(0,r.Z)("(max-width: 600px)"),[k,R]=(0,x.useState)([]),B=e=>{j().fire({title:"\xbfSeguro que desea eliminar el articulo?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Aceptar"}).then(t=>{if(t.isConfirmed){let t=k.filter(t=>t.PKcodigo!==e.PKcodigo);R(t),_(t),j().fire("Eliminado","El art\xedculo ha sido eliminado","success")}})},_=e=>{let t=0,a=0,o=0,r=0;e.forEach(e=>{let l=parseFloat(e.Precio),i=parseFloat(e.cantped),n=parseFloat(e.Descuento)/100,s=parseFloat(e.Iva)/100;t+=l*i,o+=l*i*n,r+=l*i*s,a+=parseFloat(e.Total)}),K(t),I(a)},U=async()=>{try{let e=await fetch(b.x.url+"/pedidos/".concat(t.IDSaler),{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok)throw Error("Error al obtener el consecutivo: ".concat(e.status," ").concat(e.statusText));let a=await e.json();if(!a[0].consecutivo||!a[0].Prefijo)throw Error("Los campos 'consecutivo' o 'Prefijo' no se encontraron en la respuesta.");return a[0]}catch(e){throw console.error("Error al obtener el consecutivo:",e),e}},M=async()=>{if(!(await j().fire({title:"Almacenar!",text:"\xbfDesea almacenar el Pedido?",icon:"question",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Aceptar",cancelButtonText:"Cancelar"})).isConfirmed){j().fire({text:"El Pedido no se almacen\xf3.",icon:"info",timer:3e3});return}try{let o=await U(),r=o.consecutivo+1,l="".concat(o.Prefijo).concat(r),i=await fetch(b.x.url+"/pedidos/PEDIDOS/".concat(t.IDSaler),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({Consecutivo:r})});if(i.ok)console.log("Consecutivo actualizado correctamente");else throw console.log("Error al actualizar el consecutivo:",i.statusText),Error("Error al actualizar el consecutivo");let n={FKID_sellers:t.IDSaler,Notas:P,FKId_clientes:a.NIT,NUMPED:l,Documento1:A},s=await fetch(b.x.url+"/pedidos/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!s.ok){let e=await s.json();throw console.error("Error al crear el pedido",e),Error("Error al crear el encabezado del pedido")}console.log("Pedido creado correctamente");let d=(parseInt(localStorage.getItem("ultimoFKidPedidos"),10)||0)+1;for(let e of k.map(e=>({FKid_pedidos2:d,FKcodigo_articles:e.PKcodigo,Cantidad:e.cantped,Precio:e.Precio,Descuento:e.Descuento,Iva:e.Iva,Total:e.Total,FKNUMPED:l,BODEGA:e.BODEGA}))){let t=await fetch(b.x.url+"/pedidos/".concat(l),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!t.ok){let e=await t.json();throw console.error("Error al crear el detalle del pedido:",e),Error("Error al crear el detalle del pedido: ".concat(t.status," - ").concat(t.statusText))}}console.log("Detalle del pedido creado correctamente"),localStorage.setItem("ultimoFKidPedidos",d),j().fire({title:"\xa1\xc9xito!",text:"Pedido Fue Almacenado Correctamente.",icon:"success",timer:3e3}),e.push("../../pages/pedidoSinEnviar")}catch(e){console.error("Error:",e.message),console.error("Detalles del error:",e),j().fire({title:"Oops...!",text:"Hubo un problema al enviar el pedido.",icon:"error"})}};return(0,x.useEffect)(()=>{(()=>{let e=new Date,t=e.getDate(),a=e.toLocaleString("es-CO",{month:"short"}),o=a.charAt(0).toUpperCase()+a.slice(1),r=e.getFullYear();S("".concat(o," ").concat(t,", ").concat(r))})()},[]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(u.Z,{}),(0,o.jsxs)(w.Z,{container:!0,spacing:2,direction:L?"column":"row",alignItems:"center",justifyContent:"space-between",children:[(0,o.jsx)("h2",{style:{margin:4},children:(0,o.jsx)("strong",{children:"CREAR PEDIDO"})}),(0,o.jsx)(w.Z,{size:{xs:12,sm:8},sx:{padding:2},children:(0,o.jsxs)(l.Z,{sx:{display:"flex",flexDirection:L?"column":"row",justifyContent:"center",alignItems:"center"},children:[(0,o.jsx)(i.Z,{onClick:()=>y(!0),variant:"contained",sx:{margin:1,backgroundColor:"#4eeacb",color:"white"},children:"Articulos"}),(0,o.jsx)(i.Z,{onClick:()=>{let o=JSON.parse(localStorage.getItem("pedidos"))||[],r=0;o.length>0&&(r=Math.max(...o.map(e=>e.PKId)));let l=r+1;localStorage.setItem("ultimoFKidPedidos",l);let i={PKId:l,Fecha:new Date().toISOString(),nombreC:a.RazonSocial,NitC:a.NIT,total:E,NombreV:t.UserFullName,FKID_sellers:t.IDSaler,Notas:P,NUMPED:"",Documento1:A,pkid:l,FKId_clientes:a.NIT,articulos:k.map(e=>({...e,FKid_pedidos2:l}))};o.push(i),localStorage.setItem("pedidos",JSON.stringify(o)),e.push("../../pages/pedidoSinEnviar"),j().fire({title:"Pedido guardado",text:"El pedido ha sido guardado correctamente.",icon:"success",showConfirmButton:!1,timer:3e3})},variant:"contained",sx:{margin:1,backgroundColor:"#8334f0",color:"white"},children:"Guardar"}),(0,o.jsx)(i.Z,{onClick:M,variant:"contained",sx:{margin:1},color:"success",children:"Enviar"}),(0,o.jsx)(i.Z,{variant:"contained",sx:{ml:1,mr:2},color:"error",LinkComponent:F.default,href:"../client",children:"Cerrar"})]})})]}),(0,o.jsx)(n.Z,{}),(0,o.jsx)(w.Z,{size:{xs:12,sm:6},sx:{padding:2},children:(0,o.jsxs)(l.Z,{sx:{display:"flex",flexDirection:L?"column":"row",justifyContent:"center",alignItems:"center"},children:[(0,o.jsx)(s.Z,{sx:{color:"#1947ee",fontWeight:"bold",margin:1},variant:"subtitle2",gutterBottom:!0,children:N}),(0,o.jsx)(s.Z,{sx:{color:"#1947ee",fontWeight:"bold",margin:1},variant:"subtitle2",gutterBottom:!0,children:a.RazonSocial}),(0,o.jsx)(s.Z,{sx:{color:"#1947ee",fontWeight:"bold",margin:1},variant:"subtitle2",gutterBottom:!0,children:a.NIT})]})}),(0,o.jsx)(w.Z,{size:{xs:12,sm:6},sx:{padding:2},children:(0,o.jsxs)(l.Z,{sx:{display:"flex",flexDirection:L?"column":"row",justifyContent:"center",alignItems:"center",gap:2,width:L?"100%":"auto"},children:[(0,o.jsx)(d.Z,{id:"standard-multiline-flexible",label:"Ingresar Notas",multiline:!0,maxRows:5,variant:"outlined",value:P,onChange:e=>D(e.target.value),sx:{width:500},inputProps:{maxLength:255}}),(0,o.jsx)(d.Z,{id:"standard-multiline-flexible",label:"Documento",multiline:!0,maxRows:3,variant:"outlined",value:A,onChange:e=>z(e.target.value),sx:{width:200},inputProps:{maxLength:50}}),(0,o.jsxs)(s.Z,{variant:"body1",children:["SubTotal: ",(0,o.jsxs)("span",{style:{color:"red"},children:["$",O]})]}),(0,o.jsxs)(s.Z,{variant:"body1",children:["Total: ",(0,o.jsxs)("span",{style:{color:"red"},children:["$",E]})]})]})}),(0,o.jsx)(w.Z,{size:12,sx:{flexGrow:1,margin:2},children:(0,o.jsx)(l.Z,{sx:{width:"100%",heigth:L?500:750},children:(0,o.jsx)(p._,{rows:k,columns:[{field:"PKcodigo",headerName:"CODIGO",width:150,headerClassName:"header-bold"},{field:"Nombre",headerName:"REFERENCIA",width:350,headerClassName:"header-bold"},{field:"Unidad_Empaque",headerName:"UND EMPAQUE",width:100,headerClassName:"header-bold"},{field:"Precio",headerName:"PRECIO",width:100,valueFormatter:e=>{let t=parseFloat(e).toFixed(0);return"".concat(parseFloat(t).toLocaleString())},headerClassName:"header-bold"},{field:"Iva",headerName:"IVA",width:90,valueFormatter:e=>{let t=parseFloat(e).toLocaleString();return"".concat(parseFloat(t).toFixed(1))},headerClassName:"header-bold"},{field:"Descuento",headerName:"DESC",width:90,valueFormatter:e=>{let t=parseFloat(e).toLocaleString();return"".concat(parseFloat(t).toFixed(1))},headerClassName:"header-bold"},{field:"cantped",headerName:"CANT",width:90,headerClassName:"header-bold"},{field:"Total",headerName:"TOTAL",width:100,valueFormatter:e=>{let t=parseFloat(e).toFixed(0);return"".concat(parseFloat(t).toLocaleString())},cellClassName:"total-cell",headerClassName:"header-bold"},{field:"actions",headerName:"",width:70,renderCell:e=>(0,o.jsx)(f.Z,{onClick:()=>B(e.row),"aria-label":"cancel",color:"error",sx:{fontSize:40},children:(0,o.jsx)(h.Z,{})})}],getRowId:e=>e.PKcodigo,rowHeight:40,pageSizeOptions:[10],initialState:{pagination:{paginationModel:{pageSize:10}}},sx:{bgColor:"#ffffff"}})})}),(0,o.jsx)(c.Z,{open:Z,onClose:T,"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",disableEnforceFocus:!0,children:(0,o.jsx)(l.Z,{sx:v,children:(0,o.jsx)(C.default,{handleClose:T,onAgregarArticulo:e=>{let t=[...k,...e.map(e=>{let t=e.Precio*(1+e.Iva/100),a=parseFloat(e.cantped),o=parseFloat(e.Descuento)/100;return{...e,Total:(t*a*(1-o)).toFixed(0)}})];R(t),_(t)}})})})]})}}},function(e){e.O(0,[9461,173,7584,5615,1238,3840,3683,8730,2971,2117,1744],function(){return e(e.s=85662)}),_N_E=e.O()}]);