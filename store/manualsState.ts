import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { Manual, ManualSection, ManualPage, manualsPaths } from '~/types/manuals'
import { RootState } from '.'

const manualsPathPrefix = 'https://stereotech.org/support/manuals'
const manualFileName = 'payload.json'



export interface ManualsState {
    manuals: ManualSection[]
}

export const state = (): ManualsState => ({
    manuals: []
})

export const getters: GetterTree<ManualsState, RootState> = {
    getManualPage (state: ManualsState){
        return (sectionName: string, pageName: string): Manual | undefined => {
            let section : ManualSection | undefined
            section = state.manuals.find(v=> v.section === sectionName)
            if(section===undefined){
                return
            }
            else{
                return section.manuals.find(v=>v.section === pageName)
            }
        } 
    }

    // sectionManuals(state: ManualsState){
    //     return (sectionName: string) : Manual[] | undefined => {
    //         let chapters: Manual[] = []
    //         if (state.manuals.find(v=> v.section === sectionName)!==undefined && sectionName!== undefined){
    //             chapters = state.manuals.find(v=> v.section === sectionName).manuals
    //         }

    //         return chapters
    //     }
    // }
}

export const mutations: MutationTree<ManualsState> = {
    setManuals (state: ManualsState, payload: ManualSection[]) {
        state.manuals = payload
    }
}

export const actions: ActionTree<ManualsState, RootState> = {
    async fetchManuals ({ commit }) {
        let sections: ManualSection[] = []
        for (const manual of manualsPaths) {
            let section: ManualSection = {
                name: manual.name,
                section: manual.section,
                image: manual.image,
                manuals: []
            }
            for (const path of manual.paths) {
                let result = await this.$axios.$get<Manual[]>(`${manualsPathPrefix}/${manual.section}/${path}/${manualFileName}`, {
                    headers: {
                        'Accept': '*/*',
                    }
                })
                section.manuals.push(result[result.length - 1])
            }
            sections.push(section)
        }
        commit('setManuals', sections)
    }
}