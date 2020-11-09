import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { AcceptOrRejectBody, CloudConnectionAction } from '~/types/cloud'
import { RootState } from '.'

const cloudEndpoint = 'cloud/'

export interface CloudState {
    activating: boolean,
    pin: number,
}

export const state = (): CloudState => ({
    activating: false,
    pin: 0
})

export const getters: GetterTree<CloudState, RootState> = {
    pin (state: CloudState): number {
        return state.pin
    },

    activating (state: CloudState): boolean {
        return state.activating
    }
}

export const mutations: MutationTree<CloudState> = {
    setActivating (state: CloudState, activation: boolean) {
        state.activating = activation
    },

    setPin (state: CloudState, pin: number) {
        state.pin = pin
    }
}

export const actions: ActionTree<CloudState, RootState> = {
    async acceptActivation () {
        await this.$axios.post(this.state.apiUrl + cloudEndpoint, {
            action: CloudConnectionAction.Accept
        })
    },

    async rejectActivation ({ commit }) {
        commit('setActivating', false)
        commit('setPin', 0)
        await this.$axios.post(this.state.apiUrl + cloudEndpoint, {
            action: CloudConnectionAction.Reject
        })
    },
}

