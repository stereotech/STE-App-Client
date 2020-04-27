<template>
  <v-row dense>
    <PrinterCard
      v-for="printer in printers"
      :id="printer.id"
      :key="printer.id"
      toolbar
      control-panel
    />
    <v-col cols="12" class="text-center">
      <AddPrinterDialog />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import { PrinterInfo, CurrentState } from 'types/printer'
import PrinterCard from '~/components/common/printerCard/PrinterCard.vue'
import AddPrinterDialog from '~/components/printers/AddPrinterDialog.vue'

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
