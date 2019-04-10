import createPersistedState from 'vuex-persistedstate'

export interface RootState {
  apiUrl: string
}

export const state = (): RootState => ({
  apiUrl: 'http://192.168.0.128/api/'
})

export const plugins = [
  //createPersistedState()
]
