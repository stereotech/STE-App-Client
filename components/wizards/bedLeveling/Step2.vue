<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-container>
            <v-row dense class="text-center" align="center" justify="center">
              <v-col cols="6">
                <v-btn x-large outlined depressed color="accent" icon dark @click="jog(-1)">
                  <v-icon>mdi-chevron-up</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn x-large outlined depressed color="accent" icon dark @click="jog(1)">
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn-toggle v-model="selectedAmount" mandatory>
                  <v-btn
                    x-large
                    outlined
                    color="primary"
                    text-color="secondary"
                    @click="amount = 0.1"
                  >0.1</v-btn>
                  <v-btn
                    x-large
                    outlined
                    color="primary"
                    text-color="secondary"
                    @click="amount = 1"
                  >1</v-btn>
                </v-btn-toggle>
              </v-col>
            </v-row>
          </v-container>
        </v-col>

        <v-col cols="12">
          <v-btn x-large block depressed color="accent" @click="next(2)">
            {{$t("Next")}}
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
  private step?: number = 1
  private curStep?: number = this.currentStep

  private image: string = 'wizards/bed_leveling/bed_leveling02.jpg'
  private description: string = ''


  private async next (step: number) {
    await this.customCommand({ id: this.$route.params.id, command: 'M306 Z0' })
    await this.homeCommand({ id: this.$route.params.id, head: true, bed: true, rotary: false })
    this.$emit('change', step)
    this.curStep = step
  }

  private jog (dir: number) {
    this.jogCommand({ id: this.$route.params.id, z: dir * this.amount })
  }
  mounted () {
    this.description = this.$tc('Wait until bed and printhead stop and adjust first thumb wheel on the far side of the bed')
  }

  updated () {
    this.description = this.$tc('Wait until bed and printhead stop and adjust first thumb wheel on the far side of the bed')
  }
  @printers.Action customCommand: any

  @printers.Action jogCommand: any
  @printers.Action homeCommand: any
}
</script>

<style>
</style>
