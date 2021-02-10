<template>
  <v-flex xs12>
    <ZeroPointCalibrationAdvancedStepper />
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import ZeroPointCalibrationAdvancedStepper from '~/components/wizards/zeroPointCalibrationAdvanced/Stepper.vue'

@Component({
  components: {
    ZeroPointCalibrationAdvancedStepper
  }
})
export default class ZeroPointCalibrationAdvancedPage extends Vue {
  layout () {
    return 'solid'
  }
}

</script>

<style>
</style>