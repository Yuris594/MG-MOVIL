(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5243],{49917:function(e,t,a){Promise.resolve().then(a.bind(a,94967))},94967:function(e,t,a){"use strict";a.r(t);var i=a(57437),l=a(70899),r=a(2069),n=a(53588),s=a(35389),d=a(2265),o=a(98730),h=a(10932),c=a(93769),u=a(99376),f=a(29239),x=a(41698);let m=e=>new Date(e).toLocaleDateString("es-ES",{month:"short",year:"numeric",day:"numeric"}),g=[{field:"Fecha",headerName:"FECHA",width:150,headerClassName:"header-bold",renderCell:e=>m(e.value)},{field:"FKId_clientes",headerName:"NIT",width:150,headerClassName:"header-bold"},{field:"RazonSocial",headerName:"NOMBRE O RAZON SOCIAL",width:500,headerClassName:"header-bold"},{field:"NUMPED",headerName:"NUMERO PEDIDO",width:180,headerClassName:"header-bold"},{field:"ESTADO",headerName:"ESTADO",width:150,headerClassName:"header-bold"}];t.default=()=>{let e=(0,u.useRouter)(),{auth:t,setClienteV:a}=(0,h.a)(),[m,p]=(0,d.useState)([]),[S,w]=(0,d.useState)(""),[N,j]=(0,d.useState)(!0),[C,E]=(0,d.useState)([]),[O,y]=(0,d.useState)([]),D=(0,l.Z)("(max-width: 600px)"),I=async()=>{let e=await fetch(x.x.url+"/pedidos/PEDIDOS/".concat(t.IDSaler),{method:"GET",headers:{"Content-Type":"application/json"}});return await e.json()};(0,d.useEffect)(()=>{(async()=>{try{let e=await I();Array&&Array.isArray(e)&&(p(e),E(e),j(!1))}catch(e){}})()},[]);let b=e=>{p(C.filter(t=>Object.values(t).map(e=>(null==e?void 0:e.toString().toLowerCase())||"").some(t=>t.includes(e.toLowerCase()))))},Z=(0,d.useCallback)(t=>{if(y(t),t.length>0){let i=C.filter(e=>{let a=e.PKId;return!!a&&a.toString().includes(t[0])});localStorage.setItem("detallePedido",JSON.stringify(i)),a(i),e.push("./pedidoEnviado/detallePedido")}},[m]);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o.Z,{}),!0===N?(0,i.jsx)(r.Z,{sx:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"},children:(0,i.jsx)(s.Z,{sx:{color:"#000"}})}):(0,i.jsx)(r.Z,{children:(0,i.jsxs)(f.Z,{container:!0,direction:"column",sx:{minHeight:"100vh",backfroundColor:"#ffffff",padding:2},children:[(0,i.jsx)(f.Z,{size:12,children:(0,i.jsxs)(r.Z,{sx:{display:"flex",flexDirection:D?"column":"row",alignItems:"center"},children:[(0,i.jsx)("h2",{children:(0,i.jsx)("strong",{children:"PEDIDOS ENVIADOS"})}),(0,i.jsx)(r.Z,{sx:{display:"flex",flexDirection:D?"column":"row",alignItems:"center",marginLeft:D?0:"auto",padding:2},children:(0,i.jsx)(n.ZP,{type:"text",value:S,onChange:e=>{let t=e.target.value;w(t),b(t)},placeholder:"Buscar...",sx:{width:300,border:"2px solid black"}})})]})}),(0,i.jsx)(f.Z,{size:12,sx:{flexGrow:1,marginBottom:2},children:(0,i.jsx)(r.Z,{sx:{width:"100%",heigth:D?500:750},children:(0,i.jsx)(c._,{rows:m,columns:g,getRowId:e=>e.PKId,initialState:{pagination:{paginationModel:{pageSize:10}}},pageSizeOptions:[10,20],onRowSelectionModelChange:Z,rowSelectionModel:O})})})]})})]})}}},function(e){e.O(0,[9461,173,7584,5615,1238,3840,3683,8730,2971,2117,1744],function(){return e(e.s=49917)}),_N_E=e.O()}]);