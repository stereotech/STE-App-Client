<template>
  <WizardStep :step="step" v-if="heating">
    <v-container grid-list-xl>
      <v-layout align-center justify-space-around column fill-height>
        <v-flex xs12>
          <v-progress-circular :size="70" :width="7" color="secondary" indeterminate></v-progress-circular>
        </v-flex>
        <v-flex xs12>
          <p>{{$t('wizards.heating')}}</p>
        </v-flex>
      </v-layout>
    </v-container>
  </WizardStep>
  <WizardStep v-else :step="step" :image="image" :description="description">
    <v-container grid-list-xl>
      <v-layout align-center justify-space-around column fill-height>
        <v-flex xs12>
          <v-btn block large flat @click="repeat">{{$t('wizards.unload')}}</v-btn>
        </v-flex>
        <v-flex xs12 v-if="additionalData.action === 0">
          <v-btn block large flat nuxt :to="'/printers/' + $route.params.id">{{$t('dashboard.doneJobs.title')}}</v-btn>
        </v-flex>
        <v-flex xs12 v-else>
          <v-btn block large flat @click="next(4)">{{$t('frequentlyUsed.next')}}</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </WizardStep>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
import WizardStep from '~/components/wizards/WizardStep.vue'
import { Action, Getter, State, namespace } from 'vuex-class'
import { PrinterStatus } from 'types/printer'

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

  private image: string = '/wizards/bed_leveling.png'
  private description: string = 'Click Unload button and wait for material unloading and remove the spool. If it is needed, you could press Unload button to repeat unloading'

  @printers.Action retractCommand: any
  @printers.Action extrudeCommand: any
  @printers.Getter status!: (id: string) => PrinterStatus | undefined

  get computedStatus () {
    return this.status(this.$route.params.id)
  }

  get heating () {
    if (this.computedStatus !== undefined) {
      if (this.computedStatus.tool0 !== undefined && this.computedStatus.tool1 !== undefined) {
        let deviation = 0
        if (this.additionalData.tool === 0) {
          deviation = Math.abs(this.computedStatus.tool0.target - this.computedStatus.tool0.actual)
        } else {
          deviation = Math.abs(this.computedStatus.tool1.target - this.computedStatus.tool1.actual)
        }
        return deviation > 10
      }
    }
    return true
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