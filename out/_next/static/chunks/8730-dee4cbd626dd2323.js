"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8730],{42569:function(e,t,a){a.d(t,{b:function(){return n},zK:function(){return o}});var r=a(90960);let o=async()=>await (0,r.X3)("IDBService",1,{upgrade(e){e.createObjectStore("articles",{keyPath:"id",autoIncrement:!0}),e.createObjectStore("cartera",{keyPath:"Documento"}),e.createObjectStore("customers",{keyPath:"ID"})}}),n=async()=>{let e=await o(),t=["articles","cartera","customers"],a=e.transaction(t,"readwrite");for(let e of t)await a.objectStore(e).clear();console.log("Base de datos limpiada")}},98730:function(e,t,a){a.d(t,{Z:function(){return L}});var r=a(57437),o=a(93062),n=a(2069),i=a(71495),s=a(71004),l=a(59832),c=a(94013),u=a(46387),d=a(84011),x=a(94574),h=a(47666),p=a(87222),g=a(5774),m=a(70412),f=a(20049),j=a(67257),Z=a(45319),C=a(42581),S=a(66463),y=a(38389),b=a(72549),w=a(42569),k=a(10932),E=a(99376),v=a(2265),A=a(41698),I=a(5515),P=a.n(I),O=a(27648),N=a(15273),z=a(73261),D=a(11741),B=a(67051),R=a(17162),T=a(53431),V=a(60268),J=a(52700),q=e=>{let{pages:t,onClose:a}=e,[o,i]=(0,v.useState)(null),s=e=>{i(o===e?null:e)};return(0,r.jsx)(n.Z,{children:(0,r.jsx)(N.Z,{children:t.map(e=>(0,r.jsxs)(n.Z,{children:[(0,r.jsx)(z.ZP,{disablePadding:!0,children:(0,r.jsxs)(D.Z,{onClick:()=>s(e),children:[(0,r.jsx)(B.Z,{primary:e.title}),o===e?(0,r.jsx)(V.Z,{}):(0,r.jsx)(J.Z,{})]})}),(0,r.jsx)(R.Z,{in:o===e,timeout:"auto",unmountOnExit:!0,children:(0,r.jsx)(N.Z,{component:"div",disablePadding:!0,sx:{pl:4},children:e.subPages.map(e=>(0,r.jsxs)(D.Z,{component:O.default,href:e.url,onClick:a,children:[(0,r.jsx)(T.Z,{children:e.icon}),(0,r.jsx)(B.Z,{primary:e.title})]},e.title))})})]},e.title))})})};let F=[{title:"VENTAS",subPages:[{title:"Clientes",url:"/pages/client",icon:(0,r.jsx)(b.Z,{})},{title:"Pedidos Por Enviar",url:"/pages/pedidoSinEnviar",icon:(0,r.jsx)(h.Z,{})},{title:"Pedidos Enviados",url:"/pages/pedidoEnviado",icon:(0,r.jsx)(h.Z,{})},{title:"Cotizaciones",url:"/pages/cotizacion",icon:(0,r.jsx)(m.Z,{})}]},{title:"CARTERA",subPages:[{title:"Cartera Clientes",url:"/pages/cartera",icon:(0,r.jsx)(x.Z,{})},{title:"Recibos",url:"/pages/cartera/recibo",icon:(0,r.jsx)(C.Z,{})},{title:"Consultar Consignaciones",url:"/pages/cartera/consignacion",icon:(0,r.jsx)(x.Z,{})},{title:"Elaborar Consignaciones",url:"/pages/cartera/elaborarCo",icon:(0,r.jsx)(y.Z,{})}]},{title:"INFORMES",subPages:[{title:"Ruteros Enviados",url:"/pages/gestionCartera",icon:(0,r.jsx)(p.Z,{})},{title:"Historico de Ventas",url:"/pages/historicoVenta",icon:(0,r.jsx)(C.Z,{})},{title:"Resumen Ventas Actual",url:"/pages/resumenVenta",icon:(0,r.jsx)(g.Z,{})}]},{title:"INVENTARIOS",subPages:[{title:"Consultar Articulos",url:"/pages/inventario",icon:(0,r.jsx)(f.Z,{})}]}];var L=()=>{let[e,t]=(0,v.useState)(null),[a,x]=(0,v.useState)(null),{auth:h,logout:p}=(0,k.a)(),g=(0,E.useRouter)();(0,v.useEffect)(()=>{(async()=>{try{let e=await fetch(A.x.url+"/users/verificar",{method:"GET",headers:{"Content-Type":"application/json"}});await e.json(),console.log("Existe Conexion: ",!0)}catch(e){console.log("No Existe Conexion: ",!1)}})()},[]);let m=e=>{t(e),x(null)},f=()=>{x(null)};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.ZP,{}),(0,r.jsxs)(n.Z,{sx:{flexGrow:1},children:[(0,r.jsx)(i.Z,{position:"static",sx:{bgcolor:"#262626"},children:(0,r.jsxs)(s.Z,{children:[(0,r.jsx)(l.Z,{color:"inherit",onClick:e=>{x(e.currentTarget)},sx:{display:{xs:"flex",md:"none"}},children:(0,r.jsx)(S.Z,{})}),(0,r.jsxs)(n.Z,{sx:{display:"flex",justifyContent:"space-between"},children:[(0,r.jsx)(n.Z,{sx:{display:{xs:"none",md:"flex"},width:"100%"},children:e?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(l.Z,{color:"inherit",onClick:()=>{t(null)},children:(0,r.jsx)(j.Z,{})}),e.subPages.map(e=>(0,r.jsx)(c.Z,{color:"inherit",LinkComponent:O.default,href:e.url,children:e.title},e.title))]}):F.map(e=>(0,r.jsx)(c.Z,{color:"inherit",onClick:()=>m(e),children:e.title},e.title))}),(0,r.jsx)(c.Z,{onClick:()=>{g.push("/pages"),P().fire({title:"\xbfDeseas Actualizar?",text:"Se actualizar\xe1 la base de datos local!",icon:"question",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Aceptar"}).then(async e=>{e.isConfirmed&&P().fire({title:"Actualizando, este proceso tardara poco tiempo, espere por favor.",icon:"warning",allowOutsideClick:!1,didOpen:async()=>{P().showLoading();try{let e=await (0,w.zK)();await (0,w.b)();let t=async(t,a,r)=>{if(!Array.isArray(a)){console.error("Error: Los datos para ".concat(t," no son un array"),a);return}for(let o of a)try{await e.put(t,o)}catch(e){console.error("Error al insertar ".concat(o[r],":"),e)}},[a,r,o]=await Promise.all([fetch("".concat(A.x.url,"/articles/articles/inventario")),fetch("".concat(A.x.url,"/carterasellers/").concat(h.IDSaler)),fetch("".concat(A.x.url,"/customers/customers"))]),[n,i,s]=await Promise.all([a.json(),r.json(),o.json()]),l=Array.isArray(n)?n:n.data||[],c=Array.isArray(i)?i:i.cxc||[],u=Array.isArray(s)?s.filter(e=>e.IDVendedor===h.IDSaler):[];await t("articles",l,"id"),await t("cartera",c,"Documento"),await t("customers",u,"ID"),console.log("Datos actualizados en IndexedDB"),P().close(),P().fire({title:"Actualizaci\xf3n Exitosa!",icon:"success"}).then(()=>{g.push("/pages")})}catch(e){console.error("Error al actualizar los datos:",e),P().fire({title:"Error al actualizar los datos",text:"Int\xe9ntalo de nuevo m\xe1s tarde.",icon:"error"})}}})})},color:"inherit",children:"Actualizar"})]}),(0,r.jsx)(u.Z,{variant:"h6",sx:{flexGrow:1}}),(0,r.jsx)(c.Z,{LinkComponent:O.default,href:"/pages",color:"inherit",children:(0,r.jsx)(Z.Z,{})}),(0,r.jsx)(c.Z,{color:"inherit",sx:{width:"15%"},children:h&&h.UserFullName}),(0,r.jsx)(c.Z,{onClick:()=>{P().fire({title:"\xbfCerrara Sesi\xf3n?",text:"Desea salir de la aplicaci\xf3n, Recuerde que para ingresar nuevamente debe tener conexi\xf3n con la empresa e internet.",icon:"question",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Aceptar"}).then(e=>{e.isConfirmed&&((0,w.b)(),p(),g.push("/"))})},color:"inherit",children:"Salir"})]})}),(0,r.jsx)(d.Z,{id:"basic-menu",anchorEl:a,open:!!a,onClose:f,children:(0,r.jsx)(q,{pages:F,onClose:f})})]})]})}},41698:function(e,t,a){a.d(t,{x:function(){return r}});let r={url:"http://192.168.1.3:3010/api"}},10932:function(e,t,a){a.d(t,{a:function(){return l}});var r=a(57437),o=a(2265),n=a(99376),i=a(27696);let s=(0,o.createContext)({login:e=>{},logout:()=>{}});t.default=e=>{let{children:t}=e;(0,n.useRouter)();let[a,l]=(0,o.useState)(null),[c,u]=(0,o.useState)({}),[d,x]=(0,o.useState)({}),[h,p]=(0,o.useState)({}),g=(0,o.useCallback)(function(e){document.cookie=(0,i.qC)("auth",JSON.stringify(e.signedUser),{maxAge:604800,path:"/",httpOnly:!1,secure:!1,sameSite:"Strict"}),localStorage.setItem("auth",JSON.stringify(e.signedUser)),localStorage.setItem("Tokens",JSON.stringify(e.token)),l(e.signedUser)},[]),m=(0,o.useCallback)(function(e){document.cookie=(0,i.qC)("auth","",{maxAge:-1,path:"/"}),localStorage.removeItem("auth"),localStorage.removeItem("Tokens")},[]);(0,o.useEffect)(()=>{let e=localStorage.getItem("auth"),t=localStorage.getItem("clienteV"),a=localStorage.getItem("pedidoV"),r=localStorage.getItem("cartera");e&&l(JSON.parse(e)),t&&u(JSON.parse(t)),a&&x(JSON.parse(a)),r&&p(JSON.parse(r))},[]),(0,o.useEffect)(()=>{let e=(0,i.Qc)(document.cookie||"");e.auth&&l(JSON.parse(e.auth))},[]);let f=(0,o.useMemo)(()=>({auth:a,login:g,logout:m,clienteV:c,setClienteV:u,pedidosV:d,setPedidosV:x,carteraV:h,setCarteraV:p}),[a,c,d,h,g,m]);return(0,r.jsx)(s.Provider,{value:f,children:t})};let l=()=>(0,o.useContext)(s)}}]);