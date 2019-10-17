<template>
  <v-card light>
    <v-card-title class="title">Jog</v-card-title>
    <v-container grid-list-xs>
      <v-layout row wrap class="text-center" align-center justify-center>
        <v-flex xs12 sm9 order-sm1>
          <v-btn text icon color="primary" :ripple="false" depressed :disabled="printing">xy</v-btn>
        </v-flex>
        <v-flex xs12 sm9 order-sm2>
          <v-btn outlined text icon x-large color="primary" :disabled="printing" @click="jogYPlus">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs4 sm3 order-sm3>
          <v-btn outlined text icon x-large color="primary" :disabled="printing" @click="jogXMinus">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs4 sm3 order-sm3>
          <v-btn outlined text icon x-large color="primary" disabled>
          </v-btn>
        </v-flex>
        <v-flex xs4 sm3 order-sm3>
          <v-btn outlined text icon x-large color="primary" :disabled="printing" @click="jogXPlus">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12 sm9 order-sm4>
          <v-btn outlined text icon x-large color="primary" :disabled="printing" @click="jogYMinus">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12 sm3 order-sm1>
          <v-btn text icon color="primary" :ripple="false" depressed :disabled="printing">z</v-btn>
        </v-flex>
        <v-flex xs4 sm3 order-sm4>
          <v-btn outlined text icon x-large color="primary" :disabled="printing" @click="jogZPlus">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs4 sm3 order-sm3>
          <v-btn outlined text icon x-large color="primary" disabled>
          </v-btn>
        </v-flex>
        <v-flex xs4 sm3 order-sm2>
          <v-btn outlined text icon x-large color="primary" :disabled="printing" @click="jogZMinus">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs8 sm9 order-sm5 pt-2>
          <v-btn-toggle mandatory v-model="selectedAmount" rounded>
            <v-btn text color="primary" :disabled="printing" @click="amount = 0.1">0.1</v-btn>
            <v-btn text color="primary" :disabled="printing" @click="amount = 1">1</v-btn>
            <v-btn text color="primary" :disabled="printing" @click="amount = 10">10</v-btn>
           
          </v-btn-toggle>
        </v-flex>
        <!-- <v-flex xs4 sm3 order-sm5>
          <v-btn x-large text color="primary" :disabled="printing" outlined icon @click="motorsOff">
            <v-icon>mdi-engine-off-outline</v-icon>
          </v-btn>
        </v-flex> -->

      </v-layout>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'

const printers = namespace('printersState')

@Component
export default class fiveAxisPanel extends Vue {
  private selectedAmount: number = 2
  private amount: number = 10
  private feed: number = 100

  private jogXPlus () {
    this.jogCommand({ id: this.id, x: this.amount })
  }
  private jogYPlus () {
    this.jogCommand({ id: this.id, y: this.amount })
  }
  private jogZPlus () {
    this.jogCommand({ id: this.id, z: this.amount })
  }
  private jogAPlus () {
    this.jogCommand({ id: this.id, a: this.amount })
  }
  private jogBPlus () {
    this.jogCommand({ id: this.id, b: this.amount })
  }
  private jogXMinus () {
    this.jogCommand({ id: this.id, x: -this.amount })
  }
  private jogYMinus () {
    this.jogCommand({ id: this.id, y: -this.amount })
  }
  private jogZMinus () {
    this.jogCommand({ id: this.id, z: -this.amount })
  }
  private jogAMinus () {
    this.jogCommand({ id: this.id, a: -this.amount })
  }
  private jogBMinus () {
    this.jogCommand({ id: this.id, b: -this.amount })
  }



  private setFeed (value: number) {
    this.feedCommand({ id: this.id, feed: value })
  }

  private motorsOff () {
    this.customCommand({ id: this.id, command: 'M84' })
  }

  @Prop({ default: false, type: Boolean }) fiveAxis?: boolean
  @Prop({ default: false, type: Boolean }) printing?: boolean
  @Prop({ default: '', type: String }) id?: string

  @printers.Action jogCommand: any
  @printers.Action homeCommand: any
  @printers.Action feedCommand: any
  @printers.Action customCommand: any
}
</script>