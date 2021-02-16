<template>
  <WizardStepper v-model="currentStep" :step-count="6" @close="closeWizard">
    <template slot="title">{{
      $t("Zero point calibration (advanced)")
    }}</template>
    <Step1 v-model="currentStep" :additional-data="additionalData" />
    <Step2 v-model="currentStep" :additional-data="additionalData" />
    <Step3 v-model="currentStep" :additional-data="additionalData" />
    <Step4 v-model="currentStep" :additional-data="additionalData" />
    <Step5 v-model="currentStep" :additional-data="additionalData" />
    <Step6 v-model="currentStep" :additional-data="additionalData" />
  </WizardStepper>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator'
import WizardStepper from '~/components/wizards/WizardStepper.vue'
import Step1 from '~/components/wizards/zeroPointCalibrationAdvanced/Step1.vue'
import Step2 from '~/components/wizards/zeroPointCalibrationAdvanced/Step2.vue'
import Step3 from '~/components/wizards/zeroPointCalibrationAdvanced/Step3.vue'
import Step4 from '~/components/wizards/zeroPointCalibrationAdvanced/Step4.vue'
import Step5 from '~/components/wizards/zeroPointCalibrationAdvanced/Step5.vue'
import Step6 from '~/components/wizards/zeroPointCalibrationAdvanced/Step6.vue'
import { PrinterSize } from '~/types/printer'
import { Settings } from '~/types/settings'

const settings = namespace('settingsState')

const printers = namespace('printersState')

@Component({
  components: {
    WizardStepper,
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6
  }
})
export default class ZeroPointCalibrationAdvancedStepper extends Vue {
  private currentStep: number = 0

  private additionalData: { offsetX: number, offsetY: number, offsetZ: number, size: PrinterSize } = {
    offsetX: 0,
    offsetY: 0,
    offsetZ: 0,
    size: PrinterSize.Stadard
  }

  @settings.Getter settings!: Settings
  @printers.Action customCommand: any
  closeWizard () {
    this.customCommand('G54\nG28')
    this.$router.push('/printers')
  }
}

</script>

<style>
</style>