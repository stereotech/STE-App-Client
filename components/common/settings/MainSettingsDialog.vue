<template>
  <SettingsDialog v-model="isOpen" @input="closeDialog">
    <template slot="title">{{$t("Settings")}}</template>
    <v-list>
      <template v-for="(setting, index) in settings">
        <v-list-item :key="setting.title" @click="setting.page = true">
          <v-list-item-action>
            <v-icon>{{ setting.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="setting.translatedTitle" />
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="index" inset />
      </template>
    </v-list>
    <WifiDialog v-model="settings[0].page" />
    <DateTimeDialog v-model="settings[1].page" />
    <LanguageDialog v-model="settings[2].page" />
    <PrioritySettingsDialog v-model="settings[3].page" />
    <StorageDialog v-model="settings[4].page" />
    <ResetDialog v-model="settings[5].page" />
    <UpdateDialog v-model="settings[6].page" />
  </SettingsDialog>
</template>

<script lang="ts">
import { Vue, Component, Model, Watch } from 'nuxt-property-decorator'
import SettingsDialog from '~/components/common/settings/SettingsDialog.vue'
import WifiDialog from '~/components/common/settings/WifiDialog.vue'
import DateTimeDialog from '~/components/common/settings/DateTimeDialog.vue'
import LanguageDialog from '~/components/common/settings/LanguageDialog.vue'
import PrioritySettingsDialog from '~/components/common/settings/PrioritySettingsDialog.vue'
import StorageDialog from '~/components/common/settings/StorageDialog.vue'
import ResetDialog from '~/components/common/settings/ResetDialog.vue'
import UpdateDialog from '~/components/common/settings/UpdateDialog.vue'

@Component({
  components: {
    SettingsDialog,
    WifiDialog,
    DateTimeDialog,
    LanguageDialog,
    PrioritySettingsDialog,
    StorageDialog,
    ResetDialog,
    UpdateDialog
  }
})
export default class extends Vue {
  @Model('input', { type: Boolean, default: false }) value!: boolean
  @Watch('value') onValueChanged (val: boolean) {
    this.isOpen = val
  }

  private isOpen: boolean = this.value

  private closeDialog () {
    this.$emit('input', false)
    this.isOpen = false
  }

  private settings: Setting[] = [
    {
      icon: 'mdi-wifi',
      title: 'Wi-Fi',
      translatedTitle: 'Wi-Fi',
      page: false
    },
    {
      icon: 'mdi-clock-outline',
      title: 'Date And Time',
      translatedTitle: 'Date And Time',
      page: false
    },
    {
      icon: 'mdi-translate',
      title: 'Language',
      translatedTitle: 'Language',
      page: false
    },
    {
      icon: 'mdi-format-list-bulleted-type',
      title: 'Queue Settings',
      translatedTitle: 'Queue Settings',
      page: false
    },
    {
      icon: 'mdi-sd',
      title: 'Storage',
      translatedTitle: 'Storage',
      page: false
    },
    {
      icon: 'mdi-backup-restore',
      title: 'Reset and Restore',
      translatedTitle: 'Reset and Restore',
      page: false
    },
    {
      icon: 'mdi-update',
      title: 'Update',
      translatedTitle: 'Update',
      page: false
    }
  ]

  mounted () {
    this.settings.forEach(element => {
      element.translatedTitle = this.$tc(`${element.title}`)
    });
  }

  updated () {
    this.settings.forEach(element => {
      element.translatedTitle = this.$tc(`${element.title}`)
    });
  }
}

class Setting {
  icon: string
  title: string
  translatedTitle: string
  page: boolean
  constructor (icon: string, title: string) {
    this.icon = icon
    this.title = title
    this.translatedTitle = title
    this.page = false
  }
}
</script>

<style>
</style>
