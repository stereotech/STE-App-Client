<template>
  <WizardStepper v-model="currentStep" :step-count="5" @close="closeWizard">
    <template slot="title">{{ $t("Change material") }}</template>
    <Step1 v-model="currentStep" :additional-data="additionalData" />
    <Step2 v-model="currentStep" :additional-data="additionalData" />
    <Step3 v-model="currentStep" :additional-data="additionalData" />
    <Step4 v-model="currentStep" :additional-data="additionalData" />
    <Step5 v-model="currentStep" :additional-data="additionalData" />
  </WizardStepper>
</template>

<script lang="ts">
import { Vue, Component, Model, namespace } from 'nuxt-property-decorator'
import WizardStepper from '~/components/wizards/WizardStepper.vue'
import Step1 from '~/components/wizards/changeMaterial/Step1.vue'
import Step2 from '~/components/wizards/changeMaterial/Step2.vue'
import Step3 from '~/components/wizards/changeMaterial/Step3.vue'
import Step4 from '~/components/wizards/changeMaterial/Step4.vue'
import Step5 from '~/components/wizards/changeMaterial/Step5.vue'
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
export default class ChangeMaterialStepper extends Vue {
  @settings.Getter settings!: Settings
  private currentStep: number = 0

  private additionalData: { tool: number, action: number } = {
    tool: 0,
    action: 1
  }

  @printers.Action toolTempCommand: any

  closeWizard () {
    this.toolTempCommand({ id: this.settings.systemId, tool0Temp: 0, tool1Temp: 0 })
    this.$router.push('/printers')
  }
}
</script>

<style>
</style>
