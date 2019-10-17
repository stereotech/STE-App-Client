<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <span class="headline font-weight-light">Wizards</span>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex xs6 sm3 lg2 v-for="wizard in data" :key="wizard.id">
            <WizardCard
              v-if="wizard.type == printerType || wizard.type == 2"
              :name="wizard.name" 
              :image="wizard.image"
              :description="wizard.description"
              
              :to="'/printers/' + $route.params.id + '/' + wizard.link"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import WizardCard from '~/components/printers/WizardCard.vue'
import { PrinterType } from '~/types/printerType'
import { Action, Getter, namespace } from 'vuex-class' 
import { PrinterInfo } from '../../types/printer'

const printers = namespace ('printersState')
@Component({
  components: {
    WizardCard
  }
})
export default class WizardsPanel extends Vue {

  @Prop({ default: '', type: String }) id!: string
  @Prop({default: 1, type:Number}) printerType!:Number
  @printers.Getter certainTypePrinters!:PrinterInfo[]
  private data: any[] = [
    {
      id: 1,
      name: 'Bed leveling',
      image: 'bed_leveling/bed_leveling',
      link: 'bed-leveling',
      type: PrinterType.threeAxis,
      description: 'This wizard will help you to calibrate the build plate for good adhesion of the print to the build plate.'
    },
    {
      id: 2,
      name: 'Change material',
      image: 'change_material/change_material',
      link: 'change-material',
      type: PrinterType.both,
      description: 'This wizard will help you to change, insert or remove the material'
    },
    {
      id:3,
      name: '5D callibration',
      image: '5d_callibration/bed_leveling',
      link:'5d-callibration',
      type:PrinterType.fiveAxis,
      description:'This wizard will help you to tune 5-axis printers'
    }
  ]

}
</script>

<style>
</style>
