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
        <v-list-item v-for="file in dataStorage.children" :key="file.hash">
          <v-list-item-content>
            <v-list-item-title class="subheading">{{ file.display }}</v-list-item-title>
            <v-list-item-subtitle class="body-1">Uploaded {{ file.date | moment("from") }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-menu bottom left>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
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
              class="title text-xs-center"
            >You don't have any uploaded files yet. You could add new files using dropzone below</h6>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container grid-list-xs>
        <v-layout row wrap>
          <v-flex xs12>
            <v-file-input chips multiple display-size label="Upload G-Code Files" accept=".gcode"></v-file-input>
          </v-flex>
        </v-layout>
      </v-container>
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
    url: this.$store.state.apiUrl + 'storage/local',
    uploadMultiple: false,
    maxFilesize: 200,
    createImageThumbnails: false,
    thumbnailWidth: 50,
    addRemoveLinks: true
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
