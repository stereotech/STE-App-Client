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
    return state.jobs.filter(value => value.successful !== undefined)
  },

  queuedJobs (state): PrintJob[] {
    return state.jobs
      .filter(value => value.lastPrintTime === undefined)
      .sort((a: PrintJob, b: PrintJob) => a.id - b.id)
  },

  jobsCount (state): number {
    return state.jobs.length
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

  addJob (state: PrintJobsState, jobs: PrintJob[]) {
    state.jobs.push(...jobs)
  },

  editJob (state: PrintJobsState, job: PrintJob) {
    state.jobs = [...state.jobs.filter(value => value.id !== job.id), job]
  },

  revertJob (state: PrintJobsState, job: PrintJob) {
    const index = state.jobs.findIndex(value => value.id === job.id)
    if (index > -1) {
      state.jobs[index].successful = undefined
      state.jobs[index].lastPrintTime = undefined
    }
  },

  toggleSuccess (state: PrintJobsState, job: PrintJob) {
    const index = state.jobs.findIndex(value => value.id === job.id)
    if (index > -1) {
      state.jobs[index].successful = !state.jobs[index].successful
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

  async removeJob ({ commit, dispatch }, job: PrintJob) {
    commit('removeJob', job)
    let response = await this.$axios.delete(this.state.apiUrl + jobsEndpoint + '/' + job.id)
    if (response.status == 204) {
      await dispatch('fetchJobs')
    }
  },

  async addJob ({ commit, dispatch }, jobs: PrintJob[]) {
    commit('addJob', jobs)
    let response = await this.$axios.post(this.state.apiUrl + jobsEndpoint, jobs)
    if (response.status == 204) {
      await dispatch('fetchJobs')
    }
  },

  async editJob ({ commit, dispatch }, job: PrintJob) {
    commit('editJob', job)
    let response = await this.$axios.put(this.state.apiUrl + jobsEndpoint, job)
    if (response.status == 204) {
      await dispatch('fetchJobs')
    }
  },

  async revertJob ({ commit, dispatch }, job: PrintJob) {
    commit('revertJob', job)
    job.successful = undefined
    job.lastPrintTime = undefined
    let response = await this.$axios.put(this.state.apiUrl + jobsEndpoint, job)
    if (response.status == 204) {
      await dispatch('fetchJobs')
    }
  },

  async toggleSuccess ({ commit, dispatch }, job: PrintJob) {
    commit('toggleSuccess', job)
    let response = await this.$axios.put(this.state.apiUrl + jobsEndpoint, job)
    if (response.status == 204) {
      await dispatch('fetchJobs')
    }
  }
}
