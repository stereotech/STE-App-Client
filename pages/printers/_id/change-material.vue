<template>
  <v-flex xs12>
    <changeMaterialStepper/>
  </v-flex>
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