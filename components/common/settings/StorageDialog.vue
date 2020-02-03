<template>
  <SettingsDialog v-model="isOpen" @input="closeDialog">
    <template slot="title">{{$t("Storage")}}</template>
    <v-text-field :label="$tc('Total')" filled readonly :value="bytesTotal | prettyBytes"></v-text-field>
    <v-text-field :label="$tc('Owned')" filled readonly :value="bytesOwned | prettyBytes"></v-text-field>
    <v-text-field :label="$tc('Available')" filled readonly :value="bytesAvaliable | prettyBytes"></v-text-field>
    <v-progress-circular
      :rotate="-90"
      :width="50"
      size="288"
      :value="percentOwned"
      color="primary"
    >{{ bytesOwned | prettyBytes(1) }} / {{ bytesTotal | prettyBytes(1) }}</v-progress-circular>
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

  @settings.Getter settings!: Settings

  get bytesTotal (): number {
    return this.settings.storageTotal
  }

  get bytesOwned (): number {
    return this.bytesTotal - this.bytesAvaliable
  }

  get bytesAvaliable (): number {
    return this.settings.storageFree
  }

  get percentOwned (): number {
    return (this.bytesOwned / this.bytesTotal) * 100
  }

  private closeDialog () {
    this.$emit('input', false)
    this.isOpen = false
  }
}
</script>

<style>
</style>
