<template>
  <v-flex xs12>
    <v-card>
      <v-toolbar v-if="toolbar" flat dense color="secondary">
        <v-btn v-if="controlPanel" flat nuxt :to="'/printers/' + id" ripple>Control panel
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn flat icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn v-if="!host" flat icon @click="confirmation = true">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex d-flex md4 xs12 sm6>
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                <v-flex xs4>
                  <v-img class="elevation-1" :src="'/printers/'+ model +'.png'" alt="Avatar">
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
                  <v-badge color="primary" v-if="host">
                    <v-icon slot="badge" dark>mdi-server</v-icon>
                    <p class="title">{{ name }}</p>
                  </v-badge>
                  <p v-else class="title">{{ name }}</p>
                  <p class="body-2">{{ model }}</p>
                  <p class="title" v-if="isPrinting">Printing...{{ progress }}%</p>
                  <p class="warning--text title" v-if="isPaused">Paused at {{ progress }}%</p>
                  <p class="title" v-else-if="isIdle">Idle</p>
                  <p class="warning--text title" v-else-if="isMaintenance">Maintenance</p>
                  <p class="success--text title" v-else-if="isDone">Printing Done!</p>
                  <p class="error--text title" v-else-if="isOffline">Offline</p>
                  <v-progress-linear v-if="isPrinting" value="68"></v-progress-linear>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
          <v-flex d-flex md4 xs12 sm6 v-if="!isOffline">
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                <v-flex :xs3="chamber" :xs4="chamber">
                  <p class="body-1 text-truncate">E1 Target:</p>
                  <p class="body-1">{{ e1Target }}&deg;C</p>
                  <v-progress-circular
                    size="48"
                    rotate="-90"
                    :value="e1Temp / 3.2"
                    :color="e1Color"
                  >{{ e1Temp }}</v-progress-circular>
                </v-flex>
                <v-flex :xs3="chamber" :xs4="chamber">
                  <p class="body-1 text-truncate">E2 Target:</p>
                  <p class="body-1">{{ e2Target }}&deg;C</p>
                  <v-progress-circular
                    size="48"
                    rotate="-90"
                    :value="e2Temp / 3.2"
                    :color="e2Color"
                  >{{ e2Temp }}</v-progress-circular>
                </v-flex>
                <v-flex :xs3="chamber" :xs4="chamber">
                  <p class="body-1 text-truncate">Bed Target:</p>
                  <p class="body-1">{{ bedTarget }}&deg;C</p>
                  <v-progress-circular
                    size="48"
                    rotate="-90"
                    :value="bedTemp / 1.5"
                    :color="bedColor"
                  >{{ bedTemp }}</v-progress-circular>
                </v-flex>
                <v-flex xs3 v-if="chamber">
                  <p class="body-1 text-truncate">Chamber Target:</p>
                  <p class="body-1">{{ chamberTarget }}&deg;C</p>
                  <v-progress-circular
                    size="48"
                    rotate="-90"
                    :value="chamberTemp"
                    :color="bedColor"
                  >{{ chamberTemp }}</v-progress-circular>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
          <v-flex d-flex md4 xs12 sm6 v-else>
            <v-btn color="accent" round large>
              <v-icon>mdi-cached</v-icon>Try to reconnect
            </v-btn>
          </v-flex>
          <v-flex d-flex md4 xs12 sm12>
            <v-container fluid grid-list-md>
              <v-layout row wrap v-if="isPrinting">
                <v-flex xs12 sm8 md12>
                  <p class="title text-truncate">Current file:</p>
                  <p class="title text-truncate">{{ file }}</p>
                </v-flex>
                <v-flex xs12 sm4 md12>
                  <v-btn-toggle mandatory>
                    <v-btn flat>
                      <v-icon color="success">mdi-play</v-icon>
                    </v-btn>
                    <v-btn flat>
                      <v-icon color="warning">mdi-pause</v-icon>
                    </v-btn>
                    <v-btn flat>
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
                <v-flex xs12>
                  <p class="title text-truncate">Printer is waiting</p>
                  <p class="title text-truncate">for printjob</p>
                </v-flex>
              </v-layout>
              <v-layout row wrap v-else-if="isMaintenance">
                <v-flex xs12>
                  <p class="title text-truncate">Printer is ready</p>
                  <p class="title text-truncate">for maintenance</p>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-dialog v-model="confirmation" max-width="425">
      <v-card>
        <v-card-title class="headline">Do you want to remove {{ name }} from cluster?</v-card-title>
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

  @Component
  export default class extends Vue {
    @Prop({ default: false, type: Boolean }) toolbar?: boolean
    @Prop({ default: false, type: Boolean }) controlPanel?: boolean
    @Prop({ default: false, type: Boolean }) host?: boolean
    @Prop({ default: false, type: Boolean }) chamber?: boolean
    @Prop({ default: '', type: String }) model?: string
    @Prop({ default: '', type: String }) name?: string
    @Prop({ default: '', type: String }) status?: string
    @Prop({ default: '', type: String }) file?: string
    @Prop({ default: 0, type: Number }) id?: number
    @Prop({ default: 0, type: Number }) progress?: number
    @Prop({ default: 0, type: Number }) e1Temp?: number
    @Prop({ default: 0, type: Number }) e2Temp?: number
    @Prop({ default: 0, type: Number }) bedTemp?: number
    @Prop({ default: 0, type: Number }) chamberTemp?: number
    @Prop({ default: 0, type: Number }) e1Target?: number
    @Prop({ default: 0, type: Number }) e2Target?: number
    @Prop({ default: 0, type: Number }) bedTarget?: number
    @Prop({ default: 0, type: Number }) chamberTarget?: number

    get e1Color (): string {
      if (this.e1Target && this.e1Temp) {
        return this.e1Target > 0 && this.e1Temp < this.e1Target ? 'error' : 'primary'
      }
      return 'primary'
    }

    get e2Color (): string {
      if (this.e2Target && this.e2Temp) {

        return this.e2Target > 0 && this.e2Temp < this.e2Target ? 'error' : 'primary'
      }
      return 'primary'
    }

    get bedColor (): string {
      if (this.bedTarget && this.bedTemp) {
        return this.bedTarget > 0 && this.bedTemp < this.bedTarget ? 'error' : 'accent'
      }
      return 'accent'
    }

    private printerStatus: string = 'Maintenance'

    private isPrinting: boolean = this.status === 'Printing'
    private isPaused: boolean = this.status === 'Paused'
    private isIdle: boolean = this.status === 'Idle'
    private isMaintenance: boolean = this.status === 'Maintenance'
    private isDone: boolean = this.status === 'Done'
    private isOffline: boolean = this.status === 'Offline'

    private confirmation: boolean = false
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
