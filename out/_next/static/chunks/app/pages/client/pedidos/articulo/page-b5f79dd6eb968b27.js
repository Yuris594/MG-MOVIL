(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6261],{50706:function(e,a,t){Promise.resolve().then(t.bind(t,45451))},42569:function(e,a,t){"use strict";t.d(a,{b:function(){return i},zK:function(){return o}});var r=t(90960);let o=async()=>await (0,r.X3)("IDBService",1,{upgrade(e){e.createObjectStore("articles",{keyPath:"id",autoIncrement:!0}),e.createObjectStore("cartera",{keyPath:"id",autoIncrement:!0}),e.createObjectStore("customers",{keyPath:"id",autoIncrement:!0})}}),i=async()=>{let e=await o(),a=["articles","cartera","customers"],t=e.transaction(a,"readwrite");for(let e of a)await t.objectStore(e).clear();console.log("Base de datos limpiada")}},45451:function(e,a,t){"use strict";t.r(a);var r=t(57437),o=t(70899),i=t(77584),l=t(2069),d=t(94013),n=t(8350),s=t(42569),c=t(93769),u=t(2265),h=t(29239);a.default=e=>{let{handleClose:a,onAgregarArticulo:t}=e,[m,g]=(0,u.useState)([]),[p,f]=(0,u.useState)(""),[x,b]=(0,u.useState)({}),[N,w]=(0,u.useState)([]),C=(0,o.Z)("(max-width: 600px)");(0,u.useEffect)(()=>{(async()=>{try{let e=await (0,s.zK)(),a=await e.getAll("articles");a.length>0?(g(a),w(a),console.log("Datos cargados desde la base de datos")):console.log("No se encontraron art\xedculos en la base de datos.")}catch(e){console.log("Error al obtener los productos:",e)}})()},[]);let j=(e,a)=>{b({...x,[e]:a})},v=e=>{g(N.filter(a=>Object.values(a).map(e=>e?e.toString().toLowerCase():"").some(a=>a.includes(e.toLowerCase()))))};return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(h.Z,{container:!0,direction:"column",sx:{minHeight:"100vh",backfroundColor:"#ffffff",padding:2},children:[(0,r.jsx)(h.Z,{size:12,children:(0,r.jsxs)(l.Z,{sx:{display:"flex",flexDirection:C?"column":"row",alignItems:"center",gap:2,marginBottom:2},children:[(0,r.jsx)("h2",{children:(0,r.jsx)("strong",{children:"SELECCIONAR ARTICULO"})}),(0,r.jsxs)(l.Z,{sx:{display:"flex",flexDirection:C?"column":"row",alignItems:"center",gap:2,marginLeft:C?0:"auto",width:C?"100%":"auto"},children:[(0,r.jsx)(d.Z,{variant:"outlined",color:"success",sx:{margin:1},onClick:()=>{t(m.filter(e=>x[e.PKcodigo]).map(e=>({...e,cantped:x[e.PKcodigo]}))),a()},children:"Agregar"}),(0,r.jsx)(d.Z,{variant:"contained",color:"error",onClick:a,children:"Cerrar"})]})]})}),(0,r.jsx)(n.Z,{}),(0,r.jsx)(h.Z,{size:12,sx:{padding:2},children:(0,r.jsx)(i.Z,{id:"outlined-basic",label:"Digite Codigo o Referencia para Buscar",multiline:!0,rows:1,variant:"outlined",value:p,onChange:e=>{e.preventDefault(),f(e.target.value),v(e.target.value)},sx:{width:"100%"}})}),(0,r.jsx)(h.Z,{size:12,sx:{flexGrow:1,marginBottom:2},children:(0,r.jsx)(l.Z,{sx:{width:"100%",height:C?500:820},children:(0,r.jsx)(c._,{density:"compact",rows:m,columns:[{field:"PKcodigo",headerName:"COD",width:100,headerClassName:"header-bold"},{field:"Nombre",headerName:"REFERENCIA",width:280,headerClassName:"header-bold"},{field:"Unidad_Empaque",headerName:"EMP",width:80,headerClassName:"header-bold"},{field:"Precio",headerName:"PRECIO",width:90,editable:!0,valueFormatter:e=>{let a=Number(e).toFixed(0);return"".concat(parseFloat(a).toLocaleString())},headerClassName:"header-bold"},{field:"Iva",headerName:"IVA",width:80,valueFormatter:e=>{let a=Number(e).toLocaleString();return"".concat(parseFloat(a).toFixed(1))},headerClassName:"header-bold"},{field:"Descuento",headerName:"DESC",width:80,valueFormatter:e=>{let a=Number(e).toLocaleString();return"".concat(parseFloat(a).toFixed(1))},editable:!0,headerClassName:"header-bold"},{field:"cantped",headerName:"CANT",width:100,headerClassName:"header-bold",renderCell:e=>(0,r.jsx)(i.Z,{size:"small",value:x[e.id]||"",onChange:a=>{let t=a.target.value;/^\d*$/.test(t)&&j(e.id,t)},sx:{width:"70px",height:"20px"},type:"text",inputProps:{inputMode:"numeric"}}),type:"number"},{field:"Precio_Neto",headerName:"NETO",width:80,valueFormatter:e=>{let a=Number(e).toFixed(0);return"".concat(parseFloat(a).toLocaleString())},headerClassName:"header-bold"},{field:"Disp",headerName:"DISP",width:80,valueFormatter:e=>{let a=Number(e).toFixed(0);return"".concat(parseFloat(a).toLocaleString())},headerClassName:"header-bold"}],getRowId:e=>e.PKcodigo,processRowUpdate:e=>{let a=m.map(a=>a.PKcodigo===e.PKcodigo?{...a,...e}:a);return g(a),w(a),e},initialState:{pagination:{paginationModel:{pageSize:20}}},pageSizeOptions:[20]})})})]})})}}},function(e){e.O(0,[173,7584,5615,1238,3840,2971,2117,1744],function(){return e(e.s=50706)}),_N_E=e.O()}]);