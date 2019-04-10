<template>
  <v-layout row wrap>
    <PrintersPanel/>
    <DoneJobs/>
    <Queue/>
    <Storage local/>
    <Storage
      v-for="usbStorage in allUsbStorages"
      :key="usbStorage.origin"
      :name="usbStorage.origin"
      :display="printerName(usbStorage.origin)"
    />
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import DoneJobs from '~/components/dashboard/DoneJobs.vue'
import Storage from '~/components/dashboard/Storage.vue'
import Queue from '~/components/dashboard/Queue.vue'
import PrintersPanel from '~/components/dashboard/PrintersPanel.vue'
import { State, Action, Getter, namespace } from 'vuex-class'
import { StorageState } from '../store/storageState';
import { FileOrFolder } from '../types/fileOrFolder';
import { PrinterInfo } from '../types/printer';

const storage = namespace('storageState')
const printers = namespace('printersState')

@Component({
  components: {
    PrintersPanel,
    DoneJobs,
    Storage,
    Queue
  }
})
export default class Dashboard extends Vue {
  @storage.Getter allUsbStorages!: FileOrFolder[]

  @printers.Getter printers!: PrinterInfo[]

  head () {
    return { title: 'STE App Dashboard' }
  }

  private get printerName () {
    return (o: string) => {
      let p = this.printers.find(pr => pr.id == o)
      if (p !== undefined) {
        return p.name
      }
      return ''
    }
  }

  private pollingStorageAndJobs!: NodeJS.Timeout
  private pollingStatus!: NodeJS.Timeout

  private async pollData () {
    this.pollingStatus = setInterval(async () => {
      await this.$store.dispatch('printersState/fetchStatus')
    }, 2000)
    await this.$store.dispatch('printersState/fetchPrinters')
    await this.$store.dispatch('printJobsState/fetchJobs')
    await this.$store.dispatch('storageState/fetchLocal')
    await this.$store.dispatch('storageState/fetchUsbs')
    this.pollingStorageAndJobs = setInterval(async () => {
      await this.$store.dispatch('printJobsState/fetchJobs')
      await this.$store.dispatch('storageState/fetchLocal')
      await this.$store.dispatch('storageState/fetchUsbs')
    }, 7000)

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