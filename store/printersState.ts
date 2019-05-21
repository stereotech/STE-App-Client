import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { PrinterInfo, CurrentState, TemperatureDataPoint } from '~/types/printer'
import { RootState } from '.'

const apiEndpoint = 'printers/'

export interface PrintersState {
  printers: PrinterInfo[]
  status: CurrentState[]
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
  },

  lastTempDataPoint (state: PrintersState): (id: string) => TemperatureDataPoint {
    return (id: string) => {
      let point: TemperatureDataPoint = {
        bed: { actual: 0, offset: 0, target: 0 },
        tool0: { actual: 0, offset: 0, target: 0 },
        tool1: { actual: 0, offset: 0, target: 0 }
      }
      let status = state.status.find(value => value.id === id)
      if (status && status.temps.length > 0) {
        let temp = status.temps[status.temps.length - 1]
        if (temp) {
          return temp
        }
      }
      return point
    }
  },

  printerLogs (state: PrintersState): (id: string) => string[] {
    return (id: string) => {
      let status = state.status.find(value => value.id === id)
      if (status && status.logs.length > 0) {
        return status.logs
      }
      return new Array<string>(0)
    }
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

  setStatus (state: PrintersState, status: CurrentState[]) {
    state.status = status
  },

  setOneStatus (state: PrintersState, status: CurrentState) {
    const index = state.status.findIndex(value => value.id === status.id)
    if (index > -1) {
      let current = state.status[index]
      if (current.logs.length < 500) {
        current.logs.push(...status.logs)
      }
      else {
        current.logs.splice(0, status.logs.length)
        current.logs.push(...status.logs)
      }
      if (current.temps.length < 20) {
        current.temps.push(...status.temps)
      }
      else {
        current.temps.splice(0, status.temps.length)
        current.temps.push(...status.temps)
      }
      current.state = status.state
    }
    else {
      state.status.push(status)
    }
  }
}

export const actions: ActionTree<PrintersState, RootState> = {
  async fetchPrinters ({ commit }) {
    let response = await this.$axios.get(this.state.apiUrl + apiEndpoint)
    if (response.status == 200) {
      let printers: PrinterInfo[] = response.data
      commit('setPrinters', printers)
    }
  },

  async deletePrinter ({ commit }, printer: PrinterInfo) {
    let response = await this.$axios.delete(this.state.apiUrl + apiEndpoint + printer.id)
    if (response.status == 204) {
      commit('deletePrinter', printer)
    }
  },

  async disconnectPrinter ({ commit }, apiKey: string) {
    await this.$axios.delete('/api/private/connection', { headers: { Authorization: apiKey } })
  },

  async setStatus ({ commit, dispatch }, payload: { id: string, newStatus: string }) {
    await this.$axios.post(this.state.apiUrl + apiEndpoint + 'state/' + payload.id, null, { params: { state: payload.newStatus } })
  },

  async pausePrintJob ({ commit, dispatch }, id: string) {
    await this.$axios.post(this.state.apiUrl + apiEndpoint + id + '/job', null, { params: { command: 'pause' } })
  },

  async resumePrintJob ({ commit, dispatch }, id: string) {
    await this.$axios.post(this.state.apiUrl + apiEndpoint + id + '/job', null, { params: { command: 'resume' } })
  },

  async cancelPrintJob ({ commit, dispatch }, id: string) {
    await this.$axios.post(this.state.apiUrl + apiEndpoint + id + '/job', null, { params: { command: 'cancel' } })
  },

  async findPrinter ({ commit }, id: string) {
    await this.$axios.post(this.state.apiUrl + apiEndpoint + id + '/misc', { command: 'find' })
  },

  async ledCommand ({ commit }, { id, r, g, b }) {
    await this.$axios.post(this.state.apiUrl + apiEndpoint + id + '/misc', { command: 'led', red: r, green: g, blue: b })
  },

  async fanCommand ({ commit }, { id, fanId, fanValue }) {
    await this.$axios.post(this.state.apiUrl + apiEndpoint + id + '/misc', { command: 'fan', fanId: fanId, fanValue: fanValue })
  },

  async toolTempCommand ({ commit }, { id, tool0Temp, tool1Temp }) {
    await this.$axios.post(this.state.apiUrl + apiEndpoint + id + '/misc', { command: 'tool_temp', tool0Temp: tool0Temp, tool1Temp: tool1Temp })
  },

  async bedTempCommand ({ commit }, { id, bedTemp }) {
    await this.$axios.post(this.state.apiUrl + apiEndpoint + id + '/misc', { command: 'tool_bed', bedTemp: bedTemp })
  },

  async flowCommand ({ commit }, { id, flow }) {
    await this.$axios.post(this.state.apiUrl + apiEndpoint + id + '/misc', { command: 'flow', flow: flow })
  },

  async feedCommand ({ commit }, { id, feed }) {
    await this.$axios.post(this.state.apiUrl + apiEndpoint + id + '/misc', { command: 'feed', feed: feed })
  },

  async jogCommand ({ commit }, { id, x, y, z, a, b, c }) {
    await this.$axios.post(this.state.apiUrl + apiEndpoint + id + '/misc', { command: 'jog', x: x, y: y, z: z, a: a, b: b, c: c })
  },

  async homeCommand ({ commit }, { id, head, bed, rotary }) {
    await this.$axios.post(this.state.apiUrl + apiEndpoint + id + '/misc', { command: 'home', homeHead: head, homeBed: bed, homeRotary: rotary })
  },

  async extrudeCommand ({ commit }, { id, toolId, amount }) {
    await this.$axios.post(this.state.apiUrl + apiEndpoint + id + '/misc', { command: 'extrude', toolId: toolId, ExtrudeAmount: amount })
  },

  async retractCommand ({ commit }, { id, toolId, amount }) {
    await this.$axios.post(this.state.apiUrl + apiEndpoint + id + '/misc', { command: 'retract', toolId: toolId, retractAmount: amount })
  },

  async customCommand ({ commit }, { id, command }) {
    await this.$axios.post(this.state.apiUrl + apiEndpoint + id + '/misc', { command: 'command', commandString: command })
  }
}
