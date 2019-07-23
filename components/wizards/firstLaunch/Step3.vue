<template>
  <WizardStep :step="step">
    <v-container grid-list-xl>
      <v-layout align-center justify-space-around column fill-height>
        <v-flex xs12>
          <p class="headline">Set Date and Time</p>
        </v-flex>
        <v-flex xs12>
          <v-dialog
            ref="datedialog"
            v-model="modal"
            :return-value.sync="dateModel"
            @update:return-value="setDate"
            persistent
            lazy
            full-width
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-on="on"
                v-model="dateModel"
                filled
                label="Set date"
                prepend-icon="mdi-calendar"
                readonly
              ></v-text-field>
            </template>
            <v-date-picker v-model="dateModel" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
              <v-btn text color="primary" @click="setDate(dateModel)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-flex>
        <v-flex xs12>
          <v-dialog
            ref="dialog"
            v-model="modal2"
            :return-value.sync="timeModel"
            persistent
            lazy
            full-width
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-on="on"
                v-model="timeModel"
                filled
                label="Set time"
                prepend-icon="mdi-clock-outline"
                readonly
              ></v-text-field>
            </template>
            <v-time-picker v-if="modal2" v-model="timeModel" full-width format="24hr">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
              <v-btn text color="primary" @click="setTime(timeModel)">OK</v-btn>
            </v-time-picker>
          </v-dialog>
        </v-flex>
        <v-flex xs12>
          <v-btn block large text @click="next(4)">Next</v-btn>
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
  private step?: number = 3
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
