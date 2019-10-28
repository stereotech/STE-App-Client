<template>
  <SettingsDialog v-model="isOpen" @input="closeDialog">
    <template slot="title">
      Date and time
    </template>
    <v-dialog
      ref="datedialog"
      v-model="modal"
      :return-value.sync="dateModel"
      persistent
      full-width
      width="290px"
      @update:return-value="setDate"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="dateModel"
          filled
          label="Set date"
          prepend-icon="mdi-calendar"
          readonly
          v-on="on"
        />
      </template>
      <v-date-picker v-model="dateModel" scrollable>
        <v-spacer />
        <v-btn text color="primary" @click="modal = false">
          Cancel
        </v-btn>
        <v-btn text color="primary" @click="setDate(dateModel)">
          OK
        </v-btn>
      </v-date-picker>
    </v-dialog>
    <v-dialog
      ref="dialog"
      v-model="modal2"
      :return-value.sync="timeModel"
      persistent
      full-width
      width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="timeModel"
          filled
          label="Set time"
          prepend-icon="mdi-clock-outline"
          readonly
          v-on="on"
        />
      </template>
      <v-time-picker v-if="modal2" v-model="timeModel" full-width format="24hr">
        <v-spacer />
        <v-btn text color="primary" @click="modal2 = false">
          Cancel
        </v-btn>
        <v-btn text color="primary" @click="setTime(timeModel)">
          OK
        </v-btn>
      </v-time-picker>
    </v-dialog>
  </SettingsDialog>
</template>

<script lang="ts">
import { Vue, Component, Model, Watch } from 'nuxt-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
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

  private modal: boolean = false
  private modal2: boolean = false
  private closeDialog () {
    this.$emit('input', false)
    this.isOpen = false
  }

  @settings.Getter date!: string
  @settings.Getter time!: string
  @settings.Action sendDateTime: any

  private dateModel: string = ''
  private timeModel: string = ''

  private setTime (value: string) {
    this.sendDateTime({ date: this.dateModel, time: value })
    const dialog = this.$refs.dialog as any
    dialog.save(this.timeModel)
  }

  private setDate (value: string) {
    this.sendDateTime({ date: value, time: this.timeModel })
    const dialog = this.$refs.datedialog as any
    dialog.save(this.dateModel)
  }

  mounted () {
    this.dateModel = this.date
    this.timeModel = this.time
  }
}
</script>

<style>
</style>
