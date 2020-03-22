<template>
  <WizardStep v-if="heating" :step="step">
    <v-container>
      <v-row dense align="center" justify="space-around">
        <v-col cols="4">
          <v-progress-circular :size="70" :width="7" color="secondary" :value="heatingValue /2.4" />
        </v-col>
        <v-col cols="4">
          <p>{{$t("Heating..")}}</p>
        </v-col>
      </v-row>
    </v-container>
  </WizardStep>
  <WizardStep v-else :step="step" :image="image" :description="description">
    <v-container>
      <v-row dense align="center" justify="space-around">
        <v-col cols="12">
          <v-btn block x-large depressed color="accent" @click="next(4)">{{$t("Next")}}</v-btn>
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
  @Prop({ type: Object, default: {} }) additionalData!: any
  @Watch('additionalData') onAdditionalDataChanged () {
    this.$emit('dataChanged', this.additionalData)
  }
  private step?: number = 3
  private curStep?: number = this.currentStep

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

  private image: string = 'wizards/change_material/change_material.jpg'
  private description: string = ''

  private next (step: number) {
    this.$emit('change', step)
    this.curStep = step
  }

  mounted () {
    this.description = this.$tc('Load new spool, insert material into bowden tube and press Next button')
  }

  updated () {
    this.description = this.$tc('Load new spool, insert material into bowden tube and press Next button')
  }
}
</script>

<style>
</style>
