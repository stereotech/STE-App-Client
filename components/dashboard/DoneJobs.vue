<template>
  <v-col xl="4" lg="6" md="6" sm="12" cols="12">
    <v-card
      transition="slide-y-reverse-transition"
      :height="collapsed ? 64 : 550"
    >
      <v-toolbar flat>
        <v-fab-transition>
          <v-btn
            small
            fab
            outlined
            color="primary"
            @click="collapsed = !collapsed"
          >
            <v-icon v-if="!collapsed">mdi-chevron-up</v-icon>
            <v-icon v-else>mdi-chevron-down</v-icon>
          </v-btn>
        </v-fab-transition>
        <v-card-title @click="collapsed = !collapsed">
          <span class="headline font-weight-light">{{ $t("Done Jobs") }}</span>
        </v-card-title>
      </v-toolbar>
      <v-card-text v-if="!collapsed">
        <BottomInput v-model="keyboard" :input.sync="filter">
          <v-text-field
            v-model="filter"
            outlined
            dense
            hide-details
            clear-icon="mdi-close-circle"
            clearable
            :label="$tc('Filter Items')"
            type="text"
            @click="keyboard = true"
          />
        </BottomInput>

        <v-virtual-scroll
          v-if="filteredDoneJobs.length > 0"
          height="368"
          :item-height="64"
          bench="1"
          :items="filteredDoneJobs"
        >
          <template v-slot="{ item }">
            <v-list-item :key="item.id">
              <v-list-item-action v-if="item.state == 'Completed'" ripple>
                <v-icon :color="item.successful ? `success` : `error`">{{
                  item.successful ? "mdi-check" : "mdi-close"
                }}</v-icon>
              </v-list-item-action>
              <v-list-item-action v-else-if="item.state == 'Revert'">
                <v-progress-circular indeterminate color="primary" />
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="subheading">
                  <template v-if="settings.queueIgnoreAnalysis"></template>
                  <v-chip
                    color="info"
                    v-else-if="item.isFiveAxis"
                    class="mr-1"
                    outlined
                    label
                    x-small
                    >5D</v-chip
                  >
                  <v-chip
                    color="primary"
                    v-else
                    class="mr-1"
                    outlined
                    label
                    x-small
                    >3D</v-chip
                  >
                  {{ item.name }}
                </v-list-item-title>
                <v-list-item-subtitle v-if="item.state === 'Revert'">
                  <v-progress-linear :indeterminate="true" />
                </v-list-item-subtitle>
                <template v-else>
                  <v-list-item-subtitle
                    >{{ $t("Printing time: ")
                    }}{{
                      $moment.duration(item.printingTime, "seconds").humanize()
                    }}</v-list-item-subtitle
                  >
                </template>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text>{{
                  $moment.unix(item.lastPrintTime).fromNow()
                }}</v-list-item-action-text>
                <v-menu>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="revertJob(item)">
                      <v-list-item-action>
                        <v-icon>mdi-refresh</v-icon>
                      </v-list-item-action>
                      <v-list-item-title>{{ $t("Revert") }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="removeJob(item)">
                      <v-list-item-action>
                        <v-icon>mdi-delete</v-icon>
                      </v-list-item-action>
                      <v-list-item-title>{{ $t("Remove") }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-virtual-scroll>
        <v-container v-else>
          <v-row dense align="center" justify="center">
            <v-col cols="auto">
              <v-img
                src="/empty-state/done-jobs.svg"
                height="192px"
                width="192px"
                aspect-ratio="1"
              />
            </v-col>
            <v-col cols="12">
              <h6 class="title text-center">
                {{
                  $t(
                    "Here you will see done print jobs. Successful prints marked with"
                  )
                }}
                <v-icon color="success">mdi-check</v-icon>&nbsp;
              </h6>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import { PrintJob } from '~/types/printJob'
import { Settings } from '../../types/settings'
import BottomInput from '~/components/common/BottomInput.vue'

const printJobs = namespace('printJobsState')
const settings = namespace('settingsState')

@Component({
  components: {
    BottomInput
  }
})
export default class DoneJobs extends Vue {
  @settings.Getter settings!: Settings

  @printJobs.Getter doneJobs!: PrintJob[]
  @printJobs.Action removeJob: any
  @printJobs.Action revertJob: any
  @printJobs.Action toggleSuccess: any

  get filteredDoneJobs (): PrintJob[] {
    return this.doneJobs.filter(j => j.name.toLowerCase().includes(this.filter?.toLowerCase() || ''))
  }

  filter: string = ''

  collapsed: boolean = true
  keyboard: boolean = false
}
</script>

<style>
</style>
