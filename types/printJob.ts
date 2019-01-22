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
