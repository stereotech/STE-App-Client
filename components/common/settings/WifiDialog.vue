<template>
  <v-dialog
    v-model="isOpen"
    max-width="425"
    persistent
    :fullscreen="$vuetify.breakpoint.xs"
    scrollable
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Wi-Fi setup</v-toolbar-title>
      </v-toolbar>
      <v-card-text style="height: 1000px;">
        <v-list>
          <v-subheader>Current network</v-subheader>
          <v-subheader>Avaliable networks</v-subheader>
          <template v-for="(network, index) in data">
            <v-list-tile avatar :key="network.id">
              <v-list-tile-action v-if="network.strength > 81">
                <v-icon>mdi-wifi-strength-4</v-icon>
              </v-list-tile-action>
              <v-list-tile-action v-else-if="network.strength > 61">
                <v-icon>mdi-wifi-strength-3</v-icon>
              </v-list-tile-action>
              <v-list-tile-action v-else-if="network.strength > 41">
                <v-icon>mdi-wifi-strength-2</v-icon>
              </v-list-tile-action>
              <v-list-tile-action v-else-if="network.strength > 21">
                <v-icon>mdi-wifi-strength-1</v-icon>
              </v-list-tile-action>
              <v-list-tile-action v-else>
                <v-icon>mdi-wifi-strength-outline</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="network.ssid"></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action v-if="network.security">
                <v-icon>mdi-lock</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider inset :key="index"></v-divider>
          </template>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { Vue, Component, Model, Watch } from 'nuxt-property-decorator'

  @Component
  export default class extends Vue {
    @Model('input', { type: Boolean, default: false }) value!: boolean
    @Watch('value') onValueChanged (val: boolean) {
      this.isOpen = val
    }

    private isOpen: boolean = this.value

    private closeDialog () {
      this.$emit('input', false)
      this.isOpen = false
    }

    private data: any[] = [
      {
        id: 'Wifi1',
        ssid: 'Wifi1',
        strength: 95,
        security: true
      },
      {
        id: 'Wifi2',
        ssid: 'Wifi1',
        strength: 70,
        security: true
      },
      {
        id: 'Wifi3',
        ssid: 'Wifi1',
        strength: 50,
        security: true
      },
      {
        id: 'Wifi4',
        ssid: 'Wifi1',
        strength: 30,
        security: false
      },
      {
        id: 'Wifi5',
        ssid: 'Wifi1',
        strength: 5,
        security: true
      }
    ]
  }
</script>

<style>
</style>
