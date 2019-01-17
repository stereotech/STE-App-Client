<template>
  <SettingsDialog v-model="isOpen" @input="closeDialog">
    <template slot="title">Date and time</template>
    <v-dialog
      ref="dialog"
      v-model="modal"
      :return-value.sync="date"
      persistent
      lazy
      full-width
      width="290px"
    >
      <v-text-field
        slot="activator"
        v-model="date"
        box
        label="Set date"
        prepend-icon="mdi-calendar"
        readonly
      ></v-text-field>
      <v-date-picker v-model="date" scrollable>
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
        <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
      </v-date-picker>
    </v-dialog>
    <v-dialog
      ref="dialog"
      v-model="modal2"
      :return-value.sync="time"
      persistent
      lazy
      full-width
      width="290px"
    >
      <v-text-field
        slot="activator"
        v-model="time"
        box
        label="Set time"
        prepend-icon="mdi-clock-outline"
        readonly
      ></v-text-field>
      <v-time-picker v-if="modal2" v-model="time" full-width format="24hr">
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
        <v-btn flat color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
      </v-time-picker>
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

    private modal: boolean = false
    private modal2: boolean = false
    private date: string = new Date().toISOString().substr(0, 10)
    private time: any = null
    private closeDialog () {
      this.$emit('input', false)
      this.isOpen = false
    }
  }
</script>

<style>
</style>