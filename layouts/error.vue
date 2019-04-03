<template>
  <v-flex xs12 v-if="error" text-xs-center>
    <h1 class="display-4">{{ error.statusCode }}</h1>
    <h4 class="display-1">{{ error.message }}</h4>
    <v-btn flat large color="secondary" nuxt to="/">Retry</v-btn>
  </v-flex>
</template>

<script>
export default {
  props: ['error'],
  layout: 'solid'
}
</script>