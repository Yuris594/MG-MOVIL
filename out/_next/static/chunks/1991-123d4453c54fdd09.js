"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1991],{6283:(e,t,a)=>{a.d(t,{Xv:()=>r});var i=a(10733);let r=async()=>await (0,i.P2)("IDBService",1,{upgrade(e){e.createObjectStore("articles",{keyPath:"PKcodigo"}),e.createObjectStore("cartera",{keyPath:"Documento"}),e.createObjectStore("customers",{keyPath:"NIT"})}})},51991:(e,t,a)=>{a.d(t,{A:()=>_});var i=a(95155),r=a(20457),o=a(2572),s=a(11451),l=a(46805),n=a(894),c=a(22282),u=a(9561),d=a(55732),x=a(42232),h=a(39762),g=a(84920),A=a(9581),p=a(28724),m=a(91531),j=a(90355),f=a(76581),S=a(48123),C=a(32850),y=a(52701),k=a(96212),w=a(6283),b=a(70689),v=a(76046),E=a(12115),N=a(8889),I=a(78897),O=a.n(I),P=a(67396),T=a(4918),D=a(41983),J=a(36017),z=a(60391),R=a(35256),V=a(2091),B=a(15524),F=a(51644);let K=e=>{let{pages:t,onClose:a}=e,[r,s]=(0,E.useState)(null),l=e=>{s(r===e?null:e)};return(0,i.jsx)(o.A,{children:(0,i.jsx)(T.A,{children:t.map(e=>(0,i.jsxs)(o.A,{children:[(0,i.jsx)(D.Ay,{disablePadding:!0,children:(0,i.jsxs)(J.A,{onClick:()=>l(e),children:[(0,i.jsx)(z.A,{primary:e.title}),r===e?(0,i.jsx)(B.A,{}):(0,i.jsx)(F.A,{})]})}),(0,i.jsx)(R.A,{in:r===e,timeout:"auto",unmountOnExit:!0,children:(0,i.jsx)(T.A,{component:"div",disablePadding:!0,sx:{pl:4},children:e.subPages.map(e=>(0,i.jsxs)(J.A,{component:P.default,href:e.url,onClick:a,children:[(0,i.jsx)(V.A,{children:e.icon}),(0,i.jsx)(z.A,{primary:e.title})]},e.title))})})]},e.title))})})},U=[{title:"VENTAS",subPages:[{title:"Clientes",url:"/pages/client",icon:(0,i.jsx)(k.A,{})},{title:"Pedidos Por Enviar",url:"/pages/pedidoSinEnviar",icon:(0,i.jsx)(h.A,{})},{title:"Pedidos Enviados",url:"/pages/pedidoEnviado",icon:(0,i.jsx)(h.A,{})},{title:"Cotizaci\xf3n",url:"/pages/cotizacion",icon:(0,i.jsx)(p.A,{})}]},{title:"CARTERA",subPages:[{title:"Cartera Clientes",url:"/pages/cartera",icon:(0,i.jsx)(x.A,{})},{title:"Recibos",url:"/pages/cartera/recibo",icon:(0,i.jsx)(S.A,{})},{title:"Consultar Consignaciones",url:"/pages/cartera/consignacion",icon:(0,i.jsx)(x.A,{})},{title:"Elaborar Consignaciones",url:"/pages/cartera/elaborarCo",icon:(0,i.jsx)(y.A,{})}]},{title:"INFORMES",subPages:[{title:"Ruteros Enviados",url:"/pages/gestionCartera",icon:(0,i.jsx)(g.A,{})},{title:"Historico de Ventas",url:"/pages/historicoVenta",icon:(0,i.jsx)(S.A,{})},{title:"Resumen Ventas Actual",url:"/pages/resumenVenta",icon:(0,i.jsx)(A.A,{})}]},{title:"INVENTARIOS",subPages:[{title:"Consultar Articulos",url:"/pages/inventario",icon:(0,i.jsx)(m.A,{})}]}],_=()=>{let[e,t]=(0,E.useState)(null),[a,x]=(0,E.useState)(null),{auth:h,logout:g}=(0,b.A)(),A=(0,v.useRouter)();(0,E.useEffect)(()=>{(async()=>{try{let e=await fetch(N.m.url+"/users/verificar",{method:"GET",headers:{"Content-Type":"application/json"}});await e.json(),console.log("Existe Conexion: ",!0)}catch(e){console.log("No Existe Conexion: ",!1)}})()},[]);let p=e=>{t(e),x(null)},m=()=>{x(null)};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.Ay,{}),(0,i.jsxs)(o.A,{sx:{flexGrow:1},children:[(0,i.jsx)(s.A,{position:"static",sx:{bgcolor:"#262626"},children:(0,i.jsxs)(l.A,{children:[(0,i.jsx)(n.A,{color:"inherit",onClick:e=>{x(e.currentTarget)},sx:{display:{xs:"flex",md:"none"}},children:(0,i.jsx)(C.A,{})}),(0,i.jsxs)(o.A,{sx:{display:{xs:"none",md:"flex"},width:"100%"},children:[e?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.A,{color:"inherit",onClick:()=>{t(null)},children:(0,i.jsx)(j.A,{})}),e.subPages.map(e=>(0,i.jsx)(c.A,{color:"inherit",LinkComponent:P.default,href:e.url,children:e.title},e.title))]}):U.map(e=>(0,i.jsx)(c.A,{color:"inherit",onClick:()=>p(e),children:e.title},e.title)),(0,i.jsx)(c.A,{onClick:()=>{A.push("/pages"),setTimeout(()=>{O().fire({title:"\xbfDeseas Actualizar?",text:"Se actualizara la base de datos local!",icon:"question",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Aceptar"}).then(e=>{e.isConfirmed&&((async()=>{try{let e=await (0,w.Xv)(),t=async function(t,a,i){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,o=await fetch(a),s=await o.json(),l=Array.isArray(s)?"function"==typeof r?r(s):s:[];if(!Array.isArray(l)){console.error("FilteredData no es un array:",l);return}let n=await e.getAll(t);for(let a of l){let r=n.find(e=>e[i]===a[i]);r&&JSON.stringify(r)===JSON.stringify(a)||await e.put(t,a)}for(let a of n)l.find(e=>e[i]===a[i])||await e.delete(t,a[i])};await t("articles",N.m.url+"/articles/articles/inventario","PKcodigo"),await t("cartera",N.m.url+"/carterasellers/".concat(h.IDSaler),"Documento"),await t("customers",N.m.url+"/customers/customers","NIT",e=>e.filter(e=>e.IDVendedor===h.IDSaler)),console.log("Datos actualizados en IndexedDB")}catch(e){console.log("Error al actualizar IndexedDB",e)}})(),O().fire({text:"Actualizando, este proceso tardara poco tiempo, espere por favor.",icon:"warning",timer:1e4,didOpen:()=>{O().showLoading()}}).then(()=>{O().fire({text:"Actualizaci\xf3n Exitosa!!",icon:"success"}).then(()=>{window.location.reload()})}))})},500)},color:"inherit",children:"Actualizar"})]}),(0,i.jsx)(u.A,{variant:"h6",sx:{flexGrow:1}}),(0,i.jsx)(c.A,{LinkComponent:P.default,href:"/pages",color:"inherit",children:(0,i.jsx)(f.A,{})}),(0,i.jsx)(c.A,{color:"inherit",sx:{width:"15%"},children:h&&h.UserFullName}),(0,i.jsx)(c.A,{onClick:()=>{g()},color:"inherit",children:"Salir"})]})}),(0,i.jsx)(d.A,{id:"basic-menu",anchorEl:a,open:!!a,onClose:m,children:(0,i.jsx)(K,{pages:U,onClose:m})})]})]})}},8889:(e,t,a)=>{a.d(t,{m:()=>i});let i={url:"http://192.168.1.3:3010/api"}},70689:(e,t,a)=>{a.d(t,{A:()=>c,default:()=>n});var i=a(95155),r=a(12115),o=a(76046),s=a(92054);let l=(0,r.createContext)({login:e=>{},logout:()=>{}}),n=e=>{let{children:t}=e,a=(0,o.useRouter)(),[n,c]=(0,r.useState)(null),[u,d]=(0,r.useState)({}),[x,h]=(0,r.useState)({}),[g,A]=(0,r.useState)({}),p=(0,r.useCallback)(function(e){document.cookie=(0,s.lK)("auth",JSON.stringify(e.signedUser),{maxAge:604800,path:"/",httpOnly:!1,secure:!1,sameSite:"Strict"}),localStorage.setItem("auth",JSON.stringify(e.signedUser)),localStorage.setItem("Tokens",JSON.stringify(e.token)),c(e.signedUser)},[]),m=(0,r.useCallback)(function(e){document.cookie=(0,s.lK)("auth","",{maxAge:-1,path:"/"}),localStorage.removeItem("auth"),localStorage.removeItem("Tokens"),a.push("/")},[]);(0,r.useEffect)(()=>{let e=localStorage.getItem("auth"),t=localStorage.getItem("clienteV"),a=localStorage.getItem("pedidoV"),i=localStorage.getItem("cartera");e&&c(JSON.parse(e)),t&&d(JSON.parse(t)),a&&h(JSON.parse(a)),i&&A(JSON.parse(i))},[]),(0,r.useEffect)(()=>{let e=(0,s.qg)(document.cookie||"");e.auth&&c(JSON.parse(e.auth))},[]);let j=(0,r.useMemo)(()=>({auth:n,login:p,logout:m,clienteV:u,setClienteV:d,pedidosV:x,setPedidosV:h,carteraV:g,setCarteraV:A}),[n,u,x,g,p,m]);return(0,i.jsx)(l.Provider,{value:j,children:t})},c=()=>(0,r.useContext)(l)}}]);