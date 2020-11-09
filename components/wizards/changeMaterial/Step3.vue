<template>
  <WizardStep v-if="heating" :step="step">
    <v-container>
      <v-row dense align="center" justify="space-around">
        <v-col cols="4">
          <v-progress-circular
            :size="70"
            :width="7"
            color="secondary"
            :value="heatingValue / 2.4"
          />
        </v-col>
        <v-col cols="4">
          <p>{{ $t("Heating...") }}</p>
        </v-col>
      </v-row>
    </v-container>
  </WizardStep>
  <WizardStep v-else :step="step" :image="image" :description="description">
    <v-container>
      <v-row dense align="center" justify="space-around">
        <v-col cols="12">
          <v-btn block x-large depressed color="accent" @click="loadMaterial">{{
            $t("Load")
          }}</v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn block x-large depressed color="accent" @click="repeat">{{
            $t("Unload")
          }}</v-btn>
        </v-col>
        <v-col v-if="additionalData.action === 0" cols="12">
          <v-btn
            block
            x-large
            depressed
            color="accent"
            nuxt
            :to="'/printers/' + settings.systemId"
            >{{ $t("Finish") }}</v-btn
          >
        </v-col>
        <v-col v-else cols="12">
          <v-btn block x-large depressed color="accent" @click="next(3)">{{
            $t("Next")
          }}</v-btn>
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

const settings = namespace('settingsState')

const printers = namespace('printersState')

@Component({
  components: {
    WizardStep
  }
})
export default class extends Vue {
  @settings.Getter settings!: Settings
  @Model('change', { type: Number, default: 1, required: true }) currentStep?: number
  @Watch('currentStep') onCurrentStepChanged (val: number) {
    this.curStep = val
  }
  @Prop({ type: Object, default: {} }) additionalData!: any
  @Watch('additionalData') onAdditionalDataChanged () {
    this.$emit('dataChanged', this.additionalData)
  }
  private step?: number = 2
  private curStep?: number = this.currentStep

  private image: string = 'wizards/change_material/change_material03.jpg'
  private description: string = ''

  @printers.Action retractCommand: any
  @printers.Action extrudeCommand: any
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

  get heatingValue (): number {
    if (this.computedStatus) {
      if (this.computedStatus.temps[this.computedStatus.temps.length - 1]) {
        let actual = 0
        if (this.additionalData.tool === 0) {
          if (this.computedStatus.temps[this.computedStatus.temps.length - 1].tool0) {
            actual = this.computedStatus.temps[this.computedStatus.temps.length - 1].tool0.actual
          }
        } else if (this.computedStatus.temps[this.computedStatus.temps.length - 1].tool1) {
          actual = this.computedStatus.temps[this.computedStatus.temps.length - 1].tool1.actual
        }
        return actual
      }
    }
    return 0
  }

  private async repeat () {
    await this.retractCommand({ id: this.settings.systemId, toolId: this.additionalData.tool, amount: 120 })
  }

  private async loadMaterial () {
    await this.extrudeCommand({ id: this.settings.systemId, toolId: this.additionalData.tool, amount: 20 })
  }

  private next (step: number) {
    this.$emit('change', step)
    this.curStep = step
  }
  mounted () {
    this.description = this.$tc('Click Unload button and wait for material unloading and remove the spool. If it is needed, you could press Unload button to repeat unloading')
  }

  updated () {
    this.description = this.$tc('Click Unload button and wait for material unloading and remove the spool. If it is needed, you could press Unload button to repeat unloading')
  }
}
</script>

<style>
</style>
