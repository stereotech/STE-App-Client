<template>
  <v-menu bottom left>
    <v-btn slot="activator" icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
    <v-list>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>mdi-refresh</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Restart</v-list-tile-title>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>mdi-delete</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Remove</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'nuxt-property-decorator'

  @Component
  export default class extends Vue {
    @Prop({ required: true }) private id!: number
  }
</script>

<style>
</style>