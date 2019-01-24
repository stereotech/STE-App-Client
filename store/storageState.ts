import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { FileOrFolder } from '~/types/fileOrFolder'
import { RootState } from '.'

export interface StorageState {
  local: FileOrFolder[]
  usb: FileOrFolder[]
}

export const state = (): StorageState => ({
  local: [],
  usb: []
})

export const getters: GetterTree<StorageState, RootState> = {
  localStorage (state): FileOrFolder {
    return state.local[0]
  },

  usbStorage (state) {
    return (name: string) => state.usb.find(value => value.origin === name)
  }
}

export const mutations: MutationTree<StorageState> = {
  setLocal (state: StorageState, localStorage: FileOrFolder) {
    state.local = []
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
    await new Promise(resolve => setTimeout(resolve, 500))
    const localStorage: FileOrFolder = {
      children: [{
        date: Date.now(),
        display: 'File_1.gcode',
        hash: 'ab4dfcda52ce54a64dcde43cfb2417013b4f68e1',
        name: 'File_1.gcode',
        size: 15315451,
        origin: 'st_aaa',
        path: '/Storage/File_1.gcode',
        type: 'machinecode',
        typePath: ['machinecode', 'gcode']
      }],
      display: 'Storage',
      name: 'Storage',
      origin: 'st-aaa',
      path: 'Storage',
      size: 4354654843,
      type: 'folder',
      typePath: ['folder']
    }
    commit('setLocal', localStorage)
  },

  async fetchUsbs ({ commit }) {
    await new Promise(resolve => setTimeout(resolve, 500))
    const usbs = [
      {
        children: [{
          date: Date.now(),
          display: 'File_2.gcode',
          hash: 'ab4dfcda52ce54a64dcde43cfb2417013b4f68e1',
          name: 'File_2.gcode',
          size: 15315451,
          origin: 'st-aaa',
          path: '/USB/File_2.gcode',
          type: 'machinecode',
          typePath: ['machinecode', 'gcode']
        }],
        display: 'Storage',
        name: 'Storage',
        origin: 'st-aaa',
        path: 'USB',
        size: 4354654843,
        type: 'folder',
        typePath: ['folder']
      },
      {
        children: [{
          date: Date.now(),
          display: 'File_2.gcode',
          hash: 'ab4dfcda52ce54a64dcde43cfb2417013b4f68e1',
          name: 'File_2.gcode',
          size: 15315451,
          origin: 'st-bbb',
          path: '/USB/File_2.gcode',
          type: 'machinecode',
          typePath: ['machinecode', 'gcode']
        }],
        display: 'Storage',
        name: 'Storage',
        origin: 'st-bbb',
        path: 'USB',
        size: 4354654843,
        type: 'folder',
        typePath: ['folder']
      }
    ]
    commit('setUsbs', usbs)
  },

  async deleteFile ({ commit }, file: FileOrFolder) {
    await new Promise(resolve => setTimeout(resolve, 500))

    if (file.path.startsWith('/Storage')) {
      commit('deleteLocalFile', file)
    } else {
      commit('deleteUsbFile', file)
    }
  }
}
