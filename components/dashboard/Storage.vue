<template>
  <v-flex xl3 lg4 md6 sm6 xs12>
    <v-card transition="slide-y-reverse-transition" min-height="550" v-if="dataStorage">
      <v-toolbar flat color="secondary">
        <v-card-title>
          <span class="headline font-weight-light">{{ local ? 'Storage' : 'USB' }}</span>
          <span v-if="name" class="headline font-weight-light">&nbsp;at {{ display }}</span>
        </v-card-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-list
        v-if="dataStorage.children.length > 0"
        two-line
        :style="styleObj"
        class="overflow-y-auto"
      >
        <v-list-item
          v-for="(file, index) in dataStorage.children"
          :key="index"
          @contextmenu="showContextMenu"
        >
          <v-list-item-content>
            <v-list-item-title class="subheading">{{ file.display }}</v-list-item-title>
            <v-list-item-subtitle class="body-1">Uploaded {{ file.date | moment("from") }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn @click="showContextMenu" icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
            <v-menu absolute :position-x="menuX" :position-y="menuY" v-model="showMenu">
              <v-list>
                <v-list-item @click="deleteFile(file)">
                  <v-list-item-action>
                    <v-icon>mdi-delete</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>Remove</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-container grid-list-xs v-else>
        <v-layout align-center justify-center column fill-height>
          <v-flex xs12>
            <v-img
              src="/empty-state/local-storage.svg"
              height="192px"
              width="192px"
              aspect-ratio="1"
            ></v-img>
          </v-flex>
          <v-flex xs12>
            <h6
              class="title text-center"
            >You don't have any uploaded files yet. You could add new files using dropzone below</h6>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container grid-list-xs v-if="local">
        <v-layout row wrap>
          <v-flex xs12>
            <v-file-input
              chips
              multiple
              display-size
              label="Upload G-Code Files"
              accept=".gcode"
              v-model="files"
            ></v-file-input>
          </v-flex>
          <v-flex xs12>
            <v-btn
              depressed
              block
              color="primary"
              @click="upload"
              :disabled="files.length < 1"
            >Upload</v-btn>
          </v-flex>
        </v-layout>
        <v-overlay :value="overlay" absolute z-index="3">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { State, Action, Getter, namespace } from 'vuex-class'
import { FileOrFolder } from '~/types/fileOrFolder'

const storage = namespace('storageState')

@Component
export default class extends Vue {
  @Prop({ type: Boolean, default: false }) local?: boolean
  @Prop({ type: String }) name?: string
  @Prop({ type: String }) display?: string

  @storage.Getter localStorage!: FileOrFolder
  @storage.Getter usbStorage!: (name: string) => FileOrFolder | undefined

  @storage.Action uploadFiles: any
  @storage.Action deleteFile: any

  private styleObj: any = {
    maxHeight: this.local ? '336px' : '486px'
  }

  private overlay: boolean = false

  private files: File[] = []

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

  get dataStorage (): FileOrFolder | undefined {
    if (this.local) {
      return this.localStorage
    } else {
      if (this.name !== undefined) {
        return this.usbStorage(this.name)
      }
    }
  }
}
</script>

<style>
</style>
