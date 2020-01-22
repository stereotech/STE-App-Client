<template>
  <SettingsDialog v-model="isOpen" @input="closeDialog">
    <template slot="title">{{$t("common.settings.languageDialog.title")}}</template>
    <v-select
      :items="$i18n.locales"
      item-value="code"
      item-text="name"
      :value="settings.language"
      @input="sendLanguage"
      filled
      :label="$tc('labels.selectLanguage')"
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

  private languages: { key: string, value: string }[] = [
    { key: 'English', value: 'en' },
    { key: 'Русский', value: 'ru' }
  ]

  private setLanguage (value: string) {
    this.setLanguage(value)
    this.$i18n.locale = value
    //@ts-ignore
    this.$moment.locale(value)
  }
}
</script>

<style>
</style>
