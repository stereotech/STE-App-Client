<template>
  <v-layout row wrap>
    <v-flex xs12>
      <PrinterStatus
        toolbar
        :id="printer.id"
        :host="printer.host"
        :model="printer.model"
        :name="printer.name"
        :status="printer.status"
        :file="printer.file"
        :progress="printer.progress"
        :e1Temp="printer.e1Temp"
        :e1Target="printer.e1Target"
        :e2Temp="printer.e2Temp"
        :e2Target="printer.e2Target"
        :bedTemp="printer.bedTemp"
        :bedTarget="printer.bedTarget"
      />
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
  import PrinterStatus from '~/components/common/PrinterStatus.vue'
  import WizardsPanel from '~/components/printers/WizardsPanel.vue'
  import ManualControlPanel from '~/components/printers/expert/ManualControlPanel.vue'

  @Component({
    components: {
      PrinterStatus,
      WizardsPanel,
      ManualControlPanel
    }
  })
  export default class extends Vue {

    private printer: any = {}

    async asyncData ({ params }) {
      return {
        printer: {
          id: 1,
          name: 'ST-AAA',
          model: 'STE320',
          host: true,
          status: 'Printing',
          file: 'fnrvdnlvl.gcode',
          progress: 68,
          e1Temp: 218,
          e1Target: 220,
          e2Temp: 221,
          e2Target: 220,
          bedTemp: 60,
          bedTarget: 60
        }
      }
    }

    get isPrinting () {
      return this.printer.status === 'Printing'
    }

  }
</script>

<style>
</style>
