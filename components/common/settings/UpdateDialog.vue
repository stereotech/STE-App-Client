<template>
  <SettingsDialog v-model="isOpen" @input="closeDialog">
    <template slot="title">System update</template>
    <h5
      class="headline font-weight-light text-center"
    >Current version: {{ avaliableUpdate.currentVersion }}</h5>
    <v-btn @click="checkForUpdate" rounded block color="primary" dark>Check for update</v-btn>
    <v-card>
      <v-card-text>
        <p
          v-if="isNewVersion"
          class="primary--text display-2 font-weight-light text-center"
        >{{ avaliableUpdate.newVersion }}</p>
        <p class="body-1">{{ avaliableUpdate.description }}</p>
        <v-btn
          @click="onlineUpdate"
          v-if="isNewVersion"
          rounded
          block
          color="accent"
          dark
        >Download and install</v-btn>
      </v-card-text>
    </v-card>
    <p class="subheading text-center">Install update manually</p>
    <v-container grid-list-xs>
      <v-layout row wrap>
        <v-flex xs12>
          <v-file-input chips display-size label="Upload Update" accept=".stu" v-model="file"></v-file-input>
        </v-flex>
        <v-flex xs12>
          <v-btn depressed block color="primary" @click="upload">Upload</v-btn>
        </v-flex>
      </v-layout>
      <v-overlay :value="overlay" absolute>
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-container>
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
  @settings.Action onlineUpdate: any
  @settings.Action offlineUpdate: any

  get isNewVersion (): boolean {
    return this.avaliableUpdate.currentVersion !== this.avaliableUpdate.newVersion
  }

  private closeDialog () {
    this.$emit('input', false)
    this.isOpen = false
  }

  private overlay: boolean = false

  private file: File[] = []

  private async upload () {
    this.overlay = true
    await this.offlineUpdate(this.file)
    this.file = []
    this.overlay = false
  }
}
</script>

<style>
</style>
