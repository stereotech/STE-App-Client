<template>
  <SettingsDialog v-model="isOpen" @input="closeDialog">
    <template slot="title">System update</template>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs12 v-if="softwareUpdateState == 0">
                  <h5
                    class="headline primary--text text-center"
                  >Current version: {{ currentVersion }}</h5>
                  <h5 class="text-center">You have the latest firmware</h5>
                </v-flex>
                <v-flex xs12 v-if="softwareUpdateState == 1">
                  <h5
                    class="headline success--text text-center"
                  >New version avaliable: {{ avaliableVersion }}</h5>
                  <h5 class="text-center">Current version: {{ currentVersion }}</h5>
                  <v-btn
                    depressed
                    block
                    color="success"
                    @click="downloadUpdateVersion"
                  >Download update</v-btn>
                </v-flex>
                <v-flex xs12 v-if="softwareUpdateState == 2">
                  <h5 class="headline text-center">Downloading {{ avaliableVersion }}...</h5>
                  <v-progress-linear :indeterminate="true"></v-progress-linear>
                </v-flex>
                <v-flex xs12 v-if="softwareUpdateState == 3">
                  <h5 class="headline text-center">Downloading {{ downloadProgress }}%</h5>
                  <v-progress-linear :value="downloadProgress"></v-progress-linear>
                </v-flex>
                <v-flex xs12 v-if="softwareUpdateState == 4">
                  <h5
                    class="headline text-center"
                  >Download finished. Please reboot printer to finish update</h5>
                  <v-progress-linear :indeterminate="true"></v-progress-linear>
                </v-flex>
                <v-flex xs12 v-if="softwareUpdateState == 5">
                  <h5 class="headline text-center">Copying</h5>
                  <v-progress-linear :indeterminate="true"></v-progress-linear>
                </v-flex>
                <v-flex xs12 v-if="softwareUpdateState == 6">
                  <h5 class="headline error--text text-center">Download failed</h5>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card>
            <v-container grid-list-md v-if="softwareUpdateState < 2">
              <v-layout row wrap>
                <v-flex xs12 v-if="isWeb">
                  <v-file-input
                    chips
                    display-size
                    label="Upload Update"
                    accept=".stu"
                    v-model="file"
                  ></v-file-input>
                </v-flex>
                <v-flex xs12 v-if="isWeb">
                  <v-btn
                    depressed
                    block
                    color="primary"
                    @click="upload"
                    :disabled="file.length < 1"
                  >Upload</v-btn>
                </v-flex>
                <v-flex xs12 v-if="updateOnUsb">
                  <v-btn
                    depressed
                    outlined
                    block
                    color="primary"
                    @click="startUpdateFromUsb"
                  >Install update from USB</v-btn>
                </v-flex>
              </v-layout>
              <v-overlay :value="overlay" absolute>
                <v-progress-circular indeterminate size="64"></v-progress-circular>
              </v-overlay>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </SettingsDialog>
</template>

<script lang="ts">
import { Vue, Component, Model, Watch } from 'nuxt-property-decorator'
import SettingsDialog from '~/components/common/settings/SettingsDialog.vue'
import { Settings } from '~/types/settings'
import { Action, Getter, State, namespace } from 'vuex-class'
import { SoftwareUpdateState } from '~/store/updateState';

const update = namespace('updateState')

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

  get isWeb (): boolean {
    return process.env.NUXT_ENV_PLATFORM == 'WEB'
  }

  @update.Getter currentVersion!: string
  @update.Getter softwareUpdateState!: SoftwareUpdateState
  @update.Getter downloadProgress!: number
  @update.Getter avaliableVersion!: string
  @update.Getter updateOnUsb!: boolean

  @update.Action startUpdateFromUsb!: any
  @update.Action uploadUpdate!: any
  @update.Action downloadUpdateVersion!: any
  @update.Action fetchCurrentVersion!: any


  private closeDialog () {
    this.$emit('input', false)
    this.isOpen = false
  }

  private overlay: boolean = false

  private file: File[] = []

  private async upload () {
    this.overlay = true
    if (this.file && this.file.length > 0) {
      await this.uploadUpdate(this.file[0])
    }
    this.file = []
    this.overlay = false
  }

  private async mounted () {
    await this.fetchCurrentVersion()
  }
}
</script>

<style>
</style>
