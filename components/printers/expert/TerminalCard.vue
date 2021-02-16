<template>
  <v-card>
    <v-card-title class="title">{{ $t("Terminal") }}</v-card-title>
    <v-container fluid>
      <v-row dense>
        <v-col cols="12">
          <v-card>
            <v-virtual-scroll
              id="terminal-list"
              max-height="500"
              height="500"
              :items="printerLog"
              :item-height="50"
            >
              <template v-slot="{ item, index }">
                <TerminalString :key="index" @mounted="scrollToBottom">{{
                  item
                }}</TerminalString>
              </template>
            </v-virtual-scroll>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-checkbox v-model="autoscroll" :label="$tc('Autoscroll')" />
          <v-checkbox
            v-model="hideTemperature"
            :label="$tc('Hide temperature messages')"
          />
        </v-col>
        <v-col cols="12">
          <BottomInput
            v-model="keyboard"
            :input.sync="gcodeString"
            @enter="sendAndClose"
          >
            <v-text-field
              v-model="gcodeString"
              append-outer-icon="mdi-send"
              filled
              prepend-icon="mdi-close-circle"
              :label="$tc('G-Code Command')"
              type="text"
              @click:prepend="gcodeString = ''"
              @click:append-outer="misc"
              @click="keyboard = true"
              @keydown.enter="misc"
              @keydown.up="prevGCode"
              @keydown.down="nextGCode"
            />
          </BottomInput>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'
import { GoToOptions } from 'vuetify/types/services/goto'
import TerminalString from '~/components/printers/expert/TerminalString.vue'
import BottomInput from '~/components/common/BottomInput.vue'

const printers = namespace('printersState')

@Component({
  components: {
    TerminalString,
    BottomInput
  }
})
export default class TerminalCard extends Vue {
  @Prop({ default: false, type: Boolean }) printing!: boolean
  @Prop({ default: '', type: String, required: true }) id!: string

  @printers.Action customCommand: any
  @printers.Getter printerLogs!: (id: string) => string[]

  get printerLog (): string[] {
    if (this.hideTemperature) {
      return this.printerLogs(this.id).filter(s => !s.match(this.tempRegex) && !s.match(this.sdStatusRegex))
    }
    return this.printerLogs(this.id).filter(s => !s.match(this.sdStatusRegex))
  }

  private previousGCode: string[] = []
  private previousIndex: number = 0
  private gcodeString: string = ''

  private autoscroll: boolean = true
  private hideTemperature: boolean = false
  private tempRegex: RegExp = /(Send: (N\d+\s+)?M105)|(Recv:\s+(ok\s+((P|B|N)\d+\s+)*)?(B|T\d*):\d+)/g
  private sdStatusRegex: RegExp = /(Send: (N\d+\s+)?M27)|(Recv: SD printing byte)|(Recv: Not SD printing)/g
  private keyboard: boolean = false

  private scrollToBottom () {
    if (!this.autoscroll) {
      return
    }
    const options: GoToOptions = {
      container: '#terminal-list'
    }
    this.$vuetify.goTo(9999999, options)
  }

  private misc () {
    const gcode = this.gcodeString.toUpperCase()
    this.customCommand({ id: this.id, command: gcode })
    this.previousGCode.push(gcode)
    this.previousIndex = this.previousGCode.length
    this.gcodeString = ''
  }

  private prevGCode () {
    this.previousIndex--
    if (this.previousIndex < 0) { this.previousIndex = 0 }
    this.gcodeString = this.previousGCode[this.previousIndex]
  }

  private nextGCode () {
    this.previousIndex++
    if (this.previousIndex > this.previousGCode.length) { this.previousIndex = this.previousGCode.length }
    this.gcodeString = this.previousGCode[this.previousIndex]
  }

  sendAndClose () {
    this.misc()
    this.keyboard = false
  }
}
</script>

<style>
</style>
