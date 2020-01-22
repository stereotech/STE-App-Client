import { Middleware } from '@nuxt/types'

const localization: Middleware = async (context) => {
    let settings = context.store.state.settingsState.settings
    if (settings && context.app.i18n) {
        context.app.i18n.setLocale(settings.language)
    }
}

export default localization
