<template>
  <v-col xl="4" lg="6" md="6" sm="12" cols="12">
    <v-card transition="slide-y-reverse-transition" min-height="550">
      <v-toolbar flat>
        <v-card-title>
          <span class="headline font-weight-light">{{ $t("Queue") }}</span>
        </v-card-title>
        <v-spacer />
        <v-btn small fab depressed dark color="primary" @click="createJob">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list
        v-if="queuedJobs.length > 0"
        two-line
        subheader
        style="max-height: 486px"
        class="overflow-y-auto"
      >
        <v-subheader class="error--text" v-if="highPriorityJobs.length > 0">
          <v-icon color="error" left>mdi-chevron-double-up</v-icon>
          {{ $t("High Priority") }}
        </v-subheader>
        <v-list-item v-for="job in highPriorityJobs" :key="job.id">
          <template v-if="settings.queueIgnoreAnalysis"></template>
          <v-btn
            icon
            outlined
            color="info"
            :ripple="false"
            class="mr-2"
            v-else-if="job.isFiveAxis"
            >5D</v-btn
          >

          <v-btn
            icon
            outlined
            color="primary"
            :ripple="false"
            class="mr-2"
            v-else
            >3D</v-btn
          >
          <v-list-item-content>
            <v-list-item-title>{{ job.name }}</v-list-item-title>

            <v-list-item-subtitle v-if="job.state === 'Dequeued'">
              <v-progress-linear :indeterminate="true" />
            </v-list-item-subtitle>
            <v-list-item-subtitle v-else class="body-1"
              >{{ $t("File: ")
              }}{{ fileName(job.fileUri) }}</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>{{
              $moment.unix(job.creationTime).fromNow()
            }}</v-list-item-action-text>

            <v-menu v-if="job.state === 'Queued'">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  color="error"
                  v-if="job.priority != 2"
                  @click="changePriority({ job: job, priority: 2 })"
                >
                  <v-list-item-action>
                    <v-icon>mdi-chevron-double-up</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>{{ $t("High") }}</v-list-item-title>
                </v-list-item>
                <v-list-item
                  color="primary"
                  v-if="job.priority != 1"
                  @click="changePriority({ job: job, priority: 1 })"
                >
                  <v-list-item-action>
                    <v-icon>mdi-circle-double</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>{{ $t("Normal") }}</v-list-item-title>
                </v-list-item>
                <v-list-item
                  color="gray"
                  v-if="job.priority != 0"
                  @click="changePriority({ job: job, priority: 0 })"
                >
                  <v-list-item-action>
                    <v-icon>mdi-chevron-double-down</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>{{ $t("Low") }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="startEditJob(job)">
                  <v-list-item-action>
                    <v-icon>mdi-pencil</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>{{ $t("Edit") }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="startRemoveJob(job)">
                  <v-list-item-action>
                    <v-icon>mdi-delete</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>{{ $t("Remove") }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-action>
        </v-list-item>
        <v-subheader class="primary--text" v-if="normalPriorityJobs.length > 0">
          <v-icon color="primary" left>mdi-circle-double</v-icon>
          {{ $t("Normal Priority") }}
        </v-subheader>
        <v-list-item v-for="job in normalPriorityJobs" :key="job.id">
          <template v-if="settings.queueIgnoreAnalysis"></template>
          <v-btn
            icon
            outlined
            color="info"
            :ripple="false"
            class="mr-2"
            v-else-if="job.isFiveAxis"
            >5D</v-btn
          >
          <v-btn
            icon
            outlined
            color="primary"
            :ripple="false"
            class="mr-2"
            v-else
            >3D</v-btn
          >
          <v-list-item-content>
            <v-list-item-title>{{ job.name }}</v-list-item-title>

            <v-list-item-subtitle v-if="job.state === 'Dequeued'">
              <v-progress-linear :indeterminate="true" />
            </v-list-item-subtitle>
            <v-list-item-subtitle v-else class="body-1"
              >{{ $t("File: ")
              }}{{ fileName(job.fileUri) }}</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>{{
              $moment.unix(job.creationTime).fromNow()
            }}</v-list-item-action-text>

            <v-menu v-if="job.state === 'Queued'">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  color="error"
                  v-if="job.priority != 2"
                  @click="changePriority({ job: job, priority: 2 })"
                >
                  <v-list-item-action>
                    <v-icon color="error">mdi-chevron-double-up</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>{{ $t("High") }}</v-list-item-title>
                </v-list-item>
                <v-list-item
                  color="primary"
                  v-if="job.priority != 1"
                  @click="changePriority({ job: job, priority: 1 })"
                >
                  <v-list-item-action>
                    <v-icon color="primary">mdi-circle-double</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>{{ $t("Normal") }}</v-list-item-title>
                </v-list-item>
                <v-list-item
                  color="gray"
                  v-if="job.priority != 0"
                  @click="changePriority({ job: job, priority: 0 })"
                >
                  <v-list-item-action>
                    <v-icon>mdi-chevron-double-down</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>{{ $t("Low") }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="startEditJob(job)">
                  <v-list-item-action>
                    <v-icon>mdi-pencil</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>{{ $t("Edit") }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="startRemoveJob(job)">
                  <v-list-item-action>
                    <v-icon>mdi-delete</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>{{ $t("Remove") }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-action>
        </v-list-item>
        <v-subheader class="gray--text" v-if="lowPriorityJobs.length > 0">
          <v-icon color="gray" left>mdi-chevron-double-down</v-icon>
          {{ $t("Low Priority") }}
        </v-subheader>
        <v-list-item v-for="job in lowPriorityJobs" :key="job.id">
          <template v-if="settings.queueIgnoreAnalysis"></template>
          <v-btn
            icon
            outlined
            color="info"
            :ripple="false"
            class="mr-2"
            v-else-if="job.isFiveAxis"
            >5D</v-btn
          >
          <v-btn
            icon
            outlined
            color="primary"
            :ripple="false"
            class="mr-2"
            v-else
            >3D</v-btn
          >
          <v-list-item-content>
            <v-list-item-title>{{ job.name }}</v-list-item-title>

            <v-list-item-subtitle v-if="job.state === 'Dequeued'">
              <v-progress-linear :indeterminate="true" />
            </v-list-item-subtitle>
            <v-list-item-subtitle v-else class="body-1"
              >{{ $t("File: ")
              }}{{ fileName(job.fileUri) }}</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>{{
              $moment.unix(job.creationTime).fromNow()
            }}</v-list-item-action-text>

            <v-menu v-if="job.state === 'Queued'">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  color="error"
                  v-if="job.priority != 2"
                  @click="changePriority({ job: job, priority: 2 })"
                >
                  <v-list-item-action>
                    <v-icon color="error">mdi-chevron-double-up</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>{{ $t("High") }}</v-list-item-title>
                </v-list-item>
                <v-list-item
                  color="primary"
                  v-if="job.priority != 1"
                  @click="changePriority({ job: job, priority: 1 })"
                >
                  <v-list-item-action>
                    <v-icon color="primary">mdi-circle-double</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>{{ $t("Normal") }}</v-list-item-title>
                </v-list-item>
                <v-list-item
                  color="gray"
                  v-if="job.priority != 0"
                  @click="changePriority({ job: job, priority: 0 })"
                >
                  <v-list-item-action>
                    <v-icon>mdi-chevron-double-down</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>{{ $t("Low") }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="startEditJob(job)">
                  <v-list-item-action>
                    <v-icon>mdi-pencil</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>{{ $t("Edit") }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="startRemoveJob(job)">
                  <v-list-item-action>
                    <v-icon>mdi-delete</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>{{ $t("Remove") }}</v-list-item-title>
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
              src="/empty-state/queue.svg"
              height="192px"
              width="192px"
              aspect-ratio="1"
            />
          </v-col>
          <v-col cols="12">
            <h6 class="title text-center">
              {{
                $t(
                  "There are no queued print jobs yet. Add new one by clicking"
                )
              }}
              <v-icon color="primary">mdi-plus-circle</v-icon>
            </h6>
          </v-col>
        </v-row>
        <v-overlay :value="overlay" absolute z-index="3">
          <v-progress-circular indeterminate size="64" />
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
          <v-toolbar-title v-if="editMode">{{
            $t("Edit job")
          }}</v-toolbar-title>
          <v-toolbar-title v-else>{{ $t("Create job") }}</v-toolbar-title>
          <v-spacer />
          <v-btn :disabled="!valid" dark text @click="closeDialog(!editMode)">{{
            $t("Save")
          }}</v-btn>
        </v-toolbar>
        <v-form v-model="valid">
          <v-container fluid>
            <v-row dense justify="center" align="center">
              <v-col cols="12">
                <BottomInput
                  v-model="nameKeyboard"
                  :input.sync="editedJob.name"
                >
                  <v-text-field
                    v-model="editedJob.name"
                    :label="$tc('Job name')"
                    filled
                    clearable
                    :rules="nameRules"
                    @input="nameWasChanged = true"
                    @click="nameKeyboard = true"
                  />
                </BottomInput>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="editedJob.fileUri"
                  :label="$tc('File assignment')"
                  filled
                  :items="avaliableFiles"
                  item-text="name"
                  item-value="uri"
                  :rules="fileRules"
                  :menu-props="menuProps"
                  @input="changeNameFromFile"
                >
                  <template v-slot:item="{ item }">
                    <template v-if="settings.queueIgnoreAnalysis"></template>
                    <v-btn
                      icon
                      outlined
                      color="info"
                      :ripple="false"
                      class="mr-2"
                      v-else-if="item.isFiveAxis"
                      >5D</v-btn
                    >
                    <v-btn
                      icon
                      outlined
                      color="primary"
                      :ripple="false"
                      class="mr-2"
                      v-else
                      >3D</v-btn
                    >
                    <v-list-item-content>
                      <v-list-item-title class="subheading">{{
                        item.name
                      }}</v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <template v-slot:selection="{ item }">
                    <template v-if="settings.queueIgnoreAnalysis"></template>
                    <v-chip
                      v-else-if="item.isFiveAxis"
                      small
                      outlined
                      color="info"
                      >5D</v-chip
                    >
                    <v-chip v-else small outlined color="primary">3D</v-chip>
                    <div class="text-truncate">{{ item.name }}</div>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12" class="text-center">
                <v-subheader>{{ $t("Priority") }}</v-subheader>
                <v-btn-toggle v-model="editedJob.priority">
                  <v-btn text color="gray">
                    <v-icon color="gray" left>mdi-chevron-double-down</v-icon>
                    {{ $t("Low") }}
                  </v-btn>
                  <v-btn text color="primary">
                    <v-icon color="primary" left>mdi-circle-double</v-icon>
                    {{ $t("Normal") }}
                  </v-btn>
                  <v-btn text color="error">
                    <v-icon color="error" left>mdi-chevron-double-up</v-icon>
                    {{ $t("High") }}
                  </v-btn>
                </v-btn-toggle>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-if="!editMode"
                  v-model="copiesCount"
                  :label="$tc('Copies')"
                  filled
                  :items="Array.from(new Array(100), (val, index) => index + 1)"
                  :menu-props="menuProps"
                />
              </v-col>
              <v-col cols="12">
                <BottomInput
                  v-model="descriptionKeyboard"
                  :input.sync="editedJob.description"
                >
                  <v-textarea
                    v-model="editedJob.description"
                    filled
                    :label="$tc('Description')"
                    auto-grow
                    @click="descriptionKeyboard = true"
                  />
                </BottomInput>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmation" max-width="425">
      <v-card>
        <v-card-title class="headline">{{
          $t("Do you want to remove the job?")
        }}</v-card-title>
        <v-card-actions>
          <v-btn color="primary" text @click="confirmation = false">{{
            $t("No")
          }}</v-btn>
          <v-btn color="primary" text @click="endRemoveJob">{{
            $t("Yes")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import { PrinterInfo } from '~/types/printer'
import { FileOrFolder } from '~/types/fileOrFolder'
import { PrintJob, PrintJobPriority } from '~/types/printJob'
import BottomInput from '~/components/common/BottomInput.vue'
import { PrinterType } from '~/types/printerType';
import { Settings } from '../../types/settings'

const printJobs = namespace('printJobsState')
const printers = namespace('printersState')
const storage = namespace('storageState')
const settings = namespace('settingsState')

@Component({
  components: {
    BottomInput
  }
})
export default class extends Vue {
  @settings.Getter settings!: Settings

  @printJobs.Getter queuedJobs!: PrintJob[]
  @printJobs.Getter jobsCount!: number
  @printJobs.Getter printJobsByPriority !: (priority: PrintJobPriority) => PrintJob[]
  @printJobs.Action removeJob: any
  @printJobs.Action editJob: any
  @printJobs.Action addJob: any
  @printJobs.Action changePriority: any

  @printers.Getter printers!: PrinterInfo[]
  @printers.Getter certainTypePrinters!: (type: PrinterType) => PrinterInfo[]
  @storage.Getter avaliableFiles!: { name: string, uri: string, isFiveAxis: boolean }[]

  private overlay: boolean = false
  private dialog: boolean = false
  private editMode: boolean = false
  private confirmation: boolean = false

  private nameWasChanged: boolean = false

  fileName (fileUri: string): string {
    let array = fileUri.split("/")
    return array[array.length - 1]
  }

  get numberValueOfFiveAxis (): number {
    let isFiveAx = this.editedJob.isFiveAxis
    if (this.editedJob != null) {
      if (isFiveAx == true) {
        return PrinterType.fiveAxis;
      }
      else {
        return PrinterType.threeAxis;
      }
    }
    else {
      return PrinterType.both;
    }
  }

  get highPriorityJobs () {
    return this.printJobsByPriority(PrintJobPriority.High)
  }

  get normalPriorityJobs () {
    return this.printJobsByPriority(PrintJobPriority.Normal)
  }

  get lowPriorityJobs () {
    return this.printJobsByPriority(PrintJobPriority.Low)
  }

  private changeNameFromFile (value: string) {
    if (!this.nameWasChanged) {
      const filenameWithExt = value.split('/').pop()
      if (filenameWithExt) {
        const filename = filenameWithExt.split('.').shift()
        this.editedJob.name = `Print ${filename}`
      }
    }

    let file = this.avaliableFiles.find(el => el.uri === value)
    if (file !== undefined) {
      this.editedJob.isFiveAxis = file.isFiveAxis
    }
  }

  private nameKeyboard: boolean = false
  private descriptionKeyboard: boolean = false

  private menuProps: any = {
    closeOnClick: false,
    closeOnContentClick: false,
    openOnClick: false,
    maxHeight: 300,
    offsetY: true,
    offsetOverflow: true,
    transition: false,
    top: true
  }

  private copiesCount: number = 1

  private valid: boolean = false
  private enable: boolean = false

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
    printers: [],
    lastPrintTime: 0,
    printingTime: 0,
    successful: false,
    isFiveAxis: undefined,
    state: '',
    priority: 1
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
      isFiveAxis: undefined,
      creationTime: Date.now(),
      printingTime: 0,
      lastPrintTime: 0,
      successful: false,
      state: '',
      priority: 1
    }
  }


  private startEditJob (job: PrintJob) {
    this.dialog = true
    this.editMode = true
    Object.assign(this.editedJob, job)
  }

  private startRemoveJob (job) {
    this.confirmation = true
    Object.assign(this.editedJob, job)
  }

  private async endRemoveJob () {
    this.confirmation = false
    this.overlay = true
    await this.removeJob(this.editedJob)
    this.overlay = false
  }

  private removePrinter (item: string) {
    const index = this.editedJob.printers.indexOf(item)
    if (index >= 0) { this.editedJob.printers.splice(index, 1) }
  }

  private async closeDialog (add: boolean | undefined) {
    this.dialog = false
    this.nameWasChanged = false
    if (add !== undefined) {
      if (add) {
        const jobsArray: PrintJob[] = [this.editedJob]
        for (let index = 1; index < this.copiesCount; index++) {
          const copiedJob: PrintJob = Object.assign({}, this.editedJob)
          copiedJob.name = copiedJob.name + '(' + index + ')'
          copiedJob.id += index
          jobsArray.push(copiedJob)
        }
        this.overlay = true
        await this.addJob(jobsArray)
        this.overlay = false
      } else {
        const emptyIdx = this.editedJob.printers.indexOf('')
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
      isFiveAxis: false,
      printers: [],
      lastPrintTime: 0,
      printingTime: 0,
      successful: false,
      state: '',
      priority: 1
    }
    this.copiesCount = 1
  }

}
</script>

<style>
</style>
