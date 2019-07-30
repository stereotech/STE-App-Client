import { HubConnectionBuilder, HttpTransportType, LogLevel } from '@aspnet/signalr'
import { CurrentState } from '~/types/printer'

export const InitSignalR = store => {
    let apiUrl = store.state.apiUrl as string
    let canStart: boolean = true
    if (process.env.NUXT_ENV_PLATFORM == 'MOBILE' && !apiUrl.startsWith('http://')) {
        canStart = false
    }
    if (canStart) {
        let connection = new HubConnectionBuilder().withUrl(store.state.apiUrl + 'mainhub', { transport: HttpTransportType.WebSockets }).configureLogging(LogLevel.Debug).build()

        connection.onclose(() => {

        })

        connection.on("CurrentStateChanged", (id, state) => {
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
        connection.on('PrinterStateChanged', (id, state) => {

        })
        connection.on('LocalStorageChanged', () => {
            store.dispatch('storageState/fetchLocal')
        })
        connection.on('USBStorageChanged', () => {
            store.dispatch('storageState/fetchJobs')
        })
        connection.on('JobAdded', () => {
            store.dispatch('printJobsState/fetchJobs')
        })
        connection.on('JobEdited', () => {
            store.dispatch('printJobsState/fetchJobs')
        })
        connection.on('JobDequeued', () => {
            store.dispatch('printJobsState/fetchJobs')
        })
        connection.on('JobRemoved', () => {
            store.dispatch('printJobsState/fetchJobs')
        })
        connection.on('PrinterAdded', () => {
            store.dispatch('printersState/fetchPrinters')
        })
        connection.on('PrinterRemoved', (id) => {
            store.commit('printersState/clearHistory', id)
            store.dispatch('printersState/fetchPrinters')

        })
        connection.on('PrinterError', () => {
            store.commit('printersState/setError')
        })
        connection.start()
    }
}

