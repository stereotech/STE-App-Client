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
      <v-icon>mdi-plus</v-icon>&nbsp;{{$t("printers.addPrinterDialog.title")}}
    </v-btn>
       </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{$t("printers.addPrinterDialog.title")}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="startScan">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text style="height: 1000px;">
          <v-container grid-list-md fluid>
            <v-layout row wrap v-if="results.length > 0">
              <v-flex d-flex xs6 v-for="printer in results" :key="printer.id">
                <v-card hover ripple @click="confirmation = true">
                  <v-img :src="'/printers/'+ printer.model +'.png'" alt="Avatar" />
                  <div class="title text-center">{{ printer.name }}</div>
                  <div class="body-1 text-center">{{ printer.model }}</div>
                  <div class="body-1 text-center">{{$t("printers.addPrinterDialog.address", [printer.ipAddress])}}</div>
                </v-card>
                <v-dialog v-model="confirmation" max-width="425">
                  <v-card>
                    <v-card-title class="headline"> {{ $t("printers.addPrinterDialog.doYouWantToAdd",[printer.name]) }} </v-card-title>
                    <v-card-actions>
                      <v-btn color="primary" text @click="confirmation = false">{{$t("frequentlyUsed.no")}}</v-btn>
                      <v-btn color="primary" text @click="startConnection(printer)">{{$t("frequentlyUsed.yes")}}</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
            </v-layout>
            <v-layout row wrap v-else>
              <v-flex d-flex xs12>
                <div class="title text-center">
                  <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                </div>
              </v-flex>
            </v-layout>
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

  async startScan () {
    this.dialog = true
    await this.fetchResults()
  }

  async startConnection (printer: ScannerResult) {
    this.confirmation = false
    this.dialog = false
    this.connect(printer)
  }

  private closeDialog () {
    this.dialog = false
    this.clearResults()
  }
}
</script>

<style>
</style>
