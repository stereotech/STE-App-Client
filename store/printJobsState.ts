import { PrintJob } from './PrintJob'

export interface PrintJobState {
  jobs: PrintJob[]
}

export const store: PrintJobState = {
  jobs: []
}
