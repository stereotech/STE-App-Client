<template>
  <v-dialog
    v-model="isOpen"
    max-width="425"
    persistent
    :fullscreen="$vuetify.breakpoint.xs"
    scrollable
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
      </v-toolbar>
      <v-card-text style="height: 1000px;">
        <v-list>
          <template v-for="(setting, index) in settings">
            <v-list-tile avatar :key="setting.title" @click="setting.page = true">
              <v-list-tile-action>
                <v-icon>{{ setting.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="setting.title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset :key="index"></v-divider>
          </template>
        </v-list>
      </v-card-text>
      <WifiDialog v-model="settings[0].page"/>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { Vue, Component, Model, Watch } from 'nuxt-property-decorator'
  import WifiDialog from '~/components/common/settings/WifiDialog.vue'

  @Component({
    components: {
      WifiDialog
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
        page: false
      },
      {
        icon: 'mdi-brightness-5',
        title: 'Backlight',
        page: false
      },
      {
        icon: 'mdi-clock-outline',
        title: 'Date and Time',
        page: false
      },
      {
        icon: 'mdi-translate',
        title: 'Language',
        page: false
      },
      {
        icon: 'mdi-sd   ',
        title: 'Storage',
        page: false
      },
      {
        icon: 'mdi-backup-restore',
        title: 'Reset and restore',
        page: false
      },
      {
        icon: 'mdi-update',
        title: 'Update',
        page: false
      }
    ]
  }

  class Setting {
    icon: string
    title: string
    page: boolean
    constructor (icon: string, title: string) {
      this.icon = icon
      this.title = title
      this.page = false
    }
  }
</script>

<style>
</style>
