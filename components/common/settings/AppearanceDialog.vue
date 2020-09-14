<template>
  <SettingsDialog v-model="isOpen" @input="closeDialog">
    <template slot="title">{{$t("Appearance Settings")}}</template>
    <v-list>
      <v-list-item>
        <v-list-item-action>
          <v-checkbox :input-value="settings.darkTheme" @change="changeTheme" color="primary"></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>{{$t("Enable Dark Theme")}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
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
export default class AppearanceDialog extends Vue {
  @Model('input', { type: Boolean, default: false }) value!: boolean
  @Watch('value') onValueChanged (val: boolean) {
    this.isOpen = val
  }

  private isOpen: boolean = this.value

  @settings.Getter settings!: Settings

  changeTheme (value: boolean) {
    this.$vuetify.theme.dark = value
    this.sendDarkTheme(value)
  }

  @settings.Action sendDarkTheme!: any

  private closeDialog () {
    this.$emit('input', false)
    this.isOpen = false
  }
}

</script>

<style>
</style>