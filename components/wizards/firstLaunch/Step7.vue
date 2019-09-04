<template>
  <WizardStep :step="step">
    <v-container grid-list-xl>
      <v-layout align-center justify-space-around column fill-height>
        <v-flex xs12>
          <v-card>
            <v-list light>
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
                    <v-list-item-title v-text="network.name"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action v-if="network.security">
                    <v-icon>mdi-lock</v-icon>
                  </v-list-item-action>
                </v-list-item>
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
                    <BottomInput :input.sync="password" v-model="keyboard">
                      <v-text-field
                        filled
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[ rules.required, rules.min ]"
                        :type="showPassword ? 'text' : 'password'"
                        name="input-10-2"
                        label="Wi-Fi password"
                        class="input-group--focused"
                        v-model="password"
                        @click:append="showPassword = !showPassword"
                        @click="keyboard = true"
                      ></v-text-field>
                    </BottomInput>
                  </v-container>

                  <v-card-actions>
                    <v-btn color="primary" text @click="confirmation = false">Cancel</v-btn>
                    <v-btn color="primary" text @click="startConnecting" :disabled="isMin">Connect</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-btn block large text @click="next(8)">Next</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </WizardStep>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
import WizardStep from '~/components/wizards/WizardStep.vue'
import { Action, Getter, State, namespace } from 'vuex-class'
import { Network } from '~/types/networking'
import BottomInput from '~/components/common/BottomInput.vue'

const settings = namespace('settingsState')

@Component({
  components: {
    WizardStep,
    BottomInput
  }
})
export default class extends Vue {
  @Model('change', { type: Number, default: 1, required: true }) currentStep?: number
  @Watch('currentStep') onCurrentStepChanged (val: number) {
    this.curStep = val
  }
  private step?: number = 7
  private curStep?: number = this.currentStep

  private keyboard: boolean = false
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

  private next (step: number) {
    this.$emit('change', step)
    this.curStep = step
  }
}
</script>

<style>
</style>