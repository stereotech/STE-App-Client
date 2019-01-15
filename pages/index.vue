<template>
  <v-layout row wrap>
    <PrintersPanel/>
    <DoneJobs/>
    <Queue/>
    <Storage local/>
    <Storage name="ST-AAA"/>
    <Storage name="ST-BBB"/>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator'
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
  }
</script>