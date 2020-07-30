<template>
  <v-col cols="12">
    <firstLaunchStepper />
  </v-col>
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
    return { title: this.$t('First Launch') }
  }
}
</script>

<style>
</style>
