<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <span class="headline font-weight-light">Manual control</span>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-container fluid grid-list-xs>
        <v-layout row wrap>
          <v-flex xs12 md6>
            <JogCard :printing="printing" :id="id" :isFiveAxis="isFiveAxis"/>
          </v-flex>
          <v-flex xs12 md6>
            <ExtruderCard :printing="printing" :id="id" />
          </v-flex>
          <v-flex xs12 md6>
            <TemperatureFan chamberFan :id="id" />
          </v-flex>
          <v-flex xs12 md6>
            <TerminalCard :id="id" />
          </v-flex>
        </v-layout>
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
  @Prop({ default: '', type: String }) id?: string
  @Prop({default: false, type: Boolean}) isFiveAxis?: boolean
}
</script>

<style>
.v-expansion-panel-content__wrap {
  padding: 0;
}
</style>
