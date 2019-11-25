<template>
  <v-layout row wrap>
    <PrinterCard toolbar :id="$route.params.id" />
    <v-flex xs12>
      <v-expansion-panels multiple v-model="panel">
        <!--<WizardsPanel :id="$route.params.id" v-if="isMaintenance || isPaused" />-->
        <WizardsPanel :id="$route.params.id"  :printerType="printerType" />
        <ManualControlPanel :printing="isPrinting" :id="$route.params.id" :isFiveAxis="printerType==1" />
      </v-expansion-panels>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import PrinterCard from '~/components/common/printerCard/PrinterCard.vue'
import WizardsPanel from '~/components/printers/WizardsPanel.vue'
import ManualControlPanel from '~/components/printers/expert/ManualControlPanel.vue'
import { Action, Getter, namespace } from 'vuex-class'
import { PrinterInfo, CurrentState } from 'types/printer'
import { PrinterType } from '~/types/printerType'

const printers = namespace('printersState')

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

  get printerType(): number {
    let printer = this.printer(this.$route.params.id)
    if(printer!=null){
      if(printer.isFiveAxis==true){
        return PrinterType.fiveAxis
      }
      else{
        return PrinterType.threeAxis
      }
    }
    else return PrinterType.threeAxis
  }

  async mounted () {
    this.$store.dispatch('printersState/fetchPrinters')
    if (this.printer(this.$route.params.id) === undefined) {
      this.$router.push('/printers')
    }
  }

  head () {
    return { title: 'STE App Printers' }
  }

  panel: number[] = [0, 1]

  get isPrinting (): boolean {
    if (this.status(this.$route.params.id) !== undefined) {
      return this.status(this.$route.params.id)!.state.flags.printing
    }
    return false
  }
  get isMaintenance (): boolean {
    if (this.status(this.$route.params.id) !== undefined) {
      return this.status(this.$route.params.id)!.state.text === 'Maintenance'
    }
    return false
  }
  get isPaused (): boolean {
    if (this.status(this.$route.params.id) !== undefined) {
      return this.status(this.$route.params.id)!.state.text === 'Paused'
    }
    return false
  }
}
</script>

<style>
</style>
