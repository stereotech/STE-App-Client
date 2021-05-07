import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { StatisticsData, StatisticsFilter, StatisticsResponse } from '~/types/stats'
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
    },

    utilizationData (state) {
        let data: StatisticsData = {
            eventName: 'PRINTING',
            count: 0,
            timeSum: 0
        }
        const printingTime = state.TimeDataset.find(i => i.eventName === 'PRINTING')?.timeSum || 0
        const otherActivitiesTime = state.TimeDataset.filter(i => i.eventName !== 'PRINTING').reduce((a, b) => a + b.timeSum, 1);
        data.count = Math.round(100 * printingTime / otherActivitiesTime)
        return data
    },

    successPrints (state) {
        let data: StatisticsData = {
            eventName: 'DONE',
            count: 0,
            timeSum: 0
        }
        const printCount = state.PrintDataset.find(i => i.eventName === 'PRINTING')?.count || 0 - (state.PrintDataset.find(i => i.eventName === 'PAUSED')?.count || 0)
        const doneCount = state.PrintDataset.find(i => i.eventName === 'DONE')?.count || 0
        if (printCount > 0) {
            data.count = Math.round(100 * (doneCount / printCount))
        }

        return data
    }
}

export const actions: ActionTree<StatsState, RootState> = {
    async fetchData ({ commit }, filter: StatisticsFilter) {
        let response = await this.$axios.get<StatisticsResponse>(this.state.apiUrl + statsEndpoint + `?filter=${filter}`)
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