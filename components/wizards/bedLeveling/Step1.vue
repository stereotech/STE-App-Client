<template>
  <WizardStep :step="step">
    <v-card class="mb-5" color="grey lighten-1" height="200px">Step 1</v-card>
    <v-btn block flat @click="next(2)">Start</v-btn>
  </WizardStep>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
  import WizardStep from '~/components/wizards/WizardStep.vue'

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
    private step?: number = 1
    private curStep?: number = this.currentStep


    private next (step: number) {
      this.$emit('change', step)
      this.curStep = step
    }
  }
</script>


<style>
</style>
