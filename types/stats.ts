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

export enum StatisticsFilter {
    Today = 'today',
    CurrentWeek = 'current_week',
    CurrentMonth = 'current_month',
    CurrentYear = 'current_year',
    LastWeek = 'last_week',
    LastMonth = 'last_month',
    Last3Month = 'last3_month',
    Last6Month = 'last6_month',
    LastYear = 'last_year'
}