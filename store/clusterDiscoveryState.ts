import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { ScannerResult, ResolvedDevice } from '~/types/scannerResult'
import { RootState } from '.';

export interface ClusterDiscoveryState {
    saved: string | null
    avaliable: ScannerResult[]
}

export const state = (): ClusterDiscoveryState => ({
    avaliable: [],
    saved: localStorage.getItem('cluster')
})

export const getters: GetterTree<ClusterDiscoveryState, RootState> = {
    avaliable (state: ClusterDiscoveryState): ScannerResult[] {
        return state.avaliable
    }
}

export const mutations: MutationTree<ClusterDiscoveryState> = {
    addAvaliable (state: ClusterDiscoveryState, device: ResolvedDevice) {
        try {

            let newService: ScannerResult = {
                ipAddress: device.ipv4Addresses[0],
                id: device.txtRecord.id,
                model: device.txtRecord.model,
                name: device.txtRecord.name,
                role: device.txtRecord.role
            }
            if (newService.ipAddress) {
                let existingIdx = state.avaliable.findIndex(s => s.id === newService.id)
                if (existingIdx > -1) {
                    state.avaliable[existingIdx] = newService
                } else {
                    state.avaliable.push(newService)
                }
            }
        } catch (error) {

        }
    },
    removeAvaliable (state: ClusterDiscoveryState, device: ResolvedDevice) {
        let idx = state.avaliable.findIndex(s => s.id == device.txtRecord.id)
        if (idx > -1) {
            state.avaliable.splice(idx, 1)
        }
    },
    saveCluster (state: ClusterDiscoveryState, saved: ScannerResult) {
        state.saved = saved.ipAddress
        localStorage.setItem('cluster', saved.ipAddress)
    }

}

export const actions: ActionTree<ClusterDiscoveryState, RootState> = {
    setCluster ({ commit }, { cluster, save }) {
        let newUrl = 'http://' + cluster.ipAddress + '/api/'
        commit('setApiUrl', newUrl, { root: true })
        if (save) {
            commit('saveCluster', cluster)
        }
    }
}
