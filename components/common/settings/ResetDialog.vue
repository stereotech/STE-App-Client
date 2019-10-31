<template>
  <SettingsDialog v-model="isOpen" @input="closeDialog">
    <template slot="title">{{$t("common.settings.resetDialog.title")}}</template>
    <v-list>
      <v-list-item @click="confirmation = true">
        <v-list-item-title class="error--text">{{$t("common.settings.resetDialog.factoryReset")}}</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item @click="confirmation = true">
        <v-list-item-title class="error--text font-weight-bold">{{$t("common.settings.resetDialog.factoryResetClearStorage")}}</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
    </v-list>
    <v-dialog v-model="confirmation" max-width="425">
      <v-card>
        <v-card-title class="headline">{{$t("common.settings.resetDialog.sureFactoryReset")}}</v-card-title>
        <v-card-text>{{$t("common.settings.resetDialog.rebootMessage")}}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="confirmation = false">{{$t("frequentlyUsed.no")}}</v-btn>
          <v-btn color="error" text @click="factoryReset">{{$t("frequentlyUsed.yes")}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmationForce" max-width="425">
      <v-card>
        <v-card-title
          class="headline"
        >{{$t("common.settings.resetDialog.sureFactoryResetClear")}}</v-card-title>
        <v-card-text>{{$t("common.settings.resetDialog.rebootMessage")}}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="confirmationForce = false">{{$t("frequentlyUsed.no")}}</v-btn>
          <v-btn color="error" text @click="forceFactoryReset">{{$t("frequentlyUsed.yes")}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </SettingsDialog>
</template>

<script lang="ts">
import { Vue, Component, Model, Watch } from 'nuxt-property-decorator'
import SettingsDialog from '~/components/common/settings/SettingsDialog.vue'
import { Settings } from '~/types/settings'
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

  @settings.Action sendFactoryReset: any

  private confirmation: boolean = false
  private confirmationForce: boolean = false

  private factoryReset () {
    this.confirmation = false
    this.sendFactoryReset(false)
  }

  private forceFactoryReset () {
    this.confirmationForce = false
    this.sendFactoryReset(true)
  }

  private closeDialog () {
    this.$emit('input', false)
    this.isOpen = false
  }
}
</script>

<style>
</style>
