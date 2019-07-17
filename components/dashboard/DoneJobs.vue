<template>
  <v-flex xl3 lg4 md6 sm6 xs12>
    <v-card transition="slide-y-reverse-transition">
      <v-toolbar flat color="secondary">
        <v-card-title>
          <span class="headline font-weight-light">{{$t('dashboard.doneJobs.title')}}</span>
        </v-card-title>
      </v-toolbar>
      <v-list two-line style="max-height: 486px" class="scroll-y">
        <v-list-tile v-for="doneJob in doneJobs" :key="doneJob.id">
          <v-list-tile-action @click="toggleSuccess(doneJob)" ripple>
            <v-icon
              :color="doneJob.succesful ? `success` : `error`"
            >{{ doneJob.succesful ? 'mdi-check' : 'mdi-close' }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="subheading">{{ doneJob.name }}</v-list-tile-title>
            <v-list-tile-sub-title class="body-1">{{$t('dashboard.doneJobs.printed')}} {{ doneJob.lastPrint | moment("from") }}</v-list-tile-sub-title>
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
                  <v-list-tile-title>{{$t('dashboard.doneJobs.revert')}}</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="removeJob(doneJob)">
                  <v-list-tile-action>
                    <v-icon>mdi-delete</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title>{{$t('frequentlyUsed.remove')}}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
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
