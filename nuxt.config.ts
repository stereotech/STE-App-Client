const config = {
  mode: 'spa',
  head: {
    title: 'STE App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'STE App Client' }
    ]
  },
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ],
  router: {
    middleware: 'firstLaunch',
  },
  /*
   ** Global CSS
   */
  css: ['@mdi/font/css/materialdesignicons.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/moment', '~plugins/filters', '~/plugins/prettyBytes'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true,
    progress: false
  },
  proxy: {
    '/api/': { target: '*' },
    '/mainhub/': { target: '*' }
  },
  vuetify: {
    treeShake: true,
    materialIcons: false,
    theme: {
      primary: '#0277bd',
      secondary: '#ffffff',
      accent: '#263238',
      error: '#FF5252',
      info: '#9C27B0',
      success: '#4CAF50',
      warning: '#FFC107'
    },
    iconfont: 'mdi'
  },
  loading: { color: '#263238' },
  loadingIndicator: {
    name: 'folding-cube',
    color: '#ffffff',
    background: '#0277bd'
  },
  manifest: {

    "name": "STE App",
    "short_name": "STE App",
    "theme_color": "#0277bd",
    "background_color": "#ffffff",
    "display": "standalone",
    "scope": "/",
    "start_url": "/"
  },
  env: {
    apiUrl: '/api/'
  },
  serverMiddleware: [
    { path: '/api', handler: '~/api/mock.js' },
  ]
}

export default config
