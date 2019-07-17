<template>
  <SettingsDialog v-model="isOpen" @input="closeDialog">
    <template slot="title">{{$t('common.settings.dateTimeDialog.title')}}</template>
    <v-dialog
      ref="datedialog"
      v-model="modal"
      :return-value.sync="dateModel"
      @update:return-value="setDate"
      persistent
      lazy
      full-width
      width="290px"
    >
      <v-text-field
        slot="activator"
        v-model="dateModel"
        box
        label="Set date"
        prepend-icon="mdi-calendar"
        readonly
      ></v-text-field>
      <v-date-picker v-model="dateModel" scrollable>
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="modal = false">{{$t('frequentlyUsed.cancel')}}</v-btn>
        <v-btn flat color="primary" @click="setDate(dateModel)">{{$t('frequentlyUsed.ok')}}</v-btn>
      </v-date-picker>
    </v-dialog>
    <v-dialog
      ref="dialog"
      v-model="modal2"
      :return-value.sync="timeModel"
      persistent
      lazy
      full-width
      width="290px"
    >
      <v-text-field
        slot="activator"
        v-model="timeModel"
        box
        label="Set time"
        prepend-icon="mdi-clock-outline"
        readonly
      ></v-text-field>
      <v-time-picker v-if="modal2" v-model="timeModel" full-width format="24hr">
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="modal2 = false">{{$t('frequentlyUsed.cancel')}}</v-btn>
        <v-btn flat color="primary" @click="setTime(timeModel)">{{$t('frequentlyUsed.ok')}}</v-btn>
      </v-time-picker>
    </v-dialog>
  </SettingsDialog>
</template>

<script lang="ts">
import { Vue, Component, Model, Watch } from 'nuxt-property-decorator'
import SettingsDialog from '~/components/common/settings/SettingsDialog.vue'
import { Settings } from '~/types/settings'
import { Action, Getter, namespace } from 'vuex-class'

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