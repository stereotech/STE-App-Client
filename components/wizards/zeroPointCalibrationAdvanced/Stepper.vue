<template>
  <WizardStepper v-model="currentStep" :step-count="5">
    <template slot="title">{{
      $t("Zero point calibration (advanced)")
    }}</template>
    <Step1 v-model="currentStep" :additional-data="additionalData" />
    <Step2 v-model="currentStep" :additional-data="additionalData" />
    <Step3 v-model="currentStep" :additional-data="additionalData" />
    <Step4 v-model="currentStep" :additional-data="additionalData" />
    <Step5 v-model="currentStep" :additional-data="additionalData" />
  </WizardStepper>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import WizardStepper from '~/components/wizards/WizardStepper.vue'
import Step1 from '~/components/wizards/zeroPointCalibrationAdvanced/Step1.vue'
import Step2 from '~/components/wizards/zeroPointCalibrationAdvanced/Step2.vue'
import { PrinterSize } from '~/types/printer'

@Component({
  components: {
    WizardStepper,
    Step1,
    Step2
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
}

</script>

<style>
</style>