import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { FileOrFolder, Refs } from '~/types/fileOrFolder'
import { RootState } from '.'
import {PrinterInfo} from '~/types/printer'

const localStorageEndpoint = 'storage/local'
const usbStorageEndpoint = 'storage/usb'

export interface StorageState {
  local: FileOrFolder[]
  usb: FileOrFolder[]
}

export const state = (): StorageState => ({
  local: [],
  usb: []
})

export const getters: GetterTree<StorageState, RootState> = {
  localStorage (state: StorageState): FileOrFolder {
    return state.local[0]
  },

  usbStorage (state: StorageState) {
    return (name: string) => state.usb.find(value => value.origin === name)
  },

  allUsbStorages (state: StorageState): FileOrFolder[] {
    return state.usb
  },

  avaliableFiles (state: StorageState): { name: string, uri: string, isFiveAxis?: boolean}[] {
    const result: { name: string, uri: string, isFiveAxis?:boolean }[] = []
    // tslint:disable-next-line: strict-type-predicates
    if (state.local[0] !== undefined) {
      if (state.local[0].children !== undefined) {
        result.push(
          ...state.local[0].children.map(
            (element: FileOrFolder) => {
              return { name: 'Storage/' + element.display, uri: element.refs !== undefined ? element.refs.download : '' , isFiveAxis : element.gCodeAnalysis !== undefined ? element.gCodeAnalysis.isFiveAxis : undefined}
            }
          )
        )
      }
    }
    state.usb.forEach(element => {
      if (element.children !== undefined) {
        result.push(
          ...element.children.map(
            (value: FileOrFolder) => {
              return { name: 'USB at ' + element.origin.toUpperCase() + '/' + value.display, uri: value.refs !== undefined ? value.refs.download : '', isFiveAxis: element.gCodeAnalysis !== undefined ? element.gCodeAnalysis.isFiveAxis : undefined}
            }
          )
        )
      }
    })
    return result
  }

}

export const mutations: MutationTree<StorageState> = {
  setLocal (state: StorageState, localStorage: FileOrFolder) {
    state.local = []
    if (localStorage.children !== undefined) {
      localStorage.children.sort((a, b) => {
        if (a.date !== undefined && b.date !== undefined) {
          return b.date - a.date
        }
        return 0
      })
    }
    state.local.push(localStorage)
  },

  setUsbs (state: StorageState, usbs: FileOrFolder[]) {
    state.usb = usbs
  },

  deleteLocalFile (state: StorageState, file: FileOrFolder) {
    if (state.local[0].children !== undefined) {
      const index = state.local[0].children.indexOf(file)
      if (index > -1) {
        state.local[0].children.splice(index, 1)
      }
    }
  },

  deleteUsbFile (state: StorageState, file: FileOrFolder) {
    const usbIndex = state.usb.findIndex(value => value.origin === file.origin)
    if (usbIndex > -1) {
      const files = state.usb[usbIndex].children
      if (files !== undefined) {
        const index = files.indexOf(file)
        if (index > -1) {
          files.splice(index, 1)
        }
      }
    }
  },

  clearLocal (state: StorageState) {
    state.local = []
  },

  clearUsbs (state: StorageState) {
    state.usb = []
  }
}

export const actions: ActionTree<StorageState, RootState> = {
  async fetchLocal ({ commit }) {
    let response = await this.$axios.get<FileOrFolder>(this.state.apiUrl + localStorageEndpoint)
    if (response.status === 200) {
      commit('setLocal', response.data)
    }
  },

  async fetchUsbs ({ commit }) {
    let response = await this.$axios.get<FileOrFolder[]>(this.state.apiUrl + usbStorageEndpoint)
    if (response.status === 200) {
      commit('setUsbs', response.data)
    }
  },

  async deleteFile ({ commit }, file: FileOrFolder) {
    if (file.origin == 'local') {
      commit('deleteLocalFile', file)
      let response = await this.$axios.delete(this.state.apiUrl + localStorageEndpoint + '/' + file.name)
    } else {
      commit('deleteUsbFile', file)
      let response = await this.$axios.delete(this.state.apiUrl + usbStorageEndpoint + '/' + file.origin + '/' + file.name)
    }
  },

  async uploadFiles ({ commit }, files: File[]) {
    let data = new FormData()
    files.forEach(file => {
      data.append("files", file, file.name)
    });
    await this.$axios.post(this.state.apiUrl + localStorageEndpoint, data, { headers: { 'Content-Type': 'multipart/form-data' } })
  }
}
