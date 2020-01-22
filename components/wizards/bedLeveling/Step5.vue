<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-btn x-large block depressed color="accent" @click="next(5)">
      {{$t("frequentlyUsed.next")}}
      <v-icon right dark>mdi-chevron-right</v-icon>
    </v-btn>
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

  async performStep () {
    await this.customCommand({ id: this.$route.params.id, command: 'G0 X190 Y10 F3600' })
    await this.customCommand({ id: this.$route.params.id, command: 'G0 Z0 F600' })
  }

  private step?: number = 4
  private curStep?: number = this.currentStep

  private image: string = 'wizards/bed_leveling/bed_leveling05.jpg'
  private description: string = ''


  private async next (step: number) {
    await this.customCommand({ id: this.$route.params.id, command: 'G0 Z10 F600' })
    this.$emit('change', step)
    this.curStep = step
  }

 mounted() {
    this.description = this.$t('printers.wizards.bedLeveling.descriptions.step5desc').toString()
  }

  @printers.Action customCommand: any
}
</script>

<style>
</style>
