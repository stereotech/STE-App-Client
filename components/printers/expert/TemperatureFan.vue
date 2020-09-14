<template>
  <v-card>
    <v-card-title class="title">{{$t("Temperature And Fan")}}</v-card-title>
    <v-container fluid>
      <v-row dense v-if="e1Enabled">
        <v-col cols="2">
          <v-switch v-model="e1TargetSet" color="error" hide-details @change="setE1" />
        </v-col>
        <v-col cols="10">
          <v-slider
            v-model="e1Target"
            :label="$tc('E1')"
            thumb-label
            min="0"
            :max="glaze ? 60 : 300"
            :step="glaze ? 1 : 5"
            :color="glaze ? 'brown' : 'primary'"
            :track-color="glaze ? 'brown lighten-4' : ''"
            @change="changeE1"
          />
        </v-col>
      </v-row>
      <v-row dense v-if="!glaze && e2Enabled">
        <v-col cols="2">
          <v-switch v-model="e2TargetSet" color="error" hide-details @change="setE2" />
        </v-col>
        <v-col cols="10">
          <v-slider
            v-model="e2Target"
            :label="fiber ? $tc('Fiber') : $tc('E2')"
            thumb-label
            min="0"
            max="300"
            step="5"
            :color="fiber ? 'blue-grey': 'primary'"
            :track-color="fiber ? 'grey' : ''"
            @change="changeE2"
          />
        </v-col>
      </v-row>
      <v-row dense v-if="chamberHeater && !glaze">
        <v-col cols="2">
          <v-switch v-model="chamberTargetSet" color="error" hide-details @change="setChamber" />
        </v-col>
        <v-col cols="10">
          <v-slider
            v-model="chamberTarget"
            :label="$tc('Chamber')"
            thumb-label
            min="0"
            max="100"
            step="5"
            @change="setBed"
          />
        </v-col>
      </v-row>
      <v-row dense v-if="bedHeater && !glaze">
        <v-col cols="2">
          <v-switch v-model="bedTargetSet" color="error" hide-details @change="setBed" />
        </v-col>
        <v-col cols="10">
          <v-slider
            v-model="bedTarget"
            :label="$tc('Bed')"
            thumb-label
            min="0"
            max="120"
            step="5"
            @change="changeBed"
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12">
          <v-slider
            v-model="coolingFanTarget"
            :label="$tc('Cooling')"
            thumb-label
            min="0"
            max="100"
            step="5"
            @change="setCoolingFan"
          />
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

  private e1Target: number = 0
  private e2Target: number = 0
  private chamberTarget: number = 0
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
    return this.lastTempDataPoint(this.id).tool0 != null
  }

  get e2Enabled (): boolean {
    return this.lastTempDataPoint(this.id).tool1 != null
  }

  get bedEnabled (): boolean {
    return this.lastTempDataPoint(this.id).bed != null
  }

  private setCoolingFan (value: number) {
    this.fanCommand({ id: this.id, fanId: 0, fanValue: Math.round(value * 255 / 100) })
  }

  private setE1 (value: boolean) {
    if (value) {
      this.toolTempCommand({ id: this.id, tool0Temp: this.e1Target })
    } else {
      this.toolTempCommand({ id: this.id, tool0Temp: 0 })
    }
  }

  private changeE1 (value: number) {
    if (this.e1TargetSet) {
      this.toolTempCommand({ id: this.id, tool0Temp: this.e1Target })
    }
  }

  private setE2 (value: boolean) {
    if (value) {
      this.toolTempCommand({ id: this.id, tool1Temp: this.e2Target })
    } else {
      this.toolTempCommand({ id: this.id, tool1Temp: 0 })
    }
  }

  private changeE2 (value: number) {
    if (this.e2TargetSet) {
      this.toolTempCommand({ id: this.id, tool1Temp: this.e2Target })
    }
  }

  private setChamber (value: boolean) {
    if (value) {
      this.bedTempCommand({ id: this.id, bedTemp: this.chamberTarget })
    } else {
      this.bedTempCommand({ id: this.id, bedTemp: 0 })
    }
  }

  private changeChamber (value: number) {
    if (this.chamberTargetSet) {
      this.bedTempCommand({ id: this.id, bedTemp: this.chamberTarget })
    }
  }

  private setBed (value: boolean) {
    if (value) {
      this.bedTempCommand({ id: this.id, bedTemp: this.bedTarget })
    } else {
      this.bedTempCommand({ id: this.id, bedTemp: 0 })
    }
  }

  private changeBed (value: number) {
    if (this.bedTargetSet) {
      this.bedTempCommand({ id: this.id, bedTemp: this.bedTarget })
    }
  }
}
</script>

<style>
</style>
