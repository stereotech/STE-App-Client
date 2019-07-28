export default (ctx, inject) => {
    const { app } = ctx

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
                this.initStatusBar()
            } catch (err) {
                console.error('status bar failed', err)
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
