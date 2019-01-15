<template>
  <v-card>
    <v-card-title class="title">Extruder</v-card-title>
    <v-container fluid grid-list-xs>
      <v-layout row wrap>
        <v-flex xs2>
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-chevron-double-up</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs10>
          <v-slider label="Flow" thumb-label min="50" max="150"></v-slider>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs2>
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs10>
          <v-select
            box
            :items="[ 'Extruder 1', 'Extruder 2']"
            label="Select extruder"
            v-model="selectedExtruder"
            :disabled="printing"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs2>
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs2>
          <v-btn flat icon color="primary" :disabled="printing">
            <v-icon>mdi-chevron-double-down</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs10 d-flex>
          <v-btn-toggle mandatory>
            <v-btn large flat block color="primary" :disabled="printing">0.1</v-btn>
            <v-btn large flat block color="primary" :disabled="printing">1</v-btn>
            <v-btn large flat block color="primary" :disabled="printing">10</v-btn>
            <v-btn large flat block color="primary" :disabled="printing">100</v-btn>
          </v-btn-toggle>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'nuxt-property-decorator'

  @Component
  export default class extends Vue {
    private selectedExtruder: string = 'Extruder 1'

    @Prop({ default: false, type: Boolean }) printing?: boolean
  }
</script>

<style>
</style>
