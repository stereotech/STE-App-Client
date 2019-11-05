import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
    interface Vue {
        $setLocale (locale: string): void
    }
}

declare module '@nuxt/types' {
    interface Context {
        $setLocale (locale: string): void
    }
}


declare module 'vuex/types/index' {
    interface Store<S> {
        $setLocale (locale: string): void
    }
}

const setLocalePlugin: Plugin = (context, inject) => {
    inject('setLocale', (locale: string) => {
        // context.app.$i18n.setLocale(locale)
        //context.app.$moment.locale(locale)
    }
    )
}

export default setLocalePlugin