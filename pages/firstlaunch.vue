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

  private pollingStatus!: NodeJS.Timeout

  private async pollData () {
    this.pollingStatus = setInterval(async () => {
      await this.$store.dispatch('printersState/fetchStatus')
    }, 2000)
  }

  async mounted () {
    await this.pollData()
  }

  beforeDestroy () {
    clearInterval(this.pollingStatus)
  }
}
</script>

<style>
</style>