<template>
  <v-layout row wrap>  
      <PrinterCard
        toolbar
        controlPanel
        v-for="printer in printers"
        :id="printer.id"
        :key="printer.id"
      />
    <v-flex xs12 class="text-center">
      <AddPrinterDialog />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import PrinterCard from '~/components/common/printerCard/PrinterCard.vue'
import AddPrinterDialog from '~/components/printers/AddPrinterDialog.vue'
import { Action, Getter, namespace } from 'vuex-class'
import { PrinterInfo, CurrentState } from 'types/printer'

const printers = namespace('printersState')

@Component({
  components: {
    PrinterCard,
    AddPrinterDialog
  }
})
export default class PrintersPage extends Vue {
  [x: string]: any;
  @printers.Getter printers!: PrinterInfo[]

  head () {
    return { title: 'STE App Printers' }
  }

  mounted () {
    this.$store.dispatch('printersState/fetchPrinters')
  }
}
</script>

<style>
</style>