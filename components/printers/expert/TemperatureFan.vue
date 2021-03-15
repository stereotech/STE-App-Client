<template>
  <v-card>
    <v-card-title class="title">{{ $t("Temperature And Fan") }}</v-card-title>
    <v-container fluid>
      <v-row v-if="e1Enabled" align="start">
        <v-col cols="2" class="mt-n4">
          <v-switch
            inset
            v-model="e1TargetSet"
            color="error"
            hide-details
            @change="setE1"
          />
        </v-col>
        <v-col cols="10">
          <v-slider
            prepend-icon="mdi-printer-3d-nozzle"
            v-model="e1Target"
            label="1"
            thumb-label="always"
            :min="glaze ? 30 : 40"
            :max="glaze ? 60 : 320"
            :step="glaze ? 1 : 5"
            :color="glaze ? 'brown' : 'primary'"
            :track-color="glaze ? 'brown lighten-4' : ''"
            @change="changeE1"
            ><template v-slot:append>
              {{ e1Actual | currency("", 0) }}&deg;C</template
            ></v-slider
          >
        </v-col>
      </v-row>
      <v-row v-if="!glaze && e2Enabled" align="start">
        <v-col cols="2" class="mt-n4">
          <v-switch
            inset
            v-model="e2TargetSet"
            color="error"
            hide-details
            @change="setE2"
          />
        </v-col>
        <v-col cols="10">
          <v-slider
            v-model="e2Target"
            prepend-icon="mdi-printer-3d-nozzle"
            :label="fiber ? 'F' : '2'"
            thumb-label="always"
            min="40"
            max="320"
            step="5"
            :color="fiber ? 'blue-grey' : 'primary'"
            :track-color="fiber ? 'grey' : ''"
            @change="changeE2"
            ><template v-slot:append>
              {{ e2Actual | currency("", 0) }}&deg;C</template
            ></v-slider
          >
        </v-col>
      </v-row>
      <v-row v-if="bedEnabled && !glaze" align="start">
        <v-col cols="2" class="mt-n4">
          <v-switch
            inset
            v-model="bedTargetSet"
            color="error"
            hide-details
            @change="setBed"
          />
        </v-col>
        <v-col cols="10">
          <v-slider
            v-model="bedTarget"
            prepend-icon="mdi-radiator"
            thumb-label="always"
            min="35"
            max="120"
            step="5"
            @change="changeBed"
            ><template v-slot:append>
              {{ bedActual | currency("", 0) }}&deg;C</template
            ></v-slider
          >
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col cols="2">
          <v-btn outlined icon large color="primary" @click="offCoolingFan"
            ><v-icon>mdi-fan-off</v-icon></v-btn
          >
        </v-col>
        <v-col cols="10">
          <v-slider
            v-model="coolingFanTarget"
            prepend-icon="mdi-fan"
            thumb-label="always"
            min="0"
            max="100"
            step="5"
            @change="setCoolingFan"
          >
            <template v-slot:thumb-label="{ value }">{{ value }}%</template>
          </v-slider>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import { CurrentState, TemperatureDataPoint } from 'types/printer'

const printers = namespace('printersState')

@Component
export default class TemperatureFanCard extends Vue {
  @Prop({ default: false, type: Boolean }) printing!: boolean
  @Prop({ default: false, type: Boolean }) glaze!: boolean
  @Prop({ default: false, type: Boolean }) fiber!: boolean
  @Prop({ default: false, type: Boolean }) bedHeater!: boolean
  @Prop({ default: false, type: Boolean }) chamberHeater!: boolean
  @Prop({ default: false, type: Boolean }) chamberFan!: boolean
  @Prop({ default: '', type: String, required: true }) id!: string

  @printers.Getter lastTempDataPoint!: (id: string) => TemperatureDataPoint
  @printers.Action fanCommand: any
  @printers.Action toolTempCommand: any
  @printers.Action bedTempCommand: any

  private e1Target: number = 40
  private e2Target: number = 40
  private chamberTarget: number = 35
  private bedTarget: number = 0
  private coolingFanTarget: number = 0

  private e1TargetSet: boolean = false
  private e2TargetSet: boolean = false
  private bedTargetSet: boolean = false
  private chamberTargetSet: boolean = false

  mounted () {
    this.e1Target = this.lastTempDataPoint(this.id).tool0 ? this.lastTempDataPoint(this.id).tool0.target : 0
    this.e2Target = this.lastTempDataPoint(this.id).tool1 ? this.lastTempDataPoint(this.id).tool1.target : 0
    this.bedTarget = this.lastTempDataPoint(this.id).bed ? this.lastTempDataPoint(this.id).bed.target : 0
    this.chamberTarget = this.lastTempDataPoint(this.id).bed ? this.lastTempDataPoint(this.id).bed.target : 0

    this.e1TargetSet = this.e1Target > 0
    this.e2TargetSet = this.e2Target > 0
    this.bedTargetSet = this.bedTarget > 0
    this.chamberTargetSet = this.chamberTarget > 0
  }

  get e1Enabled (): boolean {
    return this.lastTempDataPoint(this.id).tool0 != null && this.lastTempDataPoint(this.id).tool0.actual > 0
  }

  get e1Actual (): number {
    return this.e1Enabled ? this.lastTempDataPoint(this.id).tool0.actual : 0
  }

  get e2Enabled (): boolean {
    return this.lastTempDataPoint(this.id).tool1 != null && this.lastTempDataPoint(this.id).tool1.actual > 0
  }

  get e2Actual (): number {
    return this.e2Enabled ? this.lastTempDataPoint(this.id).tool1.actual : 0
  }

  get bedEnabled (): boolean {
    return this.lastTempDataPoint(this.id).bed != null && this.lastTempDataPoint(this.id).bed.actual > 0
  }

  get bedActual (): number {
    return this.bedEnabled ? this.lastTempDataPoint(this.id).bed.actual : 0
  }

  setCoolingFan (value: number) {
    this.fanCommand({ id: this.id, fanId: 0, fanValue: Math.round(value * 255 / 100) })
  }

  offCoolingFan () {
    this.fanCommand({ id: this.id, fanId: 0, fanValue: 0 })
  }

  setE1 (value: boolean) {
    if (value) {
      this.toolTempCommand({ id: this.id, tool0Temp: this.e1Target })
    } else {
      this.toolTempCommand({ id: this.id, tool0Temp: 0 })
    }
  }

  changeE1 (value: number) {
    if (this.e1TargetSet) {
      this.toolTempCommand({ id: this.id, tool0Temp: this.e1Target })
    }
  }

  setE2 (value: boolean) {
    if (value) {
      this.toolTempCommand({ id: this.id, tool1Temp: this.e2Target })
    } else {
      this.toolTempCommand({ id: this.id, tool1Temp: 0 })
    }
  }

  changeE2 (value: number) {
    if (this.e2TargetSet) {
      this.toolTempCommand({ id: this.id, tool1Temp: this.e2Target })
    }
  }

  setChamber (value: boolean) {
    if (value) {
      this.bedTempCommand({ id: this.id, bedTemp: this.chamberTarget })
    } else {
      this.bedTempCommand({ id: this.id, bedTemp: 0 })
    }
  }

  changeChamber (value: number) {
    if (this.chamberTargetSet) {
      this.bedTempCommand({ id: this.id, bedTemp: this.chamberTarget })
    }
  }

  setBed (value: boolean) {
    if (value) {
      this.bedTempCommand({ id: this.id, bedTemp: this.bedTarget })
    } else {
      this.bedTempCommand({ id: this.id, bedTemp: 0 })
    }
  }

  changeBed (value: number) {
    if (this.bedTargetSet) {
      this.bedTempCommand({ id: this.id, bedTemp: this.bedTarget })
    }
  }
}
</script>

<style>
</style>
