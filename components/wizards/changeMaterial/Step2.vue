<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-container>
      <v-row dense align="center" justify="space-around">
        <v-col cols="12">
          <v-radio-group v-model="additionalData.action" mandatory>
            <v-radio
              :label="$tc('Unload material')"
              :value="0"
              color="secondary"
            ></v-radio>
            <v-radio
              :label="$tc('Change material')"
              :value="1"
              color="secondary"
            ></v-radio>
            <v-radio
              :label="$tc('Load material')"
              :value="2"
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
  private step?: number = 1
  private curStep?: number = this.currentStep

  private image: string = 'wizards/change_material/change_material02.jpg'
  private description: string = ''

  @printers.Action customCommand: any

  private async nextStep () {
    await this.customCommand({ id: this.settings.systemId, command: 'G28' })
    await this.customCommand({ id: this.settings.systemId, command: 'G54\nG0 X100 Y100 F6000' })

    this.next(2)

  }

  private next (step: number) {
    this.$emit('change', step)
    this.curStep = step
  }
  mounted () {
    this.description = this.$tc('Select the needed action')
  }

  updated () {
    this.description = this.$tc('Select the needed action')
  }
}
</script>

<style>
</style>
