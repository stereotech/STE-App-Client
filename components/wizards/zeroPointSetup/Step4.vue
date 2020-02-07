<template>
  <WizardStep :step="step" :image="image" :description="description">
    <v-container>
      <v-row dense align="center" justify="space-around">
        <v-col cols="12">
          <v-slider
            v-model="diameter"
            :step="0.1"
            thumb-label="always"
            color="accent"
            thumb-size="64"
            min="3"
          >
            <template v-slot:prepend>
              <v-btn x-large outlined text icon @click="diameter -= 0.1">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </template>

            <template v-slot:append>
              <v-btn x-large outlined text icon @click="diameter += 0.1">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
          </v-slider>
        </v-col>
        <v-col cols="12">
          <v-btn block x-large depressed color="accent" @click="nextStep">{{$t("Next")}}</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </WizardStep>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
import { PrintingMode } from '~/types/printingMode'
import WizardStep from '~/components/wizards/WizardStep.vue'
import { Action, Getter, State, namespace } from 'vuex-class'


const printers = namespace('printersState')

@Component({
  components: {
    WizardStep
  }
})
export default class extends Vue {
  @Model('change', { type: Number, default: 1, required: true }) currentStep?: number
  @Prop({ type: Object, default: {} }) additionalData!: any
  @Watch('additionalData') onAdditionalDataChanged () {
    this.$emit('dataChanged', this.additionalData)
  }
  @Watch('currentStep') onCurrentStepChanged (val: number) {
    this.curStep = val
  }
  @Watch('diameter') onDiameterChanged (val: number) {
    this.additionalData.offsetZ = val / 2
  }

  private diameter: number = 3

  private step?: number = 3
  private curStep?: number = this.currentStep

  private image: string = 'wizards/zero_point_setup/zero_point_setup.jpg'
  private description: string = ''

  private nextStep () {
    this.next(4)
  }

  private next (step: number) {
    this.$emit('change', step)
    this.curStep = step
  }


  @printers.Action customCommand: any

  mounted () {
    this.description = this.$tc('Enter the diameter of the base and press Next')
  }

  updated () {
    this.description = this.$tc('Enter the diameter of the base and press Next')
  }
}
</script>

<style scoped>
.v-slider__thumb-label {
  font-size: 18px;
}
</style>
