(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7951],{39283:(e,t,n)=>{Promise.resolve().then(n.bind(n,67606))},67606:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>k});var s=n(95155),r=n(23165),i=n(2572),a=n(2241),l=n(19293),o=n(91888),d=n(60615),c=n(79283),x=n(22282),u=n(67663),h=n(56682),m=n(67459),j=n(16847),p=n(28858),A=n(51991),f=n(70689),g=n(76046),C=n(48097),w=n(8889),b=n(12115),v=n(78897),y=n.n(v),N=n(21455),S=n.n(N);let k=()=>{let e=(0,g.useRouter)(),{clienteV:t,auth:n}=(0,f.A)(),[v,N]=(0,b.useState)(null),[k,D]=(0,b.useState)(null),[T,E]=(0,b.useState)(!1),[I,R]=(0,b.useState)(""),[z,O]=(0,b.useState)(!1),[F,P]=(0,b.useState)(""),_=(0,r.A)("(max-width: 600px)"),U=z?"Si":"No",W=T?"Si":"No",H=async()=>{let s={Tipo:I,Comentario:F,Agenda:k?k.format("YYYY/MM/DD"):"0-0-0",FKNitCliente:t.NIT||"",FKUsuario:n.UserFullName||"USUARIOS",Hora:v?v.format("HH:mm:ss"):null,Realiza_pedido:U,Zona:t.CityName,Cobro:W,CODVENDEDOR:n.IDSaler};console.log("Datos enviados al bakend",s);try{let t=await fetch(w.m.url+"/gestioncartera/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}),n=await t.json();t.ok?(y().fire({position:"top-end",icon:"success",title:"Rutero Creado Correctamente",showConfirmButton:!1,timer:2500}),e.push("../gestionCartera")):(console.error("Response not ok",n),y().fire({icon:"error",title:"Error",text:n.text||"No se pudo guardar el rutero. Intente de nuevo."}))}catch(e){"AbortError"===e.name?y().fire({icon:"error",title:"Error",text:"La solicitud est\xe1 tardando demasiado. Intente nuevamente m\xe1s tarde."}):(console.error("Error details:",e),y().fire({icon:"error",title:"Error",text:"Ocurri\xf3 un error en la conexi\xf3n. Intente de nuevo."}))}};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(A.A,{}),(0,s.jsxs)(i.A,{sx:{width:_?"90%":600,margin:"0 auto",padding:2,border:"2px solid #000",p:2,mt:4},children:[(0,s.jsxs)(i.A,{sx:{display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:_?"center":"flex-start"},children:[(0,s.jsxs)(i.A,{sx:{display:"flex",flexDirection:"row",justifyContent:"space-between",width:"100%"},children:[(0,s.jsx)("strong",{children:"Nit: "}),t.NIT]}),(0,s.jsxs)(i.A,{sx:{display:"flex",flexDirection:"row",justifyContent:"space-between",width:"100%"},children:[(0,s.jsx)("strong",{children:"Raz\xf3n Social: "}),t.RazonSocial]}),(0,s.jsxs)(i.A,{sx:{display:"flex",flexDirection:"row",justifyContent:"space-between",width:"100%"},children:[(0,s.jsx)("strong",{children:"Usuario: "}),null==n?void 0:n.UserFullName]})]}),(0,s.jsx)(a.A,{sx:{my:2}}),(0,s.jsxs)(i.A,{sx:{maxWidth:650,margin:"0 auto",padding:2},children:[(0,s.jsxs)(C.A,{container:!0,spacing:2,alignItems:"center",children:[(0,s.jsx)(C.A,{size:{xs:12,sm:6},children:(0,s.jsx)(u.$,{dateAdapter:j.R,children:(0,s.jsx)(m.j,{components:["TimePicker"],children:(0,s.jsx)(p.A,{label:"Hora",fullWidth:!0,value:v,onChange:e=>N(e),minTime:S()().hour(7).minute(0),maxTime:S()().hour(20).minute(0),slotProps:{textField:{variant:"outlined",fullWidth:!0}}})})})}),(0,s.jsx)(C.A,{size:{xs:12,sm:6},children:(0,s.jsxs)(l.A,{label:"Tipo de Gesti\xf3n",select:!0,fullWidth:!0,value:I,onChange:e=>R(e.target.value),sx:{width:250,margin:1},children:[(0,s.jsx)(o.A,{value:"Telefonica",children:"Telef\xf3nica"}),(0,s.jsx)(o.A,{value:"Presencial",children:"Presencial"})]})})]}),(0,s.jsxs)(C.A,{container:!0,spacing:2,alignItems:"center",sx:{mt:2},children:[(0,s.jsx)(C.A,{size:{xs:6,sm:3},children:(0,s.jsx)(d.A,{control:(0,s.jsx)(c.A,{checked:z,onChange:e=>O(e.target.checked)}),label:"\xbfHizo pedido?"})}),(0,s.jsx)(C.A,{size:{xs:6,sm:3},children:(0,s.jsx)(d.A,{control:(0,s.jsx)(c.A,{checked:T,onChange:e=>E(e.target.checked)}),label:"\xbfCobr\xf3?"})}),(0,s.jsx)(C.A,{size:{xs:12,sm:6},children:(0,s.jsx)(u.$,{dateAdapter:j.R,children:(0,s.jsx)(h.l,{label:"Agendar",value:k,onChange:e=>D(e),slotProps:{textField:{variant:"outlined",fullWidth:!0}}})})})]}),(0,s.jsx)(l.A,{label:"Comentarios",multiline:!0,rows:3,fullWidth:!0,value:F,onChange:e=>P(e.target.value),sx:{mt:2}}),(0,s.jsx)(x.A,{variant:"contained",color:"success",onClick:H,sx:{mt:2,width:"100%"},children:"Guardar"})]})]})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[8320,6121,9293,4269,6251,1647,601,1991,8441,1517,7358],()=>t(39283)),_N_E=e.O()}]);