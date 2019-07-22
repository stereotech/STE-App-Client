<template>
  <v-flex xs12>
    <v-toolbar color="primary" flat>
      <v-btn text icon @click="$router.back()" v-if="closeable && currentStep == 1">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <span class="headline font-weight-light">
        <slot name="title"></slot>
      </span>
    </v-toolbar>
    <v-stepper
      v-model="currentStep"
      @change="$emit('change', currentStep)"
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
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'nuxt-property-decorator'

@Component({
})
export default class extends Vue {
  @Model('change', { type: Number, required: true, default: 1 }) currentStep?: number

  @Prop({ type: Number, default: 0, required: true }) stepCount?: number
  @Prop({ type: Boolean, default: true }) closeable?: boolean
}
</script>

<style>
</style>
