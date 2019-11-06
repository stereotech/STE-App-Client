<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-btn x-large block depressed color="accent" @click="next(3)">
      Next
      <v-icon right dark>mdi-chevron-right</v-icon>
    </v-btn>
  </WizardStep>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
import { Action, Getter, State, namespace } from 'vuex-class'
import WizardStep from '~/components/wizards/WizardStep.vue'

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

    if (this.curStep === this.step) {
      this.performStep()
    }
  }
  async performStep () {
    await this.customCommand({ id: this.$route.params.id, command: 'G0 X100 Y190 F3600' })
    await this.customCommand({ id: this.$route.params.id, command: 'G0 Z0 F600' })
  }
  private step?: number = 2
  private curStep?: number = this.currentStep

  private image: string = 'wizards/bed_leveling/bed_leveling02.jpg'
  private description: string = 'Wait until bed and printhead stop and adjust first thumb wheel on the far side of the bed'

  private async next (step: number) {
    await this.customCommand({ id: this.$route.params.id, command: 'G0 Z10 F600' })
    this.$emit('change', step)
    this.curStep = step
  }

  @printers.Action customCommand: any
}
</script>

<style>
</style>
