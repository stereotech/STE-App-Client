<template>
  <WizardStep :step="step">
    <v-container grid-list-xl>
      <v-layout align-center justify-space-around column fill-height>
        <v-flex xs12>
          <h1 class="display-4">{{$t("printers.wizards.firstLaunch.hello")}}</h1>
        </v-flex>
        <v-flex xs12>
             <v-select
              :items="settings.avaliableLanguages"
              :value="settings.language"
              @input="sendLanguage"
              filled
              :label="$tc('labels.selectLanguage')"
            ></v-select>
        </v-flex>
        <v-flex xs12>
          <v-btn block x-large depressed color="accent" @click="next(1)">{{$t("printers.wizards.firstLaunch.start")}}</v-btn>
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

  private languages:{key:string, value:string}[]=[
    {key:'English', value:'en'},
    {key:'Русский', value:'ru'}
  ]
  private setLanguage(value:string){
    this.setLanguage(value)
    this.$i18n.locale=value
    //@ts-ignore
    this.$moment.locale(value)
  }
}
</script>

<style>
</style>
