import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { PrintJob } from '~/types/printJob'
import { RootState } from '.'

export interface PrintJobsState {
  jobs: PrintJob[]
}

export const state = (): PrintJobsState => ({
  jobs: []
})

export const getters: GetterTree<PrintJobsState, RootState> = {
  doneJobs (state): PrintJob[] {
    return state.jobs.filter(value => value.succesful !== undefined)
  },

  queuedJobs (state): PrintJob[] {
    return state.jobs.filter(value => value.succesful === undefined).sort((a: PrintJob, b: PrintJob) => a.id - b.id)
  }
}

export const mutations: MutationTree<PrintJobsState> = {
  setJobs (state: PrintJobsState, printJobs: PrintJob[]) {
    state.jobs = printJobs
  },

  removeJob (state: PrintJobsState, job: PrintJob) {
    const index = state.jobs.indexOf(job)
    if (index > -1) {
      state.jobs.splice(index, 1)
    }
  },

  addJob (state: PrintJobsState, job: PrintJob) {
    state.jobs.push(job)
  },

  editJob (state: PrintJobsState, job: PrintJob) {
    state.jobs = [...state.jobs.filter(value => value.id !== job.id), job]
  },

  revertJob (state: PrintJobsState, job: PrintJob) {
    const index = state.jobs.findIndex(value => value.id === job.id)
    if (index > -1) {
      state.jobs[index].succesful = undefined
      state.jobs[index].lastPrint = undefined
    }
  },

  toggleSuccess (state: PrintJobsState, job: PrintJob) {
    const index = state.jobs.findIndex(value => value.id === job.id)
    if (index > -1) {
      state.jobs[index].succesful = !state.jobs[index].succesful
    }
  }

}

export const actions: ActionTree<PrintJobsState, RootState> = {
  async fetchJobs ({ commit }) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const printJobs: PrintJob[] = [
      {
        id: 1,
        name: 'job1',
        description: '',
        creationTime: Date.now(),
        fileUri: 'file.gcode',
        succesful: true,
        lastPrint: Date.now(),
        printers: []
      },
      {
        id: 2,
        name: 'job2',
        description: '',
        creationTime: Date.now(),
        fileUri: 'file.gcode',
        printers: []
      }
    ]
    commit('setJobs', printJobs)
  },

  async removeJob ({ commit }, job: PrintJob) {
    await new Promise(resolve => setTimeout(resolve, 200))
    commit('removeJob', job)
  },

  async addJob ({ commit }, job: PrintJob) {
    await new Promise(resolve => setTimeout(resolve, 200))
    commit('addJob', job)
  },

  async editJob ({ commit }, job: PrintJob) {
    await new Promise(resolve => setTimeout(resolve, 200))
    commit('editJob', job)
  },

  async revertJob ({ commit }, job: PrintJob) {
    await new Promise(resolve => setTimeout(resolve, 200))
    commit('revertJob', job)
  },

  async toggleSuccess ({ commit }, job: PrintJob) {
    await new Promise(resolve => setTimeout(resolve, 200))
    commit('toggleSuccess', job)
  }
}
