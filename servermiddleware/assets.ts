import * as path from 'path'
import serveStatic from 'serve-static'
import { ServerMiddleware } from '@nuxt/types'

const rootAssetDir = path.resolve(__dirname, '../../.nuxt/dist/client')
const serveAssets = serveStatic(rootAssetDir)

const assets: ServerMiddleware = function (req, res, next) {
    // add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Vary', 'Origin')

    // remove _pwa_assets from path
    req.originalUrl = req.originalUrl?.replace('/nuxtfiles', '')
    //@ts-ignore
    return serveAssets(req, res, next)
}

export default assets