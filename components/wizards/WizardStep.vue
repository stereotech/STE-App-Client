<template>
  <v-window-item>
    <v-card class="primary" flat>
      <v-container>
        <v-row no-gutters align="start" justify="center">
          <v-col v-if="description" cols="12">
            <p class="text-h6 font-weight-light">{{ description }}</p>
          </v-col>
          <v-col v-if="image != null" cols="12" sm="5" md="4">
            <v-card flat color="primary" class="mt-4">
              <v-img height="320" contain :src="imageSource" />
            </v-card>
          </v-col>
          <v-col cols="12" sm="7" md="8">
            <slot />
          </v-col>
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
