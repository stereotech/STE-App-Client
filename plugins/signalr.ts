import { HubConnectionBuilder, HttpTransportType, LogLevel } from '@aspnet/signalr'
import { CurrentState } from '~/types/printer'
import { Context } from '@nuxt/vue-app'

export default ({ app, store }, inject) => {
    const hub = new HubConnectionBuilder().withUrl(store.state.apiUrl + 'mainhub', { transport: HttpTransportType.WebSockets }).configureLogging(LogLevel.Debug).build()

    inject('hub', hub)

    hub.on("CurrentStateChanged", (id, state) => {
        let current: CurrentState = {
            id: id,
            busyFiles: state.busyFiles,
            currentZ: state.currentZ,
            job: state.job,
            logs: state.logs,
            messages: state.messages,
            offsets: state.offsets,
            progress: state.progress,
            serverTime: state.serverTime,
            state: state.state,
            temps: state.temps
        }
        store.commit('printersState/setOneStatus', current)
    })
    hub.on('PrinterStateChanged', (id, state) => {

    })
    hub.on('LocalStorageChanged', () => {
        store.dispatch('storageState/fetchLocal')
    })
    hub.on('USBStorageChanged', () => {
        store.dispatch('storageState/fetchJobs')
    })
    hub.on('JobAdded', () => {
        store.dispatch('printJobsState/fetchJobs')
    })
    hub.on('JobEdited', () => {
        store.dispatch('printJobsState/fetchJobs')
    })
    hub.on('JobDequeued', () => {
        store.dispatch('printJobsState/fetchJobs')
    })
    hub.on('JobRemoved', () => {
        store.dispatch('printJobsState/fetchJobs')
    })
    hub.on('PrinterAdded', () => {
        store.dispatch('printersState/fetchPrinters')
    })
    hub.on('PrinterRemoved', (id) => {
        store.commit('printersState/clearHistory', id)
        store.dispatch('printersState/fetchPrinters')

    })
    hub.on('PrinterError', () => {
        store.commit('printersState/setError')
    })

    hub.start().catch(function (err) {
        return console.error(err)
    })


    async function start () {
        try {
            console.log('Attempting reconnect')
            await hub.start()
        } catch (err) {
            console.log(err)
            setTimeout(() => start(), 5000)
        }
    }

    hub.onclose(async () => {
        await start()
    })
}