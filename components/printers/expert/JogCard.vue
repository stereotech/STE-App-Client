<template>
  <v-card>
    <v-card-title class="title">Jog</v-card-title>
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
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3 offset-xs3 v-else>
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2 offset-xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3 offset-xs3 v-else>
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3 v-else>
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3 v-else>
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3 v-else>
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3 v-else>
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs2 offset-xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3 offset-xs3 v-else>
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2 offset-xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3 offset-xs3 v-else>
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2 v-if="fiveAxis">
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 d-flex>
          <v-btn-toggle mandatory >
            <v-btn flat block color="primary" :disabled="printing">0.1</v-btn>
            <v-btn flat block color="primary" :disabled="printing">1</v-btn>
            <v-btn flat block color="primary" :disabled="printing">10</v-btn>
            <v-btn flat block color="primary" :disabled="printing">100</v-btn>
          </v-btn-toggle>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 d-flex>
          <v-slider label="Feed" thumb-label min="50" max="150"></v-slider>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'nuxt-property-decorator'

  @Component
  export default class extends Vue {
    @Prop({ default: false, type: Boolean }) fiveAxis?: boolean
    @Prop({ default: false, type: Boolean }) printing?: boolean
  }
</script>

<style>
</style>
