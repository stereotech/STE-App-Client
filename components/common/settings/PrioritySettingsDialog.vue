<template>
  <SettingsDialog v-model="isOpen" @input="closeDialog">
    <template slot="title">{{$t("Printing Queue Settings")}}</template>
    <v-list>
      <v-list-item>
        <v-list-item-action>
          <v-checkbox
            :value="settings.queuePriorityProcessAll"
            @change="sendQueueProcessAll"
            color="primary"
          ></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>{{$t("Wait For All Jobs Completion In One Priority")}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{$t('Queue passes number in priority')}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-slider
          thumb-label
          inverse-label
          min="1"
          max="10"
          :value="settings.queuePriorityPass"
          @change="sendQueuePass"
        ></v-slider>
      </v-list-item>
    </v-list>
  </SettingsDialog>
</template>

<script lang="ts">

import { Vue, Component, Model, Watch } from 'nuxt-property-decorator'
import { Action, Getter, State, namespace } from 'vuex-class'
import SettingsDialog from '~/components/common/settings/SettingsDialog.vue'
import { Settings } from '~/types/settings'

const settings = namespace('settingsState')

@Component({
  components: {
    SettingsDialog
  }
})
export default class extends Vue {
  @Model('input', { type: Boolean, default: false }) value!: boolean
  @Watch('value') onValueChanged (val: boolean) {
    this.isOpen = val
  }

  private isOpen: boolean = this.value

  private closeDialog () {
    this.$emit('input', false)
    this.isOpen = false
  }


  @settings.Getter settings!: Settings
  @settings.Action sendQueueProcessAll!: any
  @settings.Action sendQueuePass!: any
}
</script>

<style>
</style>