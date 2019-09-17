<template>
  <WizardStep :step="step" v-if="heating">
    <v-container grid-list-xl>
      <v-layout align-center justify-space-around column fill-height>
        <v-flex xs12>
          <v-progress-circular
            :size="70"
            :width="7"
            color="secondary"
            :max="240"
            :value="heatingValue"
          ></v-progress-circular>
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
          <v-btn block x-large depressed color="accent" @click="repeat">Unload</v-btn>
        </v-flex>
        <v-flex xs12 v-if="additionalData.action === 0">
          <v-btn
            block
            x-large
            depressed
            color="accent"
            nuxt
            :to="'/printers/' + $route.params.id"
          >Finish</v-btn>
        </v-flex>
        <v-flex xs12 v-else>
          <v-btn block x-large depressed color="accent" @click="next(12)">Next</v-btn>
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
  @Prop({ type: Object, default: null }) additionalData!: any
  @Watch('additionalData') onAdditionalDataChanged () {
    this.$emit('dataChanged', this.additionalData)
  }
  private step?: number = 11
  private curStep?: number = this.currentStep

  private image: string = '/wizards/change_material/change_material03.png'
  private description: string = 'Click Unload button and wait for material unloading and remove the spool. If it is needed, you could press Unload button to repeat unloading'

  @printers.Action retractCommand: any
  @printers.Action extrudeCommand: any
  @printers.Getter status!: (id: string) => CurrentState | undefined

  get computedStatus () {
    return this.status(this.$route.params.id)
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

  get heatingValue (): number {
    if (this.computedStatus) {
      if (this.computedStatus.temps[this.computedStatus.temps.length - 1]) {
        let actual = 0
        if (this.additionalData.tool === 0) {
          if (this.computedStatus.temps[this.computedStatus.temps.length - 1].tool0) {
            actual = this.computedStatus.temps[this.computedStatus.temps.length - 1].tool0.actual
          }

        } else {
          if (this.computedStatus.temps[this.computedStatus.temps.length - 1].tool1) {
            actual = this.computedStatus.temps[this.computedStatus.temps.length - 1].tool1.actual
          }
        }
        return actual
      }
    }
    return 0
  }

  private repeat () {
    this.extrudeCommand({ id: this.$route.params.id, toolId: this.additionalData.tool, amount: 10 })
    this.retractCommand({ id: this.$route.params.id, toolId: this.additionalData.tool, amount: 120 })
  }

  private next (step: number) {
    this.$emit('change', step)
    this.curStep = step
  }
}
</script>


<style>
</style>