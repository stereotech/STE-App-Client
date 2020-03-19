import { Middleware } from '@nuxt/types'


const firstLaunch: Middleware = async (context) => {
  if (process.env.NUXT_ENV_PLATFORM == 'MOBILE') {
    let apiUrl = context.store.state.apiUrl as string
    if (!apiUrl.startsWith('http://')) {
      return;
    }
  }
  await context.store.dispatch('settingsState/fetchSettings')
  let settings = context.store.state.settingsState.settings
  if (settings && context.app.i18n && context.app.i18n.locale !== settings.language) {
    await context.app.i18n.setLocale(settings.language)
    context.app.$moment.locale(settings.language)
  }
  if (settings.firstLaunch) {
    if ((context.route.path as string).indexOf('firstlaunch') < 0) {
      return context.redirect('/firstlaunch')
    }
  } else if ((context.route.path as string).indexOf('firstlaunch') > 0) {
    return context.redirect('/')
  }
}

export default firstLaunch