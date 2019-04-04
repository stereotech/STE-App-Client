<template>
  <v-flex xl3 lg4 md6 sm6 xs12>
    <v-card>
      <v-toolbar flat color="secondary">
        <v-card-title>
          <span class="headline font-weight-light">Queue</span>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn small fab depressed dark color="primary" @click="createJob">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list two-line style="max-height: 486px" class="scroll-y">
        <v-list-tile v-for="job in queuedJobs" :key="job.id" avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ job.name }}</v-list-tile-title>
            <v-list-tile-sub-title
              class="body-1"
            >Printers: {{ job.printers.length > 0 ? job.printers.toString() : '-' }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text>{{ job.creationTime | moment("from") }}</v-list-tile-action-text>
            <v-menu bottom left>
              <v-btn slot="activator" icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile @click="startEditJob(job)">
                  <v-list-tile-action>
                    <v-icon>mdi-pencil</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title>Edit</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="startRemoveJob(job)">
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
          <v-btn icon dark @click="closeDialog(undefined)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ editMode ? 'Edit' : 'Create' }} job</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="closeDialog(!editMode)">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-form>
          <v-container>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="Job name" box clearable v-model="editedJob.name"></v-text-field>
                <v-autocomplete
                  label="Printer assignment"
                  box
                  chips
                  multiple
                  :items="printers"
                  item-text="name"
                  item-value="id"
                  v-model="editedJob.printers"
                ></v-autocomplete>
                <v-autocomplete
                  label="File assignment"
                  box
                  :items="avaliableFiles"
                  item-text="name"
                  item-value="uri"
                  v-model="editedJob.fileUri"
                ></v-autocomplete>
                <v-textarea box label="Description" auto-grow v-model="editedJob.description"></v-textarea>
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
          <v-btn color="primary" flat @click="endRemoveJob">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import { PrinterInfo } from '~/types/printer'
import { FileOrFolder } from '~/types/fileOrFolder'
import { PrintJob } from '~/types/printJob';

const printJobs = namespace('printJobsState')
const printers = namespace('printersState')
const storage = namespace('storageState')

@Component
export default class extends Vue {
  @printJobs.Getter queuedJobs!: PrintJob[]
  @printJobs.Action removeJob: any
  @printJobs.Action editJob: any
  @printJobs.Action addJob: any

  @printers.Getter printers!: PrinterInfo[]
  @storage.Getter avaliableFiles!: { name: string, uri: string }[]

  private dialog: boolean = false
  private editMode: boolean = false
  private confirmation: boolean = false

  private editedJob: PrintJob = {
    id: 0,
    name: '',
    description: '',
    creationTime: 0,
    fileUri: '',
    printers: []
  }

  private createJob () {
    this.editMode = false
    this.dialog = true
    this.editedJob = {
      id: 3,
      name: 'Printjob_' + Date.now(),
      description: '',
      printers: [],
      fileUri: '',
      creationTime: Date.now()
    }
  }

  private startEditJob (job: PrintJob) {
    this.dialog = true
    this.editMode = true
    Object.assign(this.editedJob, job)
  }

  private startRemoveJob (job: PrintJob) {
    this.confirmation = true
    this.editedJob = job
  }

  private endRemoveJob () {
    this.confirmation = false
    this.removeJob(this.editedJob)
  }

  private removePrinter (item: string) {
    const index = this.editedJob.printers.indexOf(item)
    if (index >= 0) this.editedJob.printers.splice(index, 1)
  }

  private closeDialog (add: boolean | undefined) {
    this.dialog = false
    if (add !== undefined) {
      if (add) {
        this.addJob(this.editedJob)
      } else {
        this.editJob(this.editedJob)
      }
    }
    this.editedJob = {
      id: 0,
      name: '',
      description: '',
      creationTime: 0,
      fileUri: '',
      printers: []
    }
  }
}
</script>

<style>
</style>
