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
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],

  router: {
    middleware: 'firstLaunch'
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
    '@nuxtjs/vuetify'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
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
  loading: { color: '#263238' }
}

export default config
