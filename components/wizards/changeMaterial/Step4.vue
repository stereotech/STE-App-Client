<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-btn block large flat @click="next(5)">Next</v-btn>
  </WizardStep>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
  import WizardStep from '~/components/wizards/WizardStep.vue'
  import { Action, Getter, State, namespace } from 'vuex-class'
  import { PrinterStatus } from 'types/printer'

  const printers = namespace('printersState')

  @Component({
    components: {
      WizardStep
    }
  })
  export default class extends Vue {
    @Model('change', { type: Number, default: 1, required: true }) currentStep?: number
    @Watch('currentStep') onCurrentStepChanged (val: number) {
      this.curStep = val
    }
    @Prop({ type: Object, default: {} }) additionalData!: any
    @Watch('additionalData') onAdditionalDataChanged () {
      this.$emit('dataChanged', this.additionalData)
    }
    private step?: number = 4
    private curStep?: number = this.currentStep

    private image: string = '/wizards/bed_leveling.png'
    private description: string = 'Load new spool, insert material into bowden tube and press Next button'

    private next (step: number) {
      this.$emit('change', step)
      this.curStep = step
    }
  }
</script>


<style>
</style>