(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7887],{66790:function(e,a,r){Promise.resolve().then(r.bind(r,69310))},74853:function(e,a,r){"use strict";var o=r(94630),n=r(57437);a.Z=(0,o.Z)((0,n.jsx)("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12z"}),"Cancel")},29821:function(e,a,r){"use strict";var o=r(94630),n=r(57437);a.Z=(0,o.Z)((0,n.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"}),"CheckCircle")},69310:function(e,a,r){"use strict";r.r(a);var o=r(57437),n=r(70899),t=r(22560),i=r(77584),l=r(2069),s=r(59832),c=r(85860),d=r(58004),u=r(8350),h=r(94013),m=r(29821),x=r(2265),f=r(74853),g=r(98730),C=r(10932),j=r(93769),p=r(99376),v=r(29239),b=r(41698),Z=r(5515),w=r.n(Z),N=r(27648);let D=async e=>{let a=await fetch(b.x.url+"/gestioncartera/cartera/".concat(e.nit),{method:"GET",headers:{"Content-Type":"application/json"}});return await a.json()};a.default=()=>{let e=(0,p.useRouter)(),{auth:a,clienteV:r}=(0,C.a)(),[Z,S]=(0,x.useState)(""),[z,E]=(0,x.useState)([]),[y,k]=(0,x.useState)({}),[A,O]=(0,x.useState)(!1),[T,I]=(0,x.useState)(!1),[P,R]=(0,x.useState)(""),[q,F]=(0,x.useState)([]),[L,M]=(0,x.useState)(""),[V,W]=(0,x.useState)({Efectivo:!1,Cheque:!1,Consignación:!1}),[B,_]=(0,x.useState)([{banco:"",fecha:"",valor:"",numero:""}]),G=(0,n.Z)("(max-width: 600px)"),U=()=>{O(!0)},$=()=>{O(!1)},H=e=>{let a=[...B];a.splice(e,1),_(a)},J=(e,a,r)=>{let o=[...B];o[e][a]=r,_(o)},Y=e=>{let{name:a,checked:r}=e.target;W(e=>({...e,[a.toLowerCase()]:r})),"Cheque"===a&&r?U():$(),Q(r)},K=Object.values(V).some(e=>e),Q=(0,x.useCallback)(()=>{I(Z&&""!==Z.trim()||K)},[Z,K]);(0,x.useEffect)(()=>{(async()=>{if(r&&r.NIT){let e=(await D({nit:r.NIT})).data;e&&e.length>0&&E(e)}})()},[r]);let X=e=>new Date(e).toLocaleDateString("es-ES",{year:"numeric",day:"numeric",month:"numeric"}),ee=(e,a)=>{let r=parseFloat(a)||0;if(r<0){w().fire({icon:"error",title:"Valor Inv\xe1lido",text:"El valor no puede ser negativo."});return}let o=z.map(a=>{if(a.Documento===e){if(!(0>=(parseFloat(a.Saldo.replace(/[$,]/g,""))||0)))return{...a,valorAPagar:r||0};w().fire({icon:"error",title:"Error, Llamar a Cartera!",text:"Esta factura est\xe1 pendiente por Asentar."})}return a});E(o),k(a=>({...a,[e]:r||0})),er(o),F(a=>Array.isArray(a)?[...a,{NumeroDocumento:e,ValorCancelado:r}]:[{NumeroDocumento:e,ValorCancelado:r}])},ea=(e,a)=>{let r=e.target.checked,o=z.map(e=>e.Documento===a.Documento?{...e,selected:r,valorAPagar:r?e.Saldo:0,inputDisabled:r}:e);E(o),er(o),F(e=>(Array.isArray(e)||(e=[]),r)?[...e,{NumeroDocumento:a.Documento,ValorCancelado:a.Saldo}]:e.filter(e=>e.Documento!==a.Documento))},er=e=>{let a=e.reduce((e,a)=>{let r=a.valorAPagar?a.valorAPagar.toString().replace(/[$,]/g,""):"0";return e+(r=parseInt(r)||0)},0);S("$".concat(Number(a.toFixed(0)))),Q()},eo=async()=>{let o=q.reduce((e,a)=>(e[a.NumeroDocumento]=a.ValorCancelado,e),{}),n={};if(V.Cheque&&B.length>0&&(n=B.redudce((e,a,r)=>(e[r]={bank:a.banco,checknumber:a.numero,checkdate:a.fecha,value:a.valor},e),{})),!(await w().fire({title:"Por Favor Confirmar!",text:"\xbfDesea Guardar el Recibo?",icon:"question",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Aceptar",cancelButtonText:"Cancelar"})).isConfirmed){w().fire({text:"No se guardar el recibo.",icon:"info",timer:2e3});return}let t={customer:{nit:r.NIT,razonSocial:r.RazonSocial,email:r.Email,ciudad:r.CityName,departamento:r.DepartmentName},user:{ID:a.ID,UserEmail:a.UserEmail},TOTAL:Z,ReciboFisico:P,Comentarios:L,facturas:o,...V.Cheque&&B.length>0&&{cheques:n}};try{let a=await fetch(b.x.url+"/receipts/saveCustomersReceipts/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!a.ok){let e=await a.json();w().fire({icon:"error",title:"Error al crear la consignaci\xf3n",text:e.error||"Error Desconocido."});return}await a.json(),w().fire({icon:"success",title:"Recibo Creado",text:"El recibo se cre\xf3 correctamente."}),e.push("./recibo")}catch(e){w().fire({icon:"error",title:"Error de Conexi\xf3n",text:"No se pudo conectar al servidor o los datos enviados no son v\xe1lidos."})}};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(g.Z,{}),(0,o.jsxs)(l.Z,{children:[(0,o.jsxs)(l.Z,{sx:{display:"flex",flexDirection:G?"column":"row",justifyContent:"space-between",alignItems:"center",m:2},children:[(0,o.jsxs)(v.Z,{size:{xs:12,sm:6},children:[(0,o.jsx)("h4",{children:(0,o.jsxs)("strong",{children:["Nit: ",r.NIT," "]})}),(0,o.jsx)("h4",{children:(0,o.jsxs)("strong",{children:["Raz\xf3n Social: ",r.RazonSocial," "]})}),(0,o.jsx)("h4",{children:(0,o.jsxs)("strong",{children:["Email: ",r.Email," "]})})]}),(0,o.jsxs)(v.Z,{size:{xs:12,sm:"auto"},container:!0,justifyContent:G?"center":"flex-end",children:[(0,o.jsx)(s.Z,{onClick:eo,color:"success",disabled:!T,children:(0,o.jsx)(m.Z,{sx:{fontSize:40}})}),(0,o.jsx)(s.Z,{color:"error",LinkComponent:N.default,href:"../client",children:(0,o.jsx)(f.Z,{sx:{fontSize:40}})})]})]}),(0,o.jsx)(l.Z,{sx:{display:"flex",flexDirection:"column",m:2},children:(0,o.jsxs)(v.Z,{container:!0,spacing:2,sx:{flexDirection:G?"column":"row"},children:[(0,o.jsx)(i.Z,{id:"outlined-basic",label:"Escribir Comentario",multiline:!0,variant:"outlined",size:"small",value:L,onChange:e=>M(e.target.value),fullWidth:!0}),(0,o.jsx)(v.Z,{size:{xs:12,md:6},children:(0,o.jsx)(i.Z,{id:"standard-multiline-flexible",label:"Digite Recibo",multiline:!0,fullWidth:!0,size:"small",variant:"outlined",value:P,onChange:e=>R(e.target.value)})}),(0,o.jsx)(v.Z,{size:{xs:12,md:6},children:(0,o.jsx)(i.Z,{id:"standard-multiline-flexible",label:"Total",multiline:!0,size:"small",fullWidth:!0,variant:"outlined",value:Z,sx:{bgcolor:"#fff",color:"red",fontWeight:"bold"}})}),(0,o.jsxs)(v.Z,{size:{xs:12,sm:3},container:!0,spacing:1,sx:{flexDirection:G?"column":"row"},children:[(0,o.jsx)(v.Z,{size:{xs:4},children:(0,o.jsx)(c.Z,{control:(0,o.jsx)(t.Z,{name:"Efectivo",onChange:Y,sx:{color:"green","&.Mui-checked":{color:"green"}}}),label:"Efectivo"})}),(0,o.jsx)(v.Z,{size:{xs:4},children:(0,o.jsx)(c.Z,{control:(0,o.jsx)(t.Z,{name:"Cheque",onChange:Y,sx:{color:"blue","&.Mui-checked":{color:"blue"}}}),label:"Cheque"})}),(0,o.jsx)(v.Z,{size:{xs:4},children:(0,o.jsx)(c.Z,{control:(0,o.jsx)(t.Z,{name:"Consignaci\xf3n",onChange:Y,sx:{color:"red","&.Mui-checked":{color:"red"}}}),label:"Consignaci\xf3n"})})]})]})}),(0,o.jsx)(v.Z,{size:12,sx:{flexGrow:1,margin:2},children:(0,o.jsx)(l.Z,{sx:{width:"100%",heigth:G?300:500},children:(0,o.jsx)(j._,{rows:z,columns:[{field:"Documento",headerName:"DOCUMENTO",width:150,headerClassName:"header-bold"},{field:"TipoDocumento",headerName:"TIPO",width:150,headerClassName:"header-bold"},{field:"Monto",headerName:"MONTO",width:150,headerClassName:"header-bold"},{field:"FechaDocumento",headerName:"FECHA DOCUMENTO",width:150,renderCell:e=>X(e.value),headerClassName:"header-bold"},{field:"FechaVencimiento",headerName:"FECHA VENCIMIENTO",width:150,headerClassName:"header-bold"},{field:"Plazo",headerName:"PLAZO (D\xedas)",width:150,headerClassName:"header-bold"},{field:"DiasVencimiento",headerName:"D\xcdAS VENCIDOS",width:150,cellClassName:"plazo-cell",headerClassName:"header-bold"},{field:"Saldo",headerName:"SALDO",width:150,headerClassName:"header-bold"},{field:"boton",headerName:"",width:70,renderCell:e=>(0,o.jsx)(t.Z,{checked:e.row.selected||!1,onChange:a=>ea(a,e.row),sx:{color:e.row.selected?"green":void 0,"&.Mui-checked":{color:"green"}}})},{field:"cuadro",headerName:"",width:150,renderCell:e=>(0,o.jsx)(i.Z,{size:"small",value:e.row.inputDisabled?"":y[e.row.Documento]||"",onChange:a=>ee(e.row.Documento,a.target.value),disabled:e.row.inputDisabled,sx:{width:"120px"}})},{field:"pago",headerName:"VALOR A PAGAR",width:150,headerClassName:"header-bold",renderCell:e=>(0,o.jsx)(i.Z,{size:"small",value:"".concat(void 0!==e.row.valorAPagar&&null!==e.row.valorAPagar?e.row.valorAPagar:0),sx:{width:"120px"},InputProps:{readOnly:!0}})},{field:"StateName",headerName:"ESTADO",width:150,cellClassName:"total-cell",headerClassName:"header-bold"}],getRowId:e=>e.Documento,initialState:{pagination:{paginationModel:{pageSize:5}}},pageSizeOptions:[5,10,20]})})}),(0,o.jsx)(d.Z,{open:A,onClose:$,BackdropProps:{onClick:e=>e.stopPropagation()},"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:(0,o.jsxs)(l.Z,{sx:{p:4,backgroundColor:"white",borderRadius:"8px",maxWidth:"950px",width:"90%",height:"50vh",overflowY:"auto",margin:"auto",mt:4},children:[(0,o.jsx)("strong",{children:"Informaci\xf3n de Cheques"}),(0,o.jsx)(u.Z,{}),B.map((e,a)=>(0,o.jsx)(l.Z,{sx:{padding:2},children:(0,o.jsxs)(v.Z,{container:!0,spacing:2,alignItems:"center",children:[(0,o.jsxs)(v.Z,{size:{xs:12,md:2.4},children:[(0,o.jsx)("strong",{children:"Banco: "}),(0,o.jsx)(i.Z,{variant:"outlined",fullWidth:!0,margin:"normal",value:e.banco,onChange:e=>J(a,"banco",e.target.value),sx:{width:170}})]}),(0,o.jsxs)(v.Z,{size:{xs:12,md:2.4},children:[(0,o.jsx)("strong",{children:"Numero de Cheque: "}),(0,o.jsx)(i.Z,{variant:"outlined",fullWidth:!0,margin:"normal",value:e.numero,onChange:e=>J(a,"numero",e.target.value),sx:{width:170}})]}),(0,o.jsxs)(v.Z,{size:{xs:12,md:2.4},children:[(0,o.jsx)("strong",{children:"Fecha de Cheque: "}),(0,o.jsx)(i.Z,{type:"date",margin:"normal",value:e.fecha,onChange:e=>J(a,"fecha",e.target.value),slotProps:{textField:{variant:"outlined",fullWidth:!0,marginTop:1}}})]}),(0,o.jsxs)(v.Z,{size:{xs:12,md:2.4},children:[(0,o.jsx)("strong",{children:"Valor de Cheque: "}),(0,o.jsx)(i.Z,{variant:"outlined",fullWidth:!0,margin:"normal",value:e.valor,onChange:e=>J(a,"valor",e.target.value),sx:{width:170}})]}),(0,o.jsx)(v.Z,{size:{xs:12,md:2.4},children:(0,o.jsx)(h.Z,{onClick:H,variant:"outlined",color:"error",sx:{display:"flex",justifyContent:"center",alignItems:"center",margin:1},children:"Eliminar"})})]})},a)),(0,o.jsx)(u.Z,{}),(0,o.jsx)(v.Z,{container:!0,spacing:2,alignItems:"center",children:(0,o.jsx)(v.Z,{size:{xs:12,md:6},sx:{padding:2},children:(0,o.jsxs)(l.Z,{sx:{flexWrap:"wrap",flexDirection:G?"column":"row",justifyContent:"center",alignItems:"center"},children:[(0,o.jsx)(h.Z,{onClick:()=>{_([...B,{banco:"",fecha:"",valor:"",numero:""}])},variant:"contained",color:"secondary",sx:{margin:1},children:"A\xf1adir"}),(0,o.jsx)(h.Z,{onClick:()=>{if(!B.every(e=>e.banco&&e.fecha&&e.valor&&e.numero)){w().fire({icon:"error",title:"Error",text:"Por favor completa todos los campos antes de guardar."});return}w().fire({icon:"success",title:"Guardado",text:"Los datos se han guardado correctamente."}),_([...B]),$()},variant:"contained",color:"success",sx:{margin:1},children:"Guardar"}),(0,o.jsx)(h.Z,{onClick:$,variant:"contained",sx:{margin:1},children:"Cerrar"})]})})})]})})]})]})}}},function(e){e.O(0,[9461,173,7584,5615,1238,3840,3683,8730,2971,2117,1744],function(){return e(e.s=66790)}),_N_E=e.O()}]);