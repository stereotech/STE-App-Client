export default (ctx, inject) => {
    const { app, store } = ctx

    const cordovaApp: any = {
        // Application Constructor
        initialize () {
            document.addEventListener(
                'deviceready',
                this.onDeviceReady.bind(this),
                false
            )
        },

        onDeviceReady () {
            try {
                // @ts-ignore
                window.cordova.initStatusBar()
            } catch (err) {
                console.error('status bar failed', err)
            }

            try {
                if (process.env.NUXT_ENV_PLATFORM == 'MOBILE') {

                    console.log('Zeroconf start')
                    // @ts-ignore
                    window.cordova.plugins.zeroconf.watch('_stereotech._tcp.', 'local.', function (result) {
                        let action = result.action
                        let service = result.service
                        if (action == 'added') {
                            console.log('service added', service);
                        } else if (action == 'resolved') {
                            console.log('service resolved', service);
                            store.commit('clusterDiscoveryState/addAvaliable', service)
                            /* service : {
                            'domain' : 'local.',
                            'type' : '_http._tcp.',
                            'name': 'Becvert\'s iPad',
                            'port' : 80,
                            'hostname' : 'ipad-of-becvert.local',
                            'ipv4Addresses' : [ '192.168.1.125' ], 
                            'ipv6Addresses' : [ '2001:0:5ef5:79fb:10cb:1dbf:3f57:feb0' ],
                            'txtRecord' : {
                                'foo' : 'bar'
                            } */
                        } else {
                            console.log('service removed', service);
                            store.commit('clusterDiscoveryState/removeAvaliable', service)
                        }
                    })

                }
            } catch (err) {
                console.error('zeroconf failed', err)
            }
        },
    }

    cordovaApp.initialize()

    // patch redirect url for cordova - removes "formatUrl" call because it add "//" to the path
    app.context.redirect = (status, path, query) => {
        if (!status) {
            return
        }

        app.context._redirected = true
        // if only 1 or 2 arguments: redirect('/') or redirect('/', { foo: 'bar' })
        let pathType = typeof path
        if (
            typeof status !== 'number' &&
            (pathType === 'undefined' || pathType === 'object')
        ) {
            query = path || {}
            path = status
            pathType = typeof path
            status = 302
        }
        if (pathType === 'object') {
            path = app.router.resolve(path).href
        }
        // "/absolute/route", "./relative/route" or "../relative/route"
        if (/(^[.]{1,2}\/)|(^\/(?!\/))/.test(path)) {
            app.context.next({
                path: path,
                query: query,
                status: status
            })
        } else {
            // https://developer.mozilla.org/en-US/docs/Web/API/Location/replace

            // path = formatUrl(path, query) removed

            window.location.replace(path)
        }
    }
}
