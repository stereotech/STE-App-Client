<template>
  <v-col cols="12">
    <changeMaterialStepper />
  </v-col>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import changeMaterialStepper from '~/components/wizards/changeMaterial/Stepper.vue'

@Component({
  components: {
    changeMaterialStepper
  }
})
export default class extends Vue {
  layout () {
    return 'solid'
  }
}
</script>

<style>
</style>
