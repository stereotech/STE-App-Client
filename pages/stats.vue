<template>
  <v-card>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6"><StatsItem :data="data.FullDataset" /> </v-col>
        <v-col cols="12" md="6"><StatsItem :data="data.DayDataset" /> </v-col>
        <v-col cols="12" md="6"><StatsItem :data="data.HourDataset" /> </v-col>
        <v-col cols="12" md="6"
          ><StatsItem :data="data.TimeDataset" type="donut" timed />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator'
import { StatsState } from '~/store/stats'
import StatsItem from '~/components/stats/statsItem.vue'

const stats = namespace('stats')

@Component({
  components: {
    StatsItem
  }
})
export default class StatsPage extends Vue {
  @stats.Action fetchData!: any
  @stats.Action clearData!: any
  @stats.Getter data!: StatsState

  async mounted () {
    await this.update()
  }

  async update () {
    this.loading = true
    await this.fetchData()
    this.loading = false
  }

  loading: boolean = false


}

</script>

<style>
</style>