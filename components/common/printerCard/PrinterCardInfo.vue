<template>
  <v-flex d-flex md4 xs12 sm6>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs4>
          <v-img class="elevation-1" :src="'/printers/'+ model +'.png'" alt="Avatar">
            <div v-if="printing" class="fill-height repeating-gradient-white"></div>
            <div v-else-if="paused || maintenance" class="fill-height repeating-gradient-warning"></div>
            <div v-else-if="done" class="fill-height repeating-gradient-success"></div>
            <div v-else-if="offline" class="fill-height repeating-gradient-error"></div>
            <div v-else></div>
          </v-img>
        </v-flex>
        <v-flex xs8>
          <div class="title">
            {{ name }}
            <v-chip color="primary" v-if="local" outlined label>Host</v-chip>
          </div>

          <div class="caption">{{ model }}</div>
          <div
            class="caption"
            v-if="printing || paused"
          >Spent {{ [printTime, 'seconds'] | duration('humanize') }}, {{ [printTimeLeft, 'seconds'] | duration('humanize') }} left</div>
          <div class="title" v-if="printing">{{$t("common.printerCard.printing")}}{{ progress | currency('', 1) }}%</div>
          <div class="warning--text title" v-if="paused">{{$t("common.printerCard.paused")}}{{ progress | currency('', 1) }}%</div>
          <div class="title" v-else-if="idle">{{$t("common.printerCard.idle")}}</div>
          <div class="warning--text title" v-else-if="maintenance">{{$t("common.printerCard.maintenance")}}</div>
          <div class="success--text title" v-else-if="done">{{$t("common.printerCard.printingDone")}}</div>
          <div class="error--text title" v-else-if="failed">{{$t("common.printerCard.failed")}}</div>
          <div class="error--text title" v-else-if="offline">{{$t("common.printerCard.offline")}}</div>
          <div class="primary--text title" v-else-if="loading">{{$t("common.printerCard.loading")}}</div>
          <div class="error--text title" v-else-if="notAvaliable">{{$t("common.printerCard.notAvailable")}}</div>
          <v-progress-linear v-if="printing" :value="progress"></v-progress-linear>
          <v-progress-linear v-if="paused" :value="progress" color="warning"></v-progress-linear>
          <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class PrinterCardInfo extends Vue {
  @Prop({ default: 0, type: Number }) progress!: number
  @Prop({ default: 0, type: Number }) printTime!: number
  @Prop({ default: 0, type: Number }) printTimeLeft!: number
  @Prop({ default: '', type: String }) model!: number
  @Prop({ default: '', type: String }) name!: number
  @Prop({ default: false, type: Boolean }) local!: boolean
  @Prop({ default: false, type: Boolean }) printing!: boolean
  @Prop({ default: false, type: Boolean }) paused!: boolean
  @Prop({ default: true, type: Boolean }) maintenance!: boolean
  @Prop({ default: false, type: Boolean }) idle!: boolean
  @Prop({ default: false, type: Boolean }) done!: boolean
  @Prop({ default: false, type: Boolean }) failed!: boolean
  @Prop({ default: false, type: Boolean }) offline!: boolean
  @Prop({ default: false, type: Boolean }) loading!: boolean
  @Prop({ default: false, type: Boolean }) notAvaliable!: boolean
}

</script>

<style scoped>
.repeating-gradient-white {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 5px,
    rgba(255, 255, 255, 0.5) 5px,
    rgba(255, 255, 255, 0.5) 10px
  );
}

.repeating-gradient-error {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 5px,
    rgba(255, 82, 82, 0.5) 5px,
    rgba(255, 82, 82, 0.5) 10px
  );
}

.repeating-gradient-warning {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 5px,
    rgba(255, 193, 7, 0.5) 5px,
    rgba(255, 193, 7, 0.5) 10px
  );
}

.repeating-gradient-success {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 5px,
    rgba(76, 175, 80, 0.5) 5px,
    rgba(76, 175, 80, 0.5) 10px
  );
}
</style>
