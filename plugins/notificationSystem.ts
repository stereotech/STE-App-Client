
export default ({ app }, inject) => {
    inject('notify', async (message: string, type: string = 'info', strict: boolean = false) => {
        if (strict) {
            app.$dialog(message, type)
        } else {
            if (process.env.NUXT_ENV_PLATFORM === 'WEB') {
                app.$snackbar(message, type)

                if (Notification.permission === "granted") {
                    new Notification(message, { icon: '/icon.png', badge: '/icon.png' })
                }
            } else if (process.env.NUXT_ENV_PLATFORM === 'MOBILE') {
                //@ts-ignore
                let cordovaNotifications = window.cordova.plugins.notification.local
                cordovaNotifications.schedule({
                    title: `STE App ${type.charAt(0).toUpperCase()}${type.slice(1)}`,
                    text: message,
                    icon: '/icon.png',
                    smallIcon: '/icon.png'
                })
            } else if (process.env.NUXT_ENV_PLATFORM === 'PANEL') {
                app.$snackbar(message, type)
            }
        }
    })
}

