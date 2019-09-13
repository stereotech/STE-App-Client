<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-btn block depressed color="accent" @click="next(7)">
      Next
      <v-icon right dark>mdi-chevron-right</v-icon>
    </v-btn>
  </WizardStep>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
import WizardStep from '~/components/wizards/WizardStep.vue'
import { Action, Getter, State, namespace } from 'vuex-class'

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
    await this.customCommand({ id: this.$route.params.id, command: 'G0 X190 Y10 F3600' })
    await this.customCommand({ id: this.$route.params.id, command: 'G0 Z0 F600' })
  }

  private step?: number = 6
  private curStep?: number = this.currentStep

  private image: string = '/wizards/bed_leveling/bed_leveling04.png'
  private description: string = 'Wait until bed and printhead stop and adjust third thumb wheel on the right side of the bed'


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
