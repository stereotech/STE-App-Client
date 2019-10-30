<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-container>
            <v-row dense class="text-center" align="center" justify="center">
              <v-col cols="6">
                <v-btn
                  x-large
                  outlined
                  depressed
                  color="accent"
                  icon
                  dark
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
                  color="accent"
                  icon
                  dark
                  @click="jog(1)"
                >
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn-toggle v-model="selectedAmount" rounded mandatory>
                  <v-btn x-large color="accent" @click="amount = 0.1">
                    0.1
                  </v-btn>
                  <v-btn x-large color="accent" @click="amount = 1">
                    1
                  </v-btn>
                </v-btn-toggle>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="12">
          <v-btn x-large block depressed color="accent" @click="next(5)">
            <v-icon left dark>
              mdi-chevron-left
            </v-icon>Set points again
          </v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn x-large block depressed color="accent" @click="next(8)">
            Next
            <v-icon right dark>
              mdi-chevron-right
            </v-icon>
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

    if (this.curStep === this.step) {
      this.performStep()
    }
  }

  private selectedAmount: number = 1
  private amount: number = 0.1

  async performStep () {
    await this.customCommand({ id: this.$route.params.id, command: 'G0 X100 Y100 F3600' })
    await this.customCommand({ id: this.$route.params.id, command: 'G0 Z5 F600' })
  }
  private step?: number = 7
  private curStep?: number = this.currentStep

  private image: string = 'wizards/bed_leveling/bed_leveling05.jpg'
  private description: string = 'Adjust gap between left nozzle and bed using controls. If needed, you can repeat points adjustment'

  private async next (step: number) {
    await this.customCommand({ id: this.$route.params.id, command: 'G0 Z10 F600' })
    this.$emit('change', step)
    this.curStep = step
  }

  private jog (dir: number) {
    this.jogCommand({ id: this.$route.params.id, z: dir * this.amount })
  }

  @printers.Action customCommand: any
  @printers.Action jogCommand: any
}
</script>

<style>
</style>
