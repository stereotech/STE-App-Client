<template>
  <WizardStepper :stepCount="3" v-model="currentStep">
    <template slot="title">{{$t('wizards.bedLeveling')}}</template>
    <Step1 v-model="currentStep"/>
    <Step2 v-model="currentStep"/>
    <Step3 v-model="currentStep"/>
  </WizardStepper>
</template>

<script lang="ts">
import { Vue, Component, Model } from 'nuxt-property-decorator'
import WizardStepper from '~/components/wizards/WizardStepper.vue'
import Step1 from '~/components/wizards/bedLeveling/Step1.vue'
import Step2 from '~/components/wizards/bedLeveling/Step2.vue'
import Step3 from '~/components/wizards/bedLeveling/Step3.vue'

@Component({
  components: {
    WizardStepper,
    Step1,
    Step2,
    Step3
  }
})
export default class extends Vue {
  private currentStep: number = 1
}
</script>

<style>
</style>
