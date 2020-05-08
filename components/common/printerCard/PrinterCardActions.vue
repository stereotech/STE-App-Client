<template>
  <v-col class="d-flex" md="4" cols="12" sm="12">
    <v-container fluid>
      <v-row dense v-if="printing || paused">
        <v-col cols="12" sm="8" md="12">
          <div class="title text-truncate">{{$t("Current printjob:")}}</div>
          <div class="title text-truncate">{{ jobNameFomatted }}</div>
        </v-col>
        <v-col cols="12" sm="4" md="12">
          <v-btn-toggle mandatory depressed>
            <v-btn text depressed :value="printing" @click="resumeJob">
              <v-icon color="success">mdi-play</v-icon>
            </v-btn>
            <v-btn text depressed :value="paused" @click="pauseJob">
              <v-icon color="warning">mdi-pause</v-icon>
            </v-btn>
            <v-btn text depressed @click="stopJob">
              <v-icon color="error">mdi-stop</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
      <v-row dense v-else-if="done || failed">
        <v-col cols="12" sm="8" md="12">
          <div class="title text-truncate">{{$t("Clean the buildplate")}}</div>
          <div class="title text-truncate">{{$t("and select state")}}</div>
        </v-col>
        <v-col cols="12" sm="4" md="12">
          <v-select
            filled
            :items="stateItems"
            :label="$tc('Select state')"
            :value="stateText"
            @change="setPrinterState"
          />
        </v-col>
      </v-row>
      <v-row dense v-else-if="idle">
        <v-col cols="12" sm="8" md="12">
          <div class="title text-truncate">{{$t("Printer is waiting")}}</div>
          <div class="title text-truncate">{{$t("for printjob")}}</div>
        </v-col>
        <v-col cols="12" sm="4" md="12">
          <v-select
            filled
            :items="stateItems"
            :label="$tc('Select state')"
            :value="stateText"
            @change="setPrinterState"
          />
        </v-col>
      </v-row>
      <v-row dense v-else-if="maintenance">
        <v-col cols="12" sm="8" md="12">
          <div class="title text-truncate">{{$t("Printer is ready")}}</div>
          <div class="title text-truncate">{{$t("for maintenance")}}</div>
        </v-col>
        <v-col cols="12" sm="4" md="12">
          <v-select
            filled
            :items="stateItems"
            :label="$tc('Select state')"
            :value="stateText"
            @change="setPrinterState"
          />
        </v-col>
      </v-row>
      <v-row dense v-else-if="loading">
        <v-col cols="12" sm="8" md="12">
          <div class="title text-truncate">{{$t("Waiting...")}}</div>
        </v-col>
        <v-col cols="12" sm="4" md="12">
          <v-progress-circular indeterminate color="primary" />
        </v-col>
      </v-row>
      <v-row dense v-else-if="notAvaliable">
        <v-col cols="12" sm="8" md="12">
          <div class="title text-truncate">{{$t("Printer is not available")}}</div>
          <div class="title text-truncate">{{$t("in the current network")}}</div>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="stopJobConfirmation" max-width="425">
      <v-card>
        <v-card-title class="headline">{{$t("Cancel printing?")}}</v-card-title>
        <v-card-actions>
          <v-btn color="primary" text @click="stopJobConfirmation = false">{{$t("No")}}</v-btn>
          <v-btn color="primary" outlined @click="stopJobConfirmed(true)">{{$t("Yes and Park")}}</v-btn>
          <v-btn color="primary" depressed @click="stopJobConfirmed(false)">{{$t("Yes")}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
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
  @Prop({ default: false, type: Boolean }) notAvaliable!: boolean

  @printers.Action setStatus: any
  @printers.Action pausePrintJob: any
  @printers.Action resumePrintJob: any
  @printers.Action cancelPrintJob: any
  @printers.Action customCommand: any

  private stopJobConfirmation: boolean = false

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
      this.stopJobConfirmation = true
    }
  }

  private stopJobConfirmed (park: boolean = false) {
    this.cancelPrintJob(this.id)
    if (park) {
      this.customCommand({ id: this.id, command: 'G54 G28' })
    }
    this.stopJobConfirmation = false
  }

  private stateItems: { text: string, value: string }[] = [
    {
      value: 'Maintenance',
      text: 'Maintenance'
    },
    {
      value: 'Idle',
      text: 'Idle'
    }
  ]

  mounted () {
    this.stateItems.forEach(element => {
      element.text = this.$tc(`${element.value}`)
    });
  }

  updated () {
    this.stateItems.forEach(element => {
      element.text = this.$tc(`${element.value}`)
    });
  }
}
</script>
