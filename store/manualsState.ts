import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { Manual, ManualPage, manualsPaths } from '~/types/manuals'
import { RootState } from '.'

const manualsPathPrefix = 'https://stereotech.org/support/manuals'
const manualFileName = 'payload.json'



export interface ManualsState {
    manuals: Manual[]
}

export const actions: ActionTree<ManualsState, RootState> = {
    async fetchManuals ({ commit }) {
        manualsPaths.forEach(async manual => {
            manual.paths.forEach(async path => {
                let result = await this.$axios.$get(`${manualsPathPrefix}/${manual.section}/${path}/${manualFileName}`, {
                    headers: {
                        'Accept': '*/*',
                        'Sec-Fetch-Mode': 'cors'
                    }
                })
                console.log(result)
            });
        });
    }
}