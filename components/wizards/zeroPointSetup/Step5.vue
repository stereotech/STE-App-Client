<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-container>
      <v-row dense align="center" justify="space-around">
        <v-col cols="12">
          <v-btn block x-large depressed color="accent" @click="finish">{{$t("Finish")}}</v-btn>
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

  private async finish () {
    await this.customCommand({ id: this.$route.params.id, command: 'G0 Z100' })
    await this.customCommand({ id: this.$route.params.id, command: 'G28 X0 Y0' })
    this.$router.push('/printers/' + this.$route.params.id)
  }

  async performStep () {
    if (this.additionalData.printingMode == PrintingMode.Classic) {
      await this.customCommand({ id: this.$route.params.id, command: 'G10 L20 P2 X0 Y0 Z0' })
    } else if (this.additionalData.printingMode == PrintingMode.Coil5D) {

      await this.customCommand({ id: this.$route.params.id, command: `G10 L20 P3 X0 Y0 Z${this.additionalData.offsetZ}` })
    }
    await this.customCommand({ id: this.$route.params.id, command: 'M500' })
  }

  private step?: number = 4
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
