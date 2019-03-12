import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { ScannerResult } from '~/types/scannerResult'
import { RootState } from '.'

export interface ScannerResultState {
  printers: ScannerResult[]
}

export const state = (): ScannerResultState => ({
  printers: []
})

export const getters: GetterTree<ScannerResultState, RootState> = {
  results (state): ScannerResult[] {
    return state.printers.filter(value => value.role === 'host')
  }
}

export const mutations: MutationTree<ScannerResultState> = {
  setResults (state: ScannerResultState, results: ScannerResult[]) {
    state.printers = results
  },
  clearResults (state: ScannerResultState) {
    state.printers = []
  }
}

export const actions: ActionTree<ScannerResultState, RootState> = {
  async fetchResults ({ commit }) {
    await new Promise(resolve => setTimeout(resolve, 2000))
    const results: ScannerResult[] = [
      {
        id: 'st-ddd',
        model: 'STE320',
        name: 'ST-DDD',
        role: 'host',
        ipAddress: '192.168.0.200'
      },
      {
        id: 'st-eee',
        model: 'STE320',
        name: 'ST-EEE',
        role: 'host',
        ipAddress: '192.168.0.20'
      }
    ]
    commit('setResults', results)
  },

  async connect ({ commit }, printer: ScannerResult) {
    await new Promise(resolve => setTimeout(resolve, 200))
    commit('clearResults')
  }
}
