import createPersistedState from 'vuex-persistedstate'

export interface RootState {
  apiUrl: string
}

export const state = (): RootState => ({
  apiUrl: '/api/'
})

export const plugins = [
  // createPersistedState()
]
