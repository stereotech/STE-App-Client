<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-container grid-list-xs>
      <v-row>
        <v-col cols="12">
          <JogCard dense :id="settings.systemId" />
        </v-col>
        <v-col cols="12">
          <v-btn x-large block depressed color="accent" @click="next(7)">
            {{ $t("Next") }}
            <v-icon right dark>mdi-chevron-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </WizardStep>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
import WizardStep from '~/components/wizards/WizardStep.vue'
import { Action, Getter, State, namespace } from 'vuex-class'
import JogCard from '~/components/printers/expert/JogCard.vue'
import { Settings } from '~/types/settings'

const settings = namespace('settingsState')
const printers = namespace('printersState')

@Component({
  components: {
    WizardStep,
    JogCard
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
  async performStep () {
    await this.customCommand({ id: this.settings.systemId, command: 'M1005 S5' })
    //await this.customCommand({ id: this.settings.systemId, command: 'G0 Z0 F600' })
  }
  private step?: number = 6
  private curStep?: number = this.currentStep

  private image: string = 'wizards/5d_calibration/5d_calibration5.jpg'
  private description: string = ''


  private async next (step: number) {
    //await this.customCommand({ id: this.settings.systemId, command: 'G0 Z10 F600' })
    this.$emit('change', step)
    this.curStep = step
  }

  mounted () {
    this.description = this.$i18n.tc("Move nozzle to the nearest tip of the calibration tool and press Next")
  }

  updated () {
    this.description = this.$i18n.tc("Move nozzle to the nearest tip of the calibration tool and press Next")
  }

  @printers.Action customCommand: any
}
</script>