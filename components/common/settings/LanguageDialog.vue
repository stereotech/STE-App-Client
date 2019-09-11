<template>
  <SettingsDialog v-model="isOpen" @input="closeDialog">
    <template slot="title">Language</template>
    <v-select
      :items="settings.avaliableLanguages"
      :value="settings.language"
      @input="sendLanguage"
      filled
      label="Select language"
    ></v-select>
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

  @settings.Getter settings!: Settings
  @settings.Action sendLanguage: any

  private closeDialog () {
    this.$emit('input', false)
    this.isOpen = false
  }
}
</script>

<style>
</style>
