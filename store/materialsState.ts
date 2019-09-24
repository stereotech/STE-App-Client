import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { Material } from '~/types/material'
import { RootState } from '.'

const materialsEndPoint = 'materials'

export interface MaterialsState {
    materials: Material[]
  }
  
  export const state = (): MaterialsState => ({
    materials: []
  })

  export const getters: GetterTree<MaterialsState, RootState> = {
    materials (state): Material[] {
        return state.materials
  }
}

export const mutations: MutationTree<MaterialsState> = {
  setMaterials(state:MaterialsState, mtrls:Material[]){
    state.materials = mtrls
  },

  removeMaterial(state:MaterialsState, material:Material){
    const index = state.materials.indexOf(material)
    if (index > -1) {
      state.materials.splice(index, 1)
    }
  },

  addMaterial (state: MaterialsState, materials: Material[]) {
    state.materials.push(...materials)
  },

  editMaterial(state:MaterialsState, material:Material){
    state.materials = [...state.materials.filter(value=>value.id !== material.id),material]
  }
}

 export const actions: ActionTree <MaterialsState, RootState>={

  async fetchMaterials ({ commit }) {
    let response = await this.$axios.get(this.state.apiUrl + materialsEndPoint)
    if (response.status == 200) {
      let materials: Material[] = response.data
      commit('setMaterials', materials)
    }
  },
     async removeMaterial ({commit}, material:Material) {
      await this.$axios.$delete(this.state.apiUrl + materialsEndPoint + '/'+ material.id)
     },

     async addMaterial({commit}, material:Material){
      await this.$axios.$post(this.state.apiUrl+materialsEndPoint, material)
     },
     async editMaterial ({commit}, material:Material){
      await this.$axios.$put(this.state.apiUrl+materialsEndPoint, material)
     }
 }
