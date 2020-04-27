<template>
  <WizardStepper :stepCount="6" v-model="currentStep">
    <template slot="title">{{$t("Bed leveling")}}</template>
    <Step1 v-model="currentStep" />
    <Step2 v-model="currentStep" />
    <Step3 v-model="currentStep" />
    <Step4 v-model="currentStep" />
    <Step5 v-model="currentStep" />
    <Step6 v-model="currentStep" />
  </WizardStepper>
</template>

<script lang="ts">
import { Vue, Component, Model } from 'nuxt-property-decorator'
import WizardStepper from '~/components/wizards/WizardStepper.vue'
import Step1 from '~/components/wizards/bedLeveling/Step1.vue'
import Step2 from '~/components/wizards/bedLeveling/Step2.vue'
import Step3 from '~/components/wizards/bedLeveling/Step3.vue'
import Step4 from '~/components/wizards/bedLeveling/Step4.vue'
import Step5 from '~/components/wizards/bedLeveling/Step5.vue'
import Step6 from '~/components/wizards/bedLeveling/Step6.vue'

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
export default class extends Vue {
  private currentStep: number = 0
}
</script>

<style>
</style>
