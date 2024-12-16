(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7917],{67686:function(e,t,n){Promise.resolve().then(n.bind(n,86550))},86550:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return w}});var a=n(57437),i=n(70899),o=n(2069),r=n(59832),s=n(8350),l=n(81799),c=n(77584),d=n(2265),h=(0,n(94630).Z)((0,a.jsx)("path",{d:"M11 17h2v-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1h-3v-1h4V8h-2V7h-2v1h-1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3v1H9v2h2zm9-13H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2m0 14H4V6h16z"}),"LocalAtm"),u=n(98730),x=n(10932),m=n(93769),f=n(99376),g=n(29239),C=n(41698),p=n(5515),j=n.n(p);let N=async()=>{let e=await fetch(C.x.url+"/banks/list",{method:"GET",headers:{"Content-Type":"application/json"}});return await e.json()},S=[{field:"CONSECUTIVO",headerName:"RECIBO",width:100,headerClassName:"header-bold"},{field:"NIT",headerName:"NIT",width:150,headerClassName:"header-bold"},{field:"RazonSocial",headerName:"RAZ\xd3N SOCIAL",width:400,headerClassName:"header-bold"},{field:"FECHA",headerName:"FECHA RECIBO",width:200,headerClassName:"header-bold"},{field:"TOTAL",headerName:"TOTAL RECIBO",width:150,headerClassName:"header-bold"}];var w=()=>{let{auth:e}=(0,x.a)(),t=(0,f.useRouter)(),[n,p]=(0,d.useState)([]),[w,b]=(0,d.useState)([]),[E,O]=(0,d.useState)(!1),[I,v]=(0,d.useState)(""),[T,Z]=(0,d.useState)(null),[y,k]=(0,d.useState)(0),[R,z]=(0,d.useState)(""),[A,L]=(0,d.useState)([]),D=(0,i.Z)("(max-width: 600px)");(0,d.useEffect)(()=>{(async()=>{let e=await N();try{e&&p(e)}catch(e){console.log("Error al obtener los datos del banco",e)}})()},[]),(0,d.useEffect)(()=>{(async()=>{try{let t=await fetch(C.x.url+"/receipts/consult/Consignment?ProfileName=Vendedor&ID=".concat(e.ID,"&data=Pendiente"),{method:"GET",headers:{"Content-Type":"application/json"}});if(!t.ok)throw Error("Error en la solicitud: ".concat(t.status));let n=await t.json();b(n)}catch(e){console.log("Error al obtener los datos de Pedidos Pendientes",e)}})()},[]);let B=(0,d.useCallback)(e=>{L(e);let t=e.reduce((e,t)=>{let n=w.find(e=>e.CONSECUTIVO===t);if(n&&n.TOTAL){let t=n.TOTAL.toString().replace(/[$,]/g,"");return e+(t=parseFloat(t)||0)}return e},0),n="".concat(Number(t.toFixed(2)).toLocaleString());k(n),O(n)},[w]),V=async()=>{let n={BankId:T,UserId:e.IDSaler,ConsignmentNumber:R,Total:y,Comments:I,Receipts:A};try{let e=await fetch(C.x.url+"/consignments/add",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!e.ok){let t=await e.json();console.error("Error del Servidor",t),j().fire({icon:"error",title:"Error al crear la consignaci\xf3n",text:t.error||"Error Desconocido."});return}let a=await e.json();console.log("Respuesta exitosa",a),j().fire({icon:"success",title:"Consignaci\xf3n creada con \xe9xito",text:a.text}),t.push("./consignacion")}catch(e){console.error("Error de conexi\xf3n",e),j().fire({icon:"error",title:"Error de Red",text:"No se pudo conectar al servidor. Intente nuevamente m\xe1s tarde."})}};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(u.Z,{}),(0,a.jsxs)(o.Z,{sx:{padding:2},children:[(0,a.jsxs)(o.Z,{sx:{display:"flex",flexDirection:D?"column":"row",justifyContent:"space-between",alignItems:"center"},children:[(0,a.jsx)("h2",{children:(0,a.jsx)("strong",{children:"ELABORAR CONSIGNACI\xd3N"})}),(0,a.jsx)(r.Z,{onClick:V,title:"Generar Consignaci\xf3n",disabled:!E,children:(0,a.jsx)(h,{sx:{fontSize:60},color:"primary"})})]}),(0,a.jsx)(s.Z,{}),(0,a.jsxs)(o.Z,{sx:{display:"flex",flexDirection:"column",gap:2,mt:4},children:[(0,a.jsxs)(g.Z,{container:!0,spacing:2,sx:{flexDirection:D?"column":"row"},children:[(0,a.jsxs)(g.Z,{size:{xs:12,md:6},children:[(0,a.jsx)("strong",{children:"Banco: "}),(0,a.jsx)(l.Z,{id:"bank-selector",fullWidth:!0,size:"small",disablePortal:!0,options:n,getOptionLabel:e=>e.BankName||"","aria-required":!0,onChange:(e,t)=>{Z(t?t.ID:null)},renderInput:e=>(0,a.jsx)(c.Z,{...e,label:"Seleccione el Banco"})})]}),(0,a.jsxs)(g.Z,{size:{xs:12,md:6},children:[(0,a.jsx)("strong",{children:"Numero de Consignaci\xf3n: "}),(0,a.jsx)(c.Z,{value:R,onChange:e=>z(e.target.value),size:"small",variant:"outlined",fullWidth:!0})]})]}),(0,a.jsx)("strong",{children:"Comentarios: "}),(0,a.jsx)(c.Z,{value:I,onChange:e=>v(e.target.value),id:"outlined-basic",multiline:!0,size:"small",variant:"outlined",fullWidth:!0})]}),(0,a.jsx)(o.Z,{sx:{height:295,width:"100%",mt:4},children:(0,a.jsx)(m._,{rows:w,columns:S,getRowId:e=>e.CONSECUTIVO,pageSizeOptions:[5],checkboxSelection:!0,disableRowSelectionOnClick:!0,density:"compact",onRowSelectionModelChange:e=>B(e),initialState:{pagination:{paginationModel:{pageSize:5}}}})}),(0,a.jsxs)(o.Z,{sx:{display:"flex",flexDirection:D?"column":"row",alignItems:"center",gap:2,mt:4},children:[(0,a.jsx)("strong",{children:"Total Consignaci\xf3n: "}),(0,a.jsx)(c.Z,{value:y,variant:"outlined",size:"small",fullWidth:D,sx:{width:D?"100%":250}})]})]})]})}}},function(e){e.O(0,[9461,173,7584,5615,1238,3840,3683,8730,2971,2117,1744],function(){return e(e.s=67686)}),_N_E=e.O()}]);