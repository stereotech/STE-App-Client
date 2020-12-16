<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-container>
      <v-row dense align="center" justify="space-around">
        <v-col cols="12">
          <v-btn block x-large depressed color="accent" @click="next(2)">{{
            $t("Next")
          }}</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </WizardStep>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
import WizardStep from '~/components/wizards/WizardStep.vue'

@Component({
  components: {
    WizardStep
  }
})
export default class extends Vue {
  @Model('change', { type: Number, default: 1, required: true })
  currentStep!: number
  @Watch('currentStep') onCurrentStepChanged (val: number) {
    this.curStep = val
  }
  private step?: number = 1
  private curStep?: number = this.currentStep

  private image: string = 'wizards/first_launch/remove_fixtures.jpg'
  private description: string = ''

  private next (step: number) {
    this.$emit('change', step)
    this.curStep = step
  }

  mounted () {
    this.description = this.$tc('Please remove all the transportation fixtures and press Next')
  }

  updated () {
    this.description = this.$tc('Please remove all the transportation fixtures and press Next')
  }
}
</script>

<style>
</style>
