<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-container grid-list-xl>
      <v-layout align-center justify-space-around column fill-height>
        <v-flex xs12>
          <v-btn block large flat @click="repeat">Unload</v-btn>
        </v-flex>
        <v-flex xs12>
          <v-btn block large flat @click="load">Load</v-btn>
        </v-flex>
        <v-flex xs12>
          <v-btn block large flat @click="nextStep">Next</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </WizardStep>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
import WizardStep from '~/components/wizards/WizardStep.vue'
import { Action, Getter, State, namespace } from 'vuex-class'
import { CurrentState } from 'types/printer'
import { Settings } from '../../../types/settings'

const printers = namespace('printersState')
const settings = namespace('settingsState')

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
  private step?: number = 6
  private curStep?: number = this.currentStep

  private image: string = '/wizards/bed_leveling.png'
  private description: string = 'Use Load and Unload buttons to load material untill it comes from nozzle'

  @printers.Action retractCommand: any
  @printers.Action extrudeCommand: any
  @printers.Action toolTempCommand: any
  @printers.Getter status!: (id: string) => CurrentState | undefined

  @settings.Getter settings!: Settings

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

  private repeat () {
    this.retractCommand({ id: this.settings.systemId, toolId: this.additionalData.tool, amount: 10 })
  }

  private load () {
    this.extrudeCommand({ id: this.settings.systemId, toolId: this.additionalData.tool, amount: 120 })
  }

  private nextStep () {
    this.toolTempCommand({ id: this.settings.systemId, tool0Temp: 0, tool1Temp: 0 })
    this.next(7)
  }

  private next (step: number) {
    this.toolTempCommand({
      id: this.settings.systemId,
      tool0Temp: 0,
      tool1Temp: 0
    })
    this.$emit('change', step)
    this.curStep = step
  }
}
</script>


<style>
</style>