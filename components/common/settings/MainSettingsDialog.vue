<template>
  <SettingsDialog v-model="isOpen" @input="closeDialog">
    <template slot="title">{{$t("common.settings.mainSettingsDialog.title", settings.language)}}</template>
    <v-list>
      <template v-for="(setting, index) in settings">
        <v-list-tile avatar :key="setting.title" @click="setting.page = true">
          <v-list-tile-action>
            <v-icon>{{ setting.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="$t(`common.settings.settingsTitle[${setting.title}]`)"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider inset :key="index"></v-divider>
      </template>
    </v-list>
    <WifiDialog v-model="settings[0].page"/>
    <DateTimeDialog v-model="settings[1].page"/>
    <LanguageDialog v-model="settings[2].page"/>
    <StorageDialog v-model="settings[3].page"/>
    <ResetDialog v-model="settings[4].page"/>
    <UpdateDialog v-model="settings[5].page"/>
  </SettingsDialog>
</template>

<script lang="ts">
import { Vue, Component, Model, Watch } from 'nuxt-property-decorator'
import SettingsDialog from '~/components/common/settings/SettingsDialog.vue'
import WifiDialog from '~/components/common/settings/WifiDialog.vue'
import DateTimeDialog from '~/components/common/settings/DateTimeDialog.vue'
import LanguageDialog from '~/components/common/settings/LanguageDialog.vue'
import StorageDialog from '~/components/common/settings/StorageDialog.vue'
import ResetDialog from '~/components/common/settings/ResetDialog.vue'
import UpdateDialog from '~/components/common/settings/UpdateDialog.vue'

@Component({
  components: {
    SettingsDialog,
    WifiDialog,
    DateTimeDialog,
    LanguageDialog,
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
      title: 0,
      page: false
    },
    {
      icon: 'mdi-clock-outline',
      title: 1,
      page: false
    },
    {
      icon: 'mdi-translate',
      title: 2,
      page: false
    },
    {
      icon: 'mdi-sd   ',
      title: 3,
      page: false
    },
    {
      icon: 'mdi-backup-restore',
      title: 4,
      page: false
    },
    {
      icon: 'mdi-update',
      title: 5,
      page: false
    }
  ]
}

class Setting {
  icon: string
  title: number
  page: boolean
  constructor (icon: string, title: number) {
    this.icon = icon
    this.title = title
    this.page = false
  }
}
</script>

<style>
</style>
