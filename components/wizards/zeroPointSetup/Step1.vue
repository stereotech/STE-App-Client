<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-container>
      <v-row dense align="center" justify="space-around">
        <v-col cols="12">
          <v-radio-group v-model="additionalData.printingMode" mandatory>
            <v-radio
              :label="$tc('Classic mode (3D)')"
              :value="0"
              color="secondary"
            />
            <v-radio :label="$tc('Spiral 5D')" :value="1" color="secondary" />
            <v-radio
              :label="$tc('5D Spiral full')"
              :value="2"
              color="secondary"
            />
            <v-radio :label="$tc('5D Discrete')" :value="3" color="secondary" />
          </v-radio-group>
        </v-col>
        <v-col cols="12">
          <v-btn block x-large depressed color="accent" @click="nextStep">{{
            $t("Next")
          }}</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </WizardStep>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch, namespace } from 'nuxt-property-decorator'
import WizardStep from '~/components/wizards/WizardStep.vue'
import { PrinterInfo, PrinterSize } from '~/types/printer'
import { Settings } from '~/types/settings'

const settings = namespace('settingsState')

const printers = namespace('printersState')

@Component({
  components: {
    WizardStep
  }
})
export default class extends Vue {
  @Model('change', { type: Number, default: 1, required: true }) currentStep!: number
  @Prop({ type: Object, default: {} }) additionalData!: any
  @Watch('additionalData') onAdditionalDataChanged () {
    this.$emit('dataChanged', this.additionalData)
  }
  @Watch('currentStep') onCurrentStepChanged (val: number) {
    this.curStep = val
  }

  @settings.Getter settings!: Settings

  @printers.Action customCommand: any
  @printers.Getter printer!: (id: string) => PrinterInfo | undefined

  private step?: number = 0
  private curStep?: number = this.currentStep

  private image: string = 'wizards/zero_point_setup/zero_point_setup.jpg'
  private description: string = ''

  private async nextStep () {
    if (this.additionalData) {
      this.additionalData.size = this.printer(this.settings.systemId)?.size || PrinterSize.Stadard
    }
    this.next(1)
  }

  private next (step: number) {
    this.$emit('change', step)
    this.curStep = step
  }
  mounted () {
    this.description = this.$tc('This wizard helps you to setup zero point for proper 3D/5D printing. Please select Printing mode, wich you want to use')
  }

  updated () {
    this.description = this.$tc('This wizard helps you to setup zero point for proper 3D/5D printing. Please select Printing mode, wich you want to use')
  }
}
</script>

<style>
</style>
