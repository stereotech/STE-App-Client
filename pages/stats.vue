<template>
  <v-card>
    <v-container fluid>
      <v-row>
        <v-col cols="12"
          ><StatsItem :data="data.FullDataset" :title="$t('Full statistics')" />
        </v-col>
        <v-col cols="12" md="6"
          ><StatsItem
            :data="data.DayDataset"
            :title="$t('Statistics by day')"
          />
        </v-col>
        <v-col cols="12" md="6"
          ><StatsItem
            :data="data.HourDataset"
            :title="$t('Statistics by hour')"
          />
        </v-col>
        <v-col cols="12" md="6"
          ><StatsItem
            :data="data.TimeDataset"
            type="donut"
            timed
            :title="$t('Statistics by times in state')"
          />
        </v-col>
        <v-col cols="12" md="6"
          ><StatsItem
            :data="data.PrintDataset"
            type="radialBar"
            :title="$t('Statistics by printing state')"
          />
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