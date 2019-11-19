<template>
  <v-card>
    <v-card-title class="title">Jog</v-card-title>
    <v-container grid-list-xs>
      <v-layout row wrap class="text-center" align-center justify-center>

        <template v-if="isFiveAxis">
          <v-flex xs12 sm6 order-sm1>
            <v-btn text icon color="primary" :ripple="false" depressed :disabled="printing">xy</v-btn>
          </v-flex>
          <v-flex xs12 sm6 order-sm2>
            <v-btn outlined text icon x-large color="primary" :disabled="printing" @click="jogYPlus">
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs4 sm2 order-sm3>
            <v-btn outlined text icon x-large color="primary" :disabled="printing" @click="jogXMinus">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs4 sm2 order-sm3>
            <v-btn outlined text icon x-large color="primary" :disabled="printing" @click="homeXY">
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs4 sm2 order-sm3>
            <v-btn outlined text icon x-large color="primary" :disabled="printing" @click="jogXPlus">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs12 sm6 order-sm4>
            <v-btn outlined text icon x-large color="primary" :disabled="printing" @click="jogYMinus">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs12 sm2 order-sm1>
            <v-btn text icon color="primary" :ripple="false" depressed :disabled="printing">z</v-btn>
          </v-flex>
          <v-flex xs4 sm2 order-sm4>
            <v-btn outlined text icon x-large color="primary" :disabled="printing" @click="jogZPlus">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs4 sm2 order-sm3>
            <v-btn outlined text icon x-large color="primary" :disabled="printing" @click="homeZ">
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs4 sm2 order-sm2>
            <v-btn outlined text icon x-large color="primary" :disabled="printing" @click="jogZMinus">
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          </v-flex>

  <!-- A-axis просмотреть order-->
          <v-flex xs12 sm2 order-sm1>
            <v-btn text icon color="primary" :ripple="false" depressed  :disabled="printing">a</v-btn>
          </v-flex>
          <v-flex xs4 sm2 order-sm4>
            <v-btn outlined text icon x-large color="primary" :disabled="printing" @click="jogAPlus">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs4 sm2 order-sm3>
            <v-btn outlined text icon x-large color="primary" :disabled="printing" @click="homeA">
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs4 sm2 order-sm2>
            <v-btn outlined text icon x-large color="primary" :disabled="printing" @click="jogAMinus">
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          </v-flex>
        <!-- C-axis просмотреть order-->
          <v-flex xs12 sm2 order-sm1>
            <v-btn text icon color="primary" :ripple="false" depressed :disabled="printing">c</v-btn>
          </v-flex>
          <v-flex xs4 sm2 order-sm4>
            <v-btn outlined text icon x-large color="primary" :disabled="printing" @click="jogCPlus">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs4 sm2 order-sm3>
            <v-btn outlined text icon x-large color="primary" :disabled="printing" @click="homeC">
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs4 sm2 order-sm2>
            <v-btn outlined text icon x-large color="primary" :disabled="printing" @click="jogCMinus">
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          </v-flex>
          
        <v-flex xs8 sm10 order-sm5 pt-2>
          <v-btn-toggle mandatory v-model="selectedAmount" rounded>
            <v-btn text color="primary" :disabled="printing" @click="amount = 0.1">0.1</v-btn>
            <v-btn text color="primary" :disabled="printing" @click="amount = 1">1</v-btn>
            <v-btn text color="primary" :disabled="printing" @click="amount = 10">10</v-btn>
            <v-btn text color="primary" :disabled="printing" @click="amount = 100">100</v-btn>
          </v-btn-toggle>
        </v-flex>
        <v-flex xs4 sm2 order-sm5>
          <v-btn x-large text color="primary" :disabled="printing" outlined icon @click="motorsOff">
            <v-icon>mdi-engine-off-outline</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12 order-sm5 pt-6>
          <v-slider v-model="feed" label="Feed" thumb-label min="50" max="150" @change="setFeed"></v-slider>
        </v-flex>
        </template>

        <template v-else>
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
            <v-btn outlined text icon x-large color="primary" :disabled="printing" @click="homeXY">
              <v-icon>mdi-home</v-icon>
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
            <v-btn outlined text icon x-large color="primary" :disabled="printing" @click="homeZ">
              <v-icon>mdi-home</v-icon>
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
            <v-btn text color="primary" :disabled="printing" @click="amount = 100">100</v-btn>
          </v-btn-toggle>
        </v-flex>
        <v-flex xs4 sm3 order-sm5>
          <v-btn x-large text color="primary" :disabled="printing" outlined icon @click="motorsOff">
            <v-icon>mdi-engine-off-outline</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12 order-sm5 pt-6>
          <v-slider v-model="feed" label="Feed" thumb-label min="50" max="150" @change="setFeed"></v-slider>
        </v-flex>
        </template>
  
      </v-layout>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'

const printers = namespace('printersState')

@Component
export default class JogCard extends Vue {
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
  private jogCPlus () {
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
  private jogCMinus () {
    this.jogCommand({ id: this.id, b: -this.amount })
  }

  private homeXY () {
    this.homeCommand({ id: this.id, head: true })
  }

  private homeZ () {
    this.homeCommand({ id: this.id, bed: true })
  }

  private homeA () {
    this.homeCommand({ id: this.id, rotary: true })
  }

  private homeC () {
    this.homeCommand({ id: this.id, rotary: true })
  }

  private setFeed (value: number) {
    this.feedCommand({ id: this.id, feed: value })
  }

  private motorsOff () {
    this.customCommand({ id: this.id, command: 'M84' })
  }

  @Prop({ default: false, type: Boolean }) isFiveAxis?: boolean
  @Prop({ default: false, type: Boolean }) printing?: boolean
  @Prop({ default: '', type: String }) id?: string

  @printers.Action jogCommand: any
  @printers.Action homeCommand: any
  @printers.Action feedCommand: any
  @printers.Action customCommand: any
}
</script>

<style>
</style>
