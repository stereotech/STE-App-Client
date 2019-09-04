<template>
  <v-flex xs12 v-if="error" text-center>
    <h1 class="display-4">{{ error.statusCode }}</h1>
    <h4 class="display-1">{{ error.message }}</h4>
    <v-btn large color="accent" @click="refresh">Retry</v-btn>
  </v-flex>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  props: ['error'],
  layout: 'solid'
})
export default class Error extends Vue {
  layout() {
    return 'solid'
  }

  refresh() {
    window.location.reload(true)
  }
}
</script>