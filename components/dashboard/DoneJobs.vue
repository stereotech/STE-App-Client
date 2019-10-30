<template>
  <v-col xl="4" lg="6" md="6" sm="12" cols="12">
    <v-card transition="slide-y-reverse-transition" min-height="550">
      <v-toolbar flat color="secondary">
        <v-card-title>
          <span class="headline font-weight-light">Done Jobs</span>
        </v-card-title>
      </v-toolbar>
      <v-list v-if="doneJobs.length > 0" two-line style="max-height: 486px" class="overflow-y-auto">
        <v-list-item v-for="doneJob in doneJobs" :key="doneJob.id" @contextmenu="showContextMenu">
          <v-list-item-action v-if="doneJob.state == 'Completed'" ripple>
            <v-icon
              :color="doneJob.successful ? `success` : `error`"
            >{{ doneJob.successful ? 'mdi-check' : 'mdi-close' }}</v-icon>
          </v-list-item-action>
          <v-list-item-action v-else-if="doneJob.state == 'Revert'">
            <v-progress-circular indeterminate color="primary" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="subheading">{{ doneJob.name }}</v-list-item-title>
            <v-list-item-subtitle v-if="doneJob.state === 'Revert'">
              <v-progress-linear :indeterminate="true" />
            </v-list-item-subtitle>
            <v-list-item-subtitle
              v-else
              class="body-1"
            >Printed: {{ doneJob.lastPrintTime | moment("from") }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="showContextMenu">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
            <v-menu v-model="showMenu" absolute :position-x="menuX" :position-y="menuY">
              <v-list>
                <v-list-item @click="revertJob(doneJob)">
                  <v-list-item-action>
                    <v-icon>mdi-refresh</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>Revert</v-list-item-title>
                </v-list-item>
                <v-list-item @click="removeJob(doneJob)">
                  <v-list-item-action>
                    <v-icon>mdi-delete</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>Remove</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-container v-else>
        <v-row dense class="fill-height" align="center" justify="center" column>
          <v-col cols="12">
            <v-img src="/empty-state/done-jobs.svg" height="192px" width="192px" aspect-ratio="1" />
          </v-col>
          <v-col cols="12">
            <h6 class="title text-center">
              Here you will see done print jobs. Succesful prints marked with
              <v-icon color="success">mdi-check</v-icon>&nbsp;
            </h6>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import { PrintJob } from '~/types/printJob'

const printJobs = namespace('printJobsState')

@Component
export default class extends Vue {
  @printJobs.Getter doneJobs!: PrintJob[]
  @printJobs.Action removeJob: any
  @printJobs.Action revertJob: any
  @printJobs.Action toggleSuccess: any

  showMenu: boolean = false
  menuX: number = 0
  menuY: number = 0
  showContextMenu (e) {
    e.preventDefault()
    this.showMenu = false
    this.menuX = e.clientX
    this.menuY = e.clientY
    this.$nextTick(() => {
      this.showMenu = true
    })
  }
}
</script>

<style>
</style>
