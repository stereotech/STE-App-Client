<template>
  <v-card>
    <v-card-title class="title">Terminal</v-card-title>
    <v-container fluid grid-list-xs>
      <v-layout row wrap>
        <v-flex xs12>
          <!--
          <v-textarea
            filled
            readonly
            label="Terminal output"
            :value="printerLogs(id)"
            height="500"
            no-resize
          ></v-textarea>
          -->
          <v-card height="500">
            <v-list dense style="max-height: 500px" class="overflow-y-auto" id="terminal-list">
              <v-list-item v-for="(line, index) in printerLogs(id)" :key="index">
                <v-list-item-content>{{ line }}</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-btn text color="primary" block @click="scrollToBottom">Scroll to bottom</v-btn>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            append-icon="mdi-send"
            @click:append="misc"
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
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'

const printers = namespace('printersState')

@Component
export default class TerminalCard extends Vue {
  @Prop({ default: false, type: Boolean }) printing!: boolean
  @Prop({ default: '', type: String, required: true }) id!: string

  @printers.Action customCommand: any
  @printers.Getter printerLogs!: (id: string) => string[]

  private previousGCode: string[] = []
  private previousIndex: number = 0
  private gcodeString: string = ''

  private scrollToBottom () {
    let container = this.$el.querySelector("#terminal-list")
    if (container) {
      container.scrollTop = container.scrollHeight;
    }

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
