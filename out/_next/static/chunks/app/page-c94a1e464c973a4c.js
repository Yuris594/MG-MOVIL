(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8974],{30352:(e,t,r)=>{Promise.resolve().then(r.bind(r,39319))},50525:(e,t,r)=>{"use strict";r.d(t,{x:()=>c});var i=r(12115),n=r(39063),o=r(87303),a=r(88245),s=r(76873),l=r(95155);function u(e){return e.substring(2).toLowerCase()}function c(e){let{children:t,disableReactTree:r=!1,mouseEvent:c="onClick",onClickAway:d,touchEvent:h="onTouchEnd"}=e,f=i.useRef(!1),m=i.useRef(null),p=i.useRef(!1),g=i.useRef(!1);i.useEffect(()=>(setTimeout(()=>{p.current=!0},0),()=>{p.current=!1}),[]);let x=(0,n.A)((0,s.A)(t),m),v=(0,o.A)(e=>{let t=g.current;g.current=!1;let i=(0,a.A)(m.current);if(p.current&&m.current&&(!("clientX"in e)||!(i.documentElement.clientWidth<e.clientX)&&!(i.documentElement.clientHeight<e.clientY))){if(f.current){f.current=!1;return}(e.composedPath?e.composedPath().includes(m.current):!i.documentElement.contains(e.target)||m.current.contains(e.target))||!r&&t||d(e)}}),y=e=>r=>{g.current=!0;let i=t.props[e];i&&i(r)},S={ref:x};return!1!==h&&(S[h]=y(h)),i.useEffect(()=>{if(!1!==h){let e=u(h),t=(0,a.A)(m.current),r=()=>{f.current=!0};return t.addEventListener(e,v),t.addEventListener("touchmove",r),()=>{t.removeEventListener(e,v),t.removeEventListener("touchmove",r)}}},[v,h]),!1!==c&&(S[c]=y(c)),i.useEffect(()=>{if(!1!==c){let e=u(c),t=(0,a.A)(m.current);return t.addEventListener(e,v),()=>{t.removeEventListener(e,v)}}},[v,c]),(0,l.jsx)(i.Fragment,{children:i.cloneElement(t,S)})}},12470:(e,t,r)=>{"use strict";r.d(t,{A:()=>o}),r(12115);var i=r(12983),n=r(95155);let o=(0,i.A)((0,n.jsx)("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close")},92054:(e,t)=>{"use strict";t.qg=function(e,t){let r=new s,i=e.length;if(i<2)return r;let n=t?.decode||c,o=0;do{let t=e.indexOf("=",o);if(-1===t)break;let a=e.indexOf(";",o),s=-1===a?i:a;if(t>s){o=e.lastIndexOf(";",t-1)+1;continue}let c=l(e,o,t),d=u(e,t,c),h=e.slice(c,d);if(void 0===r[h]){let i=l(e,t+1,s),o=u(e,s,i),a=n(e.slice(i,o));r[h]=a}o=s+1}while(o<i);return r},t.lK=function(e,t,s){let l=s?.encode||encodeURIComponent;if(!r.test(e))throw TypeError(`argument name is invalid: ${e}`);let u=l(t);if(!i.test(u))throw TypeError(`argument val is invalid: ${t}`);let c=e+"="+u;if(!s)return c;if(void 0!==s.maxAge){if(!Number.isInteger(s.maxAge))throw TypeError(`option maxAge is invalid: ${s.maxAge}`);c+="; Max-Age="+s.maxAge}if(s.domain){if(!n.test(s.domain))throw TypeError(`option domain is invalid: ${s.domain}`);c+="; Domain="+s.domain}if(s.path){if(!o.test(s.path))throw TypeError(`option path is invalid: ${s.path}`);c+="; Path="+s.path}if(s.expires){var d;if(d=s.expires,"[object Date]"!==a.call(d)||!Number.isFinite(s.expires.valueOf()))throw TypeError(`option expires is invalid: ${s.expires}`);c+="; Expires="+s.expires.toUTCString()}if(s.httpOnly&&(c+="; HttpOnly"),s.secure&&(c+="; Secure"),s.partitioned&&(c+="; Partitioned"),s.priority)switch("string"==typeof s.priority?s.priority.toLowerCase():void 0){case"low":c+="; Priority=Low";break;case"medium":c+="; Priority=Medium";break;case"high":c+="; Priority=High";break;default:throw TypeError(`option priority is invalid: ${s.priority}`)}if(s.sameSite)switch("string"==typeof s.sameSite?s.sameSite.toLowerCase():s.sameSite){case!0:case"strict":c+="; SameSite=Strict";break;case"lax":c+="; SameSite=Lax";break;case"none":c+="; SameSite=None";break;default:throw TypeError(`option sameSite is invalid: ${s.sameSite}`)}return c};let r=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,i=/^[\u0021-\u003A\u003C-\u007E]*$/,n=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,o=/^[\u0020-\u003A\u003D-\u007E]*$/,a=Object.prototype.toString,s=(()=>{let e=function(){};return e.prototype=Object.create(null),e})();function l(e,t,r){do{let r=e.charCodeAt(t);if(32!==r&&9!==r)return t}while(++t<r);return r}function u(e,t,r){for(;t>r;){let r=e.charCodeAt(--t);if(32!==r&&9!==r)return t+1}return r}function c(e){if(-1===e.indexOf("%"))return e;try{return decodeURIComponent(e)}catch(t){return e}}},76046:(e,t,r)=>{"use strict";var i=r(66658);r.o(i,"useRouter")&&r.d(t,{useRouter:function(){return i.useRouter}})},39319:(e,t,r)=>{"use strict";r.r(t),r.d(t,{Copyright:()=>p,default:()=>x});var i=r(95155),n=r(9561),o=r(2572),a=r(19293),s=r(22282),l=r(80906),u=r(70689),c=r(76046),d=r(10897),h=r(8889),f=r(12115);let m=f.forwardRef(function(e,t){return(0,i.jsx)(d.A,{elevation:6,ref:t,variant:"filled",...e})});function p(e){return(0,i.jsxs)(n.A,{variant:"body2",color:"text.secondary",align:"center",...e,children:["Departamento de Sistemas \xa9 ",new Date().getFullYear(),"."]})}let g=async(e,t)=>{let r=await fetch(h.m.url+"/users/username",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({UserName:e,UserPass:t})});return r.ok?r.json():404===r.status?{error:{detail:"Credenciales incorrectas"}}:{error:{detail:"Error desconocido"}}},x=function(){let e=(0,c.useRouter)(),{login:t}=(0,u.A)(),[r,d]=(0,f.useState)(""),[h,p]=(0,f.useState)(!1),[x,v]=(0,f.useState)(!1),[y,S]=(0,f.useState)(!1),[A,w]=(0,f.useState)(""),C=async i=>{i.preventDefault();try{let i=await g(A,r);i.error?(S(!0),v(!0)):(p(!0),t(i),e.push("../pages"))}catch(e){S(!0),v(!0),console.log("Error en la pagina Iniciar Sesi\xf3n",e)}},E=e=>{"clicaway"!==e&&(p(!1),S(!1))};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o.A,{sx:{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"100vh",backgroundColor:"#f4f4f4"},children:(0,i.jsxs)(o.A,{sx:{display:"flex",width:"900px",height:"500px",boxShadow:3,borderRadius:"15px",overflow:"hidden",backgroundColor:"white"},children:[(0,i.jsxs)(o.A,{sx:{flex:1,backgroundColor:"#000",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:{xs:"20px",sm:"40px"},color:"white"},children:[(0,i.jsx)(n.A,{variant:"h5",color:"white",sx:{fontWeight:"bold"},children:"\xa1Bienvenido! "}),(0,i.jsx)(o.A,{sx:{textAlign:"center",marginBottom:"20px",width:{xs:"100px",sm:"200px",md:"300px"},height:"auto"},children:(0,i.jsx)("img",{src:"/LOGO.png",alt:"LOGO",style:{width:"100%",height:"auto",objectFit:"contain"}})})]}),(0,i.jsxs)(o.A,{component:"form",noValidate:!0,onSubmit:C,sx:{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"20px"},children:[(0,i.jsx)(n.A,{variant:"h5",sx:{fontWeight:"bold",marginBottom:"10px"},children:"Iniciar Sesi\xf3n"}),(0,i.jsx)(n.A,{variant:"body2",align:"center",sx:{color:"#757575",marginBottom:"20px"},children:"Utilice su Usuario y Contrase\xf1a"}),(0,i.jsx)(a.A,{error:y,id:"usuario",label:"Usuario",margin:"normal",fullWidth:!0,name:"PER_Usuario",value:A,onChange:e=>w(e.target.value)}),(0,i.jsx)(a.A,{error:y,margin:"normal",required:!0,fullWidth:!0,type:"password",name:"PER_Clave",id:"contrase\xf1a",label:"Contrase\xf1a",value:r,onChange:e=>d(e.target.value)}),(0,i.jsx)(s.A,{type:"submit",fullWidth:!0,sx:{mt:2,backgroundColor:"#000",color:"white","$:hover":{backgroundColor:"#339d82"}},children:"Iniciar sesi\xf3n"})]})]})}),h?(0,i.jsx)(l.A,{open:h,autoHideDuration:6e3,onClose:E,children:(0,i.jsx)(m,{onClose:E,variant:"outlined",severity:"success",sx:{width:"100%"},children:"Usuario identificado."})}):"",x?(0,i.jsx)(l.A,{open:x,autoHideDuration:6e3,onClose:E,children:(0,i.jsx)(m,{onClose:E,variant:"outlined",severity:"error",sx:{width:"100%"},children:"El usuario o la contrase\xf1a son incorrectos."})}):""]})}},8889:(e,t,r)=>{"use strict";r.d(t,{m:()=>i});let i={url:"http://192.168.1.3:3000/api"}},70689:(e,t,r)=>{"use strict";r.d(t,{A:()=>u,default:()=>l});var i=r(95155),n=r(12115),o=r(76046),a=r(92054);let s=(0,n.createContext)({login:e=>{},logout:()=>{}}),l=e=>{let{children:t}=e,r=(0,o.useRouter)(),[l,u]=(0,n.useState)(null),[c,d]=(0,n.useState)({}),[h,f]=(0,n.useState)({}),[m,p]=(0,n.useState)({}),g=(0,n.useCallback)(function(e){document.cookie=(0,a.lK)("auth",JSON.stringify(e.signedUser),{maxAge:604800,path:"/",httpOnly:!1,secure:!1,sameSite:"Strict"}),localStorage.setItem("auth",JSON.stringify(e.signedUser)),localStorage.setItem("Tokens",JSON.stringify(e.token)),u(e.signedUser)},[]),x=(0,n.useCallback)(function(e){document.cookie=(0,a.lK)("auth","",{maxAge:-1,path:"/"}),localStorage.removeItem("auth"),localStorage.removeItem("Tokens"),r.push("/")},[]);(0,n.useEffect)(()=>{let e=localStorage.getItem("auth"),t=localStorage.getItem("clienteV"),r=localStorage.getItem("pedidoV"),i=localStorage.getItem("cartera");e&&u(JSON.parse(e)),t&&d(JSON.parse(t)),r&&f(JSON.parse(r)),i&&p(JSON.parse(i))},[]),(0,n.useEffect)(()=>{let e=(0,a.qg)(document.cookie||"");e.auth&&u(JSON.parse(e.auth))},[]);let v=(0,n.useMemo)(()=>({auth:l,login:g,logout:x,clienteV:c,setClienteV:d,pedidosV:h,setPedidosV:f,carteraV:m,setCarteraV:p}),[l,c,h,m,g,x]);return(0,i.jsx)(s.Provider,{value:v,children:t})},u=()=>(0,n.useContext)(s)}},e=>{var t=t=>e(e.s=t);e.O(0,[6121,9293,3882,8441,1517,7358],()=>t(30352)),_N_E=e.O()}]);