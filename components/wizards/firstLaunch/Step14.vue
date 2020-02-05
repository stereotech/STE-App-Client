<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-container>
      <v-row dense align="center" justify="space-around">
        <v-col cols="12">
          <v-btn block x-large depressed color="accent" @click="repeat">{{$t("Unload")}}</v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn block x-large depressed color="accent" @click="load">{{$t("Load")}}</v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn block x-large depressed color="accent" @click="finish">{{$t("Finish")}}</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </WizardStep>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
import { Action, Getter, State, namespace } from 'vuex-class'
import { CurrentState } from 'types/printer'
import WizardStep from '~/components/wizards/WizardStep.vue'
import { Settings } from '~/types/settings'

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
  @Prop({ type: Object, default: null }) additionalData!: any
  @Watch('additionalData') onAdditionalDataChanged () {
    this.$emit('dataChanged', this.additionalData)
  }
  private step?: number = 7//13
  private curStep?: number = this.currentStep

  private image: string = 'wizards/change_material/change_material04.jpg'
  private description: string = ''

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
            const target = this.computedStatus.temps[this.computedStatus.temps.length - 1].tool0.target
            const actual = this.computedStatus.temps[this.computedStatus.temps.length - 1].tool0.actual
            deviation = Math.abs(target - actual)
          }
        } else if (this.computedStatus.temps[this.computedStatus.temps.length - 1].tool1) {
          const target = this.computedStatus.temps[this.computedStatus.temps.length - 1].tool1.target
          const actual = this.computedStatus.temps[this.computedStatus.temps.length - 1].tool1.actual
          deviation = Math.abs(target - actual)
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

  private finish () {
    this.toolTempCommand({ id: this.settings.systemId, tool0Temp: 0, tool1Temp: 0 })
    this.next(8)//14)
  }

  private next (step: number) {
    this.$emit('change', step)
    this.curStep = step
  }

  mounted () {
    this.description = this.$tc('Use Load and Unload buttons to load material untill it comes from nozzle')
  }

  updated () {
    this.description = this.$tc('Use Load and Unload buttons to load material untill it comes from nozzle')
  }
}
</script>

<style>
</style>
