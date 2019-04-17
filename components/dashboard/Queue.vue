<template>
  <v-flex xl3 lg4 md6 sm6 xs12>
    <v-card transition="slide-y-reverse-transition" min-height="550">
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
      <v-list two-line style="max-height: 486px" class="scroll-y" v-if="queuedJobs.length > 0">
        <v-list-tile v-for="job in queuedJobs" :key="job.id + job.name" avatar>
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
      <v-container grid-list-xs v-else>
        <v-layout align-center justify-center column fill-height>
          <v-flex xs12>
            <v-img src="/empty-state/queue.svg" height="192px" width="192px" aspect-ratio="1"></v-img>
          </v-flex>
          <v-flex xs12>
            <h6 class="title text-xs-center">
              There are no queued print jobs yet. Add new one by clicking
              <v-icon color="primary">mdi-plus-circle</v-icon>&nbsp;button
            </h6>
          </v-flex>
        </v-layout>
      </v-container>
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
            <v-btn :disabled="!valid" dark flat @click="closeDialog(!editMode)">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-form v-model="valid">
          <v-container>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  label="Job name"
                  box
                  clearable
                  v-model="editedJob.name"
                  :rules="nameRules"
                ></v-text-field>
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
                  :rules="fileRules"
                ></v-autocomplete>
                <v-autocomplete
                  v-if="!editMode"
                  label="Copies"
                  box
                  :items="Array.from(new Array(100),(val,index)=>index+1)"
                  v-model="copiesCount"
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
  @printJobs.Getter jobsCount!: number
  @printJobs.Action removeJob: any
  @printJobs.Action editJob: any
  @printJobs.Action addJob: any

  @printers.Getter printers!: PrinterInfo[]
  @storage.Getter avaliableFiles!: { name: string, uri: string }[]

  private dialog: boolean = false
  private editMode: boolean = false
  private confirmation: boolean = false

  private copiesCount: number = 1;

  private valid: boolean = false

  private nameRules = [
    v => !!v || 'Name is required'
  ]

  private fileRules = [
    v => !!v || 'File should be selected'
  ]

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
      id: this.queuedJobs.length,
      name: 'Printjob_' + this.jobsCount,
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
        let jobsArray: PrintJob[] = [this.editedJob]
        for (let index = 1; index < this.copiesCount; index++) {
          let copiedJob: PrintJob = Object.assign({}, this.editedJob)
          copiedJob.name = copiedJob.name + '_' + index
          copiedJob.id += index
          jobsArray.push(copiedJob)
        }
        this.addJob(jobsArray)
      } else {
        this.editJob(this.editedJob)
      }
    }
    this.editedJob = {
      id: this.jobsCount,
      name: '',
      description: '',
      creationTime: 0,
      fileUri: '',
      printers: []
    }
    this.copiesCount = 1
  }
}
</script>

<style>
</style>
