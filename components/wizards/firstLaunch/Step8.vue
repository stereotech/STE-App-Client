<template>
  <WizardStep :step="step">
    <v-container grid-list-xl>
      <v-layout align-center justify-space-around column fill-height>
        <v-flex xs12>
          <h1 class="display-4">Done!</h1>
        </v-flex>
        <v-flex xs12>
          <v-btn block large flat @click="finishSetup">Finish</v-btn>
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

  @settings.Action sendFinishSetup: any

  private step?: number = 8
  private curStep?: number = this.currentStep

  private next (step: number) {
    this.$emit('change', step)
    this.curStep = step
  }

  private finishSetup () {
    this.sendFinishSetup()
    this.$router.push('/')
  }
}
</script>


<style>
</style>