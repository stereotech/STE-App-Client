import { JobInfo, ProgressInfo } from './printJob';

export enum PrinterSize {
  Stadard,
  Large
}

export interface PrinterInfo {
  id: string
  model: string
  name: string
  isLocal: boolean
  isFiveAxis: boolean
  role: string
  hostname?: string
  apiKey: string
  octoApiKey: string
  address: string
  //Additional properties
  isGlaze?: boolean
  isFiber?: boolean
  isHybrid?: boolean
  size?: PrinterSize
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
  error?: string
}