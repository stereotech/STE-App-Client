<template>
  <v-flex d-flex md4 xs12 sm6 v-if="!offline">
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs4>
          <p class="body-1 text-truncate">E1 Target:</p>
          <p class="body-1">{{ lastTempDataPoint(id).tool0.target }}&deg;C</p>
          <v-progress-circular
            size="48"
            rotate="-90"
            :value="lastTempDataPoint(id).tool0.actual / 3.2"
            :color="e1Color"
          >{{ lastTempDataPoint(id).tool0.actual | currency('', 1) }}</v-progress-circular>
        </v-flex>
        <v-flex xs4>
          <p class="body-1 text-truncate">E2 Target:</p>
          <p class="body-1">{{ lastTempDataPoint(id).tool1.target }}&deg;C</p>
          <v-progress-circular
            size="48"
            rotate="-90"
            :value="lastTempDataPoint(id).tool1.actual / 3.2"
            :color="e2Color"
          >{{ lastTempDataPoint(id).tool1.actual | currency('', 1) }}</v-progress-circular>
        </v-flex>
        <v-flex xs4>
          <p class="body-1 text-truncate">Bed Target:</p>
          <p class="body-1">{{ lastTempDataPoint(id).bed.target }}&deg;C</p>
          <v-progress-circular
            size="48"
            rotate="-90"
            :value="lastTempDataPoint(id).bed.actual / 1.5"
            :color="bedColor"
          >{{ lastTempDataPoint(id).bed.actual | currency('', 1) }}</v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
  <v-flex d-flex md4 xs12 sm6 v-else>
    <v-btn color="accent" round large depressed>
      <v-icon>mdi-cached</v-icon>Try to reconnect
    </v-btn>
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import { CurrentState, TemperatureDataPoint } from 'types/printer'

const printers = namespace('printersState')

@Component
export default class PrinterCardTemps extends Vue {
  @Prop({ default: false, type: Boolean }) offline!: boolean
  @Prop({ default: '', type: String, required: true }) id!: string

  @printers.Getter status!: (id: string) => CurrentState | undefined
  @printers.Getter lastTempDataPoint!: (id: string) => TemperatureDataPoint

  @Prop({ default: false, type: Boolean }) chamber?: boolean
  @Prop({ default: 0, type: Number }) chamberTemp?: number
  @Prop({ default: 0, type: Number }) chamberTarget?: number

  get computedStatus () {
    return this.status(this.id)
  }

  get e1Color (): string {
    if (this.lastTempDataPoint(this.id).tool0) {
      return this.lastTempDataPoint(this.id).tool0.target > this.lastTempDataPoint(this.id).tool0.offset ? 'error' : 'primary'
    }
    return 'primary'
  }

  get e2Color (): string {
    if (this.lastTempDataPoint(this.id).tool1) {
      return this.lastTempDataPoint(this.id).tool1.target > this.lastTempDataPoint(this.id).tool1.offset ? 'error' : 'primary'
    }
    return 'primary'
  }

  get bedColor (): string {
    if (this.lastTempDataPoint(this.id).bed) {
      return this.lastTempDataPoint(this.id).bed.target > this.lastTempDataPoint(this.id).bed.offset ? 'error' : 'accent'
    }
    return 'accent'
  }
}
</script>

