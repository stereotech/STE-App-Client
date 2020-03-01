<template>
  <v-col xl="4" lg="6" md="6" sm="12" cols="12">
    <v-card v-if="dataStorage" transition="slide-y-reverse-transition" min-height="550">
      <v-toolbar flat color="secondary">
        <v-card-title>
          <span class="headline font-weight-light">{{ local ? $t('Storage') : $t('USB') }}</span>
          <span v-if="name" class="headline font-weight-light">&nbsp;{{$t('at ')}} {{ display }}</span>
        </v-card-title>
        <v-card-subtitle>
          
        </v-card-subtitle>
        <v-spacer />
        <v-spacer></v-spacer>
        <v-btn outlined icon color="primary" v-if="local" @click="isOpen=true">
          <v-icon>mdi-folder-plus</v-icon>
        </v-btn>
        <v-btn outlined icon color="primary" v-if="isVisible && local" @click="deleteLastFolder(), btnUpVisibility()">
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
      </v-toolbar>
      <v-dialog
        v-model="isOpen"
        max-width="425"
        persistent
        :fullscreen="$vuetify.breakpoint.smAndDown"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="closeDialog(undefined)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Input folder name</v-toolbar-title> 
          </v-toolbar>
          <v-form v-model="valid">
            <BottomInput >
              <v-text-field

                  :label="$tc('Folder name')"
                  filled
                  clearable
                  :rules="folderNameRules"
                  @input="nameWasChanged = true"
                  @click="nameKeyboard = true"
              />
            </BottomInput>
            <v-btn :disabled="!valid">
              Create
            </v-btn>
            <v-btn>
              Cancel
            </v-btn>
          </v-form>
        </v-card>
      </v-dialog>
      <v-list
        v-if="dataStorage && dataStorage.children.length > 0"
        two-line
        :style="styleObj"
        class="overflow-y-auto"
      >
        <v-list-item v-for="(file, index) in dataStorage.children" :key="index">
            <v-list-item-icon v-if="file.type=='folder'">
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
          <v-list-item-content :disabled="file.type=='machinecode'||file.type=='gcode'"
            @click="addFolderToPath(file.name), btnUpVisibility()"
          >

            <v-list-item-title class="subheading">
              {{ file.display }}
              <v-chip
                color="info"
                v-if="file.gcodeAnalysis && file.gcodeAnalysis.isFiveAxis"
                class="ml-2"
                outlined
                label
                x-small
              >5D</v-chip>
            </v-list-item-title>

            <v-list-item-subtitle
              v-if="file.type=='machinecode'||file.type=='gcode'"
              class="body-1"
            >{{$t("Uploaded ")}}{{ $moment(file.date).fromNow()}}</v-list-item-subtitle>
            <v-list-item-subtitle
              v-else
              class="body-1"
            >{{$t(file.size)}} {{$t("Kb")}}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-menu>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
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
            >Upload</v-btn>
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

const storage = namespace('storageState')

@Component
export default class extends Vue {
  @Prop({ type: Boolean, default: false }) local?: boolean
  @Prop({ type: String }) name?: string
  @Prop({ type: String }) display?: string


  @storage.Getter localStorage!: (path: string[]) => FileOrFolder | undefined
  @storage.Getter usbStorage!: (name: string) => FileOrFolder | undefined

  @storage.Action uploadFiles: any
  @storage.Action deleteFile: any

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
  private files: File[] = []
  private path: string[] = []
  //

  private folderNameRules = [
    v=>!!v || 'Folder name is required!'
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

  private async closeDialog(add: boolean | undefined){
    this.isOpen = false
  }
  get dataStorage () {
    if (this.local) {
      return this.localStorage(this.path)
    } else if (this.name !== undefined) {
      return this.usbStorage(this.name)
    }
  }

  private addFolderToPath(name: string | undefined){
    if(this.path===undefined){
      return this.path
    }
    else{
      return this.path.push("/", name as string)
    }

  }

  private deleteLastFolder(){
    if(this.path==undefined){
      return this.path
    }
    else{
      this.path.splice(this.path.length-2,2)
      //this.btnUpVisibility()
      return this.path
    }
  }

  private btnUpVisibility(){
    if(this.path.length==0){
      this.isVisible=false 
    }
    else{
      this.isVisible=true
    }
  }

}
</script>

<style>
</style>
