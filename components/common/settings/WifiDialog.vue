<template>
  <SettingsDialog v-model="isOpen" @input="closeDialog">
    <template slot="title">Wi-Fi Setup</template>
    <v-list>
      <v-subheader>Current network</v-subheader>
      <v-list-tile avatar v-if="currentNetwork" @click="forgetConfirmation = true">
        <v-list-tile-action v-if="currentNetwork.strength > 81">
          <v-icon>mdi-wifi-strength-4</v-icon>
        </v-list-tile-action>
        <v-list-tile-action v-else-if="currentNetwork.strength > 61">
          <v-icon>mdi-wifi-strength-3</v-icon>
        </v-list-tile-action>
        <v-list-tile-action v-else-if="currentNetwork.strength > 41">
          <v-icon>mdi-wifi-strength-2</v-icon>
        </v-list-tile-action>
        <v-list-tile-action v-else-if="currentNetwork.strength > 21">
          <v-icon>mdi-wifi-strength-1</v-icon>
        </v-list-tile-action>
        <v-list-tile-action v-else>
          <v-icon>mdi-wifi-strength-outline</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="currentNetwork.name"></v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action v-if="currentNetwork.security">
          <v-icon>mdi-lock</v-icon>
        </v-list-tile-action>
        <v-dialog v-model="forgetConfirmation" max-width="425">
          <v-card>
            <v-card-title class="headline">Forget {{ currentNetwork.name }} ?</v-card-title>
            <v-card-actions>
              <v-card-actions>
                <v-btn color="primary" flat @click="forgetConfirmation = false">Cancel</v-btn>
                <v-btn color="primary" flat @click="startForgetting">Forget</v-btn>
              </v-card-actions>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-list-tile>
      <v-subheader>Avaliable networks</v-subheader>
      <template v-for="(network, index) in avaliableNetworks">
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
            <v-list-tile-title v-text="network.name"></v-list-tile-title>
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
            v-if="setupNetwork.security"
            class="headline"
          >Enter Wi-Fi password for {{ setupNetwork.name }}</v-card-title>
          <v-card-title v-else class="headline">Connect to network?</v-card-title>
          <v-container grid-list-md v-if="setupNetwork.security">
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
            <v-btn color="primary" flat @click="startConnecting" :disabled="isMin">Connect</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-list>
  </SettingsDialog>
</template>

<script lang="ts">
import { Vue, Component, Model, Watch } from 'nuxt-property-decorator'
import SettingsDialog from '~/components/common/settings/SettingsDialog.vue'
import { Network } from '~/types/networking'
import { Action, Getter, State, namespace } from 'vuex-class'

const settings = namespace('settingsState')

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
  private forgetConfirmation: boolean = false
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

  private setupNetwork: Network = {
    id: '',
    state: '',
    name: '',
    security: false,
    strength: 0
  }

  private closeDialog () {
    this.$emit('input', false)
    this.isOpen = false
  }

  @settings.Getter avaliableNetworks!: Network[]
  @settings.Getter currentNetwork: Network | undefined
  @settings.Action getWifiNetworks: any
  @settings.Action connectWifiNetwork: any
  @settings.Action forgetWifiNetwork: any

  private startConnection (network: Network) {
    if (network) {
      if (network.security) {
        this.confirmation = true
      }
      this.setupNetwork = network
    }
  }

  private startConnecting () {
    if (this.setupNetwork.security) {
      this.connectWifiNetwork({ name: this.setupNetwork.name, passphrase: this.password })
    } else {
      this.connectWifiNetwork({ name: this.setupNetwork.name, passphrase: '' })
    }
    this.confirmation = false
  }

  private startForgetting () {
    if (this.currentNetwork !== undefined) {
      this.forgetWifiNetwork(this.currentNetwork.id)
    }
    this.forgetConfirmation = false
  }

  async mounted () {
    await this.getWifiNetworks()
  }

}
</script>

<style>
</style>
