import { JobInfo, ProgressInfo } from './printJob'

export interface PrinterInfo {
  id: string
  model: string
  name: string
  isLocal: boolean
  role: string
  hostname?: string
  apiKey: string
  octoApiKey: string
  address: string
}

export interface PrinterStatus {
  id: string
  stateText: string
  bed?: TemperatureData
  tool0?: TemperatureData
  tool1?: TemperatureData
  job?: JobInfo
  progress?: ProgressInfo
}

export interface TemperatureData {
  actual: number
  offset: number
  target: number
}
