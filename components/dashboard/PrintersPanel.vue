<template>
  <v-flex xs12>
    <PrinterCard v-for="printer in printers" :id="printer.id" :key="printer.id"/>
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import PrinterCard from '~/components/common/printerCard/PrinterCard.vue'
import { Action, Getter, namespace } from 'vuex-class'
import { PrinterInfo } from 'types/printer'

const printers = namespace('printersState')

@Component({
  components: {
    PrinterCard
  }
})
export default class PrintersPanel extends Vue {
  @printers.Getter printers!: PrinterInfo[]

}
</script>

<style>
</style>
