import createPersistedState from 'vuex-persistedstate'
import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { InitSignalR } from './signalrPlugin'
import { Error } from '~/types/error';

export interface Actions<S, R> extends ActionTree<S, R> {
  nuxtServerInit (context: ActionContext<S, R>): void
}

export interface RootState {
  apiUrl: string
  error?: Error
}

export const state = (): RootState => ({
  apiUrl: process.env.apiHost + '/api/'
})

export const mutations: MutationTree<RootState> = {
  setError (state, error: Error) {
    state.error = error
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit ({ commit, dispatch }) {
    await dispatch('printersState/fetchPrinters')
  }
}

export const plugins = [
  InitSignalR
]
