<template>
  <SettingsDialog v-model="isOpen" @input="closeDialog">
    <template slot="title">Language</template>
    <v-select :items="avaliableLangs" v-model="currentLang" box label="Select language"></v-select>
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

    private currentLang: string = 'English'

    private avaliableLangs: string[] = ['English', 'Русский']

    private closeDialog () {
      this.$emit('input', false)
      this.isOpen = false
    }
  }
</script>

<style>
</style>
