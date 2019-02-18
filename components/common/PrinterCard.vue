<template>
  <v-flex xs12 v-if="computedStatus && computedPrinter">
    <v-card>
      <v-toolbar v-if="toolbar" flat dense color="secondary">
        <v-btn v-if="controlPanel" flat nuxt :to="'/printers/' + id" ripple>Control panel
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn flat icon @click="findPrinter(id)">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn
          v-if="!computedPrinter.isLocal && !controlPanel"
          flat
          icon
          @click="confirmation = true"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex d-flex md4 xs12 sm6>
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                <v-flex xs4>
                  <v-img
                    class="elevation-1"
                    :src="'/printers/'+ computedPrinter.model +'.png'"
                    alt="Avatar"
                  >
                    <div v-if="isPrinting" class="fill-height repeating-gradient-blue"></div>
                    <div
                      v-else-if="isPaused || isMaintenance"
                      class="fill-height repeating-gradient-warning"
                    ></div>
                    <div v-else-if="isDone" class="fill-height repeating-gradient-success"></div>
                    <div v-else-if="isOffline" class="fill-height repeating-gradient-error"></div>
                    <div v-else></div>
                  </v-img>
                </v-flex>
                <v-flex xs8>
                  <v-badge color="primary" v-if="computedPrinter.isLocal">
                    <v-icon slot="badge" dark>mdi-server</v-icon>
                    <p class="title">{{ computedPrinter.name }}</p>
                  </v-badge>
                  <p v-else class="title">{{ computedPrinter.name }}</p>
                  <p class="body-2">{{ computedPrinter.model }}</p>
                  <p
                    class="title"
                    v-if="isPrinting"
                  >Printing...{{ computedStatus.progress.completion | currency('', 1) }}%</p>
                  <p
                    class="warning--text title"
                    v-if="isPaused"
                  >Paused at {{ computedStatus.progress.completion }}%</p>
                  <p class="title" v-else-if="isIdle">Idle</p>
                  <p class="warning--text title" v-else-if="isMaintenance">Maintenance</p>
                  <p class="success--text title" v-else-if="isDone">Printing Done!</p>
                  <p class="error--text title" v-else-if="isOffline">Offline</p>
                  <v-progress-linear v-if="isPrinting" :value="computedStatus.progress.completion"></v-progress-linear>
                  <v-progress-linear
                    v-if="isPaused"
                    :value="computedStatus.progress.completion"
                    color="warning"
                  ></v-progress-linear>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
          <v-flex d-flex md4 xs12 sm6 v-if="!isOffline">
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                <v-flex :xs3="chamber" :xs4="chamber">
                  <p class="body-1 text-truncate">E1 Target:</p>
                  <p class="body-1">{{ computedStatus.tool0.target }}&deg;C</p>
                  <v-progress-circular
                    size="48"
                    rotate="-90"
                    :value="computedStatus.tool0.actual / 3.2"
                    :color="e1Color"
                  >{{ computedStatus.tool0.actual | currency('', 1) }}</v-progress-circular>
                </v-flex>
                <v-flex :xs3="chamber" :xs4="chamber">
                  <p class="body-1 text-truncate">E2 Target:</p>
                  <p class="body-1">{{ computedStatus.tool1.target }}&deg;C</p>
                  <v-progress-circular
                    size="48"
                    rotate="-90"
                    :value="computedStatus.tool1.actual / 3.2"
                    :color="e2Color"
                  >{{ computedStatus.tool1.actual | currency('', 1) }}</v-progress-circular>
                </v-flex>
                <v-flex :xs3="chamber" :xs4="chamber">
                  <p class="body-1 text-truncate">Bed Target:</p>
                  <p class="body-1">{{ computedStatus.bed.target }}&deg;C</p>
                  <v-progress-circular
                    size="48"
                    rotate="-90"
                    :value="computedStatus.bed.actual / 1.5"
                    :color="bedColor"
                  >{{ computedStatus.bed.actual | currency('', 1) }}</v-progress-circular>
                </v-flex>
                <v-flex xs3 v-if="chamber">
                  <p class="body-1 text-truncate">Chamber Target:</p>
                  <p class="body-1">{{ chamberTarget }}&deg;C</p>
                  <v-progress-circular
                    size="48"
                    rotate="-90"
                    :value="chamberTemp"
                    :color="bedColor"
                  >{{ chamberTemp | currency('', 1) }}</v-progress-circular>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
          <v-flex d-flex md4 xs12 sm6 v-else>
            <v-btn color="accent" round large depressed>
              <v-icon>mdi-cached</v-icon>Try to reconnect
            </v-btn>
          </v-flex>
          <v-flex d-flex md4 xs12 sm12>
            <v-container fluid grid-list-md>
              <v-layout row wrap v-if="isPrinting || isPaused">
                <v-flex xs12 sm8 md12>
                  <p class="title text-truncate">Current file:</p>
                  <p class="title text-truncate">{{ computedStatus.job.file.display }}</p>
                </v-flex>
                <v-flex xs12 sm4 md12>
                  <v-btn-toggle mandatory block depressed>
                    <v-btn flat block depressed :value="isPrinting" @input="resumeJob">
                      <v-icon color="success">mdi-play</v-icon>
                    </v-btn>
                    <v-btn flat block depressed :value="isPaused" @input="pauseJob">
                      <v-icon color="warning">mdi-pause</v-icon>
                    </v-btn>
                    <v-btn flat block depressed @input="stopJob">
                      <v-icon color="error">mdi-stop</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </v-flex>
              </v-layout>
              <v-layout row wrap v-else-if="isDone">
                <v-flex xs12 sm8 md12>
                  <p class="title text-truncate">Clean the buildplate</p>
                  <p class="title text-truncate">and select state</p>
                </v-flex>
                <v-flex xs12 sm4 md12>
                  <v-select box :items="['Idle', 'Maintenance']" label="Select state"></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap v-else-if="isIdle">
                <v-flex xs12 sm8 md12>
                  <p class="title text-truncate">Printer is waiting</p>
                  <p class="title text-truncate">for printjob</p>
                </v-flex>
                <v-flex xs12 sm4 md12>
                  <v-select box :items="['Idle', 'Maintenance']" label="Select state"></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap v-else-if="isMaintenance">
                <v-flex xs12 sm8 md12>
                  <p class="title text-truncate">Printer is ready</p>
                  <p class="title text-truncate">for maintenance</p>
                </v-flex>
                <v-flex xs12 sm4 md12>
                  <v-select box :items="['Idle', 'Maintenance']" label="Select state"></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-dialog v-model="confirmation" max-width="425">
      <v-card>
        <v-card-title
          class="headline"
        >Do you want to remove {{ computedPrinter.name }} from cluster?</v-card-title>
        <v-card-actions>
          <v-btn color="primary" flat @click="confirmation = false">No</v-btn>
          <v-btn color="primary" flat @click="confirmation = false">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'nuxt-property-decorator'
  import { Action, Getter, namespace } from 'vuex-class'
  import { PrinterStatus, PrinterInfo } from 'types/printer'

  const printers = namespace('printersState')

  @Component
  export default class PrinterCard extends Vue {
    @Prop({ default: false, type: Boolean }) toolbar!: boolean
    @Prop({ default: false, type: Boolean }) controlPanel!: boolean

    @Prop({ default: '', type: String, required: true }) id!: string

    @printers.Getter printer!: (id: string) => PrinterInfo | undefined
    @printers.Getter status!: (id: string) => PrinterStatus | undefined
    @printers.Action deletePrinter: any

    @printers.Action findPrinter: any
    @printers.Action pausePrintJob: any
    @printers.Action resumePrintJob: any
    @printers.Action cancelPrintJob: any

    @Prop({ default: false, type: Boolean }) chamber?: boolean
    @Prop({ default: 0, type: Number }) chamberTemp?: number
    @Prop({ default: 0, type: Number }) chamberTarget?: number

    get computedStatus () {
      return this.status(this.id)
    }

    get computedPrinter () {
      return this.printer(this.id)
    }

    get e1Color (): string {
      if (this.computedStatus !== undefined) {
        if (this.computedStatus.tool0.target > 0 && this.computedStatus.tool0.actual) {
          return this.computedStatus.tool0.target > 0 && this.computedStatus.tool0.actual < this.computedStatus.tool0.target ? 'error' : 'primary'
        }
      }
      return 'primary'
    }

    get e2Color (): string {
      if (this.computedStatus !== undefined) {
        if (this.computedStatus.tool1.target > 0 && this.computedStatus.tool1.actual) {
          return this.computedStatus.tool1.target > 0 && this.computedStatus.tool1.actual < this.computedStatus.tool1.target ? 'error' : 'primary'
        }
      }
      return 'primary'
    }

    get bedColor (): string {
      if (this.computedStatus !== undefined) {
        if (this.computedStatus.bed.target > 0 && this.computedStatus.bed.actual) {
          return this.computedStatus.bed.target > 0 && this.computedStatus.bed.actual < this.computedStatus.bed.target ? 'error' : 'accent'
        }
      }
      return 'accent'
    }

    private printerStatus: string = 'Maintenance'

    get isPrinting (): boolean {
      if (this.status(this.id) !== undefined) {
        return this.status(this.id)!.stateText === 'Printing'
      }
      return false
    }
    get isPaused (): boolean {
      if (this.status(this.id) !== undefined) {
        return this.status(this.id)!.stateText === 'Paused'
      }
      return false
    }
    get isIdle (): boolean {
      if (this.status(this.id) !== undefined) {
        return this.status(this.id)!.stateText === 'Idle'
      }
      return false
    }
    get isMaintenance (): boolean {
      if (this.status(this.id) !== undefined) {
        return this.status(this.id)!.stateText === 'Maintenance'
      }
      return false
    }
    get isDone (): boolean {
      if (this.status(this.id) !== undefined) {
        return this.status(this.id)!.stateText === 'Done'
      }
      return false
    }
    get isOffline (): boolean {
      if (this.status(this.id) !== undefined) {
        return this.status(this.id)!.stateText === 'Offline'
      }
      return false
    }

    get jobStateToggle (): number {
      if (this.status(this.id) !== undefined) {
        if (this.status(this.id)!.stateText === 'Printing') {
          return 0
        }
        if (this.status(this.id)!.stateText === 'Paused') {
          return 1
        }
      }
      return 2
    }

    private confirmation: boolean = false

    private removePrinter (printer: PrinterInfo) {
      this.confirmation = false
      this.deletePrinter(this.computedPrinter)
    }

    private resumeJob (toggle: boolean) {
      if (toggle) {
        this.resumePrintJob(this.$route.params.id)
      }
    }

    private pauseJob (toggle: boolean) {
      if (toggle) {
        this.pausePrintJob(this.$route.params.id)
      }
    }

    private stopJob (toggle: boolean) {
      if (toggle) {
        this.cancelPrintJob(this.$route.params.id)
      }
    }
  }
</script>

<style scoped>
.repeating-gradient-blue {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 5px,
    rgba(2, 119, 189, 0.1) 5px,
    rgba(2, 119, 189, 0.1) 10px
  );
}

.repeating-gradient-error {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 5px,
    rgba(255, 82, 82, 0.25) 5px,
    rgba(255, 82, 82, 0.25) 10px
  );
}

.repeating-gradient-warning {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 5px,
    rgba(255, 193, 7, 0.25) 5px,
    rgba(255, 193, 7, 0.25) 10px
  );
}

.repeating-gradient-success {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 5px,
    rgba(76, 175, 80, 0.25) 5px,
    rgba(76, 175, 80, 0.25) 10px
  );
}
</style>
