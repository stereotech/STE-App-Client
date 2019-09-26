<template>
  <v-window-item>
    <v-card class="primary" flat>
      <v-container grid-list-md>
        <v-layout row wrap align-center v-if="landscapeMode">
          <v-flex xs6 order-xs1 v-if="image != null">
            <v-card flat color="primary">
              <v-img height="320" width="260" :src="imageSource"></v-img>
            </v-card>
          </v-flex>
          <v-flex xs6 order-xs3 v-if="description">
            <p>{{ description }}</p>
          </v-flex>
          <v-flex xs6 order-xs2 v-if="description">
            <slot></slot>
          </v-flex>
          <v-flex xs12 order-xs2 v-else>
            <slot></slot>
          </v-flex>
        </v-layout>
        <v-layout align-center justify-space-around column fill-height v-else>
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
  </v-window-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  @Prop({ type: Number, default: 0, required: true }) step?: number
  @Prop({ type: String, default: undefined }) image?: string
  @Prop({ type: String, default: undefined }) description?: string

  get landscapeMode (): boolean {
    let width = this.$vuetify.breakpoint.width
    let height = this.$vuetify.breakpoint.height
    return (width > height) && (this.$vuetify.breakpoint.smAndDown)
  }

  get imageSource () {
    if (this.image && process.env.NUXT_ENV_PLATFORM === 'WEB') {
      return `/${this.image}`
    }
    return this.image
  }

  mounted () {

  }
}
</script>


<style>
</style>
