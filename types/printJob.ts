import { FileOrFolder, Filament } from './fileOrFolder'

export interface PrintJob {
  id: number
  name: string
  description: string
  creationTime: number
  fileUri: string
  printers: string[]
  lastPrint?: number
  succesful?: boolean
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
