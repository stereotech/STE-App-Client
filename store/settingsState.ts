import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { Settings } from '~/types/settings'
import { RootState } from '.'
import { Networking, Network } from '~/types/networking'
import { UpdateInfo } from '~/types/updating'

export interface SettingsState {
  settings: Settings
  networking: Networking
  update: UpdateInfo
}

export const state = (): SettingsState => ({
  settings: {
    systemId: 'st-aaa',
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
  },
  update: {
    currentVersion: 'v1.0',
    newVersion: 'v1.0',
    description: 'You have the latest version of the software'
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
      (value: Network) => value.state === 'online'
    )
  },
  avaliableUpdate (state: SettingsState): UpdateInfo {
    return state.update
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
  },

  setUpdate (state: SettingsState, update: UpdateInfo) {
    state.update = update
  }
}

export const actions: ActionTree<SettingsState, RootState> = {
  async fetchSettings ({ commit }) {
    await new Promise(resolve => setTimeout(resolve, 50))
    const settings: Settings = {
      systemId: 'st-aaa',
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
      systemId: 'st-aaa',
      firstLaunch: true,
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
      systemId: 'st-aaa',
      firstLaunch: true,
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
  },

  async checkForUpdate ({ commit }) {
    await new Promise(resolve => setTimeout(resolve, 500))
  },

  async downloadAndInstallUpdate ({ commit }) {
    await new Promise(resolve => setTimeout(resolve, 500))
  },

  async rebootSystem ({ commit }) {
    await new Promise(resolve => setTimeout(resolve, 500))
  },

  async poweroffSystem ({ commit }) {
    await new Promise(resolve => setTimeout(resolve, 500))
  }
}
