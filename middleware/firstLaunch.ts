export default async function (context) {
  await context.store.dispatch('settingsState/fetchSettings')
  if (context.store.state.settingsState.settings.firstLaunch) {
    if ((context.route.path as string).indexOf('firstlaunch') < 0) {
      return context.redirect('/firstlaunch')
    }
  }
}
