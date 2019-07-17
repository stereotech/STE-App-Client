<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-container grid-list-xl>
      <v-layout align-center justify-space-around column fill-height>
        <v-flex xs12>
          <v-radio-group v-model="additionalData.action" mandatory>
            <v-radio label="Unload material" :value="0" color="secondary"></v-radio>
            <v-radio label="Change material" :value="1" color="secondary"></v-radio>
            <v-radio label="Load material" :value="2" color="secondary"></v-radio>
          </v-radio-group>
        </v-flex>
        <v-flex xs12>
          <v-btn block large flat @click="nextStep">Next</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </WizardStep>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
import WizardStep from '~/components/wizards/WizardStep.vue'
import { Action, Getter, State, namespace } from 'vuex-class'
import { PrinterStatus } from 'types/printer'

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
  }
  private step?: number = 2
  private curStep?: number = this.currentStep

  private image: string = '/wizards/bed_leveling.png'
  private description: string = 'Select the needed action'

  @printers.Action customCommand: any
  @printers.Getter status!: (id: string) => PrinterStatus | undefined

  get computedStatus () {
    return this.status(this.$route.params.id)
  }

  private nextStep () {
    this.customCommand({ id: this.$route.params.id, command: 'G28\nG0 Z200 F900\nG0 X100 Y100 F6000' })

    if (this.additionalData.action > 1) {
      this.next(4)
    } else {
      this.next(3)
    }
  }

  private next (step: number) {
    this.$emit('change', step)
    this.curStep = step
  }
}
</script>


<style>
</style>