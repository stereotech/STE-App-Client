<template>
  <WizardStep :step="step">
    <v-container grid-list-xl>
      <v-layout align-center justify-space-around column fill-height>
        <v-flex xs12>
          <h1 class="display-4">Hello!</h1>
        </v-flex>
        <v-flex xs12>
          <v-select
            :items="settings.avaliableLanguages"
            :value="settings.language"
            @input="sendLanguage"
            label="Select language"
            outline
          ></v-select>
        </v-flex>
        <v-flex xs12>
          <v-btn block large flat @click="next(2)">Start</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </WizardStep>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
  import WizardStep from '~/components/wizards/WizardStep.vue'
  import { Settings } from '~/types/settings'
  import { Action, Getter, State, namespace } from 'vuex-class'

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
    private step?: number = 1
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
