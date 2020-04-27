<template>
  <v-dialog
    v-model="dialog"
    max-width="425"
    persistent
    :fullscreen="$vuetify.breakpoint.xs"
    scrollable
  >
    <template v-slot:activator="{ on }">
      <v-btn color="primary" large outlined @click="startScan" v-on="on">
        <v-icon>mdi-plus</v-icon>
        &nbsp;{{$t("Add printer")}}
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{$t("Add printer")}}</v-toolbar-title>
        <v-spacer />
        <v-btn icon dark @click="startScan">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text style="height: 1000px;">
        <v-container fluid>
          <v-row dense v-if="results.length > 0">
            <v-col v-for="printer in results" :key="printer.id" class="d-flex" cols="6">
              <v-card hover ripple @click="selectedPrinter = printer; confirmation = true">
                <v-img :src="'/printers/'+ printer.model +'.png'" alt="Avatar" />
                <div class="title text-center">{{ printer.name }}</div>
                <div class="body-1 text-center">{{ printer.model }}</div>
                <div class="body-1 text-center">{{$t("Address: {0}", [printer.ipAddress])}}</div>
              </v-card>
            </v-col>
            <v-dialog v-model="confirmation" max-width="425">
              <v-card v-if="selectedPrinter !== undefined">
                <v-card-title
                  class="headline"
                >{{ $t("Do you want to add {0} to cluster?",[selectedPrinter.name]) }}</v-card-title>
                <v-card-actions>
                  <v-btn color="primary" text @click="confirmation = false">{{$t("No")}}</v-btn>
                  <v-btn color="primary" text @click="startConnection">{{$t("Yes")}}</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <v-row dense v-else justify="center">
            <v-col cols="2">
              <v-progress-circular :size="50" color="primary" indeterminate />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Getter, Action, Mutation, namespace } from 'vuex-class'
import { ScannerResult } from '~/types/scannerResult'

const scannerResult = namespace('scannerResultState')

@Component
export default class AddPrinterDialog extends Vue {
  @scannerResult.Getter results?: ScannerResult[]
  @scannerResult.Action fetchResults: any
  @scannerResult.Action connect: any
  @scannerResult.Mutation clearResults: any

  private dialog: boolean = false
  private confirmation: boolean = false
  private selectedPrinter: ScannerResult = {
    id: 'st-aaa',
    name: 'ST-AAA',
    model: 'STE320',
    ipAddress: '192.168.0.1',
    printers: 1,
    role: 'host'
  }

  async startScan () {
    this.dialog = true
    await this.fetchResults()
    if (this.results && this.results.length > 0) {
      this.selectedPrinter = this.results[0]
    }
  }

  async startConnection () {
    this.confirmation = false
    this.dialog = false
    if (this.selectedPrinter) {
      this.connect(this.selectedPrinter)
    }
    this.selectedPrinter = {
      id: 'st-aaa',
      name: 'ST-AAA',
      model: 'STE320',
      ipAddress: '192.168.0.1',
      printers: 1,
      role: 'host'
    }
  }

  private closeDialog () {
    this.dialog = false
    this.clearResults()
  }
}
</script>

<style>
</style>
