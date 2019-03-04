<template>
  <v-stepper-content :step="step">
    <v-card class="elevation-0" color="primary">
      <v-container grid-list-md>
        <v-layout align-center justify-space-around column fill-height>
          <v-flex xs12 v-if="image != null">
            <v-card>
              <v-img height="320" width="260" :src="image"></v-img>
            </v-card>
          </v-flex>
          <v-flex xs12 v-if="description">
            <p>{{ description }}</p>
          </v-flex>
          <slot></slot>
        </v-layout>
      </v-container>
    </v-card>
  </v-stepper-content>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'nuxt-property-decorator'

  @Component
  export default class extends Vue {
    @Prop({ type: Number, default: 0, required: true }) step?: number
    @Prop({ type: String, default: undefined }) image?: string
    @Prop({ type: String, default: undefined }) description?: string
  }
</script>


<style>
</style>
