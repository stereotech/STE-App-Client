<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-col cols="12">
      <v-btn block x-large depressed color="accent" @click="next(4)">
        {{$t("frequentlyUsed.start")}}
        <v-icon right dark>mdi-chevron-right</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="12">
      <v-btn block x-large depressed color="accent" @click="next(9)">
        {{$t("frequentlyUsed.skip")}}
        <v-icon right dark>mdi-chevron-right</v-icon>
      </v-btn>
    </v-col>
  </WizardStep>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
import { Action, Getter, State, namespace } from 'vuex-class'
import WizardStep from '~/components/wizards/WizardStep.vue'
import { Settings } from '~/types/settings'

const printers = namespace('printersState')
const settings = namespace('settingsState')

@Component({
  components: {
    WizardStep
  }
})
export default class extends Vue {
  @Model('change', { type: Number, default: 1, required: true }) currentStep?: number
  @Watch('currentStep') onCurrentStepChanged (val: number) {
    this.curStep = val
  }

  private step?: number = 3
  private curStep?: number = this.currentStep

  private image: string = 'wizards/bed_leveling/bed_leveling.jpg'
  private description: string = ''

  @printers.Action homeCommand: any
  @settings.Getter settings!: Settings

  private async next (step: number) {
    await this.homeCommand({ id: this.settings.systemId, head: true, bed: true, rotary: false })

    this.$emit('change', step)
    this.curStep = step
  }

  mounted() {
    this.description = this.$t('printers.wizards.firstLaunch.descriptions.step4desc').toString()
  }
}
</script>

<style>
</style>
