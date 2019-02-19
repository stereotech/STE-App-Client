<template>
  <v-card>
    <v-card-title class="title">Temp and Fans</v-card-title>
    <v-container fluid grid-list-xs>
      <v-layout row wrap>
        <v-flex xs2>
          <v-switch color="error" hide-details v-model="e1TargetSet" @change="setE1"></v-switch>
        </v-flex>
        <v-flex xs10>
          <v-slider
            label="E1"
            thumb-label
            min="100"
            max="350"
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
            min="100"
            max="350"
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
            min="30"
            max="100"
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
            min="30"
            max="150"
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
            v-model="coolingFanTarget"
            @change="setCoolingFan"
          ></v-slider>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-if="chamberFan">
        <v-flex xs12>
          <v-slider
            label="Chamber fan"
            thumb-label
            min="0"
            max="100"
            v-model="chamberFanTarget"
            @change="setChamberFan"
          ></v-slider>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'nuxt-property-decorator'
  import { Action, Getter, namespace } from 'vuex-class'
  import { PrinterStatus } from 'types/printer'

  const printers = namespace('printersState')

  @Component
  export default class TemperatureFanCard extends Vue {
    @Prop({ default: false, type: Boolean }) printing!: boolean
    @Prop({ default: false, type: Boolean }) chamberHeater!: boolean
    @Prop({ default: false, type: Boolean }) chamberFan!: boolean
    @Prop({ default: '', type: String, required: true }) id!: string

    @printers.Getter status!: (id: string) => PrinterStatus | undefined
    @printers.Action fanCommand: any
    @printers.Action toolTempCommand: any
    @printers.Action bedTempCommand: any

    get computedStatus () {
      return this.status(this.id)
    }

    private e1Target: number = 100
    private e2Target: number = 100
    private chamberTarget: number = 0
    private bedTarget: number = 0
    private coolingFanTarget: number = 0
    private chamberFanTarget: number = 0

    private e1TargetSet: boolean = false
    private e2TargetSet: boolean = false
    private bedTargetSet: boolean = false
    private chamberTargetSet: boolean = false

    mounted () {
      this.e1Target = this.computedStatus !== undefined ? this.computedStatus.tool0.target : 100
      this.e2Target = this.computedStatus !== undefined ? this.computedStatus.tool1.target : 100
      this.chamberTarget = this.computedStatus !== undefined ? this.computedStatus.bed.target : 0
      this.bedTarget = this.computedStatus !== undefined ? this.computedStatus.bed.target : 0
      this.e1TargetSet = this.e1Target > 100
      this.e2TargetSet = this.e2Target > 100
      this.bedTargetSet = this.bedTarget > 30
      this.chamberTargetSet = this.chamberTarget > 30
    }

    private setCoolingFan (value: number) {
      this.fanCommand({ id: this.id, fanId: 0, fanValue: value })
    }

    private setChamberFan (value: number) {
      this.fanCommand({ id: this.id, fanId: 1, fanValue: value })
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
        this.toolTempCommand({ id: this.id, tool1Temp: this.e1Target })
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