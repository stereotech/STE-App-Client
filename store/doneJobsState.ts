import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { PrintJob } from '~/types/printJob'
import { RootState } from '.'

export interface DoneJobsState {
  jobs: PrintJob[]
}

export const namespaced = true

export const state = (): DoneJobsState => ({
  jobs: []
})

export const mutations: MutationTree<DoneJobsState> = {
  setDoneJobs (state: DoneJobsState, doneJobs: PrintJob[]): void {
    state.jobs = doneJobs
  }

}

export const actions: ActionTree<DoneJobsState, RootState> = {
  async nuxtServerInit ({ commit }, { app }) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const doneJobs: PrintJob[] = new Array<PrintJob>()
    commit('setDoneJobs', doneJobs)
  }
}
