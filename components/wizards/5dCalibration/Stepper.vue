<template>
  <WizardStepper :stepCount="12" v-model="currentStep">
    <template slot="title">{{$t("5D calibration") }}</template>
    <Step1 v-model="currentStep" />
    <Step2 v-model="currentStep" />
    <Step3 v-model="currentStep" />
    <Step4 v-model="currentStep" />
    <Step5 v-model="currentStep" />
    <Step6 v-model="currentStep" />
    <Step7 v-model="currentStep" />
    <Step8 v-model="currentStep" />
    <Step9 v-model="currentStep" />
    <Step10 v-model="currentStep" />
    <Step11 v-model="currentStep" />
    <Step12 v-model="currentStep" />
  </WizardStepper>
</template>

<script lang="ts">
import { Vue, Component, Model } from 'nuxt-property-decorator'
import WizardStepper from '~/components/wizards/WizardStepper.vue'
import Step1 from '~/components/wizards/5dCalibration/Step1.vue'
import Step2 from '~/components/wizards/5dCalibration/Step2.vue'
import Step3 from '~/components/wizards/5dCalibration/Step3.vue'
import Step4 from '~/components/wizards/5dCalibration/Step4.vue'
import Step5 from '~/components/wizards/5dCalibration/Step5.vue'
import Step6 from '~/components/wizards/5dCalibration/Step6.vue'
import Step7 from '~/components/wizards/5dCalibration/Step7.vue'
import Step8 from '~/components/wizards/5dCalibration/Step8.vue'
import Step9 from '~/components/wizards/5dCalibration/Step9.vue'
import Step10 from '~/components/wizards/5dCalibration/Step10.vue'
import Step11 from '~/components/wizards/5dCalibration/Step11.vue'
import Step12 from '~/components/wizards/5dCalibration/Step12.vue'

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
    Step12
  }
})
export default class fiveCallibrationStepper extends Vue {
  private currentStep: number = 0


}
</script>
