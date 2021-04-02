import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { StatisticsData, StatisticsResponse } from '~/types/stats'
import { RootState } from '.'

const statsEndpoint = 'statistics'

export interface StatsState {
    FullDataset: StatisticsData[]
    HourDataset: StatisticsData[]
    DayDataset: StatisticsData[]
    PrintDataset: StatisticsData[]
    TimeDataset: StatisticsData[]
}
export const state = (): StatsState => ({
    FullDataset: [],
    HourDataset: [],
    DayDataset: [],
    PrintDataset: [],
    TimeDataset: [],
})

export const mutations: MutationTree<StatsState> = {
    setData (state, data: StatisticsResponse) {
        if (data.datasets) {
            state.FullDataset = data.datasets.FullDataset.filter(i => i.eventName !== 'LOADING')
            state.HourDataset = data.datasets.HourDataset.filter(i => i.eventName !== 'LOADING')
            state.DayDataset = data.datasets.DayDataset.filter(i => i.eventName !== 'LOADING')
            state.PrintDataset = data.datasets.PrintDataset || []
            state.TimeDataset = data.datasets.TimeDataset || []
        }
    }
}

export const getters: GetterTree<StatsState, RootState> = {
    data (state) {
        return state
    }
}

export const actions: ActionTree<StatsState, RootState> = {
    async fetchData ({ commit }) {
        let response = await this.$axios.get<StatisticsResponse>(this.state.apiUrl + statsEndpoint)
        if (response.status === 200) {
            let data: StatisticsResponse = response.data
            commit('setData', data)
        }
    },
    async clearData ({ commit }) {
        let response = await this.$axios.get<StatisticsResponse>(this.state.apiUrl + statsEndpoint + '?action=reset')
        if (response.status === 200) {
            let data: StatisticsResponse = response.data
            commit('setData', data)
        }
    }
}