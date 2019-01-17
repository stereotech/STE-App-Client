<template>
  <v-app class="light-blue darken-3" dark>
    <v-content>
      <v-container fluid fill-height>
        <v-layout column wrap>
          <nuxt/>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
  import { Vue, Component } from 'nuxt-property-decorator'

  @Component
  export default class extends Vue {
  }
</script>


<style>
</style>
