<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-container>
      <v-row dense align="center" justify="space-around">
        <v-col cols="12">
          <v-radio-group v-model="additionalData.target" mandatory>
            <v-radio
              :label="$tc('180 - 220 C')"
              :value="200"
              color="secondary"
            ></v-radio>
            <v-radio
              :label="$tc('220 - 260 C')"
              :value="240"
              color="secondary"
            ></v-radio>
            <v-radio
              :label="$tc('260 - 300 C')"
              :value="280"
              color="secondary"
            ></v-radio>
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
import { CurrentState } from 'types/printer'
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
  private step?: number = 2
  private curStep?: number = this.currentStep

  private image: string = 'wizards/change_material/change_material02.jpg'
  private description: string = ''

  @printers.Action customCommand: any
  @printers.Action toolTempCommand: any

  private async nextStep () {
    if (this.additionalData.tool === 0) {
      await this.toolTempCommand({ id: this.settings.systemId, tool0Temp: this.additionalData.target, tool1Temp: 0 })
    } else {
      await this.toolTempCommand({ id: this.settings.systemId, tool0Temp: 0, tool1Temp: this.additionalData.target })
    }

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
  mounted () {
    this.description = this.$tc("Select the needed temperature of the material, which could be found on the filament package or on the manufacturer's website")
  }

  updated () {
    this.description = this.$tc("Select the needed temperature of the material, which could be found on the filament package or on the manufacturer's website")
  }
}
</script>

<style>
</style>
