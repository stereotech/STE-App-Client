<template>
  <v-dialog
    v-model="isOpen"
    max-width="425"
    persistent
    :fullscreen="$vuetify.breakpoint.smAndDown"
    scrollable
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>
          <slot name="title"></slot>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text style="height: 1000px;">
        <slot></slot>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Model, Watch } from 'nuxt-property-decorator'
import SettingsDialog from '~/components/common/settings/SettingsDialog.vue'

@Component({
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
}
</script>

<style>
</style>
