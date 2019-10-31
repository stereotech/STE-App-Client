<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-flex xs12>
      <v-btn block x-large depressed color="accent" @click="next(4)">
        {{$t("frequentlyUsed.start")}}
        <v-icon right dark>mdi-chevron-right</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs12>
      <v-btn block x-large depressed color="accent" @click="next(9)">
        {{$t("frequentlyUsed.skip")}}
        <v-icon right dark>mdi-chevron-right</v-icon>
      </v-btn>
    </v-flex>
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

  private step?: number = 3
  private curStep?: number = this.currentStep

  private image: string = 'wizards/bed_leveling/bed_leveling.jpg'
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
