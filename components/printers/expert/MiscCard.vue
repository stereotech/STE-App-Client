<template>
  <v-card>
    <v-card-title class="title">Misc</v-card-title>
    <v-container fluid grid-list-xs>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            append-icon="mdi-send"
            box
            clear-icon="mdi-close-circle"
            clearable
            label="G-Code Command"
            type="text"
          ></v-text-field>
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
  }
</script>

<style>
</style>
