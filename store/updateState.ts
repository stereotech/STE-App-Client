import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { RootState } from '.'

const updateEndpoint = 'update/'

export interface UpdateState {
    releaseType: string
    currentVersion: string
    avaliableVersion: string
    progress: number
}

export const state = (): UpdateState => ({
    releaseType: 'default',
    currentVersion: '1.0.0',
    avaliableVersion: '1.0.0',
    progress: 0
})

export const getters: GetterTree<UpdateState, RootState> = {
    currentVersion (state: UpdateState): string {
        return state.avaliableVersion
    }
}

export const mutations: MutationTree<UpdateState> = {
    setCurrentVersion (state: UpdateState, version: string) {
        state.currentVersion = version
    }
}

export const actions: ActionTree<UpdateState, RootState> = {
    async fetchCurrentVersion ({ commit }) {
        let response = await this.$axios.get(this.state.apiUrl + updateEndpoint)
        if (response.status === 200) {
            commit('setCurrentVersion', response.data)
        }
    },

    async checkForUpdate ({ state }) {
        await this.$axios.post(this.state.apiUrl + updateEndpoint, null, {
            params: {
                release: state.releaseType
            }
        })
    },

    async startUpdate ({ state }) {
        await this.$axios.post(this.state.apiUrl + updateEndpoint + 'start', null, {
            params: {
                release: state.releaseType
            }
        })
    },

    async startLocalUpdate ({ commit }, filename: string) {
        await this.$axios.post(this.state.apiUrl + updateEndpoint + 'local')
    },

    async wasUpdateCompleted ({ commit }) {
        let response = await this.$axios.get(this.state.apiUrl + updateEndpoint + 'complete')
        if (response.status === 200) {
            //TODO: do smth

        }
    },

    async acknowledgeUpdateCompleted () {
        await this.$axios.post(this.state.apiUrl + updateEndpoint + 'complete')
    },

    async ignoreVersion ({ commit }, version: string) {
        await this.$axios.put(this.state.apiUrl + updateEndpoint, null, {
            params: {
                version: version
            }
        })
    }

}