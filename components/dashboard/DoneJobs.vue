<template>
  <v-flex xl3 lg4 md6 sm6 xs12>
    <v-card transition="slide-y-reverse-transition" min-height="550">
      <v-toolbar flat color="secondary">
        <v-card-title>
          <span class="headline font-weight-light">Done Jobs</span>
        </v-card-title>
      </v-toolbar>
      <v-list two-line style="max-height: 486px" class="scroll-y" v-if="doneJobs.length > 0">
        <v-list-tile v-for="doneJob in doneJobs" :key="doneJob.id">
          <v-list-tile-action @click="toggleSuccess(doneJob)" ripple>
            <v-icon
              :color="doneJob.succesful ? `success` : `error`"
            >{{ doneJob.succesful ? 'mdi-check' : 'mdi-close' }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="subheading">{{ doneJob.name }}</v-list-tile-title>
            <v-list-tile-sub-title class="body-1">Printed: {{ doneJob.lastPrint | moment("from") }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-menu bottom left>
              <v-btn slot="activator" icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile @click="revertJob(doneJob)">
                  <v-list-tile-action>
                    <v-icon>mdi-refresh</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title>Revert</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="removeJob(doneJob)">
                  <v-list-tile-action>
                    <v-icon>mdi-delete</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title>Remove</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-container grid-list-xs v-else>
        <v-layout align-center justify-center column fill-height>
          <v-flex xs12>
            <v-img src="/empty-state/done-jobs.svg" height="192px" width="192px" aspect-ratio="1"></v-img>
          </v-flex>
          <v-flex xs12>
            <h6 class="title text-xs-center">
              Here you will see done print jobs. You could set their state by clicking
              <v-icon color="success">mdi-check</v-icon>&nbsp; or
              <v-icon color="error">mdi-close</v-icon>
            </h6>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import { PrintJob } from '~/types/printJob'

const printJobs = namespace('printJobsState')

@Component
export default class extends Vue {
  @printJobs.Getter doneJobs?: PrintJob[]
  @printJobs.Action removeJob: any
  @printJobs.Action revertJob: any
  @printJobs.Action toggleSuccess: any
}
</script>

<style>
</style>
