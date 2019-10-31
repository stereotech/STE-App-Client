<template>
  <v-card>
    <v-card-title class="title">{{$t("printers.expert.temperatureFan.title")}}</v-card-title>
    <v-container fluid grid-list-xs>
      <v-layout row wrap>
        <v-flex xs2>
          <v-switch color="error" hide-details v-model="e1TargetSet" @change="setE1"></v-switch>
        </v-flex>
        <v-flex xs10>
          <v-slider
            label="E1"
            thumb-label
            min="0"
            max="300"
            step="5"
            v-model="e1Target"
            @change="changeE1"
          ></v-slider>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs2>
          <v-switch color="error" hide-details v-model="e2TargetSet" @change="setE2"></v-switch>
        </v-flex>
        <v-flex xs10>
          <v-slider
            label="E2"
            thumb-label
            min="0"
            max="300"
            step="5"
            v-model="e2Target"
            @change="changeE2"
          ></v-slider>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-if="chamberHeater">
        <v-flex xs2>
          <v-switch color="error" hide-details v-model="chamberTargetSet" @change="setChamber"></v-switch>
        </v-flex>
        <v-flex xs10>
          <v-slider
            label="Chamber"
            thumb-label
            min="0"
            max="100"
            step="5"
            v-model="chamberTarget"
            @change="setBed"
          ></v-slider>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-else>
        <v-flex xs2>
          <v-switch color="error" hide-details v-model="bedTargetSet" @change="setBed"></v-switch>
        </v-flex>
        <v-flex xs10>
          <v-slider
            label="Bed"
            thumb-label
            min="0"
            max="120"
            step="5"
            v-model="bedTarget"
            @change="changeBed"
          ></v-slider>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-slider
            label="Cooling"
            thumb-label
            min="0"
            max="100"
            step="5"
            v-model="coolingFanTarget"
            @change="setCoolingFan"
          ></v-slider>
        </v-flex>
      </v-layout>
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
    this.e1Target = this.lastTempDataPoint(this.id).tool0.target
    this.e2Target = this.lastTempDataPoint(this.id).tool1.target
    this.bedTarget = this.lastTempDataPoint(this.id).bed.target
    this.chamberTarget = this.lastTempDataPoint(this.id).bed.target

    this.e1TargetSet = this.e1Target > 0
    this.e2TargetSet = this.e2Target > 0
    this.bedTargetSet = this.bedTarget > 0
    this.chamberTargetSet = this.chamberTarget > 0
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