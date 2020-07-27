<template>
  <v-card>
    <v-card-title class="title">{{$t("Extruder")}}</v-card-title>
    <v-container fluid>
      <v-row dense class="text-center">
        <v-col cols="6" sm="3" order-sm="1">
          <v-btn
            x-large
            outlined
            text
            icon
            :color="glaze ? 'brown' : 'primary' "
            :disabled="printing"
            @click="retract"
          >
            <v-icon>mdi-chevron-double-up</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="6" sm="3" order-sm="3">
          <v-btn
            x-large
            outlined
            text
            icon
            :color="glaze ? 'brown' : 'primary' "
            :disabled="printing"
            @click="extrude"
          >
            <v-icon>mdi-chevron-double-down</v-icon>
          </v-btn>
        </v-col>
        <v-col class="pt-6" cols="12" sm="9" order-sm="1">
          <v-slider
            v-model="flow"
            :label="$tc('Flow')"
            thumb-label
            min="50"
            max="150"
            @change="setFlow"
            :color="glaze ? 'brown' : 'primary' "
            :track-color="glaze ? 'brown lighten-4' : ''"
          />
        </v-col>
        <v-col class="order-sm-2" cols="12" sm="9" offset-sm="3" v-if="!glaze">
          <v-select
            v-model="selectedExtruder"
            filled
            :items="extruders"
            :label="$tc('Select extruder')"
            item-text="key"
            item-value="value"
            :disabled="printing"
          />
        </v-col>

        <v-col cols="12" sm="6" order-sm="3">
          <v-btn-toggle v-model="selectedAmount" mandatory rounded>
            <v-btn
              text
              :color="glaze ? 'brown' : 'primary' "
              :disabled="printing"
              @click="amount = 0.1"
            >0.1</v-btn>
            <v-btn
              text
              :color="glaze ? 'brown' : 'primary' "
              :disabled="printing"
              @click="amount = 1"
            >1</v-btn>
            <v-btn
              text
              :color="glaze ? 'brown' : 'primary' "
              :disabled="printing"
              @click="amount = 10"
            >10</v-btn>
            <v-btn
              text
              :color="glaze ? 'brown' : 'primary' "
              :disabled="printing"
              @click="amount = 100"
            >100</v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col cols="12" sm="3" order-sm="3">
          <v-btn
            x-large
            outlined
            text
            icon
            :color="glaze ? 'brown' : 'primary' "
            :disabled="printing"
            @click="servicePos"
          >
            <v-icon>mdi-progress-wrench</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import { PrinterInfo } from '../../../types/printer'

const printers = namespace('printersState')

@Component
export default class ExtruderCard extends Vue {
  private selectedAmount: number = 2
  private amount: number = 10

  private extruders: any = [
    {
      key: 'Extruder 1',
      value: 0
    },
    {
      key: 'Extruder 2',
      value: 1
    }
  ]
  private selectedExtruder: number = 0
  private flow: number = 100

  @printers.Action extrudeCommand: any
  @printers.Action retractCommand: any
  @printers.Action flowCommand: any
  @printers.Action customCommand: any

  private extrude () {
    this.extrudeCommand({ id: this.id, toolId: this.selectedExtruder, amount: this.amount })
  }

  private retract () {
    this.retractCommand({ id: this.id, toolId: this.selectedExtruder, amount: this.amount })
  }

  private setFlow (value: number) {
    this.flowCommand({ id: this.id, flow: value })
  }

  private async servicePos () {
    await this.customCommand({ id: this.id, command: 'G28' })
    await this.customCommand({ id: this.id, command: 'G0 X100 Y30' })
  }



  @Prop({ default: false, type: Boolean }) printing?: boolean
  @Prop({ default: false, type: Boolean }) glaze?: boolean
  @Prop({ default: '', type: String }) id?: string
}
</script>

<style>
</style>
