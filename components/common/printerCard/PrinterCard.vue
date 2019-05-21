<template>
  <v-flex xs12 v-if="computedStatus && computedPrinter">
    <v-card>
      <PrinterCardToolbar
        :id="id"
        :toolbar="toolbar"
        :controlPanel="controlPanel"
        :removable="!computedPrinter.isLocal && isMaintenance && controlPanel"
      />
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <PrinterCardInfo
            :name="computedPrinter.name"
            :model="computedPrinter.model"
            :progress="computedStatus.progress.completion"
            :local="computedPrinter.isLocal"
            :paused="isPaused"
            :maintenance="isMaintenance"
            :idle="isIdle"
            :printing="isPrinting"
            :done="isDone"
            :failed="isFailed"
            :offline="isOffline"
          />
          <PrinterCardTemps :id="id" :offline="isOffline"/>
          <PrinterCardActions
            :id="id"
            :jobName="computedStatus.job.file.display"
            :stateText="computedStatus.state.text"
            :paused="isPaused"
            :maintenance="isMaintenance"
            :idle="isIdle"
            :printing="isPrinting"
            :done="isDone"
            :failed="isFailed"
            :offline="isOffline"
          />
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
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

}
</script>
