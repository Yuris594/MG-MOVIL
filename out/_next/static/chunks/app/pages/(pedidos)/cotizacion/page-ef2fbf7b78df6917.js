(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8695],{60616:function(e,o,t){Promise.resolve().then(t.bind(t,24511))},24511:function(e,o,t){"use strict";t.r(o);var a=t(57437),r=t(70899),i=t(94013),n=t(2069),l=t(77584),c=t(58004),d=t(98730),s=t(10932),u=t(13462),f=t(2265),h=t(93769),m=t(29239),p=t(5515),x=t.n(p);let C={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"80%",maxHeight:"90vh",bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,overflow:"auto",p:4};o.default=()=>{let{auth:e,setPedidosV:o}=(0,s.a)(),[t,p]=(0,f.useState)(!1),[g,w]=(0,f.useState)([]),[b,S]=(0,f.useState)([]),[E,P]=(0,f.useState)([]),[v,N]=(0,f.useState)(null),j=(0,r.Z)("(max-width: 600px)"),I=e=>{N(e),p(!0)},y=()=>{p(!1),N(null)};(0,f.useEffect)(()=>{let e=(JSON.parse(localStorage.getItem("cotizacion"))||[]).map(e=>({...e,fechaFormateada:O(e.fecha)}));w(e),P(e)},[]);let O=e=>{let o=new Date(e),t=o.getDate().toString().padStart(2,"0"),a=(o.getMonth()+1).toString().padStart(2,"0"),r=o.getFullYear();return"".concat(a,"/").concat(t,"/").concat(r)},D=e=>{let o=g.filter(o=>o.PKId!==e.PKId);localStorage.setItem("cotizacion",JSON.stringify(o)),w(o)},T=e=>{w(E.filter(o=>Object.values(o).map(e=>e?e.toString().toLowerCase():"").some(o=>o.includes(e.toLowerCase()))))},k=async e=>{if(!(await x().fire({title:"Enviar PDF!",text:"\xbfDesea Enviar la Cotizaci\xf3n al Cliente?",icon:"question",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Aceptar",cancelButtonText:"Cancelar"})).isConfirmed){x().fire({text:"El PDF no se envi\xf3.",icon:"info",timer:3e3});return}try{(await fetch(Global.url+"/cotizacion/enviarPdf",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...e})})).ok&&x().fire({title:"\xa1\xc9xito!",text:"La Cotizaci\xf3n fue Enviada.",icon:"success",timer:3e3})}catch(e){console.error("Error generando el PDF:",e),x().fire({icon:"error",title:"Oops..!",text:"Revisar el Email del cliente, No se puede enviar la cotizaci\xf3n."})}},z=async()=>{try{let o=await fetch(Global.url+"/pedidos/".concat(e.IDSaler),{method:"GET",headers:{"Content-Type":"application/json"}});if(!o.ok)throw Error("Error al obtener el consecutivo: ".concat(o.status," ").concat(o.statusText));let t=await o.json();if(!t[0].consecutivo||!t[0].Prefijo)throw Error("Los campos 'consecutivo' o 'Prefijo' no se encontraron en la respuesta.");return t[0]}catch(e){throw console.error("Error al obtener el consecutivo:",e),e}},F=async()=>{if(y(),!(await x().fire({title:"Almacenar!",text:"\xbfDesea almacenar el Pedido?",icon:"question",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Aceptar",cancelButtonText:"Cancelar"})).isConfirmed){x().fire({text:"El Pedido no se almacen\xf3.",icon:"info",timer:3e3});return}try{let o=JSON.parse(localStorage.getItem("pedidos"))||[],t=o.find(e=>e.PKId==e.PKId);if(!t)throw Error("El pedido no se encontr\xf3 en el almacenamiento local.");let a=await z(),r=a.consecutivo+1,i="".concat(a.Prefijo).concat(r),n=await fetch(Global.url+"/pedidos/PEDIDOS/".concat(e.IDSaler),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({Consecutivo:r})});if(!n.ok)throw console.log("Error al actualizar el consecutivo:",n.statusText),Error("Error al actualizar el consecutivo");console.log("Consecutivo actualizado correctamente");let l={FKID_sellers:t.FKID_sellers,Notas:t.Notas,FKId_clientes:t.FKId_clientes,NUMPED:i,Documento1:t.Documento1},c=await fetch(Global.url+"/pedidos/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});if(!c.ok){let e=await c.json();throw console.error("Error al crear el pedido",e),Error("Error al crear el encabezado del pedido")}for(let e of(console.log("Pedido creado correctamente"),articulosSeleccionados.map(e=>({FKid_pedidos2:e.FKid_pedidos2.toString(),FKcodigo_articles:e.PKcodigo,Cantidad:e.cantped,Precio:e.Precio.toString(),Descuento:e.Descuento.toString(),Iva:e.Iva.toString(),Total:e.Total,FKNUMPED:i,BODEGA:e.BODEGA})))){let o=await fetch(Global.url+"/pedidos/".concat(i),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!o.ok){let e=await o.text();throw console.error("Error al crear el detalle del pedido:",e),Error("Error al crear el detalle del pedido: ".concat(o.status," - ").concat(o.statusText))}}console.log("Detalle del pedido creado correctamente");let d=o.filter(e=>e.PKId!==t.PKId);localStorage.setItem("pedidos",JSON.stringify(d)),x().fire({title:"\xa1\xc9xito!",text:"Pedido Fue Almacenado Correctamente.",icon:"success",timer:3e3})}catch(e){console.error("Error:",e),x().fire({title:"Oops...!",text:"Hubo un Problema al Enviar el Pedido.",icon:"error"})}};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(d.Z,{}),(0,a.jsxs)(m.Z,{container:!0,direction:"column",sx:{minHeight:"100vh",backfroundColor:"#ffffff",padding:3},children:[(0,a.jsx)(m.Z,{size:12,children:(0,a.jsxs)(n.Z,{sx:{display:"flex",flexDirection:j?"column":"row",alignItems:"center",justifyContent:"space-between",mb:3},children:[(0,a.jsx)("h2",{children:(0,a.jsx)("strong",{children:"COTIZACI\xd3N"})}),(0,a.jsx)(l.Z,{variant:"outlined",value:b,onChange:e=>{S(e.target.value),T(e.target.value),console.log(e.target.value)},label:"Buscar",sx:{width:j?"100%":350,backgroundColor:"#fff",borderRadius:2}})]})}),(0,a.jsx)(m.Z,{size:12,sx:{flexGrow:1},children:(0,a.jsx)(n.Z,{sx:{width:"100%",heigth:j?500:750,borderRadius:2},children:(0,a.jsx)(h._,{rows:g,columns:[{field:"PKId",headerName:"No",width:80,headerClassName:"header-bold"},{field:"fechaFormateada",headerName:"FECHA",width:150,headerClassName:"header-bold"},{field:"nit",headerName:"NIT",width:150,headerClassName:"header-bold"},{field:"nombreC",headerName:"NOMBRE O RAZON SOCIAL",width:400,headerClassName:"header-bold"},{field:"enviar",headerName:"",width:100,renderCell:e=>(0,a.jsx)(i.Z,{onClick:()=>k(e.row),"aria-label":"enviar",color:"secondary",sx:{fontSize:12},children:"Enviar PDF"})},{field:"crearPedido",headerName:"",width:160,renderCell:e=>(0,a.jsx)(i.Z,{onClick:()=>F(e.row),"aria-label":"crear",color:"success",sx:{fontSize:12},children:"Convertir a Pedido"})},{field:"editar",headerName:"",width:100,renderCell:e=>(0,a.jsx)(i.Z,{onClick:()=>I(e.row),"aria-label":"editar",sx:{fontSize:12},children:"Modificar"})},{field:"actions",headerName:"",width:100,renderCell:e=>(0,a.jsx)(i.Z,{onClick:()=>D(e.row),"aria-label":"cancel",color:"error",sx:{fontSize:12},children:"Eliminar"})}],getRowId:e=>e.PKId,initialState:{pagination:{paginationModel:{pageSize:10}}},pageSizeOptions:[5,10,15]})})})]}),(0,a.jsx)(c.Z,{open:t,onClose:y,BackdropProps:{onClick:e=>e.stopPropagation()},"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:(0,a.jsx)(n.Z,{sx:C,children:(0,a.jsx)(u.default,{pedido:v,handleClose:y})})})]})}}},function(e){e.O(0,[9461,173,7584,5615,1238,3840,3683,8730,3462,2971,2117,1744],function(){return e(e.s=60616)}),_N_E=e.O()}]);