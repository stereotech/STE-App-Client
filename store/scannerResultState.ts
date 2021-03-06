import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { ScannerResult } from '~/types/scannerResult'
import { RootState } from '.'

const scannerEndpoint = 'scanner'

export interface ScannerResultState {
  printers: ScannerResult[]
}

export const state = (): ScannerResultState => ({
  printers: []
})

export const getters: GetterTree<ScannerResultState, RootState> = {
  results (state: ScannerResultState): ScannerResult[] {
    return state.printers.filter(value => value.printers === 1)
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
    let response = await this.$axios.get(this.state.apiUrl + scannerEndpoint)
    if (response.status == 200) {
      let results = response.data
      commit('setResults', results)
    }
  },

  async connect ({ commit, dispatch }, printer: ScannerResult) {
    let response = await this.$axios.post(this.state.apiUrl + scannerEndpoint, printer)
    if (response.status == 200 || response.status == 204) {
      commit('clearResults')
      await dispatch('printersState/fetchPrinters', null, { root: true })
    }
  }
}
