<template>
  <v-col cols="12">
    <v-toolbar color="primary" flat>
      <v-avatar size="36px" class="mx-2">
        <img src="/icon.png" alt="Logo" />
      </v-avatar>
      <v-toolbar-title>
        <span class="text-uppercase font-weight-regular">STE App</span>
        <span class="text-uppercase font-weight-medium">{{$t("chooseprinter.selectCluster")}}</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-row dense v-if="avaliable.length > 0">
        <v-col v-for="(printer, index) in avaliable" :key="index" cols="6" sm="4">
          <v-card light hover ripple @click="connectToPrinter(printer)">
            <v-container>
              <v-row dense>
                <v-col cols="12">
                  <v-img
                    v-if="printer.printers < 2"
                    :src="'/printers/'+ printer.model +'.png'"
                    alt="Avatar"
                  />
                  <v-img v-else :src="'/printers/Cluster.png'" alt="Avatar" />
                </v-col>
                <v-col cols="12">
                  <div class="title text-center">{{ printer.name }}</div>
                  <div class="body-1 text-center">{{ printer.model }}</div>
                  <div
                    v-if="printer.printers > 1"
                    class="body-1 text-center"
                  >{{ $t("chooseprinter.printers",[printer.printers])}}</div>
                  <div class="body-1 text-center">{{$t("printers.addPrinterDialog.address", [printer.ipAddress])}}</div>
                </v-col>
              </v-row>
            </v-container>
            <v-overlay :value="overlay">
              <v-progress-circular indeterminate />
            </v-overlay>
          </v-card>
        </v-col>
      </v-row>
      <v-row dense v-else align="center" justify="center">
        <v-col cols="auto">
          <v-progress-circular indeterminate color="secondary" />
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { State, Action, Getter, namespace } from 'vuex-class'
import { ScannerResult } from '../types/scannerResult'

const clusterDiscovery = namespace('clusterDiscoveryState')

@Component
export default class ChoosePrinter extends Vue {
  @clusterDiscovery.Getter avaliable!: ScannerResult[]
  @clusterDiscovery.Action setCluster: any

  layout () {
    return 'solid'
  }

  remember: boolean = false
  overlay: boolean = false

  connectToPrinter (printer: ScannerResult) {
    this.overlay = true
    this.setCluster({ cluster: printer, save: this.remember })
    // @ts-ignore
    this.$startHub()
    this.$router.push('/')
    this.overlay = false
  }

  mounted () {
    this.overlay = false
    // @ts-ignore
    this.$stopHub()
    this.$store.commit('setApiUrl', '/api/')
  }
}

</script>

<style>
</style>
