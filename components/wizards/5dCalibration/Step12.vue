<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-row>
      <v-col cols="12">
        <v-btn x-large block depressed color="accent" @click="finish">
          {{ $t("Finish") }}
          <v-icon right dark>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </WizardStep>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
import WizardStep from '~/components/wizards/WizardStep.vue'
import { Action, Getter, State, namespace } from 'vuex-class'
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

    if (this.curStep === this.step) {
      this.performStep()
    }
  }
  async performStep () {
    //await this.customCommand({ id: this.settings.systemId, command: 'M1005 S10' })
    await this.customCommand({ id: this.settings.systemId, command: 'M500' })
    //await this.customCommand({ id: this.settings.systemId, command: 'G0 Z0 F600' })
  }
  private step?: number = 11
  private curStep?: number = this.currentStep

  private image: string = '/wizards/5d_calibration/5d_calibration.jpg'
  private description: string = ''

  @printers.Action homeCommand: any
  private finish () {
    this.customCommand({ id: this.settings.systemId, command: 'G28 X0 Y0 Z0' })
    //this.homeCommand({ id: this.settings.systemId, head: true, bed: true, rotary: true })
    this.$router.push(`/printers/${this.settings.systemId}`)

  }
  private async next (step: number) {
    //await this.customCommand({ id: this.settings.systemId, command: 'G0 Z10 F600' })
    this.$emit('change', step)
    this.curStep = step
  }

  mounted () {
    this.description = this.$i18n.tc("Calibration complete! Please remove calibration tool")
  }

  updated () {
    this.description = this.$i18n.tc("Calibration complete! Please remove calibration tool")
  }

  @printers.Action customCommand: any
}
</script>