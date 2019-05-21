<template>
  <v-layout row wrap>
    <v-flex xs12>
      <PrinterCard toolbar :id="$route.params.id"/>
    </v-flex>
    <v-flex xs12 v-if="!isPrinting">
      <WizardsPanel :id="$route.params.id"/>
    </v-flex>
    <v-flex xs12>
      <ManualControlPanel :printing="isPrinting" :id="$route.params.id"/>
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

  async mounted () {
    await this.$store.dispatch('printersState/fetchPrinters')
    if (this.printer(this.$route.params.id) === undefined) {
      this.$router.push('/printers')
    }
  }

  head () {
    return { title: 'STE App Printers' }
  }

  get isPrinting (): boolean {
    if (this.status(this.$route.params.id) !== undefined) {
      return this.status(this.$route.params.id)!.state.flags.printing
    }
    return false
  }

}
</script>

<style>
</style>
