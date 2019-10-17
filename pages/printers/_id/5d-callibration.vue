<template>
  <v-flex xs12>
    <fiveCallibrationStepper/>
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import fiveCallibrationStepper from '~/components/wizards/5dCallibration/Stepper.vue'

@Component({
  components: {
    fiveCallibrationStepper
  }
})
export default class extends Vue {
  layout () {
    return 'solid'
  }
}
</script>