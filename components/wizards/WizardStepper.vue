<template>
  <v-stepper
    v-model="currentStep"
    @input="$emit('change', currentStep)"
    class="primary elevation-0"
  >
    <v-stepper-header class="elevation-0">
      <template v-for="idx in stepCount">
        <v-stepper-step color="accent" :complete="currentStep > idx" :step="idx" :key="idx"></v-stepper-step>
      </template>
    </v-stepper-header>

    <v-stepper-items>
      <slot></slot>
    </v-stepper-items>
  </v-stepper>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Model } from 'nuxt-property-decorator'

  @Component({
  })
  export default class extends Vue {
    @Model('change', { type: Number, required: true, default: 1 }) currentStep?: number

    @Prop({ type: Number, default: 0, required: true }) stepCount?: number

  }

</script>

<style>
</style>
