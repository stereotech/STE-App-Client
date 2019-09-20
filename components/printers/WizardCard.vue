<template>
  <v-card hover ripple nuxt :to="to">
    <v-img
      :src="'/wizards/' + image + '.jpg'"
      gradient="to top, rgba(100,115,201,.0), rgba(38, 50, 56, 1)"
    >
      <v-container fill-height fluid>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>
            <span class="white--text title font-weight-light">{{ name }}</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class WizardCard extends Vue {
  @Prop({ default: 0, type: Number }) id?: number
  @Prop({ default: '', type: String }) name?: string
  @Prop({ default: '', type: String }) image?: string
  @Prop({ default: '', type: String }) description?: string
  @Prop({ default: '', type: String }) to?: string
}
</script>

<style>
</style>
