<template>
  <v-stepper-content :step="step">
    <slot></slot>
  </v-stepper-content>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'nuxt-property-decorator'

  @Component
  export default class extends Vue {
    @Prop({ type: Number, default: 0, required: true }) step?: number
  }
</script>


<style>
</style>
