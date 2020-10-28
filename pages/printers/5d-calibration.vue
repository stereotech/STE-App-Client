<template>
  <v-flex xs12>
    <fiveCalibrationStepper />
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import fiveCalibrationStepper from '~/components/wizards/5dCalibration/Stepper.vue'

@Component({
  components: {
    fiveCalibrationStepper
  }
})
export default class extends Vue {
  layout () {
    return 'solid'
  }
}
</script>