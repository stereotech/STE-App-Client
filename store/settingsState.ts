import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { Settings } from '~/types/settings'
import { RootState } from '.'
import { Networking, Network } from '~/types/networking'

export interface SettingsState {
  settings: Settings
  networking: Networking
  // update
}

export const state = (): SettingsState => ({
  settings: {
    firstLaunch: false,
    avaliableLanguages: [],
    dateTime: 0,
    language: '',
    storageOwned: 0,
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
    return state.networking.networks.filter((value: Network) => value.state !== 'online')
  },
  currentNetwork (state: SettingsState): Network | undefined {
    return state.networking.networks.find((value: Network) => value.state === 'online')
  }
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
    await new Promise(resolve => setTimeout(resolve, 50))
    const settings: Settings = {
      firstLaunch: false,
      avaliableLanguages: ['English', 'Русский'],
      language: 'English',
      storageTotal: 6864843434384,
      storageOwned: 3564684646846,
      dateTime: 1550665494
    }
    commit('setSettings', settings)
  },

  async sendDateTime ({ commit }, { date, time }) {
    const newDate = Date.parse(time + ' ' + date) / 1000
    await new Promise(resolve => setTimeout(resolve, 50))
    const settings: Settings = {
      firstLaunch: false,
      avaliableLanguages: ['English', 'Русский'],
      language: 'English',
      storageTotal: 6864843434384,
      storageOwned: 3564684646846,
      dateTime: 1550665494
    }
    commit('setSettings', settings)
  },

  async sendLanguage ({ commit }, lang: string) {
    await new Promise(resolve => setTimeout(resolve, 50))
    const settings: Settings = {
      firstLaunch: false,
      avaliableLanguages: ['English', 'Русский'],
      language: 'English',
      storageTotal: 6864843434384,
      storageOwned: 3564684646846,
      dateTime: 1550665494
    }
    commit('setSettings', settings)
  },

  async sendFactoryReset ({ commit }, force: boolean) {
    await new Promise(resolve => setTimeout(resolve, 50))
  },

  async getConnectedMethod ({ commit }) {
    await new Promise(resolve => setTimeout(resolve, 500))
    const connectedMethod = 'WIFI'
    commit('setConnectedMethod', connectedMethod)
  },

  async getWifiNetworks ({ commit }) {
    await new Promise(resolve => setTimeout(resolve, 500))
    const networks: Network[] = [
      {
        id: 'network_8484442',
        name: 'Wifi 1',
        security: true,
        state: 'online',
        strength: 85
      },
      {
        id: 'network_8484443',
        name: 'Wifi 2',
        security: true,
        state: 'ready',
        strength: 50
      }
    ]
    commit('setNetworks', networks)
  },

  async connectWifiNetwork ({ commit }, { name, passphrase }) {
    await new Promise(resolve => setTimeout(resolve, 500))
  },

  async forgetWifiNetwork ({ commit }, id: string) {
    await new Promise(resolve => setTimeout(resolve, 500))
  }
}
