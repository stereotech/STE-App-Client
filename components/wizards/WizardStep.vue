<template>
  <v-window-item>
    <v-card class="primary" flat>
      <v-container>
        <v-row dense v-if="landscapeMode" align="center">
          <v-col v-if="image != null" cols="6" order="1">
            <v-card flat color="primary">
              <v-img height="320" width="260" :src="imageSource" />
            </v-card>
          </v-col>
          <v-col v-if="description" cols="6" order="3">
            <p>{{ description }}</p>
          </v-col>
          <v-col v-if="description" cols="6" order="2">
            <slot />
          </v-col>
          <v-col v-else cols="12" order="2">
            <slot />
          </v-col>
        </v-row>
        <v-row dense v-else class="fill-height" align="center" justify="space-around" column>
          <v-col v-if="image != null" cols="12">
            <v-card>
              <v-img height="320" width="260" :src="image" />
            </v-card>
          </v-col>
          <v-col v-if="description" cols="12">
            <p>{{ description }}</p>
          </v-col>
          <slot />
        </v-row>
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
    const width = this.$vuetify.breakpoint.width
    const height = this.$vuetify.breakpoint.height
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
