<template>
  <SettingsDialog v-model="isOpen" @input="closeDialog">
    <template slot="title">Wi-Fi Setup</template>
    <v-list>
      <v-subheader>Current network</v-subheader>
      <v-list-tile avatar :key="current.id">
        <v-list-tile-action v-if="current.strength > 81">
          <v-icon>mdi-wifi-strength-4</v-icon>
        </v-list-tile-action>
        <v-list-tile-action v-else-if="current.strength > 61">
          <v-icon>mdi-wifi-strength-3</v-icon>
        </v-list-tile-action>
        <v-list-tile-action v-else-if="current.strength > 41">
          <v-icon>mdi-wifi-strength-2</v-icon>
        </v-list-tile-action>
        <v-list-tile-action v-else-if="current.strength > 21">
          <v-icon>mdi-wifi-strength-1</v-icon>
        </v-list-tile-action>
        <v-list-tile-action v-else>
          <v-icon>mdi-wifi-strength-outline</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="current.ssid"></v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action v-if="current.security">
          <v-icon>mdi-lock</v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <v-subheader>Avaliable networks</v-subheader>
      <template v-for="(network, index) in data">
        <v-list-tile avatar :key="network.id" @click="startConnection(network)">
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
      <v-dialog v-model="confirmation" max-width="425">
        <v-card>
          <v-card-title
            v-if="setupNetwork"
            class="headline"
          >Enter Wi-Fi password for {{ setupNetwork.ssid }}</v-card-title>
          <v-card-title v-else class="headline">Enter Wi-Fi password</v-card-title>
          <v-container grid-list-md>
            <v-text-field
              box
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[ rules.required, rules.min ]"
              :type="showPassword ? 'text' : 'password'"
              name="input-10-2"
              label="Wi-Fi password"
              class="input-group--focused"
              v-model="password"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-container>

          <v-card-actions>
            <v-btn color="primary" flat @click="confirmation = false">Cancel</v-btn>
            <v-btn color="primary" flat @click="confirmation = false" :disabled="isMin">Connect</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-list>
  </SettingsDialog>
</template>

<script lang="ts">
  import { Vue, Component, Model, Watch } from 'nuxt-property-decorator'
  import SettingsDialog from '~/components/common/settings/SettingsDialog.vue'

  @Component({
    components: {
      SettingsDialog
    }
  })
  export default class extends Vue {
    @Model('input', { type: Boolean, default: false }) value!: boolean
    @Watch('value') onValueChanged (val: boolean) {
      this.isOpen = val
    }

    private isOpen: boolean = this.value

    private confirmation: boolean = false
    private showPassword: boolean = false
    private password: string = ''
    private rules: any = {
      required: value => !!value || 'Required.',
      min: v => {
        if (v != null) {
          return v.length >= 8 || 'Min 8 characters'
        }
        return 'Min 8 characters'
      }
    }

    get isMin (): boolean {
      return this.rules.min(this.password) !== true
    }

    private setupNetwork: any = {}

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

    private current: any = {
      id: 'Wifi5',
      ssid: 'Wifi1',
      strength: 5,
      security: true
    }

    private startConnection (network: any) {
      if (network) {
        if (network.security) {
          this.confirmation = true
        }
        this.setupNetwork = network
      }
    }

  }
</script>

<style>
</style>
