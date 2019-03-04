<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-container grid-list-xl>
      <v-layout align-center justify-space-around column fill-height>
        <v-flex xs12>
          <v-radio-group v-model="additionalData.tool" mandatory>
            <v-radio label="Extruder 1" :value="0" color="secondary"></v-radio>
            <v-radio label="Extruder 2" :value="1" color="secondary"></v-radio>
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
    private step?: number = 4
    private curStep?: number = this.currentStep

    private image: string = '/wizards/bed_leveling.png'
    private description: string = 'Select the extruder, where you want insert the material'

    @printers.Action toolTempCommand: any

    private nextStep () {
      if (this.additionalData.tool === 0) {
        this.toolTempCommand({ id: this.$route.params.id, tool0Temp: 240, tool1Temp: 0 })
      } else {
        this.toolTempCommand({ id: this.$route.params.id, tool0Temp: 0, tool1Temp: 240 })
      }
      this.next(5)
    }

    private next (step: number) {
      this.$emit('change', step)
      this.curStep = step
    }
  }
</script>


<style>
</style>