<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <span class="headline font-weight-light">{{$t("Manual Control")}}</span>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-container fluid>
        <v-row dense>
          <v-col cols="12" md="6">
            <JogCard :id="id" :printing="printing" :isFiveAxis="isFiveAxis" />
          </v-col>
          <v-col cols="12" md="6">
            <ExtruderCard :id="id" :printing="printing" :glaze="glaze" :fiber="fiber" />
          </v-col>
          <v-col cols="12" md="6">
            <TemperatureFan
              :id="id"
              chamber-fan
              :bed-heater="!isFiveAxis"
              :glaze="glaze"
              :fiber="fiber"
            />
          </v-col>
          <v-col cols="12" md="6">
            <TerminalCard :id="id" />
          </v-col>
        </v-row>
      </v-container>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import JogCard from '~/components/printers/expert/JogCard.vue'
import ExtruderCard from '~/components/printers/expert/ExtruderCard.vue'
import TerminalCard from '~/components/printers/expert/TerminalCard.vue'
import TemperatureFan from '~/components/printers/expert/TemperatureFan.vue'
import { PrinterInfo } from '~/types/printer.ts'

@Component({
  components: {
    JogCard,
    ExtruderCard,
    TemperatureFan,
    TerminalCard
  }
})
export default class ManualControlPanel extends Vue {
  @Prop({ default: false, type: Boolean }) printing?: boolean
  @Prop({ default: false, type: Boolean }) glaze?: boolean
  @Prop({ default: false, type: Boolean }) fiber?: boolean
  @Prop({ default: '', type: String }) id?: string
  @Prop({ default: false, type: Boolean }) isFiveAxis?: boolean
}
</script>

<style>
.v-expansion-panel-content__wrap {
  padding: 0;
}
</style>
