<template>
  <v-list-item three-line>
    <v-list-item-content>
      <slot />
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class TerminalString extends Vue {
  mounted () {
    this.$emit('mounted')
  }
}

</script>

<style>
</style>
