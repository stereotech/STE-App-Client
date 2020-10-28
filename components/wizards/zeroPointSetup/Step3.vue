<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-container>
      <v-row dense align="center" justify="space-around">
        <v-col cols="12">
          <JogCard dense isFiveAxis :id="settings.systemId" />
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

const settings = namespace('settingsState')

@Component({
  components: {
    WizardStep,
    JogCard
  }
})
export default class extends Vue {
  @settings.Getter settings!: Settings
  @Model('change', { type: Number, default: 1, required: true }) currentStep?: number
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
    await this.customCommand({ id: this.settings.systemId, command: 'G0 X100 Y100 F3000' })
  }

  @printers.Action customCommand: any

  private step?: number = 2
  private curStep?: number = this.currentStep

  private image: string = 'wizards/zero_point_setup/zero_point_setup.jpg'
  private description: string = ''

  private nextStep () {
    if (this.additionalData.printingMode == PrintingMode.Classic) {
      this.next(4)
    } else if (this.additionalData.printingMode == PrintingMode.Coil5D) {
      this.next(3)
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
