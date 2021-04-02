<template>
  <v-card outlined>
    <apexchart
      height="350"
      :type="type"
      :series="series"
      :options="options"
    ></apexchart
  ></v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { StatisticsData } from '~/types/stats'

@Component
export default class StatsItem extends Vue {
  @Prop({ type: Array, default: () => [] }) data!: StatisticsData[]
  @Prop({ type: String, default: 'bar' }) type!: string
  @Prop({ type: Boolean, default: false }) timed!: boolean

  get series () {
    if (this.timed) {
      return this.sortedData.map(i => {
        return {
          label: this.$tc(i.eventName),
          color: this.colorByEventName(i.eventName),
          data: i.timeSum
        }
      })
    } else {
      const names = this.sortedData.map(i => i.eventName).filter((i, idx, self) => self.indexOf(i) === idx)
      return names.map(name => {
        return {
          name: this.$tc(name),
          data: this.sortedData.filter(i => i.eventName === name).map(i => i.count),
          color: this.colorByEventName(name)
        }
      })
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

  get options () {
    return {
      chart: {
        toolbar: {
          show: false
        }
      },
      colors: ['#0277bd', '#191b38', '#FF5252', '#9C27B0', '#4CAF50', '#FFC107'],
      legend: {
        position: 'top'
      },
      xaxis: {
        categories: this.categories
      }
    }
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