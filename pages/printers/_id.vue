<template>
  <v-layout row wrap>
    <v-flex xs12>
      <PrinterCard toolbar :id="$route.params.id"/>
    </v-flex>
    <v-flex xs12>
      <WizardsPanel/>
    </v-flex>
    <v-flex xs12>
      <ManualControlPanel :printing="isPrinting"/>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import { Vue, Component } from 'nuxt-property-decorator'
  import PrinterCard from '~/components/common/PrinterCard.vue'
  import WizardsPanel from '~/components/printers/WizardsPanel.vue'
  import ManualControlPanel from '~/components/printers/expert/ManualControlPanel.vue'
  import { Action, Getter, namespace } from 'vuex-class'
  import { PrinterInfo, PrinterStatus } from 'types/printer'

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
    @printers.Getter status!: (id: string) => PrinterStatus | undefined

    mounted () {
      this.$store.dispatch('printersState/fetchPrinters')
      if (this.printer(this.$route.params.id) === undefined) {
        this.$router.push('/printers')
      }
      this.pollData()
    }

    get isPrinting() : boolean {
      if (this.status(this.$route.params.id) !== undefined) {
        return this.status(this.$route.params.id)!.stateText === 'Printing'
      }
      return false
    }

    private pollingStatus!: NodeJS.Timeout

    private pollData () {

      this.pollingStatus = setInterval(async () => {
        await this.$store.dispatch('printersState/fetchStatus')
      }, 1000)
    }

    beforeDestroy () {
      clearInterval(this.pollingStatus)
    }
  }
</script>

<style>
</style>
