import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
    interface Vue {
        $currentTime: Date
    }
}

declare module '@nuxt/types' {
    interface NuxtAppOptions {
        $currentTime: Date
    }
    interface Context {
        $currentTime: Date
    }
}

declare module 'vuex/types/index' {
    interface Store<S> {
        $currentTime: Date
    }
}

const CurrentTimePlugin: Plugin = (context, inject) => {
    inject('currentTime', () => { })
}

export default CurrentTimePlugin