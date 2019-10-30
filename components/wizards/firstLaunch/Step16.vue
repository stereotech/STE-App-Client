<template>
  <WizardStep :step="step">
    <v-container>
      <v-row dense class="fill-height" align="center" justify="space-around" column>
        <v-col cols="12">
          <h1 class="display-4">
            Done!
          </h1>
        </v-col>
        <v-col cols="12">
          <v-btn block x-large depressed color="accent" @click="finishSetup">
            Finish
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </WizardStep>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
import { Action, Getter, State, namespace } from 'vuex-class'
import WizardStep from '~/components/wizards/WizardStep.vue'

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

  private step?: number = 15
  private curStep?: number = this.currentStep

  private next (step: number) {
    this.$emit('change', step)
    this.curStep = step
  }

  private async finishSetup () {
    await this.sendFinishSetup()
    this.$router.push('/')
  }
}
</script>

<style>
</style>
