<template>
  <v-flex xs12>
    <v-toolbar color="primary" flat>
      <v-avatar size="36px" class="mx-2">
        <img src="/icon.png" alt="Logo" />
      </v-avatar>
      <v-toolbar-title>
        <span class="text-uppercase font-weight-regular">STE App</span>
        <span class="text-uppercase font-weight-medium">Select cluster</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-container grid-list-xs>
      <v-layout row wrap v-if="avaliable.length > 0">
        <v-flex xs6 sm4 v-for="(printer, index) in avaliable" :key="index">
          <v-card light hover ripple @click="connectToPrinter(printer)">
            <v-container grid-list-xs>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-img
                    :src="'/printers/'+ printer.model +'.png'"
                    alt="Avatar"
                    v-if="printer.printers === 1"
                  />
                  <v-img :src="'/printers/Cluster.png'" alt="Avatar" v-else />
                </v-flex>
                <v-flex xs12>
                  <div class="title text-center">{{printer.name}}</div>
                  <div class="body-1 text-center">{{ printer.model}}</div>
                  <div class="body-1 text-center">{{ printer.printers}} printers</div>
                  <div class="body-1 text-center">Address: {{printer.ipAddress}}</div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout column align-center justify-center v-else>
        <v-flex xs12>
          <v-progress-circular indeterminate color="secondary"></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
    <!--<v-container grid-list-xs>
      <v-layout column align-center justify-center>
        <v-flex xs12 class="text-center">
          <v-checkbox label="Remember selected" v-model="remember"></v-checkbox>
        </v-flex>
      </v-layout>
    </v-container>-->
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { ScannerResult } from '../types/scannerResult'
import { State, Action, Getter, namespace } from 'vuex-class'

const clusterDiscovery = namespace('clusterDiscoveryState')

@Component
export default class ChoosePrinter extends Vue {
  @clusterDiscovery.Getter avaliable!: ScannerResult[]
  @clusterDiscovery.Action setCluster: any

  layout () {
    return 'solid'
  }

  remember: boolean = false

  connectToPrinter (printer: ScannerResult) {
    this.setCluster({ cluster: printer, save: this.remember })
    //@ts-ignore
    this.$startHub()
    this.$router.push('/')
  }

  mounted () {
    this.$store.commit('setApiUrl', '/api/')
    //@ts-ignore
    this.$stopHub()
  }
}

</script>

<style>
</style>