<template>
  <v-layout row wrap>
    <v-flex xs12>
      <PrinterCard
              toolbar
              controlPanel
              v-for="printer in printers"
              :id="printer.id"
              :key="printer.id"
      />
      <AddMaterialsDialog/>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import { Vue, Component } from 'nuxt-property-decorator'
  import PrinterCard from '~/components/common/PrinterCard.vue'
  import AddMaterialsDialog from '~/components/materials/AddMaterialsDialog.vue'
  import { Action, Getter, namespace } from 'vuex-class'
  import { PrinterInfo, PrinterStatus } from 'types/printer'

  const printers = namespace('printersState')

  @Component({
    components: {
      PrinterCard,
      AddMaterialsDialog
    }
  })
  export default class PrintersPage extends Vue {
    @printers.Getter printers!: PrinterInfo[]
    @printers.Getter printersStatus!: PrinterStatus[]

    private pollingStatus!: NodeJS.Timeout

    private async pollData () {
      await this.$store.dispatch('printersState/fetchPrinters')
      this.pollingStatus = setInterval(async () => {
        await this.$store.dispatch('printersState/fetchStatus')
      }, 1000)
    }

    async mounted () {
      await this.pollData()
    }

    beforeDestroy () {
      clearInterval(this.pollingStatus)
    }
  }
</script>

<style>
</style>