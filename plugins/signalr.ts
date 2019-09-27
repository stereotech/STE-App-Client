import { HubConnectionBuilder, HttpTransportType, LogLevel, HubConnection, HubConnectionState } from '@aspnet/signalr'
import { CurrentState } from '../types/printer'
import moment, { version } from 'moment'
import { SoftwareUpdateState } from '~/store/updateState';

export default ({ app, store }, inject) => {
    function generateHub () {
        let hub = new HubConnectionBuilder()
            .withUrl(store.state.apiUrl + 'mainhub', { transport: HttpTransportType.WebSockets })
            .configureLogging(LogLevel.Debug)
            .build()

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

        hub.on('PrintJobDone', (args: { id: string, printJobName: string, time: number }) => {
            let duration: string = moment.duration(args.time, 'seconds').humanize()
            app.$notify(`${args.printJobName} has been succesfully printed on ${args.id.toUpperCase()} for ${duration}`, 'success')
        })

        hub.on('PrintJobFailed', (args: { id: string, printJobName: string, time: number, reason: string }) => {
            let duration: string = moment.duration(args.time, 'seconds').humanize()
            app.$notify(`${args.printJobName} has been failed on ${args.id.toUpperCase()} for ${duration} cause of ${args.reason}`, 'error')
        })

        //UpdateState
        hub.on('DownloadFinished', () => {
            store.commit('updateState/setSoftwareUpdateState', SoftwareUpdateState.Downloaded)
        })
        hub.on('DownloadFailed', () => {
            store.commit('updateState/setSoftwareUpdateState', SoftwareUpdateState.FailedDownload)
            app.$notify(`New firmware download failed`, 'error')
        })
        hub.on('UpdateFoundOnUsb', (args: { found: boolean }) => {
            store.commit('updateState/setUpdateOnUsb', args.found)
            app.$notify(`New firmware is found on USB. Check settings for install`)
        })
        hub.on('HasEqualFirmware', (args: string) => {
            store.commit('updateState/setCurrentVersion', args)
        })
        hub.on('HasNewFirmware', (args: { version: string }) => {
            store.commit('updateState/setSoftwareUpdateState', SoftwareUpdateState.IsNewFirmware)
            store.commit('updateState/setAvaliableVersion', args.version)
            app.$notify(`New firmware is available, version ${args.version}. Check settings for install`)
        })
        hub.on('UpdateStateChanged', (args: { state: SoftwareUpdateState, downloadProgress: number }) => {
            store.commit('updateState/setDownloadProgress', args.downloadProgress)
            store.commit('updateState/setSoftwareUpdateState', args.state)
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
        hub.on('PrinterError', (e) => {
            store.commit('printersState/setError')
        })

        hub.onclose(async () => {
            await startHub()
        })
        store.commit('setHub', hub)
    }

    async function startHub () {
        try {
            console.log('Attempting reconnect')
            generateHub()
            store.state.hub.start()
        } catch (err) {
            console.log(err)
            setTimeout(() => startHub(), 1500)
        }
    }

    inject('startHub', () => startHub())
    inject('stopHub', () => store.state.hub.stop())

    startHub()
}