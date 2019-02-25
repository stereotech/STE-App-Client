<template>
  <SettingsDialog v-model="isOpen" @input="closeDialog">
    <template slot="title">System update</template>
    <p class="headline font-weight-light text-xs-center">Current version: {{ avaliableUpdate.currentVersion }}</p>
    <v-btn @click="checkForUpdate" round block color="primary" dark>Check for update</v-btn>
    <v-card>
      <v-card-text>
        <p v-if="isNewVersion" class="primary--text display-2 font-weight-light text-xs-center">{{ avaliableUpdate.newVersion }}</p>
        <p class="body-1">{{ avaliableUpdate.description }}</p>
        <v-btn
          @click="downloadAndInstallUpdate"
          v-if="isNewVersion"
          round
          block
          color="accent"
          dark
        >Download and install</v-btn>
      </v-card-text>
    </v-card>
  </SettingsDialog>
</template>

<script lang="ts">
  import { Vue, Component, Model, Watch } from 'nuxt-property-decorator'
  import SettingsDialog from '~/components/common/settings/SettingsDialog.vue'
  import { Settings } from '~/types/settings'
  import { Action, Getter, State, namespace } from 'vuex-class'
  import { UpdateInfo } from '~/types/updating'

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

    @settings.Getter avaliableUpdate!: UpdateInfo
    @settings.Action checkForUpdate: any
    @settings.Action downloadAndInstallUpdate: any

    get isNewVersion (): boolean {
      return this.avaliableUpdate.currentVersion === this.avaliableUpdate.newVersion
    }

    private closeDialog () {
      this.$emit('input', false)
      this.isOpen = false
    }
  }
</script>

<style>
</style>
