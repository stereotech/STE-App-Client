<template>
  <v-flex xs12>
    <v-toolbar color="primary" flat>
      <v-btn flat icon @click="$router.go(-1)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <span class="headline font-weight-light">Bed Leveling</span>
    </v-toolbar>
    <v-stepper v-model="e1" alt-labels class="primary elevation-0">
      <v-stepper-header class="elevation-0">
        <v-stepper-step color="accent" :complete="e1 > 1" step="1">Name of step 1</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step color="accent" :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step color="accent" step="3">Name of step 3</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-5" color="grey lighten-1" height="200px"></v-card>

          <v-btn block flat @click="e1 = 2">Start</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-5" color="grey lighten-1" height="200px"></v-card>

          <v-btn  flat @click="e1 = 3">Continue</v-btn>

          <v-btn  flat>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-5" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="e1 = 1">Continue</v-btn>

          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-flex>
</template>

<script lang="ts">
  import { Vue, Component } from 'nuxt-property-decorator'

  @Component({
    layout: 'solid'
  })
  export default class extends Vue {
    private e1: number = 0
  }
</script>

<style>
</style>
