<template>
  <v-flex d-flex md4 xs12 sm6>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs4>
          <v-img class="elevation-1" :src="'/printers/'+ model +'.png'" alt="Avatar">
            <div v-if="printing" class="fill-height repeating-gradient-blue"></div>
            <div v-else-if="paused || maintenance" class="fill-height repeating-gradient-warning"></div>
            <div v-else-if="done" class="fill-height repeating-gradient-success"></div>
            <div v-else-if="offline" class="fill-height repeating-gradient-error"></div>
            <div v-else></div>
          </v-img>
        </v-flex>
        <v-flex xs8>
          <p class="title">
            {{ name }}
            <v-chip color="primary" text-color="white" v-if="local">Host</v-chip>
          </p>

          <p class="body-2">{{ model }}</p>
          <p class="title" v-if="printing">Printing...{{ progress | currency('', 1) }}%</p>
          <p class="warning--text title" v-if="paused">Paused at {{ progress | currency('', 1) }}%</p>
          <p class="title" v-else-if="idle">Idle</p>
          <p class="warning--text title" v-else-if="maintenance">Maintenance</p>
          <p class="success--text title" v-else-if="done">Printing Done!</p>
          <p class="error--text title" v-else-if="failed">Printing Failed</p>
          <p class="error--text title" v-else-if="offline">Offline</p>
          <p class="primary--text title" v-else-if="loading">Loading...</p>
          <p class="error--text title" v-else-if="notAvaliable">Not Avaliable</p>
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
.repeating-gradient-blue {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 5px,
    rgba(2, 119, 189, 0.1) 5px,
    rgba(2, 119, 189, 0.1) 10px
  );
}

.repeating-gradient-error {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 5px,
    rgba(255, 82, 82, 0.25) 5px,
    rgba(255, 82, 82, 0.25) 10px
  );
}

.repeating-gradient-warning {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 5px,
    rgba(255, 193, 7, 0.25) 5px,
    rgba(255, 193, 7, 0.25) 10px
  );
}

.repeating-gradient-success {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 5px,
    rgba(76, 175, 80, 0.25) 5px,
    rgba(76, 175, 80, 0.25) 10px
  );
}
</style>
