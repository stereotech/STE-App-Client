<template>
  <SettingsDialog v-model="isOpen" @input="closeDialog">
    <template slot="title">{{ $t("Reset and Restore") }}</template>
    <v-list>
      <v-list-item @click="confirmationCleanup = true">
        <v-list-item-title class="warning--text">{{
          $t("Clean Storage")
        }}</v-list-item-title>
      </v-list-item>
      <v-divider />
      <v-list-item @click="confirmation = true">
        <v-list-item-title class="error--text">{{
          $t("Factory Reset")
        }}</v-list-item-title>
      </v-list-item>
      <v-divider />
      <v-list-item @click="confirmationForce = true">
        <v-list-item-title class="error--text font-weight-bold">{{
          $t("Factory reset (clear storage)")
        }}</v-list-item-title>
      </v-list-item>
      <v-divider />
    </v-list>
    <v-dialog v-model="confirmation" max-width="425">
      <v-card>
        <v-card-title class="headline">{{
          $t("Are you sure want to make factory reset?")
        }}</v-card-title>
        <v-card-text>{{
          $t("Printer will reboot after confirmation")
        }}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="confirmation = false">{{
            $t("No")
          }}</v-btn>
          <v-btn color="error" text @click="factoryReset">{{
            $t("Yes")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmationForce" max-width="425">
      <v-card>
        <v-card-title class="headline">{{
          $t("Are you sure want to make factory reset and clear all user data?")
        }}</v-card-title>
        <v-card-text>{{
          $t("Printer will reboot after confirmation")
        }}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="confirmationForce = false">{{
            $t("No")
          }}</v-btn>
          <v-btn color="error" text @click="forceFactoryReset">{{
            $t("Yes")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmationCleanup" max-width="425">
      <v-card>
        <v-card-title class="headline">{{
          $t("Are you sure want clean internal storage?")
        }}</v-card-title>
        <v-card-actions>
          <v-btn color="primary" text @click="confirmationCleanup = false">{{
            $t("No")
          }}</v-btn>
          <v-btn color="error" text @click="cleanup">{{ $t("Yes") }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </SettingsDialog>
</template>

<script lang="ts">
import { Vue, Component, Model, Watch } from 'nuxt-property-decorator'
import { Action, Getter, State, namespace } from 'vuex-class'
import SettingsDialog from '~/components/common/settings/SettingsDialog.vue'
import { Settings } from '~/types/settings'

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
  @settings.Action sendCleanStorage: any

  private confirmation: boolean = false
  private confirmationCleanup: boolean = false
  private confirmationForce: boolean = false

  private factoryReset () {
    this.confirmation = false
    this.sendFactoryReset(false)
  }

  private forceFactoryReset () {
    this.confirmationForce = false
    this.sendFactoryReset(true)
  }

  cleanup () {
    this.confirmationCleanup = false
    this.sendCleanStorage()
  }

  private closeDialog () {
    this.$emit('input', false)
    this.isOpen = false
  }
}
</script>

<style>
</style>
