export interface StatisticsData {
    date?: string
    eventName: string
    count: number
    timeSum: number
}

export interface StatisticsResponse {
    datasets: {
        FullDataset: StatisticsData[],
        HourDataset: StatisticsData[],
        DayDataset: StatisticsData[],
        PrintDataset?: StatisticsData[],
        TimeDataset?: StatisticsData[],
    }
}