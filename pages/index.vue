<template>
  <v-layout row wrap>
    <PrintersPanel/>
    <DoneJobs/>
    <Queue/>
    <Storage local/>
    <Storage name="st-aaa"/>
    <Storage name="st-bbb"/>
  </v-layout>
</template>

<script lang="ts">
import { Vue } from 'nuxt-property-decorator'
import Component from 'nuxt-class-component'
import DoneJobs from '~/components/dashboard/DoneJobs.vue'
import Storage from '~/components/dashboard/Storage.vue'
import Queue from '~/components/dashboard/Queue.vue'
import PrintersPanel from '~/components/dashboard/PrintersPanel.vue'

@Component({
  components: {
    PrintersPanel,
    DoneJobs,
    Storage,
    Queue
  }
})
export default class Dashboard extends Vue {
  private pollingStorageAndJobs!: NodeJS.Timeout
  private pollingStatus!: NodeJS.Timeout

  private async pollData () {
    this.pollingStatus = setInterval(async () => {
      await this.$store.dispatch('printersState/fetchStatus')
    }, 1000)
    await this.$store.dispatch('printersState/fetchPrinters')

    this.pollingStorageAndJobs = setInterval(async () => {
      await this.$store.dispatch('printJobsState/fetchJobs')
      await this.$store.dispatch('storageState/fetchLocal')
      await this.$store.dispatch('storageState/fetchUsbs')
    }, 5000)

  }

  async mounted () {
    await this.pollData()
  }

  beforeDestroy () {
    clearInterval(this.pollingStorageAndJobs)
    clearInterval(this.pollingStatus)
  }

}
</script>