<template>
  <v-card>
    <v-card-title>
      <span class="headline font-weight-light">Manual control</span>
    </v-card-title>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 md6 lg4>
          <JogCard :printing="printing" :id="id"/>
        </v-flex>
        <v-flex xs12 md6 lg4>
          <ExtruderCard :printing="printing" :id="id"/>
        </v-flex>
        <v-flex xs12 md6 lg4>
          <TemperatureFan chamberFan :id="id"/>
        </v-flex>
        <v-flex xs12 md6 lg4>
          <TerminalCard :id="id"/>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import JogCard from '~/components/printers/expert/JogCard.vue'
import ExtruderCard from '~/components/printers/expert/ExtruderCard.vue'
import TerminalCard from '~/components/printers/expert/TerminalCard.vue'
import TemperatureFan from '~/components/printers/expert/TemperatureFan.vue'

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
}
</script>

<style>
</style>
