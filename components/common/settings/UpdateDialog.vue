<template>
  <SettingsDialog v-model="isOpen" @input="closeDialog">
    <template slot="title">System update</template>
    <p class="headline font-weight-light text-xs-center">Current version: {{ current }}</p>
    <v-btn round block color="primary" dark>Check for update</v-btn>
    <v-card v-if="update !== null">
      <v-card-text>
        <p class="primary--text display-2 font-weight-light text-xs-center">{{ update.version }}</p>
        <p class="body-1">{{ update.description }}</p>
        <v-btn round block color="accent" dark>Download and install</v-btn>
      </v-card-text>
    </v-card>
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

    private current: string = 'v1.0'

    private update: any = {
      version: 'v1.1',
      description: 'New awesome update!'
    }

    private closeDialog () {
      this.$emit('input', false)
      this.isOpen = false
    }
  }
</script>

<style>
</style>
