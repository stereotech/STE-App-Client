<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-col cols="12">
      <v-btn block x-large depressed color="accent" @click="next(1)">
        {{ $t("Start") }}
        <v-icon right dark>mdi-chevron-right</v-icon>
      </v-btn>
    </v-col>
  </WizardStep>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
import WizardStep from '~/components/wizards/WizardStep.vue'
import { Action, Getter, State, namespace } from 'vuex-class'

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

  private step?: number = 0
  private curStep?: number = this.currentStep

  private image: string = 'wizards/5d_calibration/5d_calibration.jpg'
  private description: string = ''

  @printers.Action homeCommand: any

  private next (step: number) {
    // this.homeCommand({ id: this.settings.systemId, head: true, bed: true, rotary: false })

    this.$emit('change', step)
    this.curStep = step
  }

  mounted () {
    this.description = this.$i18n.tc("This wizard will help you calibrate five axis module")
  }

  updated () {
    this.description = this.$i18n.tc("This wizard will help you calibrate five axis module")
  }
}
</script>