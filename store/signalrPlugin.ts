import { HubConnectionBuilder, HttpTransportType, LogLevel } from '@aspnet/signalr'
import { CurrentState } from '~/types/printer'

export const InitSignalR = store => {
    if (store.state.apiUrl) {
        let connection = new HubConnectionBuilder().withUrl(store.state.apiUrl + 'mainhub').configureLogging(LogLevel.Debug).build()

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
        connection.start();
    }
}

