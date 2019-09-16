<template>
  <v-card>
    <v-card-title class="title">Terminal</v-card-title>
    <v-container fluid grid-list-xs>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card height="500">
            <v-list dense style="max-height: 500px" class="overflow-y-auto" id="terminal-list">
              <template v-for="(line, index) in printerLogs(id)">
                <TerminalString :key="index" @mounted="scrollToBottom">{{line}}</TerminalString>
              </template>
            </v-list>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-checkbox label="Autoscroll" v-model="autoscroll"></v-checkbox>
        </v-flex>
        <v-flex xs12>
          <BottomInput :input.sync="gcodeString" v-model="keyboard">
            <v-text-field
              append-icon="mdi-send"
              @click:append="misc"
              @click="keyboard = true"
              @keydown.enter="misc"
              @keydown.up="prevGCode"
              @keydown.down="nextGCode"
              filled
              clear-icon="mdi-close-circle"
              clearable
              label="G-Code Command"
              type="text"
              v-model="gcodeString"
            ></v-text-field>
          </BottomInput>
        </v-flex>
      </v-layout>
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

  private previousGCode: string[] = []
  private previousIndex: number = 0
  private gcodeString: string = ''

  private autoscroll: boolean = true
  private temperature: boolean = false
  private keyboard: boolean = false


  private scrollToBottom () {
    if (!this.autoscroll) {
      return
    }
    let options: GoToOptions = {
      container: '#terminal-list'
    }
    this.$vuetify.goTo(9999999, options)
  }



  private misc () {
    this.customCommand({ id: this.id, command: this.gcodeString })
    this.previousGCode.push(this.gcodeString)
    this.previousIndex = this.previousGCode.length
    this.gcodeString = ''
  }

  private prevGCode () {
    this.previousIndex--
    if (this.previousIndex < 0) this.previousIndex = 0
    this.gcodeString = this.previousGCode[this.previousIndex]
  }

  private nextGCode () {
    this.previousIndex++
    if (this.previousIndex > this.previousGCode.length) this.previousIndex = this.previousGCode.length
    this.gcodeString = this.previousGCode[this.previousIndex]
  }

}
</script>

<style>
</style>
