<template>
  <WizardStepper :stepCount="7" v-model="currentStep">
    <template slot="title">{{ $t("Bed leveling") }}</template>
    <Step1 v-model="currentStep" :additional-data="additionalData" />
    <Step2 v-model="currentStep" :additional-data="additionalData" />
    <Step3 v-model="currentStep" :additional-data="additionalData" />
    <Step4 v-model="currentStep" :additional-data="additionalData" />
    <Step5 v-model="currentStep" :additional-data="additionalData" />
    <Step6 v-model="currentStep" :additional-data="additionalData" />
    <Step7 v-model="currentStep" />
  </WizardStepper>
</template>

<script lang="ts">
import { Vue, Component, Model, namespace } from 'nuxt-property-decorator'
import WizardStepper from '~/components/wizards/WizardStepper.vue'
import Step1 from '~/components/wizards/bedLeveling/Step1.vue'
import Step2 from '~/components/wizards/bedLeveling/Step2.vue'
import Step3 from '~/components/wizards/bedLeveling/Step3.vue'
import Step4 from '~/components/wizards/bedLeveling/Step4.vue'
import Step5 from '~/components/wizards/bedLeveling/Step5.vue'
import Step6 from '~/components/wizards/bedLeveling/Step6.vue'
import Step7 from '~/components/wizards/bedLeveling/Step7.vue'
import { PrinterSize } from '~/types/printer'


@Component({
  components: {
    WizardStepper,
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6,
    Step7
  }
})
export default class extends Vue {
  private currentStep: number = 0

  additionalData: { size: PrinterSize, points: number } = {
    size: PrinterSize.Stadard,
    points: 3
  }
}
</script>

<style>
</style>
