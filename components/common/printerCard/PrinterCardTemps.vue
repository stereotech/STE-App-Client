<template>
  <v-col v-if="!offline" class="d-flex" md="4" cols="12" sm="6">
    <v-container>
      <v-row dense>
        <v-col v-if="lastTempDataPoint(id).tool0" :cols="glaze ? 12 : 4">
          <div class="body-1 text-truncate">{{ $t("E1 Target") }}</div>
          <div class="body-1">
            {{ lastTempDataPoint(id).tool0.target }}&deg;C
          </div>
          <v-progress-circular
            size="48"
            rotate="-90"
            :value="
              glaze
                ? lastTempDataPoint(id).tool0.actual * 1.6
                : lastTempDataPoint(id).tool0.actual / 3.2
            "
            :color="glaze ? 'brown' : e1Color"
            >{{
              lastTempDataPoint(id).tool0.actual | currency("", 0)
            }}</v-progress-circular
          >
        </v-col>
        <v-col v-if="lastTempDataPoint(id).tool1 && !glaze && !fiber" cols="4">
          <div class="body-1 text-truncate">{{ $t("E2 Target") }}</div>
          <div class="body-1">
            {{ lastTempDataPoint(id).tool1.target }}&deg;C
          </div>
          <v-progress-circular
            size="48"
            rotate="-90"
            :value="lastTempDataPoint(id).tool1.actual / 3.2"
            :color="e2Color"
            >{{
              lastTempDataPoint(id).tool1.actual | currency("", 0)
            }}</v-progress-circular
          >
        </v-col>
        <v-col v-if="lastTempDataPoint(id).tool1 && fiber" cols="4">
          <div class="body-1 text-truncate">{{ $t("Fiber Target") }}</div>
          <div class="body-1">
            {{ lastTempDataPoint(id).tool1.target }}&deg;C
          </div>
          <v-progress-circular
            size="48"
            rotate="-90"
            :value="lastTempDataPoint(id).tool1.actual / 3.2"
            color="gray"
            >{{
              lastTempDataPoint(id).tool1.actual | currency("", 0)
            }}</v-progress-circular
          >
        </v-col>
        <v-col
          v-if="lastTempDataPoint(id).bed && !glaze && bedEnabled"
          cols="4"
        >
          <div class="body-1 text-truncate">{{ $t("Bed Target") }}</div>
          <div v-if="lastTempDataPoint(id).bed" class="body-1">
            {{ lastTempDataPoint(id).bed.target }}&deg;C
          </div>
          <v-progress-circular
            size="48"
            rotate="-90"
            :value="lastTempDataPoint(id).bed.actual / 1.5"
            :color="bedColor"
            >{{
              lastTempDataPoint(id).bed.actual | currency("", 0)
            }}</v-progress-circular
          >
        </v-col>
      </v-row>
    </v-container>
  </v-col>
  <!--
  <v-flex d-flex md4 xs12 sm6 v-else>
    <v-btn color="accent" rounded large depressed>
      <v-icon>mdi-cached</v-icon>Try to reconnect
    </v-btn>
  </v-flex>
  -->
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
  @Prop({ default: false, type: Boolean }) glaze?: boolean
  @Prop({ default: false, type: Boolean }) fiber?: boolean
  @Prop({ default: false, type: Boolean }) fiveAxis?: boolean
  @Prop({ default: 0, type: Number }) chamberTemp?: number
  @Prop({ default: 0, type: Number }) chamberTarget?: number

  get computedStatus () {
    return this.status(this.id)
  }

  get bedEnabled (): boolean {
    return this.lastTempDataPoint(this.id).bed != null && this.lastTempDataPoint(this.id).bed.actual > 0
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
