(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8695],{60616:function(e,a,t){Promise.resolve().then(t.bind(t,24511))},24511:function(e,a,t){"use strict";t.r(a);var i=t(57437),r=t(70899),o=t(94013),n=t(2069),l=t(77584),d=t(58004),s=t(98730),c=t(10932),h=t(13462),f=t(2265),u=t(93769),m=t(29239),x=t(5515),p=t.n(x);let C={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"80%",maxHeight:"90vh",bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,overflow:"auto",p:4};a.default=()=>{let{auth:e,setPedidosV:a}=(0,c.a)(),[t,x]=(0,f.useState)(!1),[g,b]=(0,f.useState)([]),[w,S]=(0,f.useState)([]),[N,v]=(0,f.useState)([]),[j,Z]=(0,f.useState)(null),E=(0,r.Z)("(max-width: 600px)"),O=e=>{Z(e),x(!0)},k=()=>{x(!1),Z(null)};(0,f.useEffect)(()=>{let e=(JSON.parse(localStorage.getItem("cotizacion"))||[]).map(e=>({...e,fechaFormateada:z(e.fecha)}));b(e),v(e)},[]);let z=e=>{let a=new Date(e),t=a.getDate().toString().padStart(2,"0"),i=(a.getMonth()+1).toString().padStart(2,"0"),r=a.getFullYear();return"".concat(i,"/").concat(t,"/").concat(r)},P=e=>{let a=g.filter(a=>a.PKId!==e.PKId);localStorage.setItem("cotizacion",JSON.stringify(a)),b(a)},I=e=>{b(N.filter(a=>Object.values(a).map(e=>e?e.toString().toLowerCase():"").some(a=>a.includes(e.toLowerCase()))))},y=async e=>{if(!(await p().fire({title:"Enviar PDF!",text:"\xbfDesea Enviar la Cotizaci\xf3n al Cliente?",icon:"question",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Aceptar",cancelButtonText:"Cancelar"})).isConfirmed){p().fire({text:"El PDF no se envi\xf3.",icon:"info",timer:3e3});return}try{(await fetch(Global.url+"/cotizacion/enviarPdf",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...e})})).ok&&p().fire({title:"\xa1\xc9xito!",text:"La Cotizaci\xf3n fue Enviada.",icon:"success",timer:3e3})}catch(e){console.error("Error generando el PDF:",e),p().fire({icon:"error",title:"Oops..!",text:"Revisar el Email del cliente, No se puede enviar la cotizaci\xf3n."})}};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.Z,{}),(0,i.jsxs)(m.Z,{container:!0,direction:"column",sx:{minHeight:"100vh",backfroundColor:"#ffffff",padding:3},children:[(0,i.jsx)(m.Z,{size:12,children:(0,i.jsxs)(n.Z,{sx:{display:"flex",flexDirection:E?"column":"row",alignItems:"center",justifyContent:"space-between",mb:3},children:[(0,i.jsx)("h2",{children:(0,i.jsx)("strong",{children:"COTIZACI\xd3N"})}),(0,i.jsx)(l.Z,{variant:"outlined",value:w,onChange:e=>{S(e.target.value),I(e.target.value),console.log(e.target.value)},label:"Buscar",sx:{width:E?"100%":350,backgroundColor:"#fff",borderRadius:2}})]})}),(0,i.jsx)(m.Z,{size:12,sx:{flexGrow:1},children:(0,i.jsx)(n.Z,{sx:{width:"100%",heigth:E?500:750,borderRadius:2},children:(0,i.jsx)(u._,{rows:g,columns:[{field:"PKId",headerName:"No",width:80,headerClassName:"header-bold"},{field:"fechaFormateada",headerName:"FECHA",width:150,headerClassName:"header-bold"},{field:"nit",headerName:"NIT",width:150,headerClassName:"header-bold"},{field:"nombreC",headerName:"NOMBRE O RAZON SOCIAL",width:400,headerClassName:"header-bold"},{field:"enviar",headerName:"",width:100,renderCell:e=>(0,i.jsx)(o.Z,{onClick:()=>y(e.row),"aria-label":"enviar",color:"success",sx:{fontSize:12},children:"Enviar PDF"})},{field:"editar",headerName:"",width:100,renderCell:e=>(0,i.jsx)(o.Z,{onClick:()=>O(e.row),"aria-label":"editar",sx:{fontSize:12},children:"Modificar"})},{field:"actions",headerName:"",width:100,renderCell:e=>(0,i.jsx)(o.Z,{onClick:()=>P(e.row),"aria-label":"cancel",color:"error",sx:{fontSize:12},children:"Eliminar"})}],getRowId:e=>e.PKId,initialState:{pagination:{paginationModel:{pageSize:10}}},pageSizeOptions:[5,10,15]})})})]}),(0,i.jsx)(d.Z,{open:t,onClose:k,BackdropProps:{onClick:e=>e.stopPropagation()},"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:(0,i.jsx)(n.Z,{sx:C,children:(0,i.jsx)(h.default,{pedido:j,handleClose:k})})})]})}}},function(e){e.O(0,[9461,173,7584,5615,1238,3840,3683,8730,3462,2971,2117,1744],function(){return e(e.s=60616)}),_N_E=e.O()}]);