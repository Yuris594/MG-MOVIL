(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1931],{98370:function(e,t,r){Promise.resolve().then(r.bind(r,31969))},31969:function(e,t,r){"use strict";r.r(t),r.d(t,{Copyright:function(){return j}});var o=r(57437),n=r(90632),a=r(83719),s=r(79647),i=r(17156),l=r(20124),u=r(68396),c=r(53019),d=r(48965),h=r(76548),g=r(25774),m=r(85800),p=r(16463),x=r(27270),f=r(89967),S=r(2265),v=r(66648);let C=(0,n.Z)({components:{MuiButton:{styleOverrides:{root:{borderRadius:"8px",backgroundColor:"#32DE0C","&:hover":{backgroundColor:"#0CDE1F"}}}},MuiButton:{styleOverrides:{root:{marginBottom:"1rem"}}}}}),b=S.forwardRef(function(e,t){return(0,o.jsx)(x.Z,{elevation:6,ref:t,variant:"filled",...e})});function j(e){return(0,o.jsxs)(a.Z,{variant:"body2",color:"text.secondary",align:"center",...e,children:["Departamento de Sistemas \xa9 ",new Date().getFullYear(),"."]})}let y=async(e,t)=>{let r=await fetch(f.x.url+"/users/username",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({UserName:e,UserPass:t})});return r.ok?r.json():404===r.status?{error:{detail:"Credenciales incorrectas"}}:{error:{detail:"Error desconocido"}}};t.default=function(){let e=(0,p.useRouter)(),{login:t}=(0,m.a)(),[r,n]=(0,S.useState)(""),[x,f]=(0,S.useState)(!1),[j,k]=(0,S.useState)(!1),[Z,O]=(0,S.useState)(!1),[w,E]=(0,S.useState)(""),N=(0,s.Z)(C.breakpoints.down("sm")),I=async o=>{o.preventDefault();try{let o=await y(w,r);o.error?(O(!0),k(!0)):(f(!0),t(o),e.push("../pages"))}catch(e){O(!0),k(!0),console.log("Error en la pagina Iniciar Sesi\xf3n",e)}},F=e=>{"clicaway"!==e&&(f(!1),O(!1))};return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)(i.Z,{sx:{height:"100vh",display:"flex",flexDirection:"column",alignItems:"center",backgroundColor:"#f5f5f5"},children:[(0,o.jsx)(l.ZP,{}),(0,o.jsxs)(u.Z,{theme:C,children:[(0,o.jsx)(i.Z,{sx:{width:"100%",backgroundColor:"#1C1E1E",padding:2,textAlign:"center"},children:(0,o.jsx)(v.default,{src:"/logo2.png",width:N?200:240,height:N?120:140,alt:"Logo",priority:!0})}),(0,o.jsxs)(c.Z,{component:"main",maxWidth:"xs",sx:{backgroundColor:"#FFFFFF",padding:4,borderRadius:2,boxShadow:"0px 5px 15px rgba(0,0,0,0.3)",marginTop:1},children:[(0,o.jsx)(a.Z,{component:"h1",variant:"h5",align:"center",sx:{fontWeight:"bold",marginBottom:2},children:"Iniciar Sesi\xf3n"}),(0,o.jsxs)(i.Z,{component:"form",noValidate:!0,onSubmit:I,sx:{mt:1},children:[(0,o.jsx)(d.Z,{error:Z,id:"usuario",label:"Usuario",margin:"normal",fullWidth:!0,name:"PER_Usuario",value:w,onChange:e=>E(e.target.value)}),(0,o.jsx)(a.Z,{component:"h1",variant:"h6"}),(0,o.jsx)(d.Z,{error:Z,margin:"normal",required:!0,fullWidth:!0,type:"password",name:"PER_Clave",id:"contrase\xf1a",label:"Contrase\xf1a",value:r,onChange:e=>n(e.target.value)}),(0,o.jsx)(h.Z,{type:"submit",fullWidth:!0,variant:"contained",color:"success",sx:{marginTop:2},children:"Iniciar sesi\xf3n"})]})]})]}),x?(0,o.jsx)(g.Z,{open:x,autoHideDuration:6e3,onClose:F,children:(0,o.jsx)(b,{onClose:F,variant:"outlined",severity:"success",sx:{width:"100%"},children:"Usuario identificado."})}):"",j?(0,o.jsx)(g.Z,{open:j,autoHideDuration:6e3,onClose:F,children:(0,o.jsx)(b,{onClose:F,variant:"outlined",severity:"error",sx:{width:"100%"},children:"El usuario o la contrase\xf1a son incorrectos."})}):""]})})}},89967:function(e,t,r){"use strict";r.d(t,{x:function(){return o}});let o={url:"http://192.168.1.3:3000/api"}},85800:function(e,t,r){"use strict";r.d(t,{a:function(){return l}});var o=r(57437),n=r(2265),a=r(16463),s=r(23739);let i=(0,n.createContext)({login:e=>{},logout:()=>{}});t.default=e=>{let{children:t}=e,r=(0,a.useRouter)(),[l,u]=(0,n.useState)(null),[c,d]=(0,n.useState)({}),[h,g]=(0,n.useState)({}),[m,p]=(0,n.useState)({}),x=(0,n.useCallback)(function(e){document.cookie=(0,s.qC)("auth",JSON.stringify(e.signedUser),{maxAge:604800,path:"/",httpOnly:!1,secure:!1,sameSite:"Strict"}),localStorage.setItem("auth",JSON.stringify(e.signedUser)),localStorage.setItem("Tokens",JSON.stringify(e.token)),u(e.signedUser)},[]),f=(0,n.useCallback)(function(e){document.cookie=(0,s.qC)("auth","",{maxAge:-1,path:"/"}),localStorage.removeItem("auth"),localStorage.removeItem("Tokens"),r.push("/")},[]);(0,n.useEffect)(()=>{let e=localStorage.getItem("auth"),t=localStorage.getItem("clienteV"),r=localStorage.getItem("pedidoV"),o=localStorage.getItem("cartera");e&&u(JSON.parse(e)),t&&d(JSON.parse(t)),r&&g(JSON.parse(r)),o&&p(JSON.parse(o))},[]),(0,n.useEffect)(()=>{let e=(0,s.Qc)(document.cookie||"");e.auth&&u(JSON.parse(e.auth))},[]);let S=(0,n.useMemo)(()=>({auth:l,login:x,logout:f,clienteV:c,setClienteV:d,pedidosV:h,setPedidosV:g,carteraV:m,setCarteraV:p}),[l,c,h,m,x,f]);return(0,o.jsx)(i.Provider,{value:S,children:t})};let l=()=>(0,n.useContext)(i)}},function(e){e.O(0,[5148,8965,6648,2284,2709,2971,7023,1744],function(){return e(e.s=98370)}),_N_E=e.O()}]);