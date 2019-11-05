import { Configuration } from '@nuxt/types'

const config: Configuration = {
  mode: 'spa',
  head: {
    title: 'STE App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,minimal-ui' },
      { hid: 'description', name: 'description', content: '3D printing management application' }
    ],
    script: process.env.NUXT_ENV_PLATFORM === 'MOBILE' ? [{ src: 'cordova.js', type: 'text/javascript', innerHTML: '' }] : [],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },

  router: {
    mode: 'hash',
    middleware: ['chooser', 'firstLaunch'],
  },
  /*
   ** Global CSS
   */
  css: ['@mdi/font/css/materialdesignicons.css', '~/assets/main.css', 'typeface-roboto/index.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/filters',
    '~/plugins/prettyBytes',
    '~/plugins/i18n',
    '~/plugins/locale',
    '~/plugins/cordova',
    '~/plugins/snackbarQueue',
    '~/plugins/dialogQueue',
    '~/plugins/notificationSystem',
    '~/plugins/signalr'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa'
  ],

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify', '@nuxtjs/moment'],

  typescript: {
    typeCheck: {
      memoryLimit: 3072
    },
    ignoreNotFoundWarnings: true,

  },
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
  },
  vuetify: {
    treeShake: false,
    materialIcons: false,
    theme: {
      themes: {
        light: {
          primary: '#0277bd',
          secondary: '#ffffff',
          accent: '#263238',
          error: '#FF5252',
          info: '#9C27B0',
          success: '#4CAF50',
          warning: '#FFC107'
        },
        dark: {
          primary: '#0277bd',
          secondary: '#ffffff',
          accent: '#263238',
          error: '#FF5252',
          info: '#9C27B0',
          success: '#4CAF50',
          warning: '#FFC107'
        }
      }
    },
    iconfont: 'mdi'
  },
  moment: {
    locales: ['ru']
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
  serverMiddleware: [
    { path: '/api', handler: '~/api/mock.js' },
    { path: '/nuxtfiles', handler: '~/servermiddleware/assets.js' }
  ],
  build: {
    publicPath: '/nuxtfiles/',
    parallel: true,
  }
}




export default config
