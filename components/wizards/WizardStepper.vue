<template>
  <v-flex xs12>
    <v-toolbar color="primary" flat dense>
      <v-btn x-large text icon @click="$router.back()" v-if="closeable && currentStep == 0">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <span class="headline font-weight-light">
        <slot name="title"></slot>
      </span>
      <div class="flex-grow-1"></div>
      <v-progress-circular :value="progressStep" size="48">{{currentStep + 1}}/{{stepCount}}</v-progress-circular>
    </v-toolbar>
    <v-card color="primary" dark flat>
      <v-window
        v-model="currentStep"
        @change="$emit('change', currentStep)"
        :vertical="landscapeMode"
      >
        <slot></slot>
      </v-window>
    </v-card>
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

  get landscapeMode (): boolean {
    let width = this.$vuetify.breakpoint.width
    let height = this.$vuetify.breakpoint.height
    return (width > height) && (this.$vuetify.breakpoint.smAndDown)
  }

  get progressStep (): number {
    if (this.stepCount) {
      return 100 / this.stepCount * (this.currentStep! + 1)
    }
    return 1 * (this.currentStep! + 1)
  }
}
</script>

<style>
</style>
