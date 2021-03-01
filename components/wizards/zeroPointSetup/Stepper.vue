<template>
  <WizardStepper v-model="currentStep" :step-count="5" @close="closeWizard">
    <template slot="title">{{ $t("Zero point setup") }}</template>
    <Step1 v-model="currentStep" :additional-data="additionalData" />
    <Step2 v-model="currentStep" :additional-data="additionalData" />
    <Step3 v-model="currentStep" :additional-data="additionalData" />
    <Step4 v-model="currentStep" :additional-data="additionalData" />
    <Step5 v-model="currentStep" :additional-data="additionalData" />
  </WizardStepper>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator'
import { PrintingMode } from '~/types/printingMode'
import WizardStepper from '~/components/wizards/WizardStepper.vue'
import Step1 from '~/components/wizards/zeroPointSetup/Step1.vue'
import Step2 from '~/components/wizards/zeroPointSetup/Step2.vue'
import Step3 from '~/components/wizards/zeroPointSetup/Step3.vue'
import Step4 from '~/components/wizards/zeroPointSetup/Step4.vue'
import Step5 from '~/components/wizards/zeroPointSetup/Step5.vue'
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
    Step5
  }
})
export default class ZeroPointSetupStepper extends Vue {
  private currentStep: number = 0

  private additionalData: { printingMode: PrintingMode, offsetX: number, offsetY: number, offsetZ: number, size: PrinterSize } = {
    printingMode: PrintingMode.Classic,
    offsetX: 0,
    offsetY: 0,
    offsetZ: 0,
    size: PrinterSize.Stadard
  }

  @settings.Getter settings!: Settings
  @printers.Action customCommand: any
  closeWizard () {
    this.customCommand('G54 G28 X0 Y0 Z0')
    this.$router.push('/printers')
  }
}



</script>

<style>
</style>