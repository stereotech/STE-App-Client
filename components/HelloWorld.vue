<template>
<div>
  <h1>
    {{ message }}
  </h1>
  <v-icon>mdi-dropbox</v-icon>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class HelloWorld extends Vue {
  message: string = 'Hello world !'
}
</script>