<template>
  <v-card>
    <v-card-title class="title">Misc</v-card-title>
    <v-container fluid grid-list-xs>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            append-icon="mdi-send"
            @click:append="misc"
            @keydown.enter="misc"
            @keydown.up="prevGCode"
            @keydown.down="nextGCode"
            box
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
  export default class MiscCard extends Vue {
    @Prop({ default: false, type: Boolean }) printing!: boolean
    @Prop({ default: '', type: String, required: true }) id!: string

    @printers.Action customCommand: any

    private previousGCode: string[] = []
    private previousIndex: number = 0
    private gcodeString: string = ''

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
