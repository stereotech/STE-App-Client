import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { FileOrFolder, Refs } from '~/types/fileOrFolder'
import { RootState } from '.'
import { PrinterInfo } from '~/types/printer'
import { isJSXSpreadChild } from '@babel/types';

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
  localStorage (state: StorageState) {
    return (path: string[]): FileOrFolder => {
      let currentFolder = state.local[0]
      path.forEach(el => {
        if (currentFolder.children !== undefined) {
          let subfolder = currentFolder.children.filter(f => f.type === "folder").find(child => child.name === el)
          if (subfolder == undefined || subfolder.children == undefined) {
            //break
            return currentFolder
          }
          else {
            currentFolder = subfolder
          }
        }
        // else{

        // }
      })
      return currentFolder
    }
  },

  usbStorage (state: StorageState) {
    return (name: string) => state.usb.find(value => value.origin === name)
  },

  allUsbStorages (state: StorageState): FileOrFolder[] {
    return state.usb
  },

  // avaliableFolders(state: StorageState):{name:string, uri: string}[]{
  //   return {}
  // },
  avaliableFiles (state: StorageState): { name: string, uri: string, isFiveAxis?: boolean }[] {
    const result: { name: string, uri: string, isFiveAxis?: boolean }[] = []

    const flatten = (prefix: string, routes: FileOrFolder[]): { name: string, uri: string, isFiveAxis?: boolean }[] => {
      const ret: { name: string, uri: string, isFiveAxis?: boolean }[] = []
      routes.forEach(route => {
        if (route.children && route.children.length) {
          ret.push(...flatten(prefix + route.name + '/', route.children))
        } else if (route.gcodeAnalysis) {
          ret.push({ name: prefix + route.display, uri: route.refs !== undefined ? route.refs.download : '', isFiveAxis: route.gcodeAnalysis !== undefined ? route.gcodeAnalysis.isFiveAxis : undefined })
        }
      })
      return ret
    }
    // tslint:disable-next-line: strict-type-predicates
    if (state.local[0] !== undefined) {
      if (state.local[0].children !== undefined) {
        result.push(...flatten('Storage/', state.local[0].children))
      }
    }
    state.usb.forEach(element => {
      if (element.children !== undefined) {
        result.push(...flatten('USB/' + element.origin.toUpperCase(), element.children))
      }
    })
    return result
  }

}

export const mutations: MutationTree<StorageState> = {
  setLocal (state: StorageState, localStorage: FileOrFolder) {
    state.local = []
    if (localStorage.children !== undefined) {
      localStorage.children = localStorage.children.sort((a, b) => {
        if (a.date !== undefined && b.date !== undefined) {
          return b.date - a.date
        }
        return 0
      })
    }
    state.local.push(localStorage)
  },

  setUsbs (state: StorageState, usbs: FileOrFolder[]) {
    state.usb = []
    usbs.forEach(usb => {
      if (usb.children !== undefined) {
        usb.children = usb.children.filter(el => el.type === "machinecode").sort((a, b) => {
          if (a.date !== undefined && b.date !== undefined) {
            return b.date - a.date
          }
          return 0
        })
      }
    });
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

  async deleteFile ({ commit, dispatch }, file: FileOrFolder) {
    if (file.origin == 'local') {
      await this.$axios.delete(this.state.apiUrl + localStorageEndpoint + '/' + file.name)
      dispatch('fetchLocal')
    } else {
      await this.$axios.delete(this.state.apiUrl + usbStorageEndpoint + '/' + file.origin + '/' + file.name)
      dispatch('fetchUsbs')
    }
  },

  async uploadFiles ({ commit, dispatch }, files: File[]) {
    let data = new FormData()
    files.forEach(file => {
      data.append("files", file, file.name)
    });
    await this.$axios.post(this.state.apiUrl + localStorageEndpoint, data, { headers: { 'Content-Type': 'multipart/form-data' } })
    dispatch('fetchLocal')
    dispatch('fetchUsbs')
  },

  async addFolder ({ commit, dispatch }, payload: { name: string, path: string }) {

    await this.$axios.$put(this.state.apiUrl + localStorageEndpoint, payload)
    dispatch('fetchLocal')
  }
}
