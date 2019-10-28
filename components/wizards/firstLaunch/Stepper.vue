<template>
  <WizardStepper v-model="currentStep" :step-count="16" :closeable="false">
    <Step1 v-model="currentStep" />
    <Step2 v-model="currentStep" />
    <Step3 v-model="currentStep" />
    <Step4 v-model="currentStep" />
    <Step5 v-model="currentStep" />
    <Step6 v-model="currentStep" />
    <Step7 v-model="currentStep" />
    <Step8 v-model="currentStep" />
    <Step9 v-model="currentStep" />
    <Step10 v-model="currentStep" :additional-data="additionalData" />
    <Step11 v-model="currentStep" :additional-data="additionalData" />
    <Step12 v-model="currentStep" :additional-data="additionalData" />
    <Step13 v-model="currentStep" :additional-data="additionalData" />
    <Step14 v-model="currentStep" :additional-data="additionalData" />
    <Step15 v-model="currentStep" />
    <Step16 v-model="currentStep" />
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
import Step9 from '~/components/wizards/firstLaunch/Step9.vue'
import Step10 from '~/components/wizards/firstLaunch/Step10.vue'
import Step11 from '~/components/wizards/firstLaunch/Step11.vue'
import Step12 from '~/components/wizards/firstLaunch/Step12.vue'
import Step13 from '~/components/wizards/firstLaunch/Step13.vue'
import Step14 from '~/components/wizards/firstLaunch/Step14.vue'
import Step15 from '~/components/wizards/firstLaunch/Step15.vue'
import Step16 from '~/components/wizards/firstLaunch/Step16.vue'

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
    Step8,
    Step9,
    Step10,
    Step11,
    Step12,
    Step13,
    Step14,
    Step15,
    Step16
  }
})
export default class FirstLaunchStepper extends Vue {
  private currentStep: number = 0

  private additionalData: { tool: number, action: number } = {
    tool: 0,
    action: 2
  }
}
</script>

<style>
</style>
