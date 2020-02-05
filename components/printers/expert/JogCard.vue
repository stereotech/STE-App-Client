<template>
  <v-card light>
    <v-card-title class="title" v-if="!dense">{{$t("Jog")}}</v-card-title>
    <v-container>
      <v-row dense class="text-center" align="center" justify="center">
        <template v-if="isFiveAxis">
          <v-col cols="12" sm="6" order-sm="1">
            <v-btn text icon color="primary" :ripple="false" depressed :disabled="printing">xy</v-btn>
          </v-col>
          <v-col cols="12" sm="6" order-sm="2">
            <v-btn
              outlined
              text
              icon
              x-large
              color="primary"
              :disabled="printing"
              @click="jogYPlus"
            >
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4" sm="2" order-sm="3">
            <v-btn
              outlined
              text
              icon
              x-large
              color="primary"
              :disabled="printing"
              @click="jogXMinus"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4" sm="2" order-sm="3">
            <v-btn
              outlined
              text
              icon
              x-large
              color="primary"
              :disabled="printing || dense"
              @click="homeXY"
            >
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4" sm="2" order-sm="3">
            <v-btn
              outlined
              text
              icon
              x-large
              color="primary"
              :disabled="printing"
              @click="jogXPlus"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" order-sm="4">
            <v-btn
              outlined
              text
              icon
              x-large
              color="primary"
              :disabled="printing"
              @click="jogYMinus"
            >
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="2" order-sm="1">
            <v-btn text icon color="primary" :ripple="false" depressed :disabled="printing">z</v-btn>
          </v-col>
          <v-col cols="4" sm="2" order-sm="4">
            <v-btn
              outlined
              text
              icon
              x-large
              color="primary"
              :disabled="printing"
              @click="jogZPlus"
            >
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4" sm="2" order-sm="3">
            <v-btn
              outlined
              text
              icon
              x-large
              color="primary"
              :disabled="printing || dense"
              @click="homeZ"
            >
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4" sm="2" order-sm="2">
            <v-btn
              outlined
              text
              icon
              x-large
              color="primary"
              :disabled="printing"
              @click="jogZMinus"
            >
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          </v-col>

          <!-- A-axis просмотреть order-->
          <v-col cols="12" sm="2" order-sm="1">
            <v-btn text icon color="primary" :ripple="false" depressed :disabled="printing">a</v-btn>
          </v-col>
          <v-col cols="4" sm="2" order-sm="4">
            <v-btn
              outlined
              text
              icon
              x-large
              color="primary"
              :disabled="printing"
              @click="jogAPlus"
            >
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4" sm="2" order-sm="3">
            <v-btn
              outlined
              text
              icon
              x-large
              color="primary"
              :disabled="printing || dense"
              @click="homeA"
            >
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4" sm="2" order-sm="2">
            <v-btn
              outlined
              text
              icon
              x-large
              color="primary"
              :disabled="printing"
              @click="jogAMinus"
            >
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          </v-col>
          <!-- C-axis просмотреть order-->
          <v-col cols="12" sm="2" order-sm="1">
            <v-btn text icon color="primary" :ripple="false" depressed :disabled="printing">c</v-btn>
          </v-col>
          <v-col cols="4" sm="2" order-sm="4">
            <v-btn
              outlined
              text
              icon
              x-large
              color="primary"
              :disabled="printing"
              @click="jogCPlus"
            >
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4" sm="2" order-sm="3">
            <v-btn
              outlined
              text
              icon
              x-large
              color="primary"
              :disabled="printing || dense"
              @click="homeC"
            >
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4" sm="2" order-sm="2">
            <v-btn
              outlined
              text
              icon
              x-large
              color="primary"
              :disabled="printing"
              @click="jogCMinus"
            >
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="8" sm="10" order-sm="5" pt-2>
            <v-btn-toggle mandatory v-model="selectedAmount" rounded>
              <v-btn text color="primary" :disabled="printing" @click="amount = 0.1">0.1</v-btn>
              <v-btn text color="primary" :disabled="printing" @click="amount = 1">1</v-btn>
              <v-btn text color="primary" :disabled="printing" @click="amount = 10">10</v-btn>
              <v-btn text color="primary" :disabled="printing" @click="amount = 100">100</v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col cols="4" sm="2" order-sm="5" v-if="!dense">
            <v-btn
              x-large
              text
              color="primary"
              :disabled="printing"
              outlined
              icon
              @click="motorsOff"
            >
              <v-icon>mdi-engine-off-outline</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" order-sm="5" pt-6 v-if="!dense">
            <v-slider
              v-model="feed"
              :label="$tc('Feed')"
              thumb-label
              min="50"
              max="150"
              @change="setFeed"
            ></v-slider>
          </v-col>
        </template>
        <template v-else>
          <v-col cols="12" sm="9" order-sm="1">
            <v-btn text icon color="primary" :ripple="false" depressed :disabled="printing">xy</v-btn>
          </v-col>

          <v-col cols="12" sm="9" order-sm="2">
            <v-btn
              outlined
              text
              icon
              x-large
              color="primary"
              :disabled="printing"
              @click="jogYPlus"
            >
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4" sm="3" order-sm="3">
            <v-btn
              outlined
              text
              icon
              x-large
              color="primary"
              :disabled="printing"
              @click="jogXMinus"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4" sm="3" order-sm="3">
            <v-btn
              outlined
              text
              icon
              x-large
              color="primary"
              :disabled="printing || dense"
              @click="homeXY"
            >
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4" sm="3" order-sm="3">
            <v-btn
              outlined
              text
              icon
              x-large
              color="primary"
              :disabled="printing"
              @click="jogXPlus"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="9" order-sm="4">
            <v-btn
              outlined
              text
              icon
              x-large
              color="primary"
              :disabled="printing"
              @click="jogYMinus"
            >
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="3" order-sm="1">
            <v-btn text icon color="primary" :ripple="false" depressed :disabled="printing">z</v-btn>
          </v-col>
          <v-col cols="4" sm="3" order-sm="4">
            <v-btn
              outlined
              text
              icon
              x-large
              color="primary"
              :disabled="printing"
              @click="jogZPlus"
            >
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4" sm="3" order-sm="3">
            <v-btn
              outlined
              text
              icon
              x-large
              color="primary"
              :disabled="printing || dense"
              @click="homeZ"
            >
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4" sm="3" order-sm="2">
            <v-btn
              outlined
              text
              icon
              x-large
              color="primary"
              :disabled="printing"
              @click="jogZMinus"
            >
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          </v-col>
          <v-col class="pt-2" cols="8" sm="9" order-sm="5">
            <v-btn-toggle v-model="selectedAmount" mandatory rounded>
              <v-btn text color="primary" :disabled="printing" @click="amount = 0.1">0.1</v-btn>
              <v-btn text color="primary" :disabled="printing" @click="amount = 1">1</v-btn>
              <v-btn text color="primary" :disabled="printing" @click="amount = 10">10</v-btn>
              <v-btn text color="primary" :disabled="printing" @click="amount = 100">100</v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col cols="4" sm="3" order-sm="5" v-if="!dense">
            <v-btn
              x-large
              text
              color="primary"
              :disabled="printing"
              outlined
              icon
              @click="motorsOff"
            >
              <v-icon>mdi-engine-off-outline</v-icon>
            </v-btn>
          </v-col>
          <v-col class="pt-6" cols="12" order-sm="5" v-if="!dense">
            <v-slider
              v-model="feed"
              :label="$tc('Feed')"
              thumb-label
              min="50"
              max="150"
              @change="setFeed"
            />
          </v-col>
        </template>
      </v-row>
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
    this.jogCommand({ id: this.id, c: this.amount })
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
    this.jogCommand({ id: this.id, c: -this.amount })
  }

  private homeXY () {
    this.homeCommand({ id: this.id, head: true })
  }

  private homeZ () {
    this.homeCommand({ id: this.id, bed: true })
  }

  private homeA () {
    this.customCommand({ id: this.id, command: 'G28 A0' })
  }

  private homeC () {
    this.customCommand({ id: this.id, command: 'G0 C0 F3000' })
  }

  private setFeed (value: number) {
    this.feedCommand({ id: this.id, feed: value })
  }

  private motorsOff () {
    this.customCommand({ id: this.id, command: 'M84' })
  }

  private servicePos () {
    this.customCommand({ id: this.id, command: 'G0 X100 Y5' })
  }

  @Prop({ default: false, type: Boolean }) isFiveAxis?: boolean
  @Prop({ default: false, type: Boolean }) dense?: boolean
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
