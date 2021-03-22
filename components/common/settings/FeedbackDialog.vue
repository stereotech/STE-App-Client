<template>
  <SettingsDialog v-model="isOpen" @input="closeDialog">
    <template slot="title">{{ $t("Feedback") }}</template>
    <v-list :disabled="isPanel">
      <v-list-item @click="downloadLog(false)">
        <v-list-item-icon>
          <v-icon>mdi-download</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{
            $t("Download STE App log")
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="downloadLog(true)">
        <v-list-item-icon>
          <v-icon>mdi-download</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{
            $t("Download Octoprint log")
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </SettingsDialog>
</template>

<script lang="ts">
import { Vue, Component, Model, Watch } from 'nuxt-property-decorator'
import { Action, Getter, State, namespace } from 'vuex-class'
import SettingsDialog from '~/components/common/settings/SettingsDialog.vue'

const logging = namespace('logging')

@Component({
  components: {
    SettingsDialog
  }
})
export default class FeedbackDialog extends Vue {
  @logging.Action downloadLog!: any

  @Model('input', { type: Boolean, default: false }) value!: boolean
  @Watch('value') onValueChanged (val: boolean) {
    this.isOpen = val
  }
  private isOpen: boolean = this.value
  private closeDialog () {
    this.$emit('input', false)
    this.isOpen = false
  }

  get isPanel (): boolean {
    return process.env.NUXT_ENV_PLATFORM == 'PANEL'
  }
}

</script>

<style>
</style>