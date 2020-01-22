<template>
  <v-card>
    <v-card-title class="title">
      {{$t("printers.expert.terminalCard.title")}}
    </v-card-title>
    <v-container fluid>
      <v-row dense>
        <v-col cols="12">
          <v-card height="500">
            <v-list id="terminal-list" dense style="max-height: 500px" class="overflow-y-auto">
              <template v-for="(line, index) in printerLogs(id)">
                <TerminalString :key="index" @mounted="scrollToBottom">
                  {{ line }}
                </TerminalString>
              </template>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-checkbox v-model="autoscroll" :label="$tc('labels.autoscroll')" />
        </v-col>
        <v-col cols="12">
          <BottomInput v-model="keyboard" :input.sync="gcodeString">
            <v-text-field
              v-model="gcodeString"
              append-icon="mdi-send"
              filled
              clear-icon="mdi-close-circle"
              clearable
              :label="$tc('labels.gCodeCommand')"
              type="text"
              @click:append="misc"
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
    const options: GoToOptions = {
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
    if (this.previousIndex < 0) { this.previousIndex = 0 }
    this.gcodeString = this.previousGCode[this.previousIndex]
  }

  private nextGCode () {
    this.previousIndex++
    if (this.previousIndex > this.previousGCode.length) { this.previousIndex = this.previousGCode.length }
    this.gcodeString = this.previousGCode[this.previousIndex]
  }
}
</script>

<style>
</style>
