<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-container>
      <v-row dense align="center" justify="space-around">
        <v-col cols="12">
          <v-btn block x-large depressed color="accent" @click="nextStep">{{$t("Next")}}</v-btn>
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


const printers = namespace('printersState')

@Component({
  components: {
    WizardStep
  }
})
export default class extends Vue {
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
    await this.customCommand({ id: this.$route.params.id, command: 'G28' })
    if (this.additionalData.printingMode == PrintingMode.Classic) {
      await this.customCommand({ id: this.$route.params.id, command: 'G10 L2 P2 X0 Y0 Z0' })
      await this.customCommand({ id: this.$route.params.id, command: 'G0 X100 Y100' })
      await this.customCommand({ id: this.$route.params.id, command: 'G0 Z100 A0' })
    } else if (this.additionalData.printingMode == PrintingMode.Coil5D) {
      await this.customCommand({ id: this.$route.params.id, command: 'G10 L2 P3 X0 Y0 Z0' })
      await this.customCommand({ id: this.$route.params.id, command: 'G0 X100 Y100' })
      await this.customCommand({ id: this.$route.params.id, command: 'G0 Z100 A60' })
    }
  }

  private step?: number = 1
  private curStep?: number = this.currentStep

  private image: string = 'wizards/zero_point_setup/zero_point_setup.jpg'
  private description: string = ''

  private nextStep () {
    this.next(2)
  }

  private next (step: number) {
    this.$emit('change', step)
    this.curStep = step
  }

  @printers.Action customCommand: any

  mounted () {
    this.description = this.$tc('Please place needed base in the 5D Module and press Next')
  }

  updated () {
    this.description = this.$tc('Please place needed base in the 5D Module and press Next')
  }
}
</script>

<style>
</style>
