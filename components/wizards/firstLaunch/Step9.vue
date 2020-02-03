<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-btn x-large block depressed color="accent" @click="finish">
      {{$t("Finish")}}
      <v-icon right dark>mdi-chevron-right</v-icon>
    </v-btn>
  </WizardStep>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
import { Action, Getter, State, namespace } from 'vuex-class'
import WizardStep from '~/components/wizards/WizardStep.vue'
import { Settings } from '~/types/settings'

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
  private step?: number = 8
  private curStep?: number = this.currentStep

  private image: string = 'wizards/bed_leveling/bed_leveling.jpg'
  private description: string = ''

  @printers.Action homeCommand: any
  @printers.Action customCommand: any
  @settings.Getter settings!: Settings

  private async finish () {
    await this.customCommand({ id: this.settings.systemId, command: 'M500' })
    this.homeCommand({ id: this.settings.systemId, head: true, bed: true, rotary: false })
    this.next(9)
  }

  private next (step: number) {
    this.$emit('change', step)
    this.curStep = step
  }

  mounted () {
    this.description = this.$tc('Calibration complete!')
  }

  updated () {
    this.description = this.$tc('Calibration complete!')
  }
}
</script>

<style>
</style>
