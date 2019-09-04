<template>
  <v-flex xl4 lg6 md6 sm12 xs12>
    <v-card transition="slide-y-reverse-transition" min-height="550">
      <v-toolbar flat color="secondary">
        <v-card-title>
          <span class="headline font-weight-light">Queue</span>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-btn small fab depressed dark color="primary" @click="createJob">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list
        two-line
        style="max-height: 486px"
        class="overflow-y-auto"
        v-if="queuedJobs.length > 0"
      >
        <v-list-item
          v-for="job in queuedJobs"
          :key="job.id + job.name"
          @contextmenu="showContextMenu"
        >
          <v-list-item-content>
            <v-list-item-title>{{ job.name }}</v-list-item-title>
            <v-list-item-subtitle v-if="job.state === 'Dequeued'">
              <v-progress-linear :indeterminate="true"></v-progress-linear>
            </v-list-item-subtitle>
            <v-list-item-subtitle
              class="body-1"
              v-else
            >Printers: {{ job.printers.length > 0 ? job.printers.toString() : '-' }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>{{ job.creationTime | moment("from") }}</v-list-item-action-text>
            <v-btn @click="showContextMenu" icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
            <v-menu
              v-if="job.state === 'Queued'"
              absolute
              v-model="showMenu"
              :position-x="menuX"
              :position-y="menuY"
            >
              <v-list>
                <v-list-item @click="startEditJob(job)">
                  <v-list-item-action>
                    <v-icon>mdi-pencil</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>
                <v-list-item @click="startRemoveJob(job)">
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
            <v-img src="/empty-state/queue.svg" height="192px" width="192px" aspect-ratio="1"></v-img>
          </v-flex>
          <v-flex xs12>
            <h6 class="title text-center">
              There are no queued print jobs yet. Add new one by clicking
              <v-icon color="primary">mdi-plus-circle</v-icon>&nbsp;button
            </h6>
          </v-flex>
        </v-layout>
        <v-overlay :value="overlay" absolute z-index="3">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </v-container>
    </v-card>
    <v-dialog
      v-model="dialog"
      max-width="425"
      persistent
      :fullscreen="$vuetify.breakpoint.smAndDown"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closeDialog(undefined)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ editMode ? 'Edit' : 'Create' }} job</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn :disabled="!valid" dark text @click="closeDialog(!editMode)">Save</v-btn>
        </v-toolbar>
        <v-form v-model="valid">
          <v-container fluid grid-list-sm>
            <v-layout row wrap>
              <v-flex xs12 sm6 md12>
                <v-text-field
                  label="Job name"
                  filled
                  clearable
                  v-model="editedJob.name"
                  :rules="nameRules"
                  @input="nameWasChanged = true"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-autocomplete
                  label="File assignment"
                  filled
                  :items="avaliableFiles"
                  item-text="name"
                  item-value="uri"
                  v-model="editedJob.fileUri"
                  :rules="fileRules"
                  @input="changeNameFromFile"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-autocomplete
                  label="Printer assignment"
                  filled
                  chips
                  multiple
                  :items="printers"
                  item-text="name"
                  item-value="id"
                  v-model="editedJob.printers"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-autocomplete
                  v-if="!editMode"
                  label="Copies"
                  filled
                  :items="Array.from(new Array(100),(val,index)=>index+1)"
                  v-model="copiesCount"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12>
                <v-textarea filled label="Description" auto-grow v-model="editedJob.description"></v-textarea>
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
          <v-btn color="primary" text @click="confirmation = false">No</v-btn>
          <v-btn color="primary" text @click="endRemoveJob">Yes</v-btn>
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

  private overlay: boolean = false
  private dialog: boolean = false
  private editMode: boolean = false
  private confirmation: boolean = false

  private nameWasChanged: boolean = false

  private changeNameFromFile (value: string) {
    if (!this.nameWasChanged) {
      let filenameWithExt = value.split('/').pop()
      if (filenameWithExt) {
        let filename = filenameWithExt.split('.').shift()
        this.editedJob.name = `Print ${filename}`
      }
    }
  }

  private copiesCount: number = 1

  private valid: boolean = false

  private nameRules = [
    v => !!v || 'Name is required'
  ]

  private fileRules = [
    v => !!v || 'File should be selected'
  ]

  openKeyboard () {
    console.log('open keyboard')
  }

  private editedJob: PrintJob = {
    id: 0,
    name: '',
    description: '',
    creationTime: 0,
    fileUri: '',
    printers: [],
    lastPrintTime: 0,
    successful: false,
    state: ''
  }

  private createJob () {
    this.editMode = false
    this.dialog = true
    this.editedJob = {
      id: this.queuedJobs.length,
      name: 'Printjob' + this.jobsCount,
      description: '',
      printers: [],
      fileUri: '',
      creationTime: Date.now(),
      lastPrintTime: 0,
      successful: false,
      state: ''
    }
  }

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

  private startEditJob (job: PrintJob) {
    this.dialog = true
    this.editMode = true
    Object.assign(this.editedJob, job)
  }

  private startRemoveJob (job: PrintJob) {
    this.confirmation = true
    this.editedJob = job
  }

  private async endRemoveJob () {
    this.confirmation = false
    this.overlay = true
    await this.removeJob(this.editedJob)
    this.overlay = false
  }

  private removePrinter (item: string) {
    const index = this.editedJob.printers.indexOf(item)
    if (index >= 0) this.editedJob.printers.splice(index, 1)
  }

  private async closeDialog (add: boolean | undefined) {
    this.dialog = false
    this.nameWasChanged = false
    if (add !== undefined) {
      if (add) {
        let jobsArray: PrintJob[] = [this.editedJob]
        for (let index = 1; index < this.copiesCount; index++) {
          let copiedJob: PrintJob = Object.assign({}, this.editedJob)
          copiedJob.name = copiedJob.name + '(' + index + ')'
          copiedJob.id += index
          jobsArray.push(copiedJob)
        }
        this.overlay = true
        await this.addJob(jobsArray)
        this.overlay = false
      } else {
        let emptyIdx = this.editedJob.printers.indexOf('')
        if (emptyIdx > -1) {
          this.editedJob.printers.splice(emptyIdx, 1)
        }
        this.overlay = true
        await this.editJob(this.editedJob)
        this.overlay = false
      }
    }
    this.editedJob = {
      id: this.jobsCount,
      name: '',
      description: '',
      creationTime: 0,
      fileUri: '',
      printers: [],
      lastPrintTime: 0,
      successful: false,
      state: ''
    }
    this.copiesCount = 1
  }
}
</script>

<style>
</style>
