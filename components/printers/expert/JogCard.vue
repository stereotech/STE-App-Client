<template>
  <v-card>
    <v-card-title class="title">{{$t('printers.expert.jogCard.title')}}</v-card-title>
    <v-container fluid grid-list-xs>
      <v-layout row wrap>
        <v-flex xs2 offset-xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :ripple="false" depressed :disabled="printing">xy</v-btn>
        </v-flex>
        <v-flex xs3 offset-xs3 v-else>
          <v-btn flat icon color="primary" :ripple="false" depressed :disabled="printing">xy</v-btn>
        </v-flex>
        <v-flex xs2 offset-xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :ripple="false" depressed :disabled="printing">z</v-btn>
        </v-flex>
        <v-flex xs3 offset-xs3 v-else>
          <v-btn flat icon color="primary" :ripple="false" depressed :disabled="printing">z</v-btn>
        </v-flex>
        <v-flex xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :ripple="false" depressed :disabled="printing">a</v-btn>
        </v-flex>
        <v-flex xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :ripple="false" depressed :disabled="printing">b</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs2 offset-xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing" @click="jogYPlus">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3 offset-xs3 v-else>
          <v-btn flat icon color="primary" :disabled="printing" @click="jogYPlus">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2 offset-xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing" @click="jogZMinus">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3 offset-xs3 v-else>
          <v-btn flat icon color="primary" :disabled="printing" @click="jogZMinus">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing" @click="jogAMinus">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing" @click="jogBMinus">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing" @click="jogXMinus">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3 v-else>
          <v-btn flat icon color="primary" :disabled="printing" @click="jogXMinus">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing" @click="homeXY">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3 v-else>
          <v-btn flat icon color="primary" :disabled="printing" @click="homeXY">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing" @click="jogXPlus">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3 v-else>
          <v-btn flat icon color="primary" :disabled="printing" @click="jogXPlus">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing" @click="homeZ">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3 v-else>
          <v-btn flat icon color="primary" :disabled="printing" @click="homeZ">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing" @click="homeA">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing" @click="homeB">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs2 offset-xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing" @click="jogYMinus">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3 offset-xs3 v-else>
          <v-btn flat icon color="primary" :disabled="printing" @click="jogYMinus">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2 offset-xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing" @click="jogZPlus">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3 offset-xs3 v-else>
          <v-btn flat icon color="primary" :disabled="printing" @click="jogZPlus">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing" @click="jogAPlus">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing" @click="jogAPlus">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 d-flex>
          <v-btn-toggle mandatory v-model="selectedAmount">
            <v-btn flat block color="primary" :disabled="printing" @input="amount = 0.1">0.1</v-btn>
            <v-btn flat block color="primary" :disabled="printing" @input="amount = 1">1</v-btn>
            <v-btn flat block color="primary" :disabled="printing" @input="amount = 10">10</v-btn>
            <v-btn flat block color="primary" :disabled="printing" @input="amount = 100">100</v-btn>
          </v-btn-toggle>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 d-flex>
          <v-slider v-model="feed" label="Feed" thumb-label min="50" max="150" @change="setFeed"></v-slider>
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
export default class JogCard extends Vue {
  private selectedAmount: number = 1
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

  private homeXY () {
    this.homeCommand({ id: this.id, head: true })
  }

  private homeZ () {
    this.homeCommand({ id: this.id, bed: true })
  }

  private homeA () {
    this.homeCommand({ id: this.id, rotary: true })
  }

  private homeB () {
    this.homeCommand({ id: this.id, rotary: true })
  }

  private setFeed (value: number) {
    this.feedCommand({ id: this.id, feed: value })
  }

  @Prop({ default: false, type: Boolean }) fiveAxis?: boolean
  @Prop({ default: false, type: Boolean }) printing?: boolean
  @Prop({ default: '', type: String }) id?: string

  @printers.Action jogCommand: any
  @printers.Action homeCommand: any
  @printers.Action feedCommand: any
}
</script>

<style>
</style>
