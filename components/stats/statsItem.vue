<template>
  <v-skeleton-loader v-if="loading" type="card"></v-skeleton-loader>
  <v-card outlined v-else>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <apexchart
        height="350"
        :type="type"
        :series="series"
        :options="options"
      ></apexchart>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { StatisticsData } from '~/types/stats'

@Component
export default class StatsItem extends Vue {
  @Prop({ type: Array, default: () => [] }) data!: StatisticsData[]
  @Prop({ type: String, default: 'bar' }) type!: string
  @Prop({ type: String, default: '' }) title!: string
  @Prop({ type: Boolean, default: false }) timed!: boolean
  @Prop({ type: Boolean, default: false }) loading!: boolean

  get series () {
    if (this.type === 'bar') {
      return this.barSeries
    }
    if (this.type === 'pie' || this.type === 'donut') {
      return this.pieSeries
    }
    if (this.type === 'radialBar') {
      return this.radialSeries
    }
  }

  get barSeries () {
    const names = this.sortedData.map(i => i.eventName).filter((i, idx, self) => self.indexOf(i) === idx)
    return names.map(name => {
      return {
        name: this.$tc(name),
        data: this.sortedData.filter(i => i.eventName === name).map(i => i.count),
        color: this.colorByEventName(name)
      }
    })
  }

  get pieSeries () {
    if (this.timed) {
      return this.sortedData.map(i => i.timeSum)
    } else {
      return this.sortedData.map(i => i.count)
    }
  }

  get radialSeries () {
    const printingCount = this.sortedData.find(i => i.eventName === 'PRINTING')?.count || 1;
    return this.sortedData.filter(i => i.eventName !== 'PRINTING').map(i => Math.round(100 * i.count / printingCount))
  }

  get barOptions () {
    return {
      theme: {
        mode: this.$vuetify.theme.dark ? 'dark' : 'light',
      },
      chart: {
        toolbar: {
          show: false
        }
      },
      legend: {
        position: 'top'
      },
      xaxis: {
        categories: this.categories
      },
      stroke: {
        lineCap: 'round'
      }
    }
  }

  get pieOptions () {
    return {
      theme: {
        mode: this.$vuetify.theme.dark ? 'dark' : 'light',
      },
      labels: this.sortedData.map(i => this.$tc(i.eventName)),
      colors: this.sortedData.map(i => this.colorByEventName(i.eventName)),
      legend: {
        position: 'top'
      },
    }
  }

  get radialOptions () {
    return {
      theme: {
        mode: this.$vuetify.theme.dark ? 'dark' : 'light',
      },
      chart: {
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
            },
            total: {
              show: true,
              label: this.$tc('PRINTING'),
              formatter: () => this.sortedData.find(i => i.eventName === 'PRINTING')?.count || 0
            }
          }
        }
      },
      labels: this.sortedData.filter(i => i.eventName !== 'PRINTING').map(i => this.$tc(i.eventName)),
      colors: this.sortedData.map(i => this.colorByEventName(i.eventName)),
      legend: {
        show: true,
        position: 'top'
      },
    }
  }

  get options () {
    if (this.type === 'bar') {
      return this.barOptions
    }
    if (this.type === 'pie' || this.type === 'donut') {
      return this.pieOptions
    }
    if (this.type === 'radialBar') {
      return this.radialOptions
    }
  }

  colorByEventName (name: string) {
    switch (name) {
      case 'MAINTENANCE':
        return '#FFC107'
      case 'PAUSED':
        return '#fff350'
      case 'DONE':
        return '#4CAF50'
      case 'OFFLINE':
        return '#191b38'
      case 'ERROR':
        return '#FF5252'
      case 'FAILED':
        return '#ff867f'
      case 'IDLE':
        return '#9C27B0'
      default:
        return '#0277bd'
    }
  }

  get categories () {
    return this.sortedData.map(i => i.date).filter((i, idx, self) => self.indexOf(i) === idx).sort()
  }

  get sortedData () {
    return [...this.data].sort((a: any, b: any) => {
      return a.date - b.date
    })
  }
}

</script>

<style>
</style>