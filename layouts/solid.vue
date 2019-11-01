<template>
  <v-app>
    <v-content class="light-blue darken-3">
      <v-container fluid>
        <v-row dense>
          <nuxt />
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Solid extends Vue {
  mounted () {
    this.$vuetify.theme.dark = true
  }

  beforeDestroy () {
    this.$vuetify.theme.dark = false
  }
}
</script>

<style>
</style>
