import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { PrinterInfo, PrinterStatus } from '~/types/printer'
import { RootState } from '.'

export interface PrintersState {
  printers: PrinterInfo[]
  status: PrinterStatus[]
}

export const state = (): PrintersState => ({
  printers: [],
  status: []
})

export const getters: GetterTree<PrintersState, RootState> = {
  printers (state: PrintersState): PrinterInfo[] {
    return state.printers
  },

  printer (state: PrintersState) {
    return (id: string) => state.printers.find(value => value.id === id)
  },

  printersStatus (state: PrintersState) {
    return state.status
  },

  status (state: PrintersState) {
    return (id: string) => state.status.find(value => value.id === id)
  }
}

export const mutations: MutationTree<PrintersState> = {
  setPrinters (state: PrintersState, printers: PrinterInfo[]) {
    state.printers = printers
  },

  deletePrinter (state: PrintersState, printer: PrinterInfo) {
    const index = state.printers.indexOf(printer)
    if (index > -1) {
      state.printers.splice(index, 1)
    }
  },

  setStatus (state: PrintersState, status: PrinterStatus[]) {
    state.status = status
  },

  setOneStatus (state: PrintersState, status: PrinterStatus) {
    const index = state.status.findIndex(value => value.id === status.id)
    if (index > -1) {
      state.status[index] = status
    }
  }
}

export const actions: ActionTree<PrintersState, RootState> = {
  async fetchPrinters ({ commit }) {
    await new Promise(resolve => setTimeout(resolve, 500))
    const printers: PrinterInfo[] = [
      {
        id: 'st-aaa',
        model: 'STE320',
        name: 'ST-AAA',
        isLocal: true,
        address: '192.168.0.100',
        apiKey: '',
        octoApiKey: '',
        role: 'host'
      }
    ]
    commit('setPrinters', printers)
  },

  async deletePrinter ({ commit }, printer: PrinterInfo) {
    await new Promise(resolve => setTimeout(resolve, 500))
    commit('deletePrinter', printer)
  },

  async fetchStatus ({ commit }) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const status: PrinterStatus[] = [
      {
        id: 'st-aaa',
        stateText: 'Printing',
        bed: {
          actual: 60 + Math.random() * 5,
          target: 60,
          offset: 0
        },
        tool0: {
          actual: 218 + Math.random() * 4,
          target: 220,
          offset: 0
        },
        tool1: {
          actual: 43 + Math.random() * 4,
          target: 0,
          offset: 0
        },
        job: {
          estimatedPrintTime: 4453.447533993765,
          filment: {
            tool0: {
              length: 3482.341989999999,
              volume: 0
            }
          },
          file: {
            date: 1548750780,
            display: 'CFFFP_крышка.gcode',
            name: 'CFFFP_крышка.gcode',
            origin: 'st-aaa',
            path: 'Storage/CFFFP_крышка.gcode',
            size: 1124869
          }
        },
        progress: {
          completion: 88.58151482528189,
          filepos: 996426,
          printTime: 4488,
          printTimeLeft: 543,
          printTimeLeftOrigin: 'estimate'
        }
      }
    ]
    commit('setStatus', status)
  },

  async fetchOneStatus ({ commit }) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const status: PrinterStatus = {
      id: 'st-aaa',
      stateText: 'Printing',
      bed: {
        actual: 60 + Math.random() * 5,
        target: 60,
        offset: 0
      },
      tool0: {
        actual: 218 + Math.random() * 4,
        target: 220,
        offset: 0
      },
      tool1: {
        actual: 43 + Math.random() * 4,
        target: 0,
        offset: 0
      }
    }
    commit('setOneStatus', status)
  }
}
