<template>
  <v-card>
    <v-toolbar v-if="toolbar" flat dense color="secondary">
      <v-spacer></v-spacer>
      <v-btn flat icon>
        <v-icon>mdi-search</v-icon>
      </v-btn>
      <v-btn flat icon>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex md4 xs12 sm6>
          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex xs4 v-if="host">
                <v-badge left>
                  <span slot="badge">
                    <v-icon dark>mdi-server</v-icon>
                  </span>
                  <v-avatar size="72">
                    <img :src="'/printers/'+ model +'.png'" alt="Avatar">
                  </v-avatar>
                </v-badge>
              </v-flex>
              <v-flex xs4 v-else>
                <v-avatar size="72">
                  <img :src="'/printers/'+ model +'.png'" alt="Avatar">
                </v-avatar>
              </v-flex>
              <v-flex xs8>
                <p class="title">{{ name }}</p>
                <p class="body-2">{{ model }}</p>
                <p class="title" v-if="isPrinting">Printing...{{ progress }}%</p>
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
              <v-flex xs4>
                <p class="body-1">E1 Target:</p>
                <p class="body-1">{{ e1Target }}&deg;C</p>
                <v-progress-circular
                  size="48"
                  rotate="-90"
                  :value="e1Temp / 3.2"
                  :color="e1Color"
                >{{ e1Temp }}</v-progress-circular>
              </v-flex>
              <v-flex xs4>
                <p class="body-1">E2 Target:</p>
                <p class="body-1">{{ e2Target }}&deg;C</p>
                <v-progress-circular
                  size="48"
                  rotate="-90"
                  :value="e2Temp / 3.2"
                  :color="e2Color"
                >{{ e2Temp }}</v-progress-circular>
              </v-flex>
              <v-flex xs4>
                <p class="body-1">Bed Target:</p>
                <p class="body-1">{{ bedTarget }}&deg;C</p>
                <v-progress-circular
                  size="48"
                  rotate="-90"
                  :value="bedTemp / 1.5"
                  :color="bedColor"
                >{{ bedTemp }}</v-progress-circular>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex d-flex md4 xs12 sm6 v-else>
          <v-btn color="primary" round large>
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
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'nuxt-property-decorator'

  @Component
  export default class extends Vue {
    @Prop({ default: false, type: Boolean }) toolbar?: boolean
    @Prop({ default: false, type: Boolean }) host?: boolean
    @Prop({ default: '', type: String }) model?: string
    @Prop({ default: '', type: String }) name?: string
    @Prop({ default: '', type: String }) status?: string
    @Prop({ default: '', type: String }) file?: string
    @Prop({ default: 0, type: Number }) progress?: number
    @Prop({ default: 0, type: Number }) e1Temp?: number
    @Prop({ default: 0, type: Number }) e2Temp?: number
    @Prop({ default: 0, type: Number }) bedTemp?: number
    @Prop({ default: 0, type: Number }) e1Target?: number
    @Prop({ default: 0, type: Number }) e2Target?: number
    @Prop({ default: 0, type: Number }) bedTarget?: number

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
    private isIdle: boolean = this.status === 'Idle'
    private isMaintenance: boolean = this.status === 'Maintenance'
    private isDone: boolean = this.status === 'Done'
    private isOffline: boolean = this.status === 'Offline'
  }
</script>

<style>
</style>
