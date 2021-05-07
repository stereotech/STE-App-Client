<template>
  <v-row dense>
    <PrinterCard :id="settings.systemId" toolbar />
    <v-col cols="12">
      <v-expansion-panels v-model="panel" multiple>
        <WizardsPanel :id="settings.systemId" :printerType="printerType" />
        <!--<WizardsPanel :id="settings.systemId" :printerType="printerType" />-->
        <ManualControlPanel
          :printing="isPrinting"
          :glaze="isGlaze"
          :fiber="isFiber"
          :id="settings.systemId"
          :isFiveAxis="printerType == 1"
        />
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import PrinterCard from '~/components/common/printerCard/PrinterCard.vue'
import WizardsPanel from '~/components/printers/WizardsPanel.vue'
import ManualControlPanel from '~/components/printers/expert/ManualControlPanel.vue'
import { Action, Getter, namespace } from 'vuex-class'
import { PrinterInfo, CurrentState, TemperatureDataPoint } from 'types/printer'
import { PrinterType } from '~/types/printerType'
import { Settings } from '~/types/settings'

const printers = namespace('printersState')
const settings = namespace('settingsState')

@Component({
  components: {
    PrinterCard,
    WizardsPanel,
    ManualControlPanel
  }
})
export default class PrinterPage extends Vue {
  @printers.Getter printer!: (id: string) => PrinterInfo | undefined
  @printers.Getter status!: (id: string) => CurrentState | undefined

  @printers.Getter lastTempDataPoint!: (id: string) => TemperatureDataPoint

  @settings.Getter settings!: Settings

  get bedEnabled (): boolean {
    return this.lastTempDataPoint(this.settings.systemId).bed != null && this.lastTempDataPoint(this.settings.systemId).bed.actual > 0
  }

  get printerType (): number {
    let printer = this.printer(this.settings.systemId)
    if (printer != null) {
      if (printer.isHybrid) {
        return this.bedEnabled ? PrinterType.threeAxis : PrinterType.fiveAxis
      } else {
        if (printer.isFiveAxis == true) {
          return PrinterType.fiveAxis
        }
        else {
          return PrinterType.threeAxis
        }
      }
    }
    else return PrinterType.threeAxis
  }

  async mounted () {
    this.$store.dispatch('printersState/fetchPrinters')
    if (this.printer(this.settings.systemId) === undefined) {
      this.$router.push('/printers')
    }
  }

  head () {
    return { title: this.$t('Printers') }
  }

  panel: number[] = [0, 1]

  get isPrinting (): boolean {
    if (this.status(this.settings.systemId) !== undefined) {
      return this.status(this.settings.systemId)!.state.flags.printing
    }
    return false
  }

  get isGlaze (): boolean {
    if (this.printer(this.settings.systemId) !== undefined) {
      return this.printer(this.settings.systemId)!.isGlaze!
    }
    return false
  }

  get isFiber (): boolean {
    if (this.printer(this.settings.systemId) !== undefined) {
      return this.printer(this.settings.systemId)!.isFiber!
    }
    return false
  }

  get isMaintenance (): boolean {
    if (this.status(this.settings.systemId) !== undefined) {
      return this.status(this.settings.systemId)!.state.text === 'Maintenance'
    }
    return false
  }
  get isPaused (): boolean {
    if (this.status(this.settings.systemId) !== undefined) {
      return this.status(this.settings.systemId)!.state.text === 'Paused'
    }
    return false
  }
  get isDone (): boolean {
    if (this.status(this.settings.systemId) !== undefined) {
      return this.status(this.settings.systemId)!.state.text === 'Done'
    }
    return false
  }
  get isFailed (): boolean {
    if (this.status(this.settings.systemId) !== undefined) {
      return this.status(this.settings.systemId)!.state.text === 'Failed'
    }
    return false
  }
}
</script>

<style>
</style>
