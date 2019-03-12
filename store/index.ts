import createPersistedState from 'vuex-persistedstate'

export interface RootState {}

export const state = (): RootState => ({})

export const plugins = [
  // createPersistedState()
]
