<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-btn block large text @click="next(1)">
      Start
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
  }
  private step?: number = 1
  private curStep?: number = this.currentStep

  private image: string = '/wizards/bed_leveling/bed_leveling.png'
  private description: string = 'Perform bed leveling if there is too much distance between the nozzles and the build plate'

  @printers.Action homeCommand: any

  private next (step: number) {
    this.homeCommand({ id: this.$route.params.id, head: true, bed: true, rotary: false })

    this.$emit('change', step)
    this.curStep = step
  }
}
</script>


<style>
</style>
