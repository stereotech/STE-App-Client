<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-container>
      <v-row dense class="fill-height" align="center" justify="space-around" column>
        <v-col cols="12">
          <v-btn block x-large depressed color="accent" @click="next(2)">
            Next
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
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
  @Model('change', { type: Number, default: 1, required: true })
  currentStep?: number
  @Watch('currentStep') onCurrentStepChanged (val: number) {
    this.curStep = val
  }
  private step?: number = 1
  private curStep?: number = this.currentStep

  private image: string = 'wizards/bed_leveling/bed_leveling.jpg'
  private description: string =
    'Please remove all the transportation fixtures and press Next'

  private next (step: number) {
    this.$emit('change', step)
    this.curStep = step
  }
}
</script>

<style>
</style>
