<template>
  <v-flex xl3 lg4 md6 sm6 xs12>
    <v-card>
      <v-toolbar flat color="secondary">
        <v-card-title>
          <span class="headline font-weight-light">Done Jobs</span>
        </v-card-title>
      </v-toolbar>
      <v-list two-line style="max-height: 486px" class="scroll-y">
        <v-list-tile v-for="doneJob in data" :key="doneJob.id">
          <v-list-tile-action>
            <v-icon
              :color="doneJob.success ? `success` : `error`"
            >{{ doneJob.success ? 'mdi-check' : 'mdi-close' }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="subheading">{{ doneJob.name }}</v-list-tile-title>
            <v-list-tile-sub-title class="body-1">Printed: {{ doneJob.lastPrint | moment("lll") }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <DoneJobsMenu :id="doneJob.id"/>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-flex>
</template>

<script lang="ts">
  import { Vue, Component } from 'nuxt-property-decorator'
  import DoneJobsMenu from '~/components/dashboard/DoneJobsMenu.vue'

  @Component({
    components: {
      DoneJobsMenu
    }
  })
  export default class extends Vue {
    private data: any[] = [
      {
        id: 1,
        name: 'STE320_pulley_1.gcode',
        success: true,
        lastPrint: Date.now()
      },
      {
        id: 2,
        name: 'STE320_pulley_1.gcode',
        success: false,
        lastPrint: Date.now()
      },
      {
        id: 3,
        name: 'STE320_pulley_1.gcode',
        success: false,
        lastPrint: Date.now()
      },
      {
        id: 4,
        name: 'STE320_pulley_1.gcode',
        success: true,
        lastPrint: Date.now()
      },
      {
        id: 5,
        name: 'STE320_pulley_1.gcode',
        success: true,
        lastPrint: Date.now()
      }
    ]
  }
</script>

<style>
</style>
