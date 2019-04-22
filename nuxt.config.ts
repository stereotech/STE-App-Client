import NuxtConfiguration from '@nuxt/config'

const config: NuxtConfiguration = {
  mode: 'spa',
  head: {
    title: 'STE App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'STE App Client' },
      { name: 'msapplication-TileColor', content: '#0277bd' },
      { name: 'theme-color', content: '#0277bd' }
    ]
  },
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#0277bd' }
  ],
  router: {
    middleware: 'firstLaunch',
  },
  generate: {
    dir: 'public'
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
    '@nuxtjs/vuetify'
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
    '/api/': { target: '*' }
  },
  vuetify: {
    treeShake: true,
    materialIcons: false,
    theme: {
      primary: '#0277bd',
      secondary: '#ffffff',
      accent: '#263238',
      error: '#FF5252',
      info: '#42A5F5',
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
  env: {
    apiUrl: '/api/'
  },
  serverMiddleware: [
    { path: '/api', handler: '~/api/mock.js' },
  ],
  performance: {
    hints: false
  }
}

export default config
