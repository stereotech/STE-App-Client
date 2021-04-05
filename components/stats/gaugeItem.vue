<template>
  <v-skeleton-loader v-if="loading" type="card"></v-skeleton-loader>
  <v-card outlined v-else>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <apexchart
        height="350"
        type="radialBar"
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
export default class GaugeItem extends Vue {
  @Prop({
    type: Object, default: (): StatisticsData => {
      return {
        eventName: '',
        count: 0,
        timeSum: 0
      }
    }
  }) data!: StatisticsData
  @Prop({ type: String, default: '' }) title!: string
  @Prop({ type: Array, default: () => [] }) colors!: string[]
  @Prop({ type: Boolean, default: false }) timed!: boolean
  @Prop({ type: Boolean, default: false }) loading!: boolean

  get options () {
    return {
      chart: {
        type: 'radialBar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          hollow: {
            margin: 0,
            size: '55%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0, // margin is in pixel
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: false,
              color: '#888',
              fontSize: '17px'
            },
            value: {
              formatter: function (val) {
                return `${parseInt(val)} %`;
              },
              color: this.data.count < 50 ? this.colors[0] || '#191b38' : this.data.count > 75 ? this.colors[2] || '#4CAF50' : this.colors[1] || '#0277bd',
              fontSize: '36px',
              show: true,
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
          colorStops: [
            [
              {
                offset: 0,
                color: this.colors[0] || '#191b38',
                opacity: 50
              },
              {
                offset: 50,
                color: this.colors[1] || '#0277bd',
                opacity: 50
              },
              {
                offset: 100,
                color: this.colors[2] || '#4CAF50',
                opacity: 1
              }
            ],
          ]
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: ['Percent'],
    }
  }

  get series () {
    return [this.data.count]
  }
}

</script>

<style>
</style>