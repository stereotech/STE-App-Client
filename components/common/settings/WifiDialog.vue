<template>
  <SettingsDialog v-model="isOpen" @input="closeDialog">
    <template slot="title">
      Wi-Fi Setup
    </template>
    <v-list>
      <v-subheader>Current network</v-subheader>
      <v-list-item v-if="currentNetwork" @click="forgetConfirmation = true">
        <v-list-item-action v-if="currentNetwork.strength > 81">
          <v-icon>mdi-wifi-strength-4</v-icon>
        </v-list-item-action>
        <v-list-item-action v-else-if="currentNetwork.strength > 61">
          <v-icon>mdi-wifi-strength-3</v-icon>
        </v-list-item-action>
        <v-list-item-action v-else-if="currentNetwork.strength > 41">
          <v-icon>mdi-wifi-strength-2</v-icon>
        </v-list-item-action>
        <v-list-item-action v-else-if="currentNetwork.strength > 21">
          <v-icon>mdi-wifi-strength-1</v-icon>
        </v-list-item-action>
        <v-list-item-action v-else>
          <v-icon>mdi-wifi-strength-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="currentNetwork.name" />
        </v-list-item-content>
        <v-list-item-action v-if="currentNetwork.security">
          <v-icon>mdi-lock</v-icon>
        </v-list-item-action>
        <v-dialog v-model="forgetConfirmation" max-width="425">
          <v-card>
            <v-card-title class="headline">
              Forget {{ currentNetwork.name }} ?
            </v-card-title>
            <v-card-actions>
              <v-card-actions>
                <v-btn color="primary" text @click="forgetConfirmation = false">
                  Cancel
                </v-btn>
                <v-btn color="primary" text @click="startForgetting">
                  Forget
                </v-btn>
              </v-card-actions>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-list-item>
      <v-subheader>Avaliable networks</v-subheader>
      <template v-for="(network, index) in avaliableNetworks">
        <v-list-item :key="network.id" @click="startConnection(network)">
          <v-list-item-action v-if="network.strength > 81">
            <v-icon>mdi-wifi-strength-4</v-icon>
          </v-list-item-action>
          <v-list-item-action v-else-if="network.strength > 61">
            <v-icon>mdi-wifi-strength-3</v-icon>
          </v-list-item-action>
          <v-list-item-action v-else-if="network.strength > 41">
            <v-icon>mdi-wifi-strength-2</v-icon>
          </v-list-item-action>
          <v-list-item-action v-else-if="network.strength > 21">
            <v-icon>mdi-wifi-strength-1</v-icon>
          </v-list-item-action>
          <v-list-item-action v-else>
            <v-icon>mdi-wifi-strength-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="network.name" />
          </v-list-item-content>
          <v-list-item-action v-if="network.security">
            <v-icon>mdi-lock</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-divider :key="index" inset />
      </template>
      <v-dialog v-model="confirmation" max-width="425">
        <v-card>
          <v-card-title
            v-if="setupNetwork.security"
            class="headline"
          >
            Enter Wi-Fi password for {{ setupNetwork.name }}
          </v-card-title>
          <v-card-title v-else class="headline">
            Connect to network?
          </v-card-title>
          <v-container v-if="setupNetwork.security">
            <BottomInput v-model="keyboard" :input.sync="password">
              <v-text-field
                v-model="password"
                filled
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[ rules.required, rules.min ]"
                :type="showPassword ? 'text' : 'password'"
                name="input-10-2"
                label="Wi-Fi password"
                class="input-group--focused"
                @click:append="showPassword = !showPassword"
                @click="keyboard = true"
              />
            </BottomInput>
          </v-container>

          <v-card-actions>
            <v-btn color="primary" text @click="confirmation = false">
              Cancel
            </v-btn>
            <v-btn color="primary" text :disabled="isMin" @click="startConnecting">
              Connect
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-list>
  </SettingsDialog>
</template>

<script lang="ts">
import { Vue, Component, Model, Watch } from 'nuxt-property-decorator'
import { Action, Getter, State, namespace } from 'vuex-class'
import SettingsDialog from '~/components/common/settings/SettingsDialog.vue'
import { Network } from '~/types/networking'
import BottomInput from '~/components/common/BottomInput.vue'

const settings = namespace('settingsState')

@Component({
  components: {
    SettingsDialog,
    BottomInput
  }
})
export default class extends Vue {
  @Model('input', { type: Boolean, default: false }) value!: boolean
  @Watch('value') onValueChanged (val: boolean) {
    this.isOpen = val
  }

  private isOpen: boolean = this.value

  private keyboard: boolean = false
  private confirmation: boolean = false
  private forgetConfirmation: boolean = false
  private showPassword: boolean = false
  private password: string = ''
  private rules: any = {
    required: value => !!value || 'Required.',
    min: (v) => {
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
