import { HubConnectionBuilder, HttpTransportType, LogLevel, HubConnection, HubConnectionState } from '@aspnet/signalr'
import { CurrentState } from '../types/printer'
import moment, { version } from 'moment'
import { SoftwareUpdateState } from '~/store/updateState';
import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
    interface Vue {
        $startHub (): void
        $stopHub (): void
    }
}

declare module '@nuxt/types' {
    interface NuxtAppOptions {
        $startHub (): void
        $stopHub (): void
    }
}

declare module 'vuex/types/index' {
    interface Store<S> {
        $startHub (): void
        $stopHub (): void
    }
}

const hubManagement: Plugin = ({ app, store }, inject) => {
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
            app.$notify(app.i18n.t('notifications.printJobDone', [args.printJobName, args.id.toUpperCase(), duration]).toString(), 'success', false)
        })

        hub.on('PrintJobFailed', (args: { id: string, printJobName: string, time: number, reason: string }) => {
            let duration: string = moment.duration(args.time, 'seconds').humanize()
            app.$notify(app.i18n.t('notifications.printJobDone', [args.printJobName, args.id.toUpperCase(), duration, args.reason]).toString(), 'error', false)
        })

        //UpdateState
        hub.on('DownloadFinished', () => {
            store.commit('updateState/setSoftwareUpdateState', SoftwareUpdateState.Downloaded)
        })
        hub.on('DownloadFailed', () => {
            store.commit('updateState/setSoftwareUpdateState', SoftwareUpdateState.FailedDownload)
            app.$notify(app.i18n.t("notifications.downloadFailed").toString(), 'error', false)
        })
        hub.on('UpdateFoundOnUsb', (args: boolean) => {
            store.commit('updateState/setUpdateOnUsb', args)
            app.$notify(app.i18n.t("notifications.updateFoundOnUsb").toString(), 'info', false)
        })
        hub.on('HasEqualFirmware', (args: string) => {
            store.commit('updateState/setCurrentVersion', args)
        })
        hub.on('HasNewFirmware', (args: string) => {
            store.commit('updateState/setSoftwareUpdateState', SoftwareUpdateState.IsNewFirmware)
            store.commit('updateState/setAvaliableVersion', args)
            app.$notify(app.i18n.t("notifications.hasNewFirmware", [args]).toString(), 'info', false)
        })
        hub.on('UpdateStateChanged', (state: SoftwareUpdateState, downloadProgress: number) => {
            store.commit('updateState/setDownloadProgress', downloadProgress)
            store.commit('updateState/setSoftwareUpdateState', state)
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

export default hubManagement