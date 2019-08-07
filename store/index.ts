import createPersistedState from 'vuex-persistedstate'
import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { Error } from '~/types/error';

export interface Actions<S, R> extends ActionTree<S, R> {
  nuxtServerInit (context: ActionContext<S, R>): void
}

export interface RootState {
  apiUrl: string
  error?: Error
}

export const state = (): RootState => ({
  apiUrl: '/api/'
})

export const getters: GetterTree<RootState, RootState> = {
  api (state: RootState): string {
    return state.apiUrl
  },

  isApiAbsolute (state: RootState): boolean {
    return state.apiUrl.startsWith('http://') || state.apiUrl.startsWith('https://')
  }
}

export const mutations: MutationTree<RootState> = {
  setError (state, error: Error) {
    state.error = error
  },
  setApiUrl (state: RootState, newUrl: string) {
    state.apiUrl = newUrl
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit ({ commit, dispatch }) {
    await dispatch('printersState/fetchPrinters')
  }
}

export const plugins = [
  //InitSignalR
]
