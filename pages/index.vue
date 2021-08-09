<template>
  <v-row dense>
    <PrinterCard
      v-for="(printer, index) in printers"
      :id="printer.id"
      :key="index"
    />
    <DoneJobs />
    <Queue />
    <Storage local />
    <Storage
      v-for="usbStorage in allUsbStorages"
      :key="usbStorage.origin"
      :name="usbStorage.origin"
      :display="usbStorage.origin"
    />
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { State, Action, Getter, namespace } from 'vuex-class'
import { StorageState } from '../store/storageState'
import { FileOrFolder } from '../types/fileOrFolder'
import { PrinterInfo } from '../types/printer'
import DoneJobs from '~/components/dashboard/DoneJobs.vue'
import Storage from '~/components/dashboard/Storage.vue'
import Queue from '~/components/dashboard/Queue.vue'
import PrinterCard from '~/components/common/printerCard/PrinterCard.vue'
import BottomInput from '~/components/common/BottomInput.vue'

const storage = namespace('storageState')
const printers = namespace('printersState')

@Component({
  components: {
    PrinterCard,
    DoneJobs,
    Storage,
    Queue,
    BottomInput
  }
})
export default class Dashboard extends Vue {
  @storage.Getter allUsbStorages!: FileOrFolder[]

  @printers.Getter printers!: PrinterInfo[]

  @Getter isApiAbsolute!: boolean

  text: string = ''


  head () {
    return { title: this.$t('Dashboard') }
  }

  keyboard: boolean = true

  mounted () {
    if (process.env.NUXT_ENV_PLATFORM === 'MOBILE' && !this.isApiAbsolute) {
      this.$router.push('/chooseprinter')
    } else {
      this.$store.dispatch('printersState/fetchPrinters')
      this.$store.dispatch('storageState/fetchLocal')
      this.$store.dispatch('storageState/fetchUsbs')
      this.$store.dispatch('printJobsState/fetchJobs')
    }
  }
}
</script>
