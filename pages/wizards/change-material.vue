<template>
  <v-flex xs12>
    <v-toolbar color="primary" flat>
      <v-btn flat icon @click="$router.back()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <span class="headline font-weight-light">Bed Leveling</span>
    </v-toolbar>
    <changeMaterialStepper/>
  </v-flex>
</template>

<script lang="ts">
  import { Vue, Component } from 'nuxt-property-decorator'
  import changeMaterialStepper from '~/components/wizards/changeMaterial/Stepper.vue'

  @Component({
    layout: 'solid',
    components: {
      changeMaterialStepper
    }
  })
  export default class extends Vue {
    
  }
</script>

<style>
</style>