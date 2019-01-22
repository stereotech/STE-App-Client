export interface PrintJob {
  id: number
  name: string
  description: string
  creationTime: Date
  fileUri: string
  lastPrint?: Date
  succesful?: boolean
}
