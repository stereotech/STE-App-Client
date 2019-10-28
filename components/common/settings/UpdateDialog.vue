<template>
  <SettingsDialog v-model="isOpen" @input="closeDialog">
    <template slot="title">
      System update
    </template>
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card>
            <v-container>
              <v-row dense>
                <v-col v-if="softwareUpdateState == 0" cols="12">
                  <v-btn
                    depressed
                    block
                    outlined
                    color="primary"
                    @click="checkForUpdateManually"
                  >
                    Check for update
                  </v-btn>
                  <h5
                    class="headline primary--text text-center"
                  >
                    Current version: {{ currentVersion }}
                  </h5>
                  <h5 class="text-center">
                    You have the latest firmware
                  </h5>
                </v-col>
                <v-col v-if="softwareUpdateState == 1" cols="12">
                  <h5
                    class="headline success--text text-center"
                  >
                    New version avaliable: {{ avaliableVersion }}
                  </h5>
                  <h5 class="text-center">
                    Current version: {{ currentVersion }}
                  </h5>
                  <v-btn
                    depressed
                    block
                    color="success"
                    @click="downloadUpdateVersion"
                  >
                    Download update
                  </v-btn>
                </v-col>
                <v-col v-if="softwareUpdateState == 2" cols="12">
                  <h5 class="headline text-center">
                    Downloading {{ avaliableVersion }}...
                  </h5>
                  <v-progress-linear :indeterminate="true" />
                </v-col>
                <v-col v-if="softwareUpdateState == 3" cols="12">
                  <h5 class="headline text-center">
                    Downloading {{ downloadProgress }}%
                  </h5>
                  <v-progress-linear :value="downloadProgress" />
                </v-col>
                <v-col v-if="softwareUpdateState == 4" cols="12">
                  <h5
                    class="headline text-center"
                  >
                    Download finished. Please reboot printer to finish update
                  </h5>
                  <v-progress-linear :indeterminate="true" />
                </v-col>
                <v-col v-if="softwareUpdateState == 5" cols="12">
                  <h5 class="headline text-center">
                    Copying
                  </h5>
                  <v-progress-linear :indeterminate="true" />
                </v-col>
                <v-col v-if="softwareUpdateState == 6" cols="12">
                  <h5 class="headline error--text text-center">
                    Download failed
                  </h5>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-container v-if="softwareUpdateState < 2">
              <v-row dense>
                <v-col v-if="isWeb" cols="12">
                  <v-file-input
                    v-model="file"
                    chips
                    display-size
                    label="Upload Update"
                    accept=".stu"
                  />
                </v-col>
                <v-col v-if="isWeb" cols="12">
                  <v-btn
                    depressed
                    block
                    color="primary"
                    :disabled="file.length < 1"
                    @click="upload"
                  >
                    Upload
                  </v-btn>
                </v-col>
                <v-col v-if="updateOnUsb" cols="12">
                  <v-btn
                    depressed
                    outlined
                    block
                    color="primary"
                    @click="startUpdateFromUsb"
                  >
                    Install update from USB
                  </v-btn>
                </v-col>
              </v-row>
              <v-overlay :value="overlay" absolute>
                <v-progress-circular indeterminate size="64" />
              </v-overlay>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </SettingsDialog>
</template>

<script lang="ts">
import { Vue, Component, Model, Watch } from 'nuxt-property-decorator'
import { Action, Getter, State, namespace } from 'vuex-class'
import SettingsDialog from '~/components/common/settings/SettingsDialog.vue'
import { Settings } from '~/types/settings'
import { SoftwareUpdateState } from '~/store/updateState'

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
  @update.Action checkForUpdateManually!: any

  private closeDialog () {
    this.$emit('input', false)
    this.isOpen = false
  }

  private overlay: boolean = false

  private file: File[] | File = []

  private async upload () {
    this.overlay = true
    if (this.file) {
      await this.uploadUpdate(this.file)
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
