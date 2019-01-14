<template>
  <v-flex xl3 lg4 md6 sm6 xs12>
    <v-card>
      <v-toolbar flat color="secondary">
        <v-card-title>
          <span class="headline font-weight-light">Queue</span>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn small fab outline dark color="primary" @click="createJob">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list two-line style="max-height: 486px" class="scroll-y">
        <v-list-tile v-for="job in data" :key="job.id" avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ job.name }}</v-list-tile-title>
            <v-list-tile-sub-title
              class="text--primary"
            >Printer: {{ job.printer ? job.printer : '-' }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text>{{ job.created | moment("from") }}</v-list-tile-action-text>
            <v-menu bottom left>
              <v-btn slot="activator" icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile @click="editJob(job)">
                  <v-list-tile-action>
                    <v-icon>mdi-pencil</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title>Edit</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="removeJob(job)">
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
    </v-card>
    <v-dialog v-model="dialog" max-width="425" persistent :fullscreen="$vuetify.breakpoint.xs">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ editMode ? 'Edit' : 'Create' }} job</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="closeDialog(true)">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-form>
          <v-container>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="Job name" box clearable v-model="editedJob.name"></v-text-field>
                <v-autocomplete
                  lable="Printer assignment"
                  box
                  :items="avaliablePrinters"
                  v-model="editedJob.printer"
                ></v-autocomplete>
                <v-autocomplete
                  lable="File assignment"
                  box
                  :items="avaliableFiles"
                  v-model="editedJob.file"
                ></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmation" max-width="425">
      <v-card>
        <v-card-title class="headline">Do you want to remove job?</v-card-title>
        <v-card-actions>
          <v-btn color="primary" flat @click="confirmation = false">No</v-btn>
          <v-btn color="primary" flat @click="confirmation = false">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script lang="ts">
  import { Vue, Component } from 'nuxt-property-decorator'

  @Component
  export default class extends Vue {
    private data: any[] = [
      {
        id: 1,
        name: 'Printjob_1',
        printer: 'ST-AAA',
        created: Date.now()
      },
      {
        id: 2,
        name: 'Printjob_1',
        printer: 'ST-AAA',
        created: Date.now()
      },
      {
        id: 3,
        name: 'Printjob_1',
        created: Date.now()
      },
      {
        id: 4,
        name: 'Printjob_1',
        printer: 'ST-BBB',
        created: Date.now()
      },
      {
        id: 5,
        name: 'Printjob_1',
        printer: 'ST-AAA',
        created: Date.now()
      },
      {
        id: 6,
        name: 'Printjob_1',

        created: Date.now()
      },
      {
        id: 7,
        name: 'Printjob_1',

        created: Date.now()
      },
      {
        id: 8,
        name: 'Printjob_1',

        created: Date.now()
      },
      {
        id: 9,
        name: 'Printjob_1',

        created: Date.now()
      }

    ]

    private dialog: boolean = false
    private editMode: boolean = false
    private confirmation: boolean = false

    private editedJob: any = {}

    private avaliablePrinters: string[] = [
      'Not assigned',
      'ST-AAA',
      'ST-BBB',
      'ST-CCC'
    ]

    private avaliableFiles: string[] = [
      'Storage/STE320_pulley_1.gcode',
      'Storage/STE320_pulley_2.gcode',
      'Storage/STE320_pulley_3.gcode',
      'Storage/STE320_pulley_4.gcode',
      'Storage/STE320_pulley_5.gcode',
      'USB at ST-AAA/STE320_pulley_1.gcode',
      'USB at ST-AAA/STE320_pulley_2.gcode',
      'USB at ST-AAA/STE320_pulley_3.gcode',
      'USB at ST-AAA/STE320_pulley_4.gcode',
      'USB at ST-AAA/STE320_pulley_5.gcode'
    ]

    private createJob () {
      this.dialog = true
      this.editedJob = {
        name: 'Printjob_' + Date.now(),
        printer: this.avaliablePrinters[0],
        file: this.avaliableFiles[0]
      }
    }

    private editJob (job: any) {
      this.dialog = true
      this.editMode = true
      this.editedJob = job
    }

    private removeJob (job: any) {
      this.confirmation = true
      this.editedJob = job
    }

    private closeDialog (add: boolean = false) {
      this.dialog = false
      this.editedJob = {}
    }
  }
</script>

<style>
</style>
