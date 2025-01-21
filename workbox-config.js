module.exports = {
	globDirectory: 'out/',
	globPatterns: [
	  '*/.{html,js,css,svg,png,jpg,webp,json}'
	],
	swDest: 'out/sw.js',
	runtimeCaching: [
	  {
		urlPattern: /^http?.*/,
		handler: 'NetworkFirst',
		options: {
		  cacheName: 'runtime-cache',
		  expiration: {
			maxEntries: 50,
			maxAgeSeconds: 30 * 24 * 60 * 60 
		  }
		}
	  }
	],
	skipWaiting: true,
	clientsClaim: true
  };