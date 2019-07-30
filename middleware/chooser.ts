import { Context } from '@nuxt/vue-app'

export * from 'vue-router'

export default async function (context: Context) {
    if (process.env.NUXT_ENV_PLATFORM == 'MOBILE') {
        if ((context.route.path as string).indexOf('chooseprinter') > 0) {
            return
        }
        let apiUrl = context.store.state.apiUrl as string
        if (!apiUrl.startsWith('http://')) {
            return context.redirect('/chooseprinter')
        }
    } else if ((context.route.path as string).indexOf('chooseprinter') > 0) {
        return context.redirect('/')
    }
}