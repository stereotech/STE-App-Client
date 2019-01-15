<template>
  <v-card>
    <v-card-title class="title">Temp and Fans</v-card-title>
    <v-container fluid grid-list-xs>
      <v-layout row wrap>
        <v-flex xs2>
          <v-switch color="error" hide-details></v-switch>
        </v-flex>
        <v-flex xs10>
          <v-slider label="E1" thumb-label min="100" max="350"></v-slider>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs2>
          <v-switch color="error" hide-details></v-switch>
        </v-flex>
        <v-flex xs10>
          <v-slider label="E2" thumb-label min="100" max="350"></v-slider>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs2>
          <v-switch color="error" hide-details></v-switch>
        </v-flex>
        <v-flex xs10>
          <v-slider label="Bed" thumb-label min="30" max="150"></v-slider>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-if="chamberHeater">
        <v-flex xs2>
          <v-switch color="error" hide-details></v-switch>
        </v-flex>
        <v-flex xs10>
          <v-slider label="Chamber" thumb-label min="30" max="100"></v-slider>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs2>
          <v-switch color="info" hide-details></v-switch>
        </v-flex>
        <v-flex xs10>
          <v-slider label="Cooling" thumb-label min="0" max="100"></v-slider>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-if="chamberFan">
        <v-flex xs2>
          <v-switch color="info" hide-details></v-switch>
        </v-flex>
        <v-flex xs10>
          <v-slider label="Chamber fan" thumb-label min="0" max="100"></v-slider>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'nuxt-property-decorator'

  @Component
  export default class extends Vue {

    @Prop({ default: false, type: Boolean }) printing?: boolean
    @Prop({ default: false, type: Boolean }) chamberHeater?: boolean
    @Prop({ default: false, type: Boolean }) chamberFan?: boolean
  }
</script>

<style>
</style>