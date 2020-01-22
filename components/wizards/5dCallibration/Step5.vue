<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-container grid-list-xs>
      <v-layout row wrap>
        <v-flex xs12>
            <fiveAxisPanel/>
        </v-flex>
        <v-flex xs12>
          <v-btn block depressed color="accent" @click="next(5)">
            Next
            <v-icon right dark>mdi-chevron-right</v-icon>
          </v-btn>
        </v-flex>
 
      </v-layout>
  

    </v-container>
  </WizardStep>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
import WizardStep from '~/components/wizards/WizardStep.vue'
import { Action, Getter, State, namespace } from 'vuex-class'
import fiveAxisPanel from '~/components/wizards/5dCallibration/fiveAxisPanel.vue'
const printers = namespace('printersState')

@Component({
  components: {
    WizardStep,
    fiveAxisPanel
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
  async performStep () {
    await this.customCommand({ id: this.$route.params.id, command: 'M1005 S3' })
    //await this.customCommand({ id: this.$route.params.id, command: 'G0 Z0 F600' })
  }
  private step?: number = 4
  private curStep?: number = this.currentStep

  private image: string = '/wizards/bed_leveling/bed_leveling03.jpg'
  private description: string = 'Wait until bed and printhead stop and adjust second thumb wheel on the left side of the bed'


  private async next (step: number) {
    await this.customCommand({ id: this.$route.params.id, command: 'G0 Z10 F600' })
    this.$emit('change', step)
    this.curStep = step
  }

  @printers.Action customCommand: any
}
</script>