import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { RootState } from '.'

const loggingEndpoint = 'logging'

export interface LoggingState { }
export const state = (): LoggingState => ({

})

export const mutations: MutationTree<LoggingState> = {}

export const getters: GetterTree<LoggingState, RootState> = {}

export const actions: ActionTree<LoggingState, RootState> = {
    async downloadLog ({ }, octoprint: boolean = false) {
        const response = await this.$axios.get(`${this.state.apiUrl}${loggingEndpoint}${octoprint ? '?octo=true' : ''}`, {
            responseType: 'blob'
        })
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', octoprint ? 'octoprint.log' : 'steapp.log'); //or any other extension
        document.body.appendChild(link);
        link.click();
    }
}