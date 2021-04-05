<template>
  <v-card>
    <v-container fluid>
      <v-row>
        <v-col cols="10">
          <v-select
            :label="$t('Filter')"
            :items="filterItems"
            v-model="filter"
            outlined
            @change="update"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-btn icon @click="update" color="primary" large>
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <GaugeItem
            :data="utilizationData"
            :title="$t('Printer utilization')"
            :loading="loading"
          />
        </v-col>
        <v-col cols="12" md="6">
          <GaugeItem
            :data="successPrints"
            :colors="['#FF5252', '#FFC107', '#4CAF50']"
            :title="$t('Print success')"
            :loading="loading"
          />
        </v-col>
        <v-col cols="12"
          ><StatsItem
            :data="data.FullDataset"
            :title="$t('Full statistics')"
            :loading="loading"
          />
        </v-col>
        <v-col cols="12" md="6"
          ><StatsItem
            :data="data.DayDataset"
            :title="$t('Statistics by day')"
            :loading="loading"
          />
        </v-col>
        <v-col cols="12" md="6"
          ><StatsItem
            :data="data.HourDataset"
            :title="$t('Statistics by hour')"
            :loading="loading"
          />
        </v-col>
        <v-col cols="12" md="6"
          ><StatsItem
            :data="data.TimeDataset"
            type="donut"
            timed
            :title="$t('Statistics by times in state')"
            :loading="loading"
          />
        </v-col>
        <v-col cols="12" md="6"
          ><StatsItem
            :data="data.PrintDataset"
            type="radialBar"
            :title="$t('Statistics by printing state')"
            :loading="loading"
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
import GaugeItem from '~/components/stats/gaugeItem.vue'
import { StatisticsData, StatisticsFilter } from '~/types/stats'

const stats = namespace('stats')

@Component({
  components: {
    StatsItem,
    GaugeItem
  }
})
export default class StatsPage extends Vue {
  @stats.Action fetchData!: any
  @stats.Action clearData!: any
  @stats.Getter data!: StatsState
  @stats.Getter utilizationData!: StatisticsData
  @stats.Getter successPrints!: StatisticsData

  async mounted () {
    await this.update()
  }

  async update (filter: StatisticsFilter = StatisticsFilter.CurrentYear) {
    this.loading = true
    await this.fetchData(filter)
    this.loading = false
  }

  loading: boolean = false

  get filterItems () {
    return [
      {
        text: this.$tc('Today'),
        value: StatisticsFilter.Today
      },
      {
        text: this.$tc('Current week'),
        value: StatisticsFilter.CurrentWeek
      },
      {
        text: this.$tc('Current month'),
        value: StatisticsFilter.CurrentMonth
      },
      {
        text: this.$tc('Current year'),
        value: StatisticsFilter.CurrentYear
      },
      {
        text: this.$tc('Last week'),
        value: StatisticsFilter.LastWeek
      },
      {
        text: this.$tc('Last month'),
        value: StatisticsFilter.LastMonth
      },
      {
        text: this.$tc('Last 3 months'),
        value: StatisticsFilter.Last3Month
      },
      {
        text: this.$tc('Last 6 months'),
        value: StatisticsFilter.Last6Month
      },
      {
        text: this.$tc('Last year'),
        value: StatisticsFilter.LastYear
      }
    ]
  }

  filter: StatisticsFilter = StatisticsFilter.CurrentYear

}

</script>

<style>
</style>