import { Middleware } from '@nuxt/types'

const localization: Middleware = async (context) => {
    await context.store.dispatch('settingsState/fetchSettings')
    let settings = context.store.state.settingsState.settings
    if (settings && context.app.i18n && context.app.i18n.locale !== settings.language) {
        console.log(`Set language: ${settings.language}`)
        context.app.i18n.setLocale(settings.language)
        context.app.$moment.locale(settings.language)

    }
}

export default localization
