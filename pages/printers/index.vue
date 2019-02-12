<template>
  <v-layout row wrap>
    <v-flex xs12>
      <PrinterCard
        toolbar
        controlPanel
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
        v-for="printer in data"
        :key="printer.id"
      />
      <AddPrinterDialog/>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import { Vue, Component } from 'nuxt-property-decorator'
  import PrinterCard from '~/components/common/PrinterCard.vue'
  import AddPrinterDialog from '~/components/printers/AddPrinterDialog.vue'

  @Component({
    components: {
      PrinterCard,
      AddPrinterDialog
    }
  })
  export default class extends Vue {
    private data: any[] = [
      {
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
      },
      {
        id: 2,
        name: 'ST-BBB',
        model: 'STE320',
        host: false,
        status: 'Done',
        e1Temp: 200,
        e1Target: 220,
        e2Temp: 80,
        e2Target: 220,
        bedTemp: 55,
        bedTarget: 60
      },
      {
        id: 3,
        name: 'ST-CCC',
        model: 'STE320',
        host: false,
        status: 'Offline'
      }
    ]

  }
</script>

<style>
</style>