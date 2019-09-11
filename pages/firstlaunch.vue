<template>
  <v-flex xs12>
    <firstLaunchStepper/>
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import firstLaunchStepper from '~/components/wizards/firstLaunch/Stepper.vue'

@Component({
  components: {
    firstLaunchStepper
  }
})
export default class extends Vue {
  layout () {
    return 'solid'
  }

  head () {
    return { title: 'STE App First Launch' }
  }
}
</script>

<style>
</style>