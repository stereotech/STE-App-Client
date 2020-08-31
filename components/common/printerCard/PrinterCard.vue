<template>
  <v-col v-if="computedPrinter" cols="12">
    <v-card>
      <PrinterCardToolbar
        :id="id"
        :toolbar="toolbar"
        :control-panel="controlPanel"
        :removable="!computedPrinter.isLocal && !isPrinting && controlPanel"
      />
      <v-container fluid>
        <v-row dense>
          <PrinterCardInfo
            :name="computedPrinter.name"
            :model="computedPrinter.model"
            :progress="computedStatus ? computedStatus.progress.completion : 0"
            :print-time="computedStatus ? computedStatus.progress.printTime : 0"
            :print-time-left="computedStatus ? computedStatus.progress.printTimeLeft : 0"
            :local="computedPrinter.isLocal"
            :paused="isPaused"
            :maintenance="isMaintenance"
            :idle="isIdle"
            :isFiveAxis="computedPrinter.isFiveAxis"
            :isGlaze="computedPrinter.isGlaze"
            :isFiber="computedPrinter.isFiber"
            :printing="isPrinting"
            :done="isDone"
            :failed="isFailed"
            :offline="isOffline"
            :loading="isLoading"
            :not-avaliable="!isAvaliable"
          />
          <PrinterCardTemps
            v-if="isAvaliable"
            :id="id"
            :offline="isOffline"
            :glaze="computedPrinter.isGlaze"
            :fiber="computedPrinter.isFiber"
            :fiveAxis="computedPrinter.isFiveAxis"
          />
          <PrinterCardActions
            :id="id"
            :job-name="computedStatus ? computedStatus.job.file.display : ''"
            :state-text="stateText"
            :paused="isPaused"
            :maintenance="isMaintenance"
            :idle="isIdle"
            :printing="isPrinting"
            :done="isDone"
            :failed="isFailed"
            :offline="isOffline"
            :loading="isLoading"
            :not-avaliable="!isAvaliable"
          />
        </v-row>
      </v-container>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import { PrinterInfo, CurrentState } from 'types/printer'
import PrinterCardToolbar from '~/components/common/printerCard/PrinterCardToolbar.vue'
import PrinterCardInfo from '~/components/common/printerCard/PrinterCardInfo.vue'
import PrinterCardTemps from '~/components/common/printerCard/PrinterCardTemps.vue'
import PrinterCardActions from '~/components/common/printerCard/PrinterCardActions.vue'

const printers = namespace('printersState')

@Component({
  components: {
    PrinterCardToolbar,
    PrinterCardInfo,
    PrinterCardTemps,
    PrinterCardActions
  }
})
export default class PrinterCard extends Vue {
  @Prop({ default: false, type: Boolean }) toolbar!: boolean
  @Prop({ default: false, type: Boolean }) controlPanel!: boolean

  @Prop({ default: '', type: String, required: true }) id!: string

  @printers.Getter printer!: (id: string) => PrinterInfo | undefined
  @printers.Getter status!: (id: string) => CurrentState | undefined

  get stateText (): string {
    if (!this.computedStatus) {
      return ''
    }
    if (this.isDone || this.isFailed) {
      return 'Maintenance'
    }
    return this.computedStatus.state.text
  }

  get computedStatus () {
    return this.status(this.id)
  }

  get computedPrinter () {
    return this.printer(this.id)
  }

  get isPrinting (): boolean {
    if (this.computedStatus !== undefined) {
      return this.computedStatus!.state.flags.printing
    }
    return false
  }
  get isPaused (): boolean {
    if (this.computedStatus !== undefined) {
      return this.computedStatus!.state.flags.paused
    }
    return false
  }
  get isIdle (): boolean {
    if (this.computedStatus !== undefined) {
      return this.computedStatus!.state.text === 'Idle'
    }
    return false
  }
  get isMaintenance (): boolean {
    if (this.computedStatus !== undefined) {
      return this.computedStatus!.state.text === 'Maintenance'
    }
    return false
  }
  get isDone (): boolean {
    if (this.computedStatus !== undefined) {
      return this.computedStatus!.state.text === 'Done'
    }
    return false
  }
  get isOffline (): boolean {
    if (this.computedStatus !== undefined) {
      return this.computedStatus!.state.text === 'Offline'
    }
    return false
  }
  get isFailed (): boolean {
    if (this.computedStatus !== undefined) {
      return this.computedStatus!.state.text === 'Failed'
    }
    return false
  }
  get isLoading (): boolean {
    if (this.computedStatus !== undefined) {
      return this.computedStatus!.state.text === 'Loading'
    }
    return false
  }

  get isAvaliable (): boolean {
    return (this.computedStatus !== undefined && this.computedPrinter !== undefined)
  }
}
</script>
