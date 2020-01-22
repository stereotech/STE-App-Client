<template>
  <v-toolbar v-if="toolbar" flat dense color="secondary">
    <v-btn
      v-if="controlPanel && $vuetify.breakpoint.smAndUp"
      text
      nuxt
      :to="'/printers/' + id"
      ripple
    >
      {{$t("common.printerCard.controlPanel")}}
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
    <v-btn
      v-if="controlPanel && $vuetify.breakpoint.xsOnly"
      text
      icon
      nuxt
      :to="'/printers/' + id"
      ripple
    >
      <v-icon>mdi-camera-control</v-icon>
    </v-btn>
    <v-spacer />
    <v-btn text icon @click="ledCommand({id: id, r: 255, g: 255, b: 255})">
      <v-icon>mdi-lightbulb-on-outline</v-icon>
    </v-btn>
    <v-btn text icon @click="ledCommand({id: id, r: 0, g: 0, b: 0})">
      <v-icon>mdi-lightbulb-off-outline</v-icon>
    </v-btn>
    <v-btn text icon @click="findPrinter(id)">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn v-if="removable" text icon @click="confirmation = true">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
    <v-dialog v-model="confirmation" max-width="425">
      <v-card>
        <v-card-title
          class="headline"
        >
          {{$t("common.printerCard.doYouWantToRemove",[printer(id) ? printer(id).name : ''])}}
        </v-card-title>
        <v-card-actions>
          <v-btn color="primary" text @click="confirmation = false">
            {{$t("frequentlyUsed.no")}}
          </v-btn>
          <v-btn color="primary" text @click="removeFromCluster">
            {{$t("frequentlyUsed.yes")}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import { PrinterInfo } from 'types/printer'

const printers = namespace('printersState')
@Component
export default class PrinterCardToolbar extends Vue {
  @Prop({ default: '', type: String, required: true }) id!: string
  @Prop({ default: false, type: Boolean }) toolbar!: boolean
  @Prop({ default: false, type: Boolean }) controlPanel!: boolean
  @Prop({ default: false, type: Boolean }) removable!: boolean

  @printers.Getter printer!: (id: string) => PrinterInfo | undefined
  @printers.Action findPrinter: any
  @printers.Action ledCommand: any
  @printers.Action deletePrinter: any

  private confirmation: boolean = false

  removeFromCluster () {
    this.deletePrinter(this.printer(this.id))
    this.confirmation = false
  }
}
</script>

<style>
</style>
