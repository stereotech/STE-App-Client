<template>
  <v-bottom-sheet v-model="isOpen">
    <v-sheet>
      <v-container grid-list-xs>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              label="Input text"
              autofocus
              clearable
              single-line
              outlined
              v-model="input"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="input" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
import SimpleKeyboard from '~/components/common/SimpleKeyboard.vue'

@Component({
  components: {
    SimpleKeyboard
  }
})
export default class BottomKeyboard extends Vue {
  @Model('input', { type: Boolean, default: false }) value!: boolean
  @Watch('value') onValueChanged (val: boolean) {
    this.isOpen = val
  }
  private isOpen: boolean = this.value

  private closeKeyboard () {
    this.$emit('input', false)
    this.isOpen = false
  }



  input: string = ''

  onChange (input) {
    this.input = input
  }
  onKeyPress (button) {
  }
  onInputChange (input) {
    this.input = input.target.value
  }
}

</script>

<style scoped>
.v-btn {
  text-transform: none;
}
</style>