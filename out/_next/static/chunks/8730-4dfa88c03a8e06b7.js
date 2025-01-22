"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8730],{42569:function(e,t,r){r.d(t,{b:function(){return o},zK:function(){return n}});var a=r(90960);let n=async()=>await (0,a.X3)("IDBService",1,{upgrade(e){e.createObjectStore("articles",{keyPath:"id",autoIncrement:!0}),e.createObjectStore("cartera",{keyPath:"id",autoIncrement:!0}),e.createObjectStore("customers",{keyPath:"id",autoIncrement:!0})}}),o=async()=>{let e=await n(),t=["articles","cartera","customers"],r=e.transaction(t,"readwrite");for(let e of t)await r.objectStore(e).clear();console.log("Base de datos limpiada")}},98730:function(e,t,r){r.d(t,{Z:function(){return L}});var a=r(57437),n=r(93062),o=r(2069),i=r(71495),s=r(71004),l=r(59832),c=r(94013),u=r(46387),d=r(84011),x=r(94574),h=r(47666),p=r(87222),g=r(42569),f=r(5774),m=r(70412),j=r(20049),C=r(67257),Z=r(45319),S=r(42581),y=r(66463),b=r(38389),w=r(72549),k=r(10932),v=r(99376),E=r(2265),A=r(41698),I=r(5515),P=r.n(I),O=r(27648),N=r(15273),z=r(73261),B=r(11741),R=r(67051),T=r(17162),V=r(53431),D=r(60268),J=r(52700),q=e=>{let{pages:t,onClose:r}=e,[n,i]=(0,E.useState)(null),s=e=>{i(n===e?null:e)};return(0,a.jsx)(o.Z,{children:(0,a.jsx)(N.Z,{children:t.map(e=>(0,a.jsxs)(o.Z,{children:[(0,a.jsx)(z.ZP,{disablePadding:!0,children:(0,a.jsxs)(B.Z,{onClick:()=>s(e),children:[(0,a.jsx)(R.Z,{primary:e.title}),n===e?(0,a.jsx)(D.Z,{}):(0,a.jsx)(J.Z,{})]})}),(0,a.jsx)(T.Z,{in:n===e,timeout:"auto",unmountOnExit:!0,children:(0,a.jsx)(N.Z,{component:"div",disablePadding:!0,sx:{pl:4},children:e.subPages.map(e=>(0,a.jsxs)(B.Z,{component:O.default,href:e.url,onClick:r,children:[(0,a.jsx)(V.Z,{children:e.icon}),(0,a.jsx)(R.Z,{primary:e.title})]},e.title))})})]},e.title))})})};let F=[{title:"VENTAS",subPages:[{title:"Clientes",url:"/pages/client/",icon:(0,a.jsx)(w.Z,{})},{title:"Pedidos Por Enviar",url:"/pages/pedidoSinEnviar/",icon:(0,a.jsx)(h.Z,{})},{title:"Pedidos Enviados",url:"/pages/pedidoEnviado/",icon:(0,a.jsx)(h.Z,{})},{title:"Cotizaciones",url:"/pages/cotizacion/",icon:(0,a.jsx)(m.Z,{})}]},{title:"CARTERA",subPages:[{title:"Cartera Clientes",url:"/pages/cartera/",icon:(0,a.jsx)(x.Z,{})},{title:"Recibos",url:"/pages/cartera/recibo/",icon:(0,a.jsx)(S.Z,{})},{title:"Consultar Consignaciones",url:"/pages/cartera/consignacion/",icon:(0,a.jsx)(x.Z,{})},{title:"Elaborar Consignaciones",url:"/pages/cartera/elaborarCo/",icon:(0,a.jsx)(b.Z,{})}]},{title:"INFORMES",subPages:[{title:"Ruteros Enviados",url:"/pages/gestionCartera/",icon:(0,a.jsx)(p.Z,{})},{title:"Historico de Ventas",url:"/pages/historicoVenta/",icon:(0,a.jsx)(S.Z,{})},{title:"Resumen Ventas Actual",url:"/pages/resumenVenta/",icon:(0,a.jsx)(f.Z,{})}]},{title:"INVENTARIOS",subPages:[{title:"Consultar Articulos",url:"/pages/inventario/",icon:(0,a.jsx)(j.Z,{})}]}];var L=()=>{let[e,t]=(0,E.useState)(null),[r,x]=(0,E.useState)(null),[h,p]=(0,E.useState)(!1),{auth:f,logout:m}=(0,k.a)(),j=(0,v.useRouter)();(0,E.useEffect)(()=>{(async()=>{try{let e=await fetch(A.x.url+"/users/verificar",{method:"GET",headers:{"Content-Type":"application/json"}});if(e.ok){let t=await e.json();!0===t.conectado?(p(!0),console.log("Conexi\xf3n autorizada:",!0)):(p(!1),console.log("Conexi\xf3n no autorizada:",!1),P().fire({title:"Sin conexion",text:"No se ha podido establecer una conexi\xf3n, revisar el Internet.",icon:"error"}))}else throw Error("Error en la respuesta del servidor")}catch(e){p(!1),console.log("Conexion sin autorizada:",!1)}})()},[]);let S=e=>{t(e),x(null)},b=()=>{x(null)},w=async()=>{if(j.push("/pages"),!h){P().fire({title:"Sin Conexi\xf3n.",text:"Revisar la conexi\xf3n con la empresa o no tiene internet.",icon:"error"});return}P().fire({title:"\xbfDeseas Actualizar?",text:"Se actualizar\xe1 la base de datos local!",icon:"question",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Aceptar"}).then(async e=>{e.isConfirmed&&P().fire({title:"Actualizando, este proceso tardara poco tiempo, espere por favor.",icon:"warning",allowOutsideClick:!1,didOpen:async()=>{P().showLoading();try{let e=await (0,g.zK)();await (0,g.b)();let t=async(t,r,a)=>{if(!Array.isArray(r)){console.error("Error: Los datos para ".concat(t," no son un array"),r);return}for(let n of r)try{await e.put(t,n)}catch(e){console.error("Error al insertar ".concat(n[a],":"),e)}},[r,a,n]=await Promise.all([fetch("".concat(A.x.url,"/articles/articles/inventario")),fetch("".concat(A.x.url,"/carterasellers/").concat(f.IDSaler)),fetch("".concat(A.x.url,"/customers/customers"))]),[o,i,s]=await Promise.all([r.json(),a.json(),n.json()]),l=Array.isArray(o)?o:o.data||[],c=Array.isArray(i)?i:i.cxc||[],u=Array.isArray(s)?s.filter(e=>e.IDVendedor===f.IDSaler):[];await t("articles",l,"id"),await t("cartera",c,"id"),await t("customers",u,"id"),console.log("Datos actualizados en IndexedDB"),P().close(),P().fire({title:"Actualizaci\xf3n Exitosa!",icon:"success"}).then(()=>{j.push("/pages")})}catch(e){console.error("Error al actualizar los datos:",e),P().fire({title:"Error al actualizar los datos",text:"Int\xe9ntalo de nuevo m\xe1s tarde.",icon:"error"})}}})})};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.ZP,{}),(0,a.jsxs)(o.Z,{sx:{flexGrow:1},children:[(0,a.jsx)(i.Z,{position:"static",sx:{bgcolor:"#262626"},children:(0,a.jsxs)(s.Z,{children:[(0,a.jsx)(l.Z,{color:"inherit",onClick:e=>{x(e.currentTarget)},sx:{display:{xs:"flex",md:"none"}},children:(0,a.jsx)(y.Z,{})}),(0,a.jsxs)(o.Z,{sx:{display:"flex",justifyContent:"space-between"},children:[(0,a.jsx)(o.Z,{sx:{display:{xs:"none",md:"flex"},width:"100%"},children:e?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l.Z,{color:"inherit",onClick:()=>{t(null)},children:(0,a.jsx)(C.Z,{})}),e.subPages.map(e=>(0,a.jsx)(c.Z,{color:"inherit",LinkComponent:O.default,href:e.url,children:e.title},e.title))]}):F.map(e=>(0,a.jsx)(c.Z,{color:"inherit",onClick:()=>S(e),children:e.title},e.title))}),(0,a.jsx)(c.Z,{onClick:w,color:"inherit",children:"Actualizar"})]}),(0,a.jsx)(u.Z,{variant:"h6",sx:{flexGrow:1}}),(0,a.jsx)(c.Z,{LinkComponent:O.default,href:"/pages/",color:"inherit",children:(0,a.jsx)(Z.Z,{})}),(0,a.jsx)(c.Z,{color:"inherit",sx:{width:"15%"},children:f&&f.UserFullName}),(0,a.jsx)(c.Z,{onClick:()=>{P().fire({title:"\xbfCerrara Sesi\xf3n?",text:"Desea salir de la aplicaci\xf3n, Recuerde que para ingresar nuevamente debe tener conexi\xf3n con la empresa e internet.",icon:"question",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Aceptar"}).then(e=>{e.isConfirmed&&((0,g.b)(),m(),j.push("/"))})},color:"inherit",children:"Salir"})]})}),(0,a.jsx)(d.Z,{id:"basic-menu",anchorEl:r,open:!!r,onClose:b,children:(0,a.jsx)(q,{pages:F,onClose:b})})]})]})}},41698:function(e,t,r){r.d(t,{x:function(){return a}});let a={url:"http://192.168.1.3:3010/api"}},10932:function(e,t,r){r.d(t,{a:function(){return l}});var a=r(57437),n=r(2265),o=r(99376),i=r(27696);let s=(0,n.createContext)({login:e=>{},logout:()=>{}});t.default=e=>{let{children:t}=e;(0,o.useRouter)();let[r,l]=(0,n.useState)(null),[c,u]=(0,n.useState)({}),[d,x]=(0,n.useState)({}),[h,p]=(0,n.useState)({}),g=(0,n.useCallback)(function(e){document.cookie=(0,i.qC)("auth",JSON.stringify(e.signedUser),{maxAge:604800,path:"/",httpOnly:!1,secure:!1,sameSite:"Strict"}),localStorage.setItem("auth",JSON.stringify(e.signedUser)),localStorage.setItem("Tokens",JSON.stringify(e.token)),l(e.signedUser)},[]),f=(0,n.useCallback)(function(e){document.cookie=(0,i.qC)("auth","",{maxAge:-1,path:"/"}),localStorage.removeItem("auth"),localStorage.removeItem("Tokens")},[]);(0,n.useEffect)(()=>{let e=localStorage.getItem("auth"),t=localStorage.getItem("clienteV"),r=localStorage.getItem("pedidoV"),a=localStorage.getItem("cartera");e&&l(JSON.parse(e)),t&&u(JSON.parse(t)),r&&x(JSON.parse(r)),a&&p(JSON.parse(a))},[]),(0,n.useEffect)(()=>{let e=(0,i.Qc)(document.cookie||"");e.auth&&l(JSON.parse(e.auth))},[]);let m=(0,n.useMemo)(()=>({auth:r,login:g,logout:f,clienteV:c,setClienteV:u,pedidosV:d,setPedidosV:x,carteraV:h,setCarteraV:p}),[r,c,d,h,g,f]);return(0,a.jsx)(s.Provider,{value:m,children:t})};let l=()=>(0,n.useContext)(s)}}]);