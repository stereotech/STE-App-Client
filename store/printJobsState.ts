import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { PrintJob } from '~/types/printJob'
import { RootState } from '.'

const jobsEndpoint = 'jobs'

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
    return state.jobs
      .filter(value => value.lastPrint === undefined)
      .sort((a: PrintJob, b: PrintJob) => a.id - b.id)
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
    let response = await this.$axios.get(this.state.apiUrl + jobsEndpoint)
    if (response.status == 200) {
      let jobs: PrintJob[] = response.data
      commit('setJobs', jobs)
    }
  },

  async removeJob ({ commit }, job: PrintJob) {
    let response = await this.$axios.delete(this.state.apiUrl + jobsEndpoint)
    if (response.status == 204) {
      commit('removeJob', job)
    }
  },

  async addJob ({ commit }, job: PrintJob) {
    let response = await this.$axios.post(this.state.apiUrl + jobsEndpoint, jobsEndpoint)
    if (response.status == 204) {
      commit('addJob', job)
    }
  },

  async editJob ({ commit }, job: PrintJob) {
    let response = await this.$axios.put(this.state.apiUrl + jobsEndpoint, jobsEndpoint)
    if (response.status == 204) {
      commit('editJob', job)
    }
  },

  async revertJob ({ commit }, job: PrintJob) {
    let response = await this.$axios.put(this.state.apiUrl + jobsEndpoint, jobsEndpoint)
    if (response.status == 204) {
      commit('revertJob', job)
    }
  },

  async toggleSuccess ({ commit }, job: PrintJob) {
    let response = await this.$axios.put(this.state.apiUrl + jobsEndpoint, jobsEndpoint)
    if (response.status == 204) {
      commit('toggleSuccess', job)
    }
  }
}
