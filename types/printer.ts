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

export interface TemperatureData {
  actual: number
  offset: number
  target: number
}

export interface TemperatureDataPoint {
  tool0: TemperatureData;
  tool1: TemperatureData;
  bed: TemperatureData;
  time?: number;
}

export interface BusyFile {
  path: string
  origin: string
}

export interface StateFlags {
  cancelling: boolean
  closedOrErr: boolean
  error: boolean
  finishing: boolean
  operational: boolean
  paused: boolean
  pausing: boolean
  printing: boolean
  ready: boolean
  resuming: boolean
  sdReady: boolean
}

export interface State {
  flags: StateFlags
  text: string
}

export interface CurrentState {
  id: string
  logs: string[]
  offsets: TemperatureDataPoint
  serverTime: number
  busyFiles: BusyFile[]
  messages: string[]
  job: JobInfo
  temps: TemperatureDataPoint[]
  state: State
  currentZ: number | null
  progress: ProgressInfo
}