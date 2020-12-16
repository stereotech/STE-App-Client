<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-container>
      <v-row dense align="center" justify="space-around">
        <v-col cols="12">
          <v-radio-group v-model="additionalData.tool" mandatory>
            <v-radio :label="$tc('Extruder 1')" :value="0" color="secondary" />
            <v-radio :label="$tc('Extruder 2')" :value="1" color="secondary" />
          </v-radio-group>
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
import { Action, Getter, State, namespace } from 'vuex-class'
import WizardStep from '~/components/wizards/WizardStep.vue'
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
  @Prop({ type: Object, default: {} }) additionalData!: any
  @Watch('additionalData') onAdditionalDataChanged () {
    this.$emit('dataChanged', this.additionalData)
  }
  @Watch('currentStep') onCurrentStepChanged (val: number) {
    this.curStep = val
  }
  private step?: number = 0
  private curStep?: number = this.currentStep

  private image: string = 'wizards/change_material/change_material.jpg'
  private description: string = ''

  @printers.Action toolTempCommand: any

  private nextStep () {
    if (this.additionalData.tool === 0) {
      this.toolTempCommand({ id: this.settings.systemId, tool0Temp: 240, tool1Temp: 0 })
    } else {
      this.toolTempCommand({ id: this.settings.systemId, tool0Temp: 0, tool1Temp: 240 })
    }
    this.next(1)
  }

  private next (step: number) {
    this.$emit('change', step)
    this.curStep = step
  }
  mounted () {
    this.description = this.$tc('Select the extruder, where you want change the material')
  }

  updated () {
    this.description = this.$tc('Select the extruder, where you want change the material')
  }
}
</script>

<style>
</style>
