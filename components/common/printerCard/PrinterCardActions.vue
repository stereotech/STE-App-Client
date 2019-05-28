<template>
  <v-flex d-flex md4 xs12 sm12>
    <v-container fluid grid-list-md>
      <v-layout row wrap v-if="printing || paused">
        <v-flex xs12 sm8 md12>
          <p class="title text-truncate">Current printjob:</p>
          <p class="title text-truncate">{{ jobNameFomatted }}</p>
        </v-flex>
        <v-flex xs12 sm4 md12>
          <v-btn-toggle mandatory block depressed>
            <v-btn flat block depressed :value="printing" @click="resumeJob">
              <v-icon color="success">mdi-play</v-icon>
            </v-btn>
            <v-btn flat block depressed :value="paused" @click="pauseJob">
              <v-icon color="warning">mdi-pause</v-icon>
            </v-btn>
            <v-btn flat block depressed @click="stopJob">
              <v-icon color="error">mdi-stop</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-else-if="done || failed">
        <v-flex xs12 sm8 md12>
          <p class="title text-truncate">Clean the buildplate</p>
          <p class="title text-truncate">and select state</p>
        </v-flex>
        <v-flex xs12 sm4 md12>
          <v-select
            box
            :items="['Idle', 'Maintenance']"
            label="Select state"
            @change="setPrinterState"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-else-if="idle">
        <v-flex xs12 sm8 md12>
          <p class="title text-truncate">Printer is waiting</p>
          <p class="title text-truncate">for printjob</p>
        </v-flex>
        <v-flex xs12 sm4 md12>
          <v-select
            box
            :items="['Idle', 'Maintenance']"
            label="Select state"
            @change="setPrinterState"
            :value="stateText"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-else-if="maintenance">
        <v-flex xs12 sm8 md12>
          <p class="title text-truncate">Printer is ready</p>
          <p class="title text-truncate">for maintenance</p>
        </v-flex>
        <v-flex xs12 sm4 md12>
          <v-select
            box
            :items="['Idle', 'Maintenance']"
            label="Select state"
            @change="setPrinterState"
            :value="stateText"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-else-if="loading">
        <v-flex xs12 sm8 md12>
          <p class="title text-truncate">Uploading printjob...</p>
        </v-flex>
        <v-flex xs12 sm4 md12>
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import { CurrentState } from 'types/printer'

const printers = namespace('printersState')

@Component
export default class PrinterCardActions extends Vue {
  @Prop({ default: '', type: String, required: true }) id!: string
  @Prop({ default: '', type: String }) jobName!: string
  @Prop({ default: '', type: String }) stateText!: string

  @Prop({ default: false, type: Boolean }) printing!: boolean
  @Prop({ default: false, type: Boolean }) paused!: boolean
  @Prop({ default: true, type: Boolean }) maintenance!: boolean
  @Prop({ default: false, type: Boolean }) idle!: boolean
  @Prop({ default: false, type: Boolean }) done!: boolean
  @Prop({ default: false, type: Boolean }) failed!: boolean
  @Prop({ default: false, type: Boolean }) offline!: boolean
  @Prop({ default: false, type: Boolean }) loading!: boolean

  @printers.Action setStatus: any
  @printers.Action pausePrintJob: any
  @printers.Action resumePrintJob: any
  @printers.Action cancelPrintJob: any

  get jobNameFomatted (): string {
    if (this.jobName != null) {
      return this.jobName.substring(0, this.jobName.length - 6)
    }
    return ''
  }

  private setPrinterState (value: string) {
    this.setStatus({ id: this.id, newStatus: value })
  }

  private resumeJob (toggle: boolean) {
    if (toggle) {
      this.resumePrintJob(this.id)
    }
  }

  private pauseJob (toggle: boolean) {
    if (toggle) {
      this.pausePrintJob(this.id)
    }
  }

  private stopJob (toggle: boolean) {
    if (toggle) {
      this.cancelPrintJob(this.id)
    }
  }
}
</script>
