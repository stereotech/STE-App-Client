<template>
  <v-app>
    <v-main class="primary">
      <v-container fluid>
        <v-row dense>
          <nuxt />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Solid extends Vue {
}
</script>

<style>
</style>
