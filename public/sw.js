if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const o=e=>a(e,i),r={module:{uri:i},exports:t,require:o};s[i]=Promise.all(c.map((e=>r[e]||o(e)))).then((e=>(n(...e),t)))}}define(["./workbox-00a24876"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/LOGO.png",revision:"682802252292a6f9d83c81e100be154e"},{url:"/_next/app-build-manifest.json",revision:"61efcbe95cd2f31068f03b85503e144f"},{url:"/_next/static/chunks/1238-cb0ef371552e0772.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/1411.b097ca68b8751e9d.js",revision:"b097ca68b8751e9d"},{url:"/_next/static/chunks/164f4fb6-1650459c63ae8b52.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/173-7561f0004816720b.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/2117-54055c90d480d1e9.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/2123-e33b070346cb1c7a.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/3462-c5bf9ca7a3bb440a.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/3683-aeeddc4ac99849cd.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/3840-e57bf08f5a5e1852.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/3859-52d68f6171f7a753.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/41ade5dc-9cd3e137e88de5c1.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/5615-3fab084f47f41579.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/6837-1e0d7f089d34ca6e.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/7584-9e9ebdd783df62e3.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/8070-576873d45305f6ef.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/8209-4dade0184da85baa.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/8570.0cc71a768f2af657.js",revision:"0cc71a768f2af657"},{url:"/_next/static/chunks/8730-a98d2e4aec83097b.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/ad2866b8.1fd5edbd6b1bba26.js",revision:"1fd5edbd6b1bba26"},{url:"/_next/static/chunks/app/_not-found/page-c603108eabc7fd34.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/app/layout-9cc168dd1cf2d489.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/app/page-4f9bed1ab99dadb5.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/app/pages/(informe)/gestionCartera/page-29e2ae820a63cba0.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/app/pages/(informe)/historicoVenta/page-845849e900af1f77.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/app/pages/(informe)/resumenVenta/page-935baaa7c5b5bb73.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/app/pages/(pedidos)/cotizacion/detalles/page-162104f8b33d087c.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/app/pages/(pedidos)/cotizacion/page-f97887b329bf12fc.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/app/pages/(pedidos)/pedidoEnviado/detallePedido/page-e9a31f6b843cc0e1.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/app/pages/(pedidos)/pedidoEnviado/page-74c1f34fbd78568a.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/app/pages/(pedidos)/pedidoSinEnviar/datosPedido/page-135eab715ba31278.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/app/pages/(pedidos)/pedidoSinEnviar/page-ef1352e8c06a4950.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/app/pages/cartera/consignacion/page-a7ac6c3898ab62c3.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/app/pages/cartera/elaborarCo/page-e9d4989260cd6e7c.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/app/pages/cartera/page-6b5f3f192633e5e1.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/app/pages/cartera/recibo/page-f8a65200601961f7.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/app/pages/client/(recibos)/crearRecibo/page-05933edb54ac218c.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/app/pages/client/(recibos)/recibo/page-8b17f902aa702d3f.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/app/pages/client/cotizacion/page-c4328666ff8471d4.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/app/pages/client/page-51d1942a3410a389.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/app/pages/client/pedidos/articulo/page-72a44975d77a7c07.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/app/pages/client/pedidos/page-8add1f4cd791d46f.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/app/pages/client/rutero/page-84296130acd1cee5.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/app/pages/inventario/page-289fa316dc5209f0.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/app/pages/page-58c569be7a9903b4.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/bc98253f.65973c91ba5366d2.js",revision:"65973c91ba5366d2"},{url:"/_next/static/chunks/fd9d1056-7ef2199319ff8e46.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/framework-8e0e0f4a6b83a956.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/main-8a75a35ce510187a.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/main-app-ff795c26a79a0c16.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/pages/_app-3c9ca398d360b709.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/pages/_error-cf5ca766ac8f493f.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-67b194b553ce050e.js",revision:"o4gFASfcnm4gusLE1m2Kv"},{url:"/_next/static/css/adbb78d50b237e96.css",revision:"adbb78d50b237e96"},{url:"/_next/static/media/045832894acda0e9-s.p.woff2",revision:"200c41f352c466e1c2b117656a0256e8"},{url:"/_next/static/media/0881a2b922b3331e-s.woff2",revision:"a0891d7e3512851a00017bc6aa93a49a"},{url:"/_next/static/media/27971e35634b7c88-s.woff2",revision:"4264bad61333859477947703b15aadfd"},{url:"/_next/static/media/279b47070a5d5877-s.woff2",revision:"f604c827dc8754b14422f431013955eb"},{url:"/_next/static/media/2f66f084fba01545-s.woff2",revision:"8e0642a7dd6dfe9491afa20e4a470655"},{url:"/_next/static/media/674abd25bb7be96f-s.woff2",revision:"92e5e17ec75636ec7ab5c46a00a54342"},{url:"/_next/static/media/7d1684f14ddac155-s.woff2",revision:"604411f91e27fd9740f3c4482aef4d58"},{url:"/_next/static/media/82233a533941ac93-s.woff2",revision:"ac7d441c7fe6e91a0dce7510d3b3d38e"},{url:"/_next/static/media/906678b269849541-s.woff2",revision:"21c838ead8641ef57bc94d27efcd257e"},{url:"/_next/static/media/994bf73bb06543dc-s.woff2",revision:"0ed4fab7b6a3e3c06f70de37b3eb5f47"},{url:"/_next/static/media/ac0efabfe978b0ad-s.woff2",revision:"ed31e4b8cd1d209be2e50af162f26e00"},{url:"/_next/static/media/cd31bf4b34f8dfb3-s.woff2",revision:"1a0c60b7297c849ea95c06380a4c0961"},{url:"/_next/static/media/da897b99eb1fe4a1-s.p.woff2",revision:"4903a00d1c555c0846799302c673d6a1"},{url:"/_next/static/media/ecf49d904668b268-s.woff2",revision:"9f2ae2ca944b5bd6c3d59b01f78ec5ff"},{url:"/_next/static/o4gFASfcnm4gusLE1m2Kv/_buildManifest.js",revision:"6310079bf1ae7bebeb6a2135896e4564"},{url:"/_next/static/o4gFASfcnm4gusLE1m2Kv/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/favicon.ico",revision:"a3eb4647e7a620565af4b9b88f0ff59f"},{url:"/fonts/GeistMonoVF.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/fonts/GeistVF.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/logo2.png",revision:"85991bd9eb4a2981a8b4dbcdbc596b79"},{url:"/logoMG.png",revision:"3f0d9fef46b977495536e484eea0086f"},{url:"/logo_factura.png",revision:"bcc33ec88e269de3ee5bf7dd10717a85"},{url:"/logo_miguelgomez.png",revision:"42d32dd13699a6bde4e627a34a7ab822"},{url:"/manifest.json",revision:"4435b6fabfad0a2c62163872b6e1c7ca"},{url:"/serviceworker.js",revision:"568f763c210a7f584887f1f714d2d594"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/\/_next\//,new e.CacheFirst({cacheName:"next-static-cahe",plugins:[new e.ExpirationPlugin({maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^http:\/\/localhost-pages-client\//,new e.NetworkFirst({cacheName:"api-cache",plugins:[new e.ExpirationPlugin({maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/.*/,new e.StaleWhileRevalidate({cacheName:"general-cahe",plugins:[]}),"GET")}));
