<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-container>
      <v-row dense align="center" justify="space-around">
        <v-col cols="12">
          <v-btn block x-large depressed color="accent" @click="finish">{{
            $t("Finish")
          }}</v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn
            class="accent--text"
            block
            x-large
            depressed
            color="secondary"
            @click="restart"
            >{{ $t("Revert") }}</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </WizardStep>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
import { PrintingMode } from '~/types/printingMode'
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

  private async finish () {
    this.$router.push('/printers')
  }

  async restart () {
    await this.customCommand({ id: this.settings.systemId, command: 'G28 X0 Y0 Z0' })
    this.next(0)
  }

  async performStep () {
    await this.customCommand({ id: this.settings.systemId, command: `G10 L20 P3 X0 Y0 Z${this.additionalData.offsetZ}` })
    await this.customCommand({ id: this.settings.systemId, command: 'G54 G0 Z150\nG28' })
    await this.customCommand({ id: this.settings.systemId, command: 'M500\nM370\nG91\nG0 Z-0.1\nG90' })
  }

  private step?: number = 5
  private curStep?: number = this.currentStep

  private image: string = 'wizards/zero_point_setup/zero_point_setup.jpg'
  private description: string = ''



  private next (step: number) {
    this.$emit('change', step)
    this.curStep = step
  }

  @printers.Action customCommand: any

  mounted () {
    this.description = this.$tc('Setup Complete!')
  }

  updated () {
    this.description = this.$tc('Setup Complete!')
  }
}
</script>

<style>
</style>
