<template>
  <WizardStepper :stepCount="8" v-model="currentStep" :closeable="false">
    <Step1 v-model="currentStep"/>
    <Step2 v-model="currentStep"/>
    <Step3 v-model="currentStep"/>
    <Step4 v-model="currentStep" :additional-data="additionalData"/>
    <Step5 v-model="currentStep" :additional-data="additionalData"/>
    <Step6 v-model="currentStep" :additional-data="additionalData"/>
    <Step7 v-model="currentStep"/>
    <Step8 v-model="currentStep"/>
  </WizardStepper>
</template>

<script lang="ts">
import { Vue, Component, Model } from 'nuxt-property-decorator'
import WizardStepper from '~/components/wizards/WizardStepper.vue'
import Step1 from '~/components/wizards/firstLaunch/Step1.vue'
import Step2 from '~/components/wizards/firstLaunch/Step2.vue'
import Step3 from '~/components/wizards/firstLaunch/Step3.vue'
import Step4 from '~/components/wizards/firstLaunch/Step4.vue'
import Step5 from '~/components/wizards/firstLaunch/Step5.vue'
import Step6 from '~/components/wizards/firstLaunch/Step6.vue'
import Step7 from '~/components/wizards/firstLaunch/Step7.vue'
import Step8 from '~/components/wizards/firstLaunch/Step8.vue'

@Component({
  components: {
    WizardStepper,
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6,
    Step7,
    Step8
  }
})
export default class FirstLaunchStepper extends Vue {
  private currentStep: number = 1

  private additionalData: { tool: number, action: number } = {
    tool: 0,
    action: 2
  }
}
</script>

<style>
</style>
