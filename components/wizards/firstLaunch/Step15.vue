<template>
  <WizardStep :step="step">
    <v-container>
      <v-row dense align="center" justify="space-around">
        <v-col cols="12">
          <v-card>
            <v-list light>
              <v-list-item>
                <v-list-item-action>
                  <v-switch
                    false-value="WIRELESS"
                    true-value="HOTSPOT"
                    v-model="currentMethod"
                    @change="setConnectedMethod"
                  ></v-switch>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title
                    v-if="currentMethod === 'HOTSPOT'"
                  >{{ $t("Disable Wi-Fi hotspot") }}</v-list-item-title>
                  <v-list-item-title v-else>{{ $t("Enable Wi-Fi hotspot") }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="refreshNetworks">
                <v-list-item-action>
                  <v-icon>mdi-cached</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ $t("Refresh networks") }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-subheader>{{$t("Available networks")}}</v-subheader>
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
              <v-dialog v-model="confirmation" max-width="425" light>
                <v-card>
                  <v-card-title
                    v-if="setupNetwork.security"
                    class="headline"
                  >{{$t("Enter Wi-Fi password for {0}", [setupNetwork.name])}}</v-card-title>
                  <v-card-title v-else class="headline">{{$t("Connect to network?")}}</v-card-title>
                  <v-container v-if="setupNetwork.security">
                    <BottomInput v-model="keyboard" :input.sync="password">
                      <v-text-field
                        v-model="password"
                        filled
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[ rules.required, rules.min ]"
                        :type="showPassword ? 'text' : 'password'"
                        name="input-10-2"
                        :label="$tc('Wi-Fi password')"
                        class="input-group--focused"
                        @click:append="showPassword = !showPassword"
                        @click="keyboard = true"
                      />
                    </BottomInput>
                  </v-container>

                  <v-card-actions>
                    <v-btn
                      x-large
                      color="primary"
                      depressed
                      @click="confirmation = false"
                    >{{$t("Cancel")}}</v-btn>
                    <v-btn
                      x-large
                      color="primary"
                      depressed
                      :disabled="isMin"
                      @click="startConnecting"
                    >{{$t("Connect")}}</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-btn block x-large depressed color="accent" @click="next(15)">{{$t("Next")}}</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </WizardStep>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
import { Action, Getter, State, namespace } from 'vuex-class'
import WizardStep from '~/components/wizards/WizardStep.vue'
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
  private step?: number = 14
  private curStep?: number = this.currentStep

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

  @settings.Getter avaliableNetworks!: Network[]
  @settings.Getter currentNetwork!: Network[]
  @settings.Getter connectedMethod!: string
  @settings.Action getWifiNetworks: any
  @settings.Action connectWifiNetwork: any
  @settings.Action forgetWifiNetwork: any
  @settings.Action getConnectedMethod: any
  @settings.Action setConnectedMethod: any

  private currentMethod: string = 'WIRELESS'

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

  private startForgetting (index: number) {
    if (this.currentNetwork !== undefined) {
      this.forgetWifiNetwork(this.currentNetwork[index].id)
    }
    this.forgetConfirmation = false
  }

  async mounted () {
    await this.refreshNetworks()
  }

  private async refreshNetworks () {
    await this.getConnectedMethod()
    await this.getWifiNetworks()
    this.currentMethod = this.connectedMethod
  }

  private next (step: number) {
    this.$emit('change', step)
    this.curStep = step
  }
}
</script>

<style>
</style>
