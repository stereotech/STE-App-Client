<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-container>
      <v-row dense align="center" justify="space-around">
        <v-col cols="12">
          <JogCard dense :id="settings.systemId" />
        </v-col>
        <v-col cols="12">
          <v-btn block x-large depressed color="accent" @click="nextStep">{{
            $t("Next")
          }}</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </WizardStep>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
import WizardStep from '~/components/wizards/WizardStep.vue'
import JogCard from '~/components/printers/expert/JogCard.vue'
import { Action, Getter, State, namespace } from 'vuex-class'
import { PrintingMode } from '~/types/printingMode'

const printers = namespace('printersState')
import { Settings } from '~/types/settings'
import { PrinterSize } from '~/types/printer'

const settings = namespace('settingsState')

@Component({
  components: {
    WizardStep,
    JogCard
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
    if (this.additionalData.printingMode == PrintingMode.Spiral5D) {
      await this.customCommand({ id: this.settings.systemId, command: 'G56 G0 X0 Y0\nM375\nG91\nG0 Z-0.1\nG90' })
    } else {
      await this.customCommand({ id: this.settings.systemId, command: 'G0 A0' })
      await this.customCommand({ id: this.settings.systemId, command: 'G55 G0 X0 Y0\nM375\nG91\nG0 Z-0.1\nG90' })
    }
  }

  @printers.Action customCommand: any

  private step?: number = 2
  private curStep?: number = this.currentStep

  private get image (): string {
    return this.additionalData.printingMode == PrintingMode.Spiral5D ? 'wizards/zero_point_setup/zero_point_setup02.jpg' : 'wizards/zero_point_setup/zero_point_setup01.jpg'
  }
  private description: string = ''

  private nextStep () {
    if (this.additionalData.printingMode == PrintingMode.Spiral5D) {
      this.next(3)
    }
    else {
      this.next(4)
    }
  }

  private next (step: number) {
    this.$emit('change', step)
    this.curStep = step
  }
  mounted () {
    this.description = this.$tc('Move nozzle to the center of the base and press Next')
  }

  updated () {
    this.description = this.$tc('Move nozzle to the center of the base and press Next')
  }
}
</script>

<style>
</style>
