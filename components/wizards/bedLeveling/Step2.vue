<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-container>
      <v-row dense justify="space-around" class="text-center">
        <v-col cols="6">
          <v-btn
            x-large
            outlined
            depressed
            color="secondary"
            icon
            @click="jog(-1)"
          >
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn
            x-large
            outlined
            depressed
            color="secondary"
            icon
            @click="jog(1)"
          >
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn-toggle v-model="selectedAmount" mandatory light class="my-10">
            <v-btn
              x-large
              outlined
              color="primary"
              text-color="secondary"
              @click="amount = 0.1"
              >0.1</v-btn
            >
            <v-btn
              x-large
              outlined
              color="primary"
              text-color="secondary"
              @click="amount = 1"
              >1</v-btn
            >
          </v-btn-toggle>
        </v-col>

        <v-col cols="12">
          <v-btn x-large block depressed color="accent" @click="next(3)">
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
  @Model('change', { type: Number, default: 1, required: true }) currentStep?: number
  @Watch('currentStep') onCurrentStepChanged (val: number) {
    this.curStep = val

    if (this.curStep === this.step) {
      this.performStep()
    }
  }

  private selectedAmount: number = 1
  private amount: number = 0.1

  async performStep () {
    await this.customCommand({ id: this.settings.systemId, command: 'G0 X100 Y190 F3600' })
    await this.customCommand({ id: this.settings.systemId, command: 'G0 Z5 F600' })
  }
  private step?: number = 1
  private curStep?: number = this.currentStep

  private image: string = 'wizards/bed_leveling/bed_leveling05.jpg'
  private description: string = ''


  private async next (step: number) {
    await this.customCommand({ id: this.settings.systemId, command: 'M306 Z0' })
    await this.homeCommand({ id: this.settings.systemId, head: true, bed: true, rotary: false })
    this.$emit('change', step)
    this.curStep = step
  }

  private jog (dir: number) {
    this.jogCommand({ id: this.settings.systemId, z: dir * this.amount })
  }

  mounted () {
    this.description = this.$tc('Adjust gap between left nozzle and bed using controls. If needed, you can repeat points adjustment')
  }

  updated () {
    this.description = this.$tc('Adjust gap between left nozzle and bed using controls. If needed, you can repeat points adjustment')
  }

  @printers.Action customCommand: any

  @printers.Action jogCommand: any
  @printers.Action homeCommand: any
}
</script>

<style>
</style>
