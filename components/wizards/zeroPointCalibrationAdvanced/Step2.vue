<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-col cols="12">
      <v-btn block x-large depressed color="accent" @click="next(2)">
        {{ $t("Next") }}
        <v-icon right dark>mdi-chevron-right</v-icon>
      </v-btn>
    </v-col>
  </WizardStep>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
import WizardStep from '~/components/wizards/WizardStep.vue'
import { Action, Getter, State, namespace } from 'vuex-class'
import { Settings } from '~/types/settings'
import { PrinterSize } from '~/types/printer'

const settings = namespace('settingsState')

const printers = namespace('printersState')

@Component({
  components: {
    WizardStep
  }
})
export default class extends Vue {
  @settings.Getter settings!: Settings
  @Model('change', { type: Number, default: 1, required: true }) currentStep!: number
  @Prop({ type: Object, default: {} }) additionalData!: any
  @Watch('additionalData') onAdditionalDataChanged () {
    this.$emit('dataChanged', this.additionalData)
  }
  @Watch('currentStep') onCurrentStepChanged (val: number) {
    this.curStep = val

    if (this.curStep === this.step) {
      this.performStep()
    }
  }
  async performStep () {
    await this.customCommand({ id: this.settings.systemId, command: 'G28' })
    await this.customCommand({ id: this.settings.systemId, command: 'G54 G0 Z150' })
  }
  private step?: number = 1
  private curStep?: number = this.currentStep

  private image: string = 'wizards/5d_calibration/5d_calibration1.jpg'
  private description: string = ''


  private async next (step: number) {

    this.$emit('change', step)
    this.curStep = step
  }

  private async back (step: number) {

  }
  @printers.Action customCommand: any

  mounted () {
    this.description = this.$i18n.tc("Place the calibration tool into the five axis module and press Next")
  }

  updated () {
    this.description = this.$i18n.tc("Place the calibration tool into the five axis module and press Next")
  }

}
</script>