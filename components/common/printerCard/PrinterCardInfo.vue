<template>
  <v-col class="d-flex" md="4" cols="12" sm="6">
    <v-container fluid>
      <v-row dense>
        <v-col cols="4">
          <v-img class="elevation-1" :src="'/printers/'+ model +'.png'" alt="Avatar">
            <div v-if="printing" class="fill-height repeating-gradient-white" />
            <div v-else-if="paused || maintenance" class="fill-height repeating-gradient-warning" />
            <div v-else-if="done" class="fill-height repeating-gradient-success" />
            <div v-else-if="offline" class="fill-height repeating-gradient-error" />
            <div v-else />
          </v-img>
        </v-col>
        <v-col cols="8">
          <div class="title">
            {{ name }}
            <v-chip color="primary" v-if="local" outlined label>{{$t("Host")}}</v-chip>
            <v-chip color="info" v-if="isFiveAxis" outlined label>{{$t("5D")}}</v-chip>
            <v-chip color="brown" v-if="isGlaze" outlined label>{{$t("Glaze")}}</v-chip>
          </div>

          <div class="caption">{{ model }}</div>
          <div v-if="printing || paused" class="caption">
            <span>{{$t("Spent ")}} {{ $moment.duration(printTime, 'seconds').humanize() }}</span>
            <span
              v-if="printTimeLeft"
            >, {{ $moment.duration(printTimeLeft, 'seconds').humanize() }} {{$t("Left")}}</span>
          </div>
          <div v-if="printing" class="title">{{$t("Printing...")}}{{ progress | currency('', 1) }}%</div>
          <div
            v-if="paused"
            class="warning--text title"
          >{{$t("Paused at")}}{{ progress | currency('', 1) }}%</div>
          <div v-else-if="idle" class="title">{{$t("Idle")}}</div>
          <div class="warning--text title" v-else-if="maintenance">{{$t("Maintenance")}}</div>
          <div class="success--text title" v-else-if="done">{{$t("Printing Done!")}}</div>
          <div class="error--text title" v-else-if="failed">{{$t("Printing Failed")}}</div>
          <div class="error--text title" v-else-if="offline">{{$t("Offline")}}</div>
          <div class="primary--text title" v-else-if="loading">{{$t("Loading...")}}</div>
          <div class="error--text title" v-else-if="notAvaliable">{{$t("Not Available")}}</div>
          <v-progress-linear v-if="printing" :value="progress" />
          <v-progress-linear v-if="paused" :value="progress" color="warning" />
          <v-progress-linear v-if="loading" indeterminate />
        </v-col>
      </v-row>
    </v-container>
  </v-col>
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
  @Prop({ default: false, type: Boolean }) isFiveAxis!: boolean
  @Prop({ default: false, type: Boolean }) isGlaze!: boolean
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
