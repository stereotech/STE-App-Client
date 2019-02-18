<template>
  <v-card>
    <v-card-title class="title">Extruder</v-card-title>
    <v-container fluid grid-list-xs>
      <v-layout row wrap>
        <v-flex xs2>
          <v-btn flat icon color="primary" :disabled="printing" @click="retract">
            <v-icon>mdi-chevron-double-up</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs10>
          <v-slider label="Flow" thumb-label min="50" max="150" @change="setFlow"></v-slider>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs2>
          <v-btn flat icon color="primary" :disabled="printing" @click="retract">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs10>
          <v-select
            box
            :items="extruders"
            label="Select extruder"
            item-text="key"
            item-value="value"
            v-model="selectedExtruder"
            :disabled="printing"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs2>
          <v-btn flat icon color="primary" :disabled="printing" @click="extrude">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs2>
          <v-btn flat icon color="primary" :disabled="printing" @click="extrude">
            <v-icon>mdi-chevron-double-down</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs10 d-flex>
          <v-btn-toggle mandatory v-model="selectedAmount">
            <v-btn large flat block color="primary" :disabled="printing" @input="amount = 0.1">0.1</v-btn>
            <v-btn large flat block color="primary" :disabled="printing" @input="amount = 1">1</v-btn>
            <v-btn large flat block color="primary" :disabled="printing" @input="amount = 10">10</v-btn>
            <v-btn large flat block color="primary" :disabled="printing" @input="amount = 100">100</v-btn>
          </v-btn-toggle>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'nuxt-property-decorator'
  import { Action, Getter, namespace } from 'vuex-class'

  const printers = namespace('printersState')

  @Component
  export default class ExtruderCard extends Vue {
    private selectedAmount: number = 1
    private amount: number = 10

    private extruders: any = [
      {
        key: 'Extruder 1',
        value: 0,
      },
      {
        key: 'Extruder 2',
        value: 1
      }
    ]
    private selectedExtruder: number = 0

    @printers.Action extrudeCommand: any
    @printers.Action retractCommand: any
    @printers.Action flowCommand: any

    private extrude () {
      this.extrudeCommand({ id: this.id, toolId: this.selectedExtruder, amount: this.selectedAmount })
    }

    private retract () {
      this.retractCommand({ id: this.id, toolId: this.selectedExtruder, amount: this.selectedAmount })
    }

    private setFlow(value: number) {
      this.flowCommand({ id: this.id, flow: value})
    }

    @Prop({ default: false, type: Boolean }) printing?: boolean
    @Prop({ default: '', type: String }) id?: string
  }
</script>

<style>
</style>
