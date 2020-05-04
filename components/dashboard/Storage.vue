<template>
  <v-col xl="4" lg="6" md="6" sm="12" cols="12">
    <v-card v-if="dataStorage" transition="slide-y-reverse-transition" min-height="550">
      <v-toolbar flat color="secondary">
        <v-card-title class="headline font-weight-light d-inline-block text-truncate">{{cardTitle}}</v-card-title>
        <v-spacer />
        <v-btn small fab outlined color="primary" v-if="local" @click="isOpen=true">
          <v-icon>mdi-folder-plus</v-icon>
        </v-btn>
        <v-btn
          class="ml-2"
          small
          fab
          outlined
          color="primary"
          v-if="isVisible && local"
          @click="deleteLastFolder(), btnUpVisibility()"
        >
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
      </v-toolbar>
      <v-dialog v-model="isOpen" max-width="425" persistent>
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="closeDialog(undefined)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{ $t('Input folder name')}}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid">
              <BottomInput v-model="folderKeyboard" :input.sync="folderName">
                <v-text-field
                  v-model="folderName"
                  :label="$tc('Folder name')"
                  filled
                  clearable
                  :rules="folderNameRules"
                  @input="nameWasChanged = true"
                  @click="folderKeyboard = true"
                />
              </BottomInput>
              <v-btn
                text
                color="primary"
                :disabled="!valid"
                @click="createFolder()"
              >{{ $t('Create')}}</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-list
        v-if="dataStorage && dataStorage.children.length > 0"
        two-line
        :style="styleObj"
        class="overflow-y-auto"
      >
        <template v-for="(file, index) in dataStorage.children">
          <v-list-item
            :key="index"
            v-if="file.type == 'folder'"
            @click="addFolderToPath(file.name), btnUpVisibility()"
          >
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="subheading">{{ file.display }}</v-list-item-title>
              <v-list-item-subtitle class="body-1">{{ file.size | prettyBytes(1) }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-menu>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="createPrintJob">
                    <v-list-item-action>
                      <v-icon>mdi-plus</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>{{$t("Create printjob")}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="overlay = true; deleteFile(file);">
                    <v-list-item-action>
                      <v-icon>mdi-delete</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>{{$t("Remove")}}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list-item-action>
          </v-list-item>
          <v-list-item v-else :key="index">
            <v-btn
              icon
              outlined
              color="info"
              :ripple="false"
              class="mr-2"
              v-if="file.gcodeAnalysis && file.gcodeAnalysis.isFiveAxis"
            >5D</v-btn>
            <v-btn
              icon
              outlined
              color="primary"
              :ripple="false"
              class="mr-2"
              v-else-if="file.gcodeAnalysis && !file.gcodeAnalysis.isFiveAxis"
            >3D</v-btn>
            <v-btn icon outlined loading color="primary" :ripple="false" class="mr-2" v-else></v-btn>
            <v-list-item-content>
              <v-list-item-title class="subheading">{{ file.display }}</v-list-item-title>

              <v-list-item-subtitle
                class="body-1"
              >{{$t("Uploaded ")}}{{ $moment.unix(file.date).fromNow()}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-menu>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="createPrintJob(file)">
                    <v-list-item-action>
                      <v-icon color="primary">mdi-plus-circle</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>{{$t("Create printjob")}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="deleteFile(file)">
                    <v-list-item-action>
                      <v-icon>mdi-delete</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>{{$t("Remove")}}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
      <v-container v-else>
        <v-row dense align="center" justify="center">
          <v-col cols="auto">
            <v-img
              src="/empty-state/local-storage.svg"
              height="192px"
              width="192px"
              aspect-ratio="1"
            />
          </v-col>
          <v-col cols="12">
            <h6
              class="title text-center"
            >{{$t("You don't have any uploaded files yet. You could add new files using field below")}}</h6>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="local && isWeb">
        <v-row dense>
          <v-col cols="12">
            <v-file-input
              v-model="files"
              chips
              multiple
              display-size
              :label="$tc('Upload G-Code Files')"
              accept=".gcode"
            />
          </v-col>
          <v-col cols="12">
            <v-btn
              depressed
              block
              color="primary"
              :disabled="files.length < 1"
              @click="upload"
            >{{$t("Upload")}}</v-btn>
          </v-col>
        </v-row>
        <v-overlay :value="overlay" absolute z-index="3">
          <v-progress-circular indeterminate size="64" />
        </v-overlay>
      </v-container>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { State, Action, Getter, namespace } from 'vuex-class'
import { FileOrFolder } from '~/types/fileOrFolder'
import BottomInput from '~/components/common/BottomInput.vue'
import { PrintJob } from '../../types/printJob'

const storage = namespace('storageState')
const printjobs = namespace('printJobsState')

@Component({
  components: {
    BottomInput
  }
})
export default class extends Vue {
  @Prop({ type: Boolean, default: false }) local?: boolean
  @Prop({ type: String }) name?: string
  @Prop({ type: String }) display?: string


  @storage.Getter localStorage!: (path: string[]) => FileOrFolder | undefined
  @storage.Getter usbStorage!: (name: string) => FileOrFolder | undefined

  @storage.Action uploadFiles: any
  @storage.Action deleteFile: any
  @storage.Action addFolder: any

  @printjobs.Action addJob: any

  get isWeb (): boolean {
    return process.env.NUXT_ENV_PLATFORM == 'WEB'
  }

  private styleObj: any = {
    maxHeight: this.local ? '336px' : '486px'
  }

  private overlay: boolean = false
  private isVisible: boolean = false
  private isOpen: boolean = false
  private nameWasChanged: boolean = false
  private valid: boolean = false
  private folderKeyboard: boolean = false
  private folderName: string = ""
  private files: File[] = []
  private path: string[] = []

  get viewPath (): string {
    if (this.path.length > 2) {
      return '/../' + this.path[this.path.length - 1]
    } else {
      return this.path.join('')
    }
  }

  get cardTitle () {
    let prefix = this.local ? this.$tc('Storage') : this.$tc('USB')
    prefix += this.name ? ` ${this.$tc('at ')} ${this.display}` : ''
    prefix += this.viewPath
    return prefix
  }
  //
  // private addedFolder: FileOrFolder = {
  //   name: '',
  //   display: '',
  //   origin: '',
  //   path: '',
  //   size: 0
  // }
  private folderNameRules = [
    v => !!v || 'Folder name is required!'
  ]
  showMenu: boolean = false
  menuX: number = 0
  menuY: number = 0
  showContextMenu (e) {
    e.preventDefault()
    this.showMenu = false
    this.menuX = e.clientX
    this.menuY = e.clientY
    this.$nextTick(() => {
      this.showMenu = true
    })
  }

  private async upload () {
    this.overlay = true
    await this.uploadFiles(this.files)
    this.files = []
    this.overlay = false
  }

  private async closeDialog (add: boolean | undefined) {
    this.isOpen = false
  }
  get dataStorage () {
    if (this.local) {
      return this.localStorage(this.path)
    } else if (this.name !== undefined) {
      return this.usbStorage(this.name)
    }
  }

  private addFolderToPath (name: string | undefined) {
    if (this.path === undefined) {
      return this.path
    }
    else {
      return this.path.push("/", name as string)
    }

  }

  private deleteLastFolder () {
    if (this.path == undefined) {
      return this.path
    }
    else {
      this.path.splice(this.path.length - 2, 2)
      //this.btnUpVisibility()
      return this.path
    }
  }

  private btnUpVisibility () {
    if (this.path.length == 0) {
      this.isVisible = false
    }
    else {
      this.isVisible = true
    }
  }
  private createFolder () {

    this.$emit('input', false)
    let data = {
      name: this.folderName,
      path: this.path.join('')
    }
    this.overlay = true
    this.addFolder(data)
    this.overlay = false
    this.isOpen = false
    this.folderName = ''
  }

  private createPrintJob (file: FileOrFolder) {
    const jobs: PrintJob[] = [{
      id: 1,
      name: `Print ${file.name}`,
      description: this.$t('This job created automatically from file {0}', [file.display]).toString(),
      creationTime: Date.now(),
      fileUri: file.refs ? file.refs.download : '',
      printers: [],
      lastPrintTime: 0,
      successful: false,
      state: 'Queued',
      isFiveAxis: file.gcodeAnalysis ? file.gcodeAnalysis.isFiveAxis : false,
      priority: 1
    }]
    this.addJob(jobs)
  }

}
</script>

<style>
</style>
