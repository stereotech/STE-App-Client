<template>
  <SettingsDialog v-model="isOpen" @input="closeDialog">
    <template slot="title">{{$t("Language")}}</template>
    <v-select
      :items="$i18n.locales"
      item-value="code"
      item-text="name"
      :value="settings.language"
      filled
      :label="$tc('Select language')"
      @input="setLanguage"
    ></v-select>
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
  @settings.Action sendLanguage: any

  private closeDialog () {
    this.$emit('input', false)
    this.isOpen = false
  }

  private languages: { key: string, value: string }[] = [
    { key: 'English', value: 'en' },
    { key: 'Русский', value: 'ru' }
  ]

  private setLanguage (value: string) {
    this.sendLanguage(value)
    this.$i18n.setLocale(value)
    //@ts-ignore
    this.$moment.locale(value)
  }
}
</script>

<style>
</style>
