<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-btn x-large block depressed color="accent" @click="next(6)">
      {{ $t("Next") }}
      <v-icon right dark>mdi-chevron-right</v-icon>
    </v-btn>
  </WizardStep>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
import { Action, Getter, State, namespace } from 'vuex-class'
import WizardStep from '~/components/wizards/WizardStep.vue'
import { PrinterSize } from '~/types/printer'
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
  @Model('change', { type: Number, default: 1, required: true }) currentStep!: number
  @Watch('currentStep') onCurrentStepChanged (val: number) {
    this.curStep = val

    if (this.curStep === this.step) {
      this.performStep()
    }
  }

  @Prop({ type: Object, default: {} }) additionalData!: any
  @Watch('additionalData') onAdditionalDataChanged () {
    this.$emit('dataChanged', this.additionalData)
  }

  async performStep () {
    if (this.additionalData.size === PrinterSize.Large) {
      await this.customCommand({ id: this.settings.systemId, command: 'G0 X280 Y290 F3600' })
      await this.customCommand({ id: this.settings.systemId, command: 'G0 Z0 F600' })
    }
    else {
      this.next(6)
    }

  }

  private step?: number = 5
  private curStep?: number = this.currentStep

  private image: string = 'wizards/bed_leveling/bed_leveling04.jpg'
  private description: string = ''


  private async next (step: number) {
    await this.customCommand({ id: this.settings.systemId, command: 'G0 Z10 F600' })
    this.$emit('change', step)
    this.curStep = step
  }

  mounted () {
    this.description = this.$tc('Wait until bed and printhead stop and adjust third thumb wheel on the right side of the bed')
  }

  updated () {
    this.description = this.$tc('Wait until bed and printhead stop and adjust third thumb wheel on the right side of the bed')
  }

  @printers.Action customCommand: any
}
</script>

<style>
</style>
