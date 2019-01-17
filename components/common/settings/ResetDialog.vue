<template>
  <SettingsDialog v-model="isOpen" @input="closeDialog">
    <template slot="title">Reset and restore</template>
    <v-list>
      <v-list-tile avatar @click="confirmation = true">
        <v-list-tile-title class="error--text">Factory reset</v-list-tile-title>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile avatar @click="confirmation = true">
        <v-list-tile-title class="error--text font-weight-bold">Factory reset (clear storage)</v-list-tile-title>
      </v-list-tile>
      <v-divider></v-divider>
    </v-list>
    <v-dialog v-model="confirmation" max-width="425">
      <v-card>
        <v-card-title class="headline">Are you sure want to perform factory reset?</v-card-title>
        <v-card-actions>
          <v-btn color="primary" flat @click="confirmation = false">No</v-btn>
          <v-btn color="error" flat @click="confirmation = false">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </SettingsDialog>
</template>

<script lang="ts">
  import { Vue, Component, Model, Watch } from 'nuxt-property-decorator'
  import SettingsDialog from '~/components/common/settings/SettingsDialog.vue'

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

    private confirmation: boolean = false

    private closeDialog () {
      this.$emit('input', false)
      this.isOpen = false
    }
  }
</script>

<style>
</style>
