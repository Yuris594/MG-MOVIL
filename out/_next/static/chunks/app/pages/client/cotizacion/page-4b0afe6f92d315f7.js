(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1294],{34562:function(e,a,t){Promise.resolve().then(t.bind(t,80296))},74853:function(e,a,t){"use strict";var o=t(94630),r=t(57437);a.Z=(0,o.Z)((0,r.jsx)("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12z"}),"Cancel")},80296:function(e,a,t){"use strict";t.r(a);var o=t(57437),r=t(70899),i=t(2069),l=t(94013),n=t(8350),s=t(46387),d=t(77584),c=t(58004),h=t(74853),u=t(98730),m=t(45451),x=t(10932),g=t(93769),p=t(2265),f=t(99376),C=t(59832),w=t(29239),b=t(5515),N=t.n(b),F=t(27648);let j={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",maxHeight:"90vh",maxWidth:"80vw",overflowY:"auto",overflowX:"hidden",padding:"16px",bgcolor:"#fff",border:"2px solid #000",boxShadow:24};a.default=()=>{let e=(0,f.useRouter)(),{auth:a,clienteV:t}=(0,x.a)(),[b,S]=(0,p.useState)(""),[v,Z]=(0,p.useState)(""),[I,E]=(0,p.useState)(""),[D,P]=(0,p.useState)(!1),[z,y]=(0,p.useState)(""),[L,A]=(0,p.useState)(""),[O,R]=(0,p.useState)(""),[K,T]=(0,p.useState)(""),[k,_]=(0,p.useState)([]),B=()=>P(!1),U=(0,r.Z)("(max-width: 600px)"),M=e=>{N().fire({title:"\xbfSeguro que desea eliminar el articulo?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Aceptar"}).then(a=>{if(a.isConfirmed){let a=k.filter(a=>a.PKcodigo!==e.PKcodigo);_(a),G(a),N().fire("Eliminado","El art\xedculo ha sido eliminado","success")}})},G=e=>{let a=0,t=0,o=0,r=0;e.forEach(e=>{let i=parseFloat(e.Precio),l=parseFloat(e.cantped),n=parseFloat(e.Descuento)/100,s=parseFloat(e.Iva)/100;a+=i*l,o+=i*l*n,r+=i*l*s,t+=parseFloat(e.Total)});let i=a-o;T(o),y(r),A(i.toFixed(0)),Z(t)};return(0,p.useEffect)(()=>{(()=>{let e=new Date,a=e.getDate(),t=e.toLocaleString("es-CO",{month:"short"}),o=t.charAt(0).toUpperCase()+t.slice(1),r=e.getFullYear();S("".concat(o," ").concat(a,", ").concat(r))})()},[]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(u.Z,{}),(0,o.jsxs)(w.Z,{container:!0,spacing:2,direction:U?"column":"row",alignItems:"center",justifyContent:"space-between",children:[(0,o.jsx)("h2",{style:{margin:4},children:(0,o.jsx)("strong",{children:"CREAR COTIZACI\xd3N"})}),(0,o.jsx)(w.Z,{size:{xs:12,sm:8},sx:{padding:2},children:(0,o.jsxs)(i.Z,{sx:{display:"flex",flexDirection:U?"column":"row",justifyContent:"center",alignItems:"center"},children:[(0,o.jsx)(l.Z,{onClick:()=>P(!0),variant:"contained",sx:{margin:1,backgroundColor:"#4eeacb",color:"white"},children:"Articulos"}),(0,o.jsx)(l.Z,{onClick:()=>{try{if(0===k.length){N().fire({title:"Error al guardar.",text:"No se puede guardar la cotizaci\xf3n. La cotizaci\xf3n debe incluir articulos.",icon:"error"});return}let o=JSON.parse(localStorage.getItem("cotizacion"))||[],r=(parseInt(localStorage.getItem("ultimoFKidPedidos"))||[])+1;localStorage.setItem("ultimoFKidPedidos",r);let i={PKId:r,fecha:new Date().toISOString(),nombreC:t.RazonSocial,nit:t.NIT,telefono:t.Telefono,direccion:t.Direccion,municipio:t.CityName,email:t.Email,total:v,subTotal:L,impuesto:z,descuento:K,idvend:a.ID,FKID_sellers:a.IDSaler,notas:I,NUMPED:"",Documento1:O,articulosSeleccionados:k.map(e=>({...e,FKid_pedidos2:r}))};o.push(i),localStorage.setItem("cotizacion",JSON.stringify(o)),e.push("../../pages/cotizacion"),N().fire({title:"Cotizaci\xf3n Exitosa.",text:"Cotizaci\xf3n creada correctamente.",icon:"success",showConfirmButton:!1,timer:3e3})}catch(e){N().fire({icon:"error",title:"Error al guardar la Cotizaci\xf3n",text:"La cotiza\xf3n debe contener articulos."})}},variant:"contained",sx:{margin:1,backgroundColor:"#67e947",color:"white"},children:"Guardar Cotizacion"}),(0,o.jsx)(l.Z,{variant:"contained",sx:{ml:1,mr:2},color:"error",LinkComponent:F.default,href:"../client",children:"Cerrar"})]})})]}),(0,o.jsx)(n.Z,{}),(0,o.jsx)(w.Z,{size:{xs:12,sm:6},sx:{padding:2},children:(0,o.jsxs)(i.Z,{sx:{display:"flex",flexDirection:U?"column":"row",justifyContent:"center",alignItems:"center"},children:[(0,o.jsx)(s.Z,{sx:{color:"#1947ee",fontWeight:"bold",margin:1},variant:"subtitle2",gutterBottom:!0,children:b}),(0,o.jsx)(s.Z,{sx:{color:"#1947ee",fontWeight:"bold",margin:1},variant:"subtitle2",gutterBottom:!0,children:t.RazonSocial}),(0,o.jsx)(s.Z,{sx:{color:"#1947ee",fontWeight:"bold",margin:1},variant:"subtitle2",gutterBottom:!0,children:t.NIT})]})}),(0,o.jsx)(w.Z,{size:{xs:12,sm:6},sx:{padding:2},children:(0,o.jsxs)(i.Z,{sx:{display:"flex",flexDirection:U?"column":"row",justifyContent:"center",alignItems:"center",gap:2,width:U?"100%":"auto"},children:[(0,o.jsx)(d.Z,{id:"standard-multiline-flexible",label:"Ingresar Notas",multiline:!0,maxRows:5,variant:"outlined",value:I,onChange:e=>E(e.target.value),sx:{width:500},inputProps:{maxLength:255}}),(0,o.jsx)(d.Z,{id:"standard-multiline-flexible",label:"Documento",multiline:!0,maxRows:3,variant:"outlined",value:O,onChange:e=>R(e.target.value),sx:{width:200},inputProps:{maxLength:50}}),(0,o.jsxs)(s.Z,{variant:"body1",children:["SubTotal: ",(0,o.jsx)("span",{style:{color:"red"},children:L})]}),(0,o.jsxs)(s.Z,{variant:"body1",children:["Total: ",(0,o.jsx)("span",{style:{color:"red"},children:v})]})]})}),(0,o.jsx)(w.Z,{size:12,sx:{flexGrow:1,margin:2},children:(0,o.jsx)(i.Z,{sx:{width:"100%",heigth:U?500:750},children:(0,o.jsx)(g._,{rows:k,columns:[{field:"PKcodigo",headerName:"CODIGO",width:150,headerClassName:"header-bold"},{field:"Nombre",headerName:"REFERENCIA",width:350,headerClassName:"header-bold"},{field:"Unidad_Empaque",headerName:"UND EMPAQUE",width:100,headerClassName:"header-bold"},{field:"Precio",headerName:"PRECIO",width:100,valueFormatter:e=>{let a=parseFloat(e).toFixed(0);return"".concat(parseFloat(a).toLocaleString())},headerClassName:"header-bold"},{field:"Iva",headerName:"IVA",width:90,valueFormatter:e=>{let a=parseFloat(e).toLocaleString();return"".concat(parseFloat(a).toFixed(1))},headerClassName:"header-bold"},{field:"Descuento",headerName:"DESC",width:90,valueFormatter:e=>{let a=parseFloat(e).toLocaleString();return"".concat(parseFloat(a).toFixed(1))},headerClassName:"header-bold"},{field:"cantped",headerName:"CANT",width:90,headerClassName:"header-bold"},{field:"Total",headerName:"TOTAL",width:100,valueFormatter:e=>{let a=parseFloat(e).toFixed(0);return"".concat(parseFloat(a).toLocaleString())},cellClassName:"total-cell",headerClassName:"header-bold"},{field:"actions",headerName:"",width:70,renderCell:e=>(0,o.jsx)(C.Z,{onClick:()=>M(e.row),"aria-label":"cancel",color:"error",sx:{fontSize:40},children:(0,o.jsx)(h.Z,{})})}],getRowId:e=>e.PKcodigo,rowHeight:40,pageSizeOptions:[10],initialState:{pagination:{paginationModel:{pageSize:10}}},sx:{bgColor:"#ffffff"}})})}),(0,o.jsx)(c.Z,{open:D,onClose:B,"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",disableEnforceFocus:!0,children:(0,o.jsx)(i.Z,{sx:j,children:(0,o.jsx)(m.default,{handleClose:B,onAgregarArticulo:e=>{let a=[...k,...e.map(e=>{let a=e.Precio*(1+e.Iva/100),t=parseFloat(e.cantped),o=parseFloat(e.Descuento)/100;return{...e,Total:(a*t*(1-o)).toFixed(0)}})];_(a),G(a)}})})})]})}},45451:function(e,a,t){"use strict";t.r(a);var o=t(57437),r=t(70899),i=t(77584),l=t(2069),n=t(94013),s=t(8350),d=t(42569),c=t(93769),h=t(2265),u=t(29239);a.default=e=>{let{handleClose:a,onAgregarArticulo:t}=e,[m,x]=(0,h.useState)([]),[g,p]=(0,h.useState)(""),[f,C]=(0,h.useState)({}),[w,b]=(0,h.useState)([]),N=(0,r.Z)("(max-width: 600px)");(0,h.useEffect)(()=>{(async()=>{try{let e=await (0,d.zK)(),a=await e.getAll("articles");a.length>0?(x(a),b(a),console.log("Datos cargados desde la base de datos")):console.log("No se encontraron art\xedculos en la base de datos.")}catch(e){console.log("Error al obtener los productos:",e)}})()},[]);let F=(e,a)=>{C({...f,[e]:a})},j=e=>{x(w.filter(a=>Object.values(a).map(e=>e?e.toString().toLowerCase():"").some(a=>a.includes(e.toLowerCase()))))};return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)(u.Z,{container:!0,direction:"column",sx:{minHeight:"100vh",backfroundColor:"#ffffff",padding:2},children:[(0,o.jsx)(u.Z,{size:12,children:(0,o.jsxs)(l.Z,{sx:{display:"flex",flexDirection:N?"column":"row",alignItems:"center",gap:2,marginBottom:2},children:[(0,o.jsx)("h2",{children:(0,o.jsx)("strong",{children:"SELECCIONAR ARTICULO"})}),(0,o.jsxs)(l.Z,{sx:{display:"flex",flexDirection:N?"column":"row",alignItems:"center",gap:2,marginLeft:N?0:"auto",width:N?"100%":"auto"},children:[(0,o.jsx)(n.Z,{variant:"outlined",color:"success",sx:{margin:1},onClick:()=>{t(m.filter(e=>f[e.PKcodigo]).map(e=>({...e,cantped:f[e.PKcodigo]}))),a()},children:"Agregar"}),(0,o.jsx)(n.Z,{variant:"contained",color:"error",onClick:a,children:"Cerrar"})]})]})}),(0,o.jsx)(s.Z,{}),(0,o.jsx)(u.Z,{size:12,sx:{padding:2},children:(0,o.jsx)(i.Z,{id:"outlined-basic",label:"Digite Codigo o Referencia para Buscar",multiline:!0,rows:1,variant:"outlined",value:g,onChange:e=>{e.preventDefault(),p(e.target.value),j(e.target.value)},sx:{width:"100%"}})}),(0,o.jsx)(u.Z,{size:12,sx:{flexGrow:1,marginBottom:2},children:(0,o.jsx)(l.Z,{sx:{width:"100%",height:N?500:820},children:(0,o.jsx)(c._,{density:"compact",rows:m,columns:[{field:"PKcodigo",headerName:"COD",width:100,headerClassName:"header-bold"},{field:"Nombre",headerName:"REFERENCIA",width:280,headerClassName:"header-bold"},{field:"Unidad_Empaque",headerName:"EMP",width:80,headerClassName:"header-bold"},{field:"Precio",headerName:"PRECIO",width:90,editable:!0,valueFormatter:e=>{let a=parseFloat(e).toFixed(0);return"".concat(parseFloat(a).toLocaleString())},headerClassName:"header-bold"},{field:"Iva",headerName:"IVA",width:80,valueFormatter:e=>{let a=parseFloat(e).toLocaleString();return"".concat(parseFloat(a).toFixed(1))},headerClassName:"header-bold"},{field:"Descuento",headerName:"DESC",width:80,valueFormatter:e=>{let a=parseFloat(e).toLocaleString();return"".concat(parseFloat(a).toFixed(1))},editable:!0,headerClassName:"header-bold"},{field:"cantped",headerName:"CANT",width:100,headerClassName:"header-bold",renderCell:e=>(0,o.jsx)(i.Z,{size:"small",value:f[e.id]||"",onChange:a=>{let t=a.target.value;/^\d*$/.test(t)&&F(e.id,t)},sx:{width:"70px",height:"20px"},type:"text",inputProps:{inputMode:"numeric"}}),type:"number"},{field:"Precio_Neto",headerName:"NETO",width:80,valueFormatter:e=>{let a=parseFloat(e).toFixed(0);return"".concat(parseFloat(a).toLocaleString())},headerClassName:"header-bold"},{field:"Disp",headerName:"DISP",width:80,valueFormatter:e=>{let a=parseFloat(e).toFixed(0);return"".concat(parseFloat(a).toLocaleString())},headerClassName:"header-bold"}],getRowId:e=>e.PKcodigo,processRowUpdate:e=>{let a=m.map(a=>a.PKcodigo===e.PKcodigo?{...a,...e}:a);return x(a),b(a),e},initialState:{pagination:{paginationModel:{pageSize:20}}},pageSizeOptions:[20]})})})]})})}}},function(e){e.O(0,[9461,173,7584,5615,1238,3840,3683,8730,2971,2117,1744],function(){return e(e.s=34562)}),_N_E=e.O()}]);