<template>
  <v-flex xs12>
    <firstLaunchStepper/>
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import firstLaunchStepper from 'components/wizards/firstLaunch/Stepper.vue'

// @Component({
//   layout: 'solid',
//   components: {
//     firstLaunchStepper
//   }
// })
// export default class extends Vue {
//   private pollingStatus!: NodeJS.Timeout
//
//   private async pollData () {
//     this.pollingStatus = setInterval(async () => {
//       await this.$store.dispatch('printersState/fetchStatus')
//     }, 1000)
//   }
//
//   async mounted () {
//     await this.pollData()
//   }
//
//   beforeDestroy () {
//     clearInterval(this.pollingStatus)
//   }
// }
</script>

<style>
</style>