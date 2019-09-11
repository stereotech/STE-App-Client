<template>
  <WizardStep :step="step" v-if="heating">
    <v-container grid-list-xl>
      <v-layout align-center justify-space-around column fill-height>
        <v-flex xs12>
          <v-progress-circular :size="70" :width="7" color="secondary" indeterminate></v-progress-circular>
        </v-flex>
        <v-flex xs12>
          <p>Heating...</p>
        </v-flex>
      </v-layout>
    </v-container>
  </WizardStep>
  <WizardStep v-else :step="step" :image="image" :description="description">
    <v-container grid-list-xl>
      <v-layout align-center justify-space-around column fill-height>
        <v-flex xs12>
          <v-btn block large text @click="next(5)">Next</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </WizardStep>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
import WizardStep from '~/components/wizards/WizardStep.vue'
import { Action, Getter, State, namespace } from 'vuex-class'
import { PrinterInfo, CurrentState } from 'types/printer'
import { Settings } from 'types/settings'

const printers = namespace('printersState')
const settings = namespace('settingsState')

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
  @Prop({ type: Object, default: {} }) additionalData!: any
  @Watch('additionalData') onAdditionalDataChanged () {
    this.$emit('dataChanged', this.additionalData)
  }
  private step?: number = 4
  private curStep?: number = this.currentStep

  @settings.Getter settings!: Settings
  @printers.Getter status!: (id: string) => CurrentState | undefined

  get computedStatus () {
    return this.status(this.settings.systemId)
  }

  get heating () {
    if (this.computedStatus) {
      if (this.computedStatus.temps[this.computedStatus.temps.length - 1]) {
        let deviation = 0
        if (this.additionalData.tool === 0) {
          if (this.computedStatus.temps[this.computedStatus.temps.length - 1].tool0) {
            let target = this.computedStatus.temps[this.computedStatus.temps.length - 1].tool0.target
            let actual = this.computedStatus.temps[this.computedStatus.temps.length - 1].tool0.actual
            deviation = Math.abs(target - actual)
          }

        } else {
          if (this.computedStatus.temps[this.computedStatus.temps.length - 1].tool1) {
            let target = this.computedStatus.temps[this.computedStatus.temps.length - 1].tool1.target
            let actual = this.computedStatus.temps[this.computedStatus.temps.length - 1].tool1.actual
            deviation = Math.abs(target - actual)
          }
        }
        return deviation > 10
      }
    }
    return true
  }

  private image: string = '/wizards/bed_leveling.png'
  private description: string =
    'Load new spool, insert material into bowden tube and press Next button'

  private next (step: number) {
    this.$emit('change', step)
    this.curStep = step
  }
}
</script>


<style>
</style>