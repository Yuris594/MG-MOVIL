(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1410],{16448:function(e,t,r){Promise.resolve().then(r.bind(r,13462))},27696:function(e,t){"use strict";t.Qc=function(e,t){let r=new u,i=e.length;if(i<2)return r;let o=t?.decode||l,a=0;do{let t=e.indexOf("=",a);if(-1===t)break;let n=e.indexOf(";",a),u=-1===n?i:n;if(t>u){a=e.lastIndexOf(";",t-1)+1;continue}let l=s(e,a,t),f=c(e,t,l),p=e.slice(l,f);if(void 0===r[p]){let i=s(e,t+1,u),a=c(e,u,i),n=o(e.slice(i,a));r[p]=n}a=u+1}while(a<i);return r},t.qC=function(e,t,u){let s=u?.encode||encodeURIComponent;if(!r.test(e))throw TypeError(`argument name is invalid: ${e}`);let c=s(t);if(!i.test(c))throw TypeError(`argument val is invalid: ${t}`);let l=e+"="+c;if(!u)return l;if(void 0!==u.maxAge){if(!Number.isInteger(u.maxAge))throw TypeError(`option maxAge is invalid: ${u.maxAge}`);l+="; Max-Age="+u.maxAge}if(u.domain){if(!o.test(u.domain))throw TypeError(`option domain is invalid: ${u.domain}`);l+="; Domain="+u.domain}if(u.path){if(!a.test(u.path))throw TypeError(`option path is invalid: ${u.path}`);l+="; Path="+u.path}if(u.expires){var f;if(f=u.expires,"[object Date]"!==n.call(f)||!Number.isFinite(u.expires.valueOf()))throw TypeError(`option expires is invalid: ${u.expires}`);l+="; Expires="+u.expires.toUTCString()}if(u.httpOnly&&(l+="; HttpOnly"),u.secure&&(l+="; Secure"),u.partitioned&&(l+="; Partitioned"),u.priority)switch("string"==typeof u.priority?u.priority.toLowerCase():void 0){case"low":l+="; Priority=Low";break;case"medium":l+="; Priority=Medium";break;case"high":l+="; Priority=High";break;default:throw TypeError(`option priority is invalid: ${u.priority}`)}if(u.sameSite)switch("string"==typeof u.sameSite?u.sameSite.toLowerCase():u.sameSite){case!0:case"strict":l+="; SameSite=Strict";break;case"lax":l+="; SameSite=Lax";break;case"none":l+="; SameSite=None";break;default:throw TypeError(`option sameSite is invalid: ${u.sameSite}`)}return l};let r=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,i=/^[\u0021-\u003A\u003C-\u007E]*$/,o=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,a=/^[\u0020-\u003A\u003D-\u007E]*$/,n=Object.prototype.toString,u=(()=>{let e=function(){};return e.prototype=Object.create(null),e})();function s(e,t,r){do{let r=e.charCodeAt(t);if(32!==r&&9!==r)return t}while(++t<r);return r}function c(e,t,r){for(;t>r;){let r=e.charCodeAt(--t);if(32!==r&&9!==r)return t+1}return r}function l(e){if(-1===e.indexOf("%"))return e;try{return decodeURIComponent(e)}catch(t){return e}}},99376:function(e,t,r){"use strict";var i=r(35475);r.o(i,"useRouter")&&r.d(t,{useRouter:function(){return i.useRouter}})},42569:function(e,t,r){"use strict";r.d(t,{zK:function(){return o}});var i=r(90960);let o=async()=>await (0,i.X3)("IDBService",1,{upgrade(e){e.createObjectStore("articles",{keyPath:"PKcodigo"}),e.createObjectStore("cartera",{keyPath:"Documento"}),e.createObjectStore("customers",{keyPath:"ID"})}})},41698:function(e,t,r){"use strict";r.d(t,{x:function(){return i}});let i={url:"http://192.168.1.3:3010/api"}},10932:function(e,t,r){"use strict";r.d(t,{a:function(){return s}});var i=r(57437),o=r(2265),a=r(99376),n=r(27696);let u=(0,o.createContext)({login:e=>{},logout:()=>{}});t.default=e=>{let{children:t}=e,r=(0,a.useRouter)(),[s,c]=(0,o.useState)(null),[l,f]=(0,o.useState)({}),[p,d]=(0,o.useState)({}),[m,h]=(0,o.useState)({}),S=(0,o.useCallback)(function(e){document.cookie=(0,n.qC)("auth",JSON.stringify(e.signedUser),{maxAge:604800,path:"/",httpOnly:!1,secure:!1,sameSite:"Strict"}),localStorage.setItem("auth",JSON.stringify(e.signedUser)),localStorage.setItem("Tokens",JSON.stringify(e.token)),c(e.signedUser)},[]),g=(0,o.useCallback)(function(e){document.cookie=(0,n.qC)("auth","",{maxAge:-1,path:"/"}),localStorage.removeItem("auth"),localStorage.removeItem("Tokens"),r.push("/")},[]);(0,o.useEffect)(()=>{let e=localStorage.getItem("auth"),t=localStorage.getItem("clienteV"),r=localStorage.getItem("pedidoV"),i=localStorage.getItem("cartera");e&&c(JSON.parse(e)),t&&f(JSON.parse(t)),r&&d(JSON.parse(r)),i&&h(JSON.parse(i))},[]),(0,o.useEffect)(()=>{let e=(0,n.Qc)(document.cookie||"");e.auth&&c(JSON.parse(e.auth))},[]);let y=(0,o.useMemo)(()=>({auth:s,login:S,logout:g,clienteV:l,setClienteV:f,pedidosV:p,setPedidosV:d,carteraV:m,setCarteraV:h}),[s,l,p,m,S,g]);return(0,i.jsx)(u.Provider,{value:y,children:t})};let s=()=>(0,o.useContext)(u)}},function(e){e.O(0,[9461,173,3615,5615,9909,3840,3462,2971,2117,1744],function(){return e(e.s=16448)}),_N_E=e.O()}]);