<template>
  <v-flex xl3 lg4 md6 sm6 xs12>
    <v-card>
      <v-toolbar flat color="secondary">
        <v-card-title>
          <span class="headline font-weight-light">{{ local ? 'Storage' : 'USB' }}</span>
          <span v-if="name" class="headline font-weight-light">&nbsp;at {{ name }}</span>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-toolbar-items></v-toolbar-items>
      </v-toolbar>

      <v-list v-if="local" two-line style="max-height: 336px" class="scroll-y">
        <v-list-tile v-for="file in data" :key="file.id">
          <v-list-tile-content>
            <v-list-tile-title class="subheading">{{ file.name }}</v-list-tile-title>
            <v-list-tile-sub-title class="body-1">Uploaded {{ file.uploaded | moment("lll") }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <StorageMenu :id="file.id"/>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list v-else two-line style="max-height: 486px" class="scroll-y">
        <v-list-tile v-for="file in data" :key="file.id">
          <v-list-tile-content>
            <v-list-tile-title class="subheading">{{ file.name }}</v-list-tile-title>
            <v-list-tile-sub-title class="body-1">Uploaded {{ file.uploaded | moment("lll") }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <StorageMenu :id="file.id"/>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <dropzone v-if="local" id="dropzone" ref="el" :options="options" :destroyDropzone="true"></dropzone>
    </v-card>
  </v-flex>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'nuxt-property-decorator'
  import StorageMenu from '~/components/dashboard/StorageMenu.vue'
  import Dropzone from 'nuxt-dropzone'
  import 'nuxt-dropzone/dropzone.css'

  @Component({
    components: {
      StorageMenu,
      Dropzone
    }
  })
  export default class extends Vue {
    @Prop({ type: Boolean, default: false }) local?: boolean
    @Prop({ type: String }) name?: string

    options: any = {
      url: '/upload'
    }

    private data: any[] = [
      {
        id: 1,
        name: 'STE320_pulley_1.gcode',
        uploaded: Date.now()
      },
      {
        id: 2,
        name: 'STE320_pulley_1.gcode',
        uploaded: Date.now()
      },
      {
        id: 3,
        name: 'STE320_pulley_1.gcode',
        uploaded: Date.now()
      },
      {
        id: 4,
        name: 'STE320_pulley_1.gcode',
        uploaded: Date.now()
      },
      {
        id: 5,
        name: 'STE320_pulley_1.gcode',
        uploaded: Date.now()
      },
      {
        id: 6,
        name: 'STE320_pulley_1.gcode',
        uploaded: Date.now()
      },
      {
        id: 7,
        name: 'STE320_pulley_1.gcode',
        uploaded: Date.now()
      },
      {
        id: 8,
        name: 'STE320_pulley_1.gcode',
        uploaded: Date.now()
      },
      {
        id: 9,
        name: 'STE320_pulley_1.gcode',
        uploaded: Date.now()
      },
      {
        id: 10,
        name: 'STE320_pulley_1.gcode',
        uploaded: Date.now()
      }
    ]

    mounted () {
      // Everything is mounted and you can access the dropzone instance
      const instance = this.$refs['el']
    }
  }
</script>

<style>
</style>
