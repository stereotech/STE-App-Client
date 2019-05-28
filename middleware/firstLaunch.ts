export * from 'vue-router'

export default async function (context) {
  await context.store.dispatch('settingsState/fetchSettings')
  let settings = context.store.state.settingsState.settings
  if (settings.firstLaunch) {
    if ((context.route.path as string).indexOf('firstlaunch') < 0) {
      return context.redirect('/firstlaunch')
    }
  } else if (settings.role == 'client') {
    if ((context.route.path as string).indexOf('client') < 0) {
      return context.redirect('/client')
    }
  } else if ((context.route.path as string).indexOf('firstlaunch') > 0) {
    return context.redirect('/')
  }
}
