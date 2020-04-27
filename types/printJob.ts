import { FileOrFolder, Filament } from './fileOrFolder'

export interface PrintJob {
  id: number
  name: string
  description: string
  target?: string
  creationTime: number
  isFiveAxis?:boolean
  fileUri: string
  printers: string[]
  lastPrintTime: number
  successful: boolean
  state: string
}

export interface JobInfo {
  averagePrintTime?: number
  estimatedPrintTime: number
  filment: Filament
  file: FileOrFolder
  lastPrintTime?: number
}

export interface ProgressInfo {
  completion: number
  filepos: number
  printTime: number
  printTimeLeft: number
  printTimeLeftOrigin: string
}
