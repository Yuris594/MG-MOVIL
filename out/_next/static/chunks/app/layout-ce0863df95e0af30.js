(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3185],{78504:function(e,t,i){Promise.resolve().then(i.t.bind(i,40376,23)),Promise.resolve().then(i.t.bind(i,2778,23)),Promise.resolve().then(i.bind(i,10932))},27696:function(e,t){"use strict";t.Qc=function(e,t){let i=new s,r=e.length;if(r<2)return i;let o=t?.decode||c,a=0;do{let t=e.indexOf("=",a);if(-1===t)break;let n=e.indexOf(";",a),s=-1===n?r:n;if(t>s){a=e.lastIndexOf(";",t-1)+1;continue}let c=u(e,a,t),f=l(e,t,c),p=e.slice(c,f);if(void 0===i[p]){let r=u(e,t+1,s),a=l(e,s,r),n=o(e.slice(r,a));i[p]=n}a=s+1}while(a<r);return i},t.qC=function(e,t,s){let u=s?.encode||encodeURIComponent;if(!i.test(e))throw TypeError(`argument name is invalid: ${e}`);let l=u(t);if(!r.test(l))throw TypeError(`argument val is invalid: ${t}`);let c=e+"="+l;if(!s)return c;if(void 0!==s.maxAge){if(!Number.isInteger(s.maxAge))throw TypeError(`option maxAge is invalid: ${s.maxAge}`);c+="; Max-Age="+s.maxAge}if(s.domain){if(!o.test(s.domain))throw TypeError(`option domain is invalid: ${s.domain}`);c+="; Domain="+s.domain}if(s.path){if(!a.test(s.path))throw TypeError(`option path is invalid: ${s.path}`);c+="; Path="+s.path}if(s.expires){var f;if(f=s.expires,"[object Date]"!==n.call(f)||!Number.isFinite(s.expires.valueOf()))throw TypeError(`option expires is invalid: ${s.expires}`);c+="; Expires="+s.expires.toUTCString()}if(s.httpOnly&&(c+="; HttpOnly"),s.secure&&(c+="; Secure"),s.partitioned&&(c+="; Partitioned"),s.priority)switch("string"==typeof s.priority?s.priority.toLowerCase():void 0){case"low":c+="; Priority=Low";break;case"medium":c+="; Priority=Medium";break;case"high":c+="; Priority=High";break;default:throw TypeError(`option priority is invalid: ${s.priority}`)}if(s.sameSite)switch("string"==typeof s.sameSite?s.sameSite.toLowerCase():s.sameSite){case!0:case"strict":c+="; SameSite=Strict";break;case"lax":c+="; SameSite=Lax";break;case"none":c+="; SameSite=None";break;default:throw TypeError(`option sameSite is invalid: ${s.sameSite}`)}return c};let i=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,r=/^[\u0021-\u003A\u003C-\u007E]*$/,o=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,a=/^[\u0020-\u003A\u003D-\u007E]*$/,n=Object.prototype.toString,s=(()=>{let e=function(){};return e.prototype=Object.create(null),e})();function u(e,t,i){do{let i=e.charCodeAt(t);if(32!==i&&9!==i)return t}while(++t<i);return i}function l(e,t,i){for(;t>i;){let i=e.charCodeAt(--t);if(32!==i&&9!==i)return t+1}return i}function c(e){if(-1===e.indexOf("%"))return e;try{return decodeURIComponent(e)}catch(t){return e}}},99376:function(e,t,i){"use strict";var r=i(35475);i.o(r,"useRouter")&&i.d(t,{useRouter:function(){return r.useRouter}})},10932:function(e,t,i){"use strict";i.d(t,{a:function(){return u}});var r=i(57437),o=i(2265),a=i(99376),n=i(27696);let s=(0,o.createContext)({login:e=>{},logout:()=>{}});t.default=e=>{let{children:t}=e,i=(0,a.useRouter)(),[u,l]=(0,o.useState)(null),[c,f]=(0,o.useState)({}),[p,m]=(0,o.useState)({}),[d,h]=(0,o.useState)({}),S=(0,o.useCallback)(function(e){document.cookie=(0,n.qC)("auth",JSON.stringify(e.signedUser),{maxAge:604800,path:"/",httpOnly:!1,secure:!1,sameSite:"Strict"}),localStorage.setItem("auth",JSON.stringify(e.signedUser)),localStorage.setItem("Tokens",JSON.stringify(e.token)),l(e.signedUser)},[]),g=(0,o.useCallback)(function(e){document.cookie=(0,n.qC)("auth","",{maxAge:-1,path:"/"}),localStorage.removeItem("auth"),localStorage.removeItem("Tokens"),i.push("/")},[]);(0,o.useEffect)(()=>{let e=localStorage.getItem("auth"),t=localStorage.getItem("clienteV"),i=localStorage.getItem("pedidoV"),r=localStorage.getItem("cartera");e&&l(JSON.parse(e)),t&&f(JSON.parse(t)),i&&m(JSON.parse(i)),r&&h(JSON.parse(r))},[]),(0,o.useEffect)(()=>{let e=(0,n.Qc)(document.cookie||"");e.auth&&l(JSON.parse(e.auth))},[]);let y=(0,o.useMemo)(()=>({auth:u,login:S,logout:g,clienteV:c,setClienteV:f,pedidosV:p,setPedidosV:m,carteraV:d,setCarteraV:h}),[u,c,p,d,S,g]);return(0,r.jsx)(s.Provider,{value:y,children:t})};let u=()=>(0,o.useContext)(s)},2778:function(){},40376:function(e){e.exports={style:{fontFamily:"'__Roboto_90b533', '__Roboto_Fallback_90b533'",fontStyle:"normal"},className:"__className_90b533"}}},function(e){e.O(0,[1975,2971,2117,1744],function(){return e(e.s=78504)}),_N_E=e.O()}]);