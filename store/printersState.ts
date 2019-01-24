import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { PrinterInfo } from '~/types/printer'

export interface PrintersState {
  printers: PrinterInfo[]
}
