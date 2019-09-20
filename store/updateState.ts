import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { RootState } from '.'

const updateEndpoint = 'update/'

export enum SoftwareUpdateState {
    Idle,
    IsNewFirmware,
    InitDownload,
    Downloading,
    Downloaded,
    Copying,
    FailedDownload,
    FailedUsb,
}

export interface UpdateState {
    currentVersion: string
    avaliableVersion: string
    downloadProgress: number
    softwareUpdateState: SoftwareUpdateState
    updateOnUsb: boolean
}

export const state = (): UpdateState => ({
    currentVersion: '1.0.0',
    avaliableVersion: '1.0.0',
    softwareUpdateState: SoftwareUpdateState.Idle,
    downloadProgress: 0,
    updateOnUsb: false
})

export const getters: GetterTree<UpdateState, RootState> = {
    currentVersion (state: UpdateState): string {
        return state.currentVersion
    },
    softwareUpdateState (state: UpdateState): SoftwareUpdateState {
        return state.softwareUpdateState
    },
    downloadProgress (state: UpdateState): number {
        return state.downloadProgress
    },
    avaliableVersion (state: UpdateState): string {
        return state.avaliableVersion
    },
    updateOnUsb (state: UpdateState): boolean {
        return state.updateOnUsb
    },

}

export const mutations: MutationTree<UpdateState> = {
    setCurrentVersion (state: UpdateState, version: string) {
        state.currentVersion = version
    },
    setAvaliableVersion (state: UpdateState, version: string) {
        state.avaliableVersion = version
    },
    setSoftwareUpdateState (state: UpdateState, softwareUpdateState: SoftwareUpdateState) {
        state.softwareUpdateState = softwareUpdateState
    },
    setUpdateOnUsb (state: UpdateState, found: boolean) {
        state.updateOnUsb = found
    },
    setDownloadProgress (state: UpdateState, progress: number) {
        state.downloadProgress = progress
    }

}

export const actions: ActionTree<UpdateState, RootState> = {
    async fetchCurrentVersion ({ commit }) {
        let response = await this.$axios.get(this.state.apiUrl + updateEndpoint)
        if (response.status === 200) {
            commit('setCurrentVersion', response.data)
        }
    },

    async downloadUpdateVersion ({ commit }) {
        await this.$axios.post(this.state.apiUrl + updateEndpoint)
    },

    async startUpdateFromUsb ({ commit }) {
        await this.$axios.post(this.state.apiUrl + updateEndpoint + 'local', { filename: '/home/ste/uploads/USB/ste-update.stu' })
    },

    async uploadUpdate ({ commit }, file: File) {
        let data = new FormData();
        data.append('file', file, file.name)
        await this.$axios.post(this.state.apiUrl + updateEndpoint + 'upload', data, { headers: 'Content-Type: multipart/form-data' })
    }

}