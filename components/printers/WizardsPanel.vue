<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <span class="headline font-weight-light">{{ $t("Wizards") }}</span>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-container fluid>
        <v-row dense>
          <template v-for="wizard in data">
            <v-col
              :key="wizard.id"
              cols="6"
              sm="4"
              lg="2"
              v-if="validWizard(wizard)"
            >
              <WizardCard
                :name="wizard.translatedName"
                :image="wizard.image"
                :description="wizard.description"
                :to="'/printers/' + wizard.link"
              />
            </v-col>
          </template>
        </v-row>
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

const printers = namespace('printersState')
@Component({
  components: {
    WizardCard
  }
})
export default class WizardsPanel extends Vue {

  @Prop({ default: '', type: String }) id!: string
  @Prop({ default: false, type: Boolean }) glaze!: boolean
  @Prop({ default: 1, type: Number }) printerType!: Number
  @printers.Getter certainTypePrinters!: PrinterInfo[]
  private data: {
    id: number,
    name: string,
    translatedName: string,
    image: string,
    link: string,
    type: PrinterType,
    description: string,
  }[] = [
      {
        id: 1,
        name: 'Bed leveling',
        translatedName: 'Bed leveling',
        image: 'bed_leveling/bed_leveling',
        link: 'bed-leveling',
        type: PrinterType.threeAxis,
        description: 'This wizard will help you to calibrate the build plate for good adhesion of the print to the build plate.'
      },
      {
        id: 2,
        name: '5D calibration',
        translatedName: '5D calibration',
        image: '5d_calibration/5d_calibration',
        link: '5d-calibration',
        type: PrinterType.fiveAxis,
        description: 'This wizard will help you to tune 5-axis printers'
      },
      {
        id: 3,
        name: 'Zero point setup',
        translatedName: 'Zero point setup',
        image: 'zero_point_setup/zero_point_setup',
        link: 'zero-point-setup',
        type: PrinterType.fiveAxis,
        description: 'This wizard helps you to setup zero point for proper 5D printing'
      },
      {
        id: 4,
        name: 'Change material',
        translatedName: 'Change material',
        image: 'change_material/change_material',
        link: 'change-material',
        type: PrinterType.both,
        description: 'This wizard will help you to change, insert or remove the material'
      }
    ]

  mounted () {
    this.data.forEach(element => {
      element.translatedName = this.$tc(`${element.name}`)
    })
  }

  updated () {
    this.data.forEach(element => {
      element.translatedName = this.$tc(`${element.name}`)
    })
  }

  validWizard (wizard: any): boolean {
    if (wizard.type == this.printerType || wizard.type == 2)
      if (this.glaze && wizard.id == 4)
        return false
      else
        return true
    return false
  }

}
</script>

<style>
</style>
