<template>
  <v-flex xs12>
    <zeroPointSetupStepper />
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import zeroPointSetupStepper from '~/components/wizards/zeroPointSetup/Stepper.vue'

@Component({
  components: {
    zeroPointSetupStepper
  }
})
export default class extends Vue {
  layout () {
    return 'solid'
  }
}
</script>