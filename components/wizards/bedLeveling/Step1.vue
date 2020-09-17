<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-col cols="12">
      <v-btn block x-large depressed color="accent" @click="next(1)">
        {{$t("Start")}}
        <v-icon right dark>mdi-chevron-right</v-icon>
      </v-btn>
    </v-col>
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
  }

  private step?: number = 0
  private curStep?: number = this.currentStep

  private image: string = 'wizards/bed_leveling/bed_leveling.jpg'
  private description: string = ''

  @printers.Action homeCommand: any
  @printers.Action customCommand: any

  private async next (step: number) {
    await this.customCommand({ id: this.$route.params.id, command: 'G28' })

    this.$emit('change', step)
    this.curStep = step
  }

  mounted () {
    this.description = this.$tc('Perform bed leveling if there is too much distance between the nozzles and the build plate')
  }

  updated () {
    this.description = this.$tc('Perform bed leveling if there is too much distance between the nozzles and the build plate')
  }
}
</script>

<style>
</style>
