<template>
  <WizardStep :step="step">
    <v-container>
      <v-row dense  align="center" justify="space-around" >
        <v-col cols="12">
          <p class="headline">
            Set Date and Time
          </p>
        </v-col>
        <v-col cols="12">
          <v-dialog
            ref="datedialog"
            v-model="modal"
            :return-value.sync="dateModel"
            persistent
            full-width
            width="290px"
            @update:return-value="setDate"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dateModel"
                filled
                label="Set date"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              />
            </template>
            <v-date-picker v-model="dateModel" scrollable>
              <v-spacer />
              <v-btn x-large depressed color="primary" @click="modal = false">
                Cancel
              </v-btn>
              <v-btn x-large depressed color="primary" @click="setDate(dateModel)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col cols="12">
          <v-dialog
            ref="dialog"
            v-model="modal2"
            :return-value.sync="timeModel"
            persistent
            full-width
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="timeModel"
                filled
                label="Set time"
                prepend-icon="mdi-clock-outline"
                readonly
                v-on="on"
              />
            </template>
            <v-time-picker v-if="modal2" v-model="timeModel" full-width format="24hr">
              <v-spacer />
              <v-btn x-large depressed color="primary" @click="modal2 = false">
                Cancel
              </v-btn>
              <v-btn x-large depressed color="primary" @click="setTime(timeModel)">
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>
        <v-col cols="12">
          <v-btn block x-large depressed color="accent" @click="next(3)">
            Next
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
  private step?: number = 2
  private curStep?: number = this.currentStep

  private modal: boolean = false
  private modal2: boolean = false

  @settings.Getter date!: string
  @settings.Getter time!: string
  @settings.Action sendDateTime: any

  private dateModel: string = ''
  private timeModel: string = ''

  private setTime (value: string) {
    this.sendDateTime({ date: this.dateModel, time: value })
    const dialog = this.$refs.dialog as any
    dialog.save(this.timeModel)
  }

  private setDate (value: string) {
    this.sendDateTime({ date: value, time: this.timeModel })
    const dialog = this.$refs.datedialog as any
    dialog.save(this.dateModel)
  }

  mounted () {
    this.dateModel = this.date
    this.timeModel = this.time
  }

  private next (step: number) {
    this.$emit('change', step)
    this.curStep = step
  }
}
</script>

<style>
</style>
