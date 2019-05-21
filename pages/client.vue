<template>
  <v-flex xs12 text-xs-center>
    <h1 class="display-4">Client 3D Printer</h1>
    <h4
      class="display-1"
    >This printer is connected to {{ settings.hostname }} printer. Please use that printer to control this one</h4>
    <v-btn large color="accent" @click="disconnect">Disconnect from {{ settings.hostname }}</v-btn>
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { State, Action, Getter, namespace } from 'vuex-class'
import { Settings } from '../types/settings'

const settings = namespace('settingsState')
const printers = namespace('printersState')

@Component({
})
export default class extends Vue {
  layout () {
    return 'solid'
  }

  head () {
    return { title: 'STE App Client' }
  }

  @settings.Getter settings!: Settings
  @printers.Getter printer!: any
  @printers.Action disconnectPrinter!: any

  private disconnect () {
    let apiKey = this.printer(this.settings.systemId).apiKey
    this.disconnectPrinter(apiKey)
  }
}
</script>

<style>
</style>