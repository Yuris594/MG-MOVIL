(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7177],{85217:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,30347,23)),Promise.resolve().then(r.t.bind(r,39096,23)),Promise.resolve().then(r.bind(r,70689))},92054:(e,t)=>{"use strict";t.qg=function(e,t){let r=new s,i=e.length;if(i<2)return r;let o=t?.decode||c,a=0;do{let t=e.indexOf("=",a);if(-1===t)break;let n=e.indexOf(";",a),s=-1===n?i:n;if(t>s){a=e.lastIndexOf(";",t-1)+1;continue}let c=l(e,a,t),p=u(e,t,c),d=e.slice(c,p);if(void 0===r[d]){let i=l(e,t+1,s),a=u(e,s,i),n=o(e.slice(i,a));r[d]=n}a=s+1}while(a<i);return r},t.lK=function(e,t,s){let l=s?.encode||encodeURIComponent;if(!r.test(e))throw TypeError(`argument name is invalid: ${e}`);let u=l(t);if(!i.test(u))throw TypeError(`argument val is invalid: ${t}`);let c=e+"="+u;if(!s)return c;if(void 0!==s.maxAge){if(!Number.isInteger(s.maxAge))throw TypeError(`option maxAge is invalid: ${s.maxAge}`);c+="; Max-Age="+s.maxAge}if(s.domain){if(!o.test(s.domain))throw TypeError(`option domain is invalid: ${s.domain}`);c+="; Domain="+s.domain}if(s.path){if(!a.test(s.path))throw TypeError(`option path is invalid: ${s.path}`);c+="; Path="+s.path}if(s.expires){var p;if(p=s.expires,"[object Date]"!==n.call(p)||!Number.isFinite(s.expires.valueOf()))throw TypeError(`option expires is invalid: ${s.expires}`);c+="; Expires="+s.expires.toUTCString()}if(s.httpOnly&&(c+="; HttpOnly"),s.secure&&(c+="; Secure"),s.partitioned&&(c+="; Partitioned"),s.priority)switch("string"==typeof s.priority?s.priority.toLowerCase():void 0){case"low":c+="; Priority=Low";break;case"medium":c+="; Priority=Medium";break;case"high":c+="; Priority=High";break;default:throw TypeError(`option priority is invalid: ${s.priority}`)}if(s.sameSite)switch("string"==typeof s.sameSite?s.sameSite.toLowerCase():s.sameSite){case!0:case"strict":c+="; SameSite=Strict";break;case"lax":c+="; SameSite=Lax";break;case"none":c+="; SameSite=None";break;default:throw TypeError(`option sameSite is invalid: ${s.sameSite}`)}return c};let r=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,i=/^[\u0021-\u003A\u003C-\u007E]*$/,o=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,a=/^[\u0020-\u003A\u003D-\u007E]*$/,n=Object.prototype.toString,s=(()=>{let e=function(){};return e.prototype=Object.create(null),e})();function l(e,t,r){do{let r=e.charCodeAt(t);if(32!==r&&9!==r)return t}while(++t<r);return r}function u(e,t,r){for(;t>r;){let r=e.charCodeAt(--t);if(32!==r&&9!==r)return t+1}return r}function c(e){if(-1===e.indexOf("%"))return e;try{return decodeURIComponent(e)}catch(t){return e}}},76046:(e,t,r)=>{"use strict";var i=r(66658);r.o(i,"useRouter")&&r.d(t,{useRouter:function(){return i.useRouter}})},70689:(e,t,r)=>{"use strict";r.d(t,{A:()=>u,default:()=>l});var i=r(95155),o=r(12115),a=r(76046),n=r(92054);let s=(0,o.createContext)({login:e=>{},logout:()=>{}}),l=e=>{let{children:t}=e,r=(0,a.useRouter)(),[l,u]=(0,o.useState)(null),[c,p]=(0,o.useState)({}),[d,m]=(0,o.useState)({}),[f,h]=(0,o.useState)({}),g=(0,o.useCallback)(function(e){document.cookie=(0,n.lK)("auth",JSON.stringify(e.signedUser),{maxAge:604800,path:"/",httpOnly:!1,secure:!1,sameSite:"Strict"}),localStorage.setItem("auth",JSON.stringify(e.signedUser)),localStorage.setItem("Tokens",JSON.stringify(e.token)),u(e.signedUser)},[]),S=(0,o.useCallback)(function(e){document.cookie=(0,n.lK)("auth","",{maxAge:-1,path:"/"}),localStorage.removeItem("auth"),localStorage.removeItem("Tokens"),r.push("/")},[]);(0,o.useEffect)(()=>{let e=localStorage.getItem("auth"),t=localStorage.getItem("clienteV"),r=localStorage.getItem("pedidoV"),i=localStorage.getItem("cartera");e&&u(JSON.parse(e)),t&&p(JSON.parse(t)),r&&m(JSON.parse(r)),i&&h(JSON.parse(i))},[]),(0,o.useEffect)(()=>{let e=(0,n.qg)(document.cookie||"");e.auth&&u(JSON.parse(e.auth))},[]);let y=(0,o.useMemo)(()=>({auth:l,login:g,logout:S,clienteV:c,setClienteV:p,pedidosV:d,setPedidosV:m,carteraV:f,setCarteraV:h}),[l,c,d,f,g,S]);return(0,i.jsx)(s.Provider,{value:y,children:t})},u=()=>(0,o.useContext)(s)},30347:()=>{},39096:e=>{e.exports={style:{fontFamily:"'Lora', 'Lora Fallback'",fontStyle:"normal"},className:"__className_d48d41"}}},e=>{var t=t=>e(e.s=t);e.O(0,[8392,8441,1517,7358],()=>t(85217)),_N_E=e.O()}]);