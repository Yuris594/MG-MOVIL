if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let c={};const t=e=>a(e,r),o={module:{uri:r},exports:c,require:t};s[r]=Promise.all(n.map((e=>o[e]||t(e)))).then((e=>(i(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/LOGO.png",revision:"682802252292a6f9d83c81e100be154e"},{url:"/_next/app-build-manifest.json",revision:"938bc7300782a0dc529f1ae11bece49d"},{url:"/_next/static/HFrr9AoE-s6omenwrlGMw/_buildManifest.js",revision:"6310079bf1ae7bebeb6a2135896e4564"},{url:"/_next/static/HFrr9AoE-s6omenwrlGMw/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1238-cb0ef371552e0772.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/1411.b097ca68b8751e9d.js",revision:"b097ca68b8751e9d"},{url:"/_next/static/chunks/164f4fb6-1650459c63ae8b52.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/173-7561f0004816720b.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/2117-54055c90d480d1e9.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/2123-84b9be34ecfcd41b.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/3462-5114dfd92c0e927f.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/3683-aeeddc4ac99849cd.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/3840-e57bf08f5a5e1852.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/3859-52d68f6171f7a753.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/41ade5dc-9cd3e137e88de5c1.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/5615-3fab084f47f41579.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/6837-1e0d7f089d34ca6e.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/7584-9e9ebdd783df62e3.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/8070-576873d45305f6ef.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/8209-4dade0184da85baa.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/8570.0cc71a768f2af657.js",revision:"0cc71a768f2af657"},{url:"/_next/static/chunks/8730-03af2c356ea0bab3.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/ad2866b8.1fd5edbd6b1bba26.js",revision:"1fd5edbd6b1bba26"},{url:"/_next/static/chunks/app/_not-found/page-c603108eabc7fd34.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/app/layout-0c1e81bcebfc23fb.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/app/page-4f9bed1ab99dadb5.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/app/pages/(informe)/gestionCartera/page-4f9d87c306e1c787.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/app/pages/(informe)/historicoVenta/page-b01bee0d3477fd75.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/app/pages/(informe)/resumenVenta/page-b53413b545a1e6fc.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/app/pages/(pedidos)/cotizacion/detalles/page-3e50938b0aa82342.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/app/pages/(pedidos)/cotizacion/page-dad588a553169ad7.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/app/pages/(pedidos)/pedidoEnviado/detallePedido/page-81349bb6a052301d.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/app/pages/(pedidos)/pedidoEnviado/page-a974f05c864df678.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/app/pages/(pedidos)/pedidoSinEnviar/datosPedido/page-3ae582f770975c4e.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/app/pages/(pedidos)/pedidoSinEnviar/page-ef1352e8c06a4950.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/app/pages/cartera/consignacion/page-a7ac6c3898ab62c3.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/app/pages/cartera/elaborarCo/page-e9d4989260cd6e7c.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/app/pages/cartera/page-6b5f3f192633e5e1.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/app/pages/cartera/recibo/page-f8a65200601961f7.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/app/pages/client/(recibos)/crearRecibo/page-05933edb54ac218c.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/app/pages/client/(recibos)/recibo/page-8b17f902aa702d3f.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/app/pages/client/cotizacion/page-55ac9041101aec21.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/app/pages/client/page-51d1942a3410a389.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/app/pages/client/pedidos/articulo/page-347efcd578c912ee.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/app/pages/client/pedidos/page-6c76588342ac11c5.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/app/pages/client/rutero/page-84296130acd1cee5.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/app/pages/inventario/page-7560beadc564d58a.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/app/pages/page-58c569be7a9903b4.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/bc98253f.65973c91ba5366d2.js",revision:"65973c91ba5366d2"},{url:"/_next/static/chunks/fd9d1056-7ef2199319ff8e46.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/framework-8e0e0f4a6b83a956.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/main-4d63de7bad2d2906.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/main-app-ff795c26a79a0c16.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/pages/_app-3c9ca398d360b709.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/pages/_error-cf5ca766ac8f493f.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-67b194b553ce050e.js",revision:"HFrr9AoE-s6omenwrlGMw"},{url:"/_next/static/css/c0da799be133beca.css",revision:"c0da799be133beca"},{url:"/_next/static/media/045832894acda0e9-s.p.woff2",revision:"200c41f352c466e1c2b117656a0256e8"},{url:"/_next/static/media/0881a2b922b3331e-s.woff2",revision:"a0891d7e3512851a00017bc6aa93a49a"},{url:"/_next/static/media/27971e35634b7c88-s.woff2",revision:"4264bad61333859477947703b15aadfd"},{url:"/_next/static/media/279b47070a5d5877-s.woff2",revision:"f604c827dc8754b14422f431013955eb"},{url:"/_next/static/media/2f66f084fba01545-s.woff2",revision:"8e0642a7dd6dfe9491afa20e4a470655"},{url:"/_next/static/media/674abd25bb7be96f-s.woff2",revision:"92e5e17ec75636ec7ab5c46a00a54342"},{url:"/_next/static/media/7d1684f14ddac155-s.woff2",revision:"604411f91e27fd9740f3c4482aef4d58"},{url:"/_next/static/media/82233a533941ac93-s.woff2",revision:"ac7d441c7fe6e91a0dce7510d3b3d38e"},{url:"/_next/static/media/906678b269849541-s.woff2",revision:"21c838ead8641ef57bc94d27efcd257e"},{url:"/_next/static/media/994bf73bb06543dc-s.woff2",revision:"0ed4fab7b6a3e3c06f70de37b3eb5f47"},{url:"/_next/static/media/ac0efabfe978b0ad-s.woff2",revision:"ed31e4b8cd1d209be2e50af162f26e00"},{url:"/_next/static/media/cd31bf4b34f8dfb3-s.woff2",revision:"1a0c60b7297c849ea95c06380a4c0961"},{url:"/_next/static/media/da897b99eb1fe4a1-s.p.woff2",revision:"4903a00d1c555c0846799302c673d6a1"},{url:"/_next/static/media/ecf49d904668b268-s.woff2",revision:"9f2ae2ca944b5bd6c3d59b01f78ec5ff"},{url:"/favicon.ico",revision:"a3eb4647e7a620565af4b9b88f0ff59f"},{url:"/fonts/GeistMonoVF.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/fonts/GeistVF.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/icons/apple-icon-180.png",revision:"c1e7739f0bffb76858c8702da017ab37"},{url:"/icons/icon.png",revision:"a3eb4647e7a620565af4b9b88f0ff59f"},{url:"/icons/manifest-icon-192.maskable.png",revision:"a144465963ba789075d2c20ae7628e58"},{url:"/icons/manifest-icon-512.maskable.png",revision:"c1a31960dbfd29649e1cac95bf95ca58"},{url:"/icons/maskable_icon (1).png",revision:"c4ab1254761b94d610e5cb913b1b9614"},{url:"/logo2.png",revision:"85991bd9eb4a2981a8b4dbcdbc596b79"},{url:"/logoMG.png",revision:"3f0d9fef46b977495536e484eea0086f"},{url:"/logo_factura.png",revision:"bcc33ec88e269de3ee5bf7dd10717a85"},{url:"/logo_miguelgomez.png",revision:"42d32dd13699a6bde4e627a34a7ab822"},{url:"/manifest.json",revision:"563d23fa79453a3eb49eb7126102690c"},{url:"/service-worker.js",revision:"c33b7c2b0030acbc668b0cacad0faa3f"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
