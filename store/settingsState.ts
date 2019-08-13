import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { Settings } from '~/types/settings'
import { RootState } from '.'
import { Networking, Network } from '~/types/networking'

const systemEndpoint = 'system'
const networkEndpoint = 'network'
const updateEndpoint = 'update'

export interface SettingsState {
  settings: Settings
  networking: Networking
}

export const state = (): SettingsState => ({
  settings: {
    systemId: 'st-aaa',
    role: 'host',
    firstLaunch: false,
    avaliableLanguages: [],
    dateTime: 1,
    language: '',
    storageFree: 0,
    storageTotal: 0
  },
  networking: {
    connectedMethod: '',
    networks: []
  }
})

export const getters: GetterTree<SettingsState, RootState> = {
  settings (state: SettingsState) {
    return state.settings
  },
  date (state: SettingsState): string {
    const a = new Date(state.settings.dateTime * 1000)
    return a.toISOString().substr(0, 10)
  },
  time (state: SettingsState): string {
    const a = new Date(state.settings.dateTime * 1000)
    return a.toISOString().substr(11, 5)
  },
  avaliableNetworks (state: SettingsState): Network[] {
    return state.networking.networks.filter(
      (value: Network) => value.state !== 'online'
    )
  },
  currentNetwork (state: SettingsState): Network | undefined {
    return state.networking.networks.find(
      (value: Network) => {
        return value.state === 'online';
      }
    )
  },
}

export const mutations: MutationTree<SettingsState> = {
  setSettings (state: SettingsState, settings: Settings) {
    state.settings = settings
  },

  setConnectedMethod (state: SettingsState, connectedMethod: string) {
    state.networking.connectedMethod = connectedMethod
  },

  setNetworks (state: SettingsState, networks: Network[]) {
    state.networking.networks = networks
  }
}

export const actions: ActionTree<SettingsState, RootState> = {
  async fetchSettings ({ commit }) {
    let response = await this.$axios.get<Settings>(this.state.apiUrl + systemEndpoint)
    if (response.status === 200) {
      let settings: Settings = response.data
      commit('setSettings', response.data)
    }
  },

  async sendDateTime ({ commit }, { date, time }) {
    const newDate = Date.parse(time + ' ' + date) / 1000
    let response = await this.$axios.put<Settings>(this.state.apiUrl + systemEndpoint, { dateTime: newDate })
    if (response.status === 200) {
      commit('setSettings', response.data)
    }
  },

  async sendLanguage ({ commit }, lang: string) {
    let response = await this.$axios.put<Settings>(this.state.apiUrl + systemEndpoint, { language: lang })
    if (response.status === 200) {
      commit('setSettings', response.data)
    }
  },

  async sendFactoryReset ({ commit }, force: boolean) {
    await this.$axios.post(this.state.apiUrl + systemEndpoint, { command: 'reset', removeStorageFiles: force })
  },

  async sendFinishSetup ({ commit }) {
    await this.$axios.put<Settings>(this.state.apiUrl + systemEndpoint, { firstLaunch: false })
  },

  async getConnectedMethod ({ commit }) {
    let response = await this.$axios.get<string>(this.state.apiUrl + networkEndpoint)
    if (response.status === 200) {
      commit('setConnectedMethod', response.data)
    }
  },

  async getWifiNetworks ({ commit }) {
    let response = await this.$axios.get<Network[]>(this.state.apiUrl + networkEndpoint + '/wifi')
    if (response.status === 200) {
      commit('setNetworks', response.data)
    }
  },

  async connectWifiNetwork ({ commit }, { name, passphrase }) {
    await this.$axios.post(this.state.apiUrl + networkEndpoint + '/wifi', { ssid: name, passphrase: passphrase })
  },

  async forgetWifiNetwork ({ commit }, id: string) {
    await this.$axios.delete(this.state.apiUrl + networkEndpoint + '/wifi/' + id)
  },

  async rebootSystem ({ commit }) {
    await this.$axios.post(this.state.apiUrl + systemEndpoint, { command: 'reboot' })
  },

  async poweroffSystem ({ commit }) {
    await this.$axios.post(this.state.apiUrl + systemEndpoint, { command: 'shutdown' })
  }
}
