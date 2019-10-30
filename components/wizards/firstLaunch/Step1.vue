<template>
  <WizardStep :step="step">
    <v-container>
      <v-row dense class="fill-height" align="center" justify="space-around" column>
        <v-col cols="12">
          <h1 class="display-4">
            Hello!
          </h1>
        </v-col>
        <!--<v-flex xs12>
          <v-select
            :items="settings.avaliableLanguages"
            :value="settings.language"
            @input="sendLanguage"
            label="Select language"
            outline
          ></v-select>
        </v-flex>-->
        <v-col cols="12">
          <v-btn block x-large depressed color="accent" @click="next(1)">
            Let's Start
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

@Component({
  components: {
    WizardStep
  }
})
export default class extends Vue {
  @Model('change', { type: Number, default: 1, required: true })
  currentStep?: number
  @Watch('currentStep') onCurrentStepChanged (val: number) {
    this.curStep = val
  }
  private step?: number = 0
  private curStep?: number = this.currentStep

  @settings.Getter settings!: Settings
  @settings.Action sendLanguage: any

  private next (step: number) {
    this.$emit('change', step)
    this.curStep = step
  }
}
</script>

<style>
</style>
