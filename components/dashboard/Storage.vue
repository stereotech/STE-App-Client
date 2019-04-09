<template>
  <v-flex xl3 lg4 md6 sm6 xs12>
    <v-card transition="slide-y-reverse-transition" min-height="550" v-if="dataStorage">
      <v-toolbar flat color="secondary">
        <v-card-title>
          <span class="headline font-weight-light">{{ local ? 'Storage' : 'USB' }}</span>
          <span v-if="name" class="headline font-weight-light">&nbsp;at {{ display }}</span>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-toolbar-items></v-toolbar-items>
      </v-toolbar>

      <v-list v-if="dataStorage.children.length > 0" two-line :style="styleObj" class="scroll-y">
        <v-list-tile v-for="file in dataStorage.children" :key="file.hash">
          <v-list-tile-content>
            <v-list-tile-title class="subheading">{{ file.display }}</v-list-tile-title>
            <v-list-tile-sub-title class="body-1">Uploaded {{ file.date | moment("from") }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-menu bottom left>
              <v-btn slot="activator" icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile @click="deleteFile(file)">
                  <v-list-tile-action>
                    <v-icon>mdi-delete</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title>Remove</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-container grid-list-xs v-else>
        <v-layout align-center justify-center column fill-height>
          <v-flex xs12>
            <v-img src="/empty-state/local-storage.svg" height="192px" width="192px" aspect-ratio="1"></v-img>
          </v-flex>
          <v-flex xs12>
            <h6 class="title text-xs-center">
              You don't have any uploaded files yet. You could add new files using dropzone below
            </h6>
          </v-flex>
        </v-layout>
      </v-container>
      <dropzone v-if="local" id="dropzone" ref="el" :options="options" :destroyDropzone="true"></dropzone>
    </v-card>
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { State, Action, Getter, namespace } from 'vuex-class'
import { FileOrFolder } from '~/types/fileOrFolder'
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'

const storage = namespace('storageState')

@Component({
  components: {
    Dropzone
  }
})
export default class extends Vue {
  @Prop({ type: Boolean, default: false }) local?: boolean
  @Prop({ type: String }) name?: string
  @Prop({ type: String }) display?: string

  @storage.Getter localStorage!: FileOrFolder
  @storage.Getter usbStorage!: (name: string) => FileOrFolder | undefined

  @storage.Action deleteFile: any

  private styleObj: any = {
    maxHeight: this.local ? '336px' : '486px'
  }

  options: any = {
    url: '/local',
    uploadMultiple: true
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

  mounted () {
    // Everything is mounted and you can access the dropzone instance
    const instance = this.$refs['el']
  }
}
</script>

<style>
</style>
