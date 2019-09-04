<template>
  <div>
    <slot></slot>
    <v-bottom-sheet v-model="isOpen" @click:outside="closeKeyboard">
      <v-sheet>
        <v-container grid-list-xs>
          <v-layout row wrap>
            <v-flex xs12>
              <slot></slot>
            </v-flex>
            <v-flex xs12>
              <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="inputLocal" />
            </v-flex>
          </v-layout>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'
import SimpleKeyboard from '~/components/common/SimpleKeyboard.vue'

@Component({
  components: {
    SimpleKeyboard
  }
})
export default class BottomInput extends Vue {
  @Model('input', { type: Boolean, default: false }) value!: boolean
  @Watch('value') onValueChanged (val: boolean) {
    this.isOpen = val
  }
  @Watch('input') onInputChanged (val: string) {
    this.inputLocal = val
  }

  isOpen: boolean = this.value

  private closeKeyboard () {
    this.$emit('input', false)
    this.isOpen = false
  }

  @Prop({ type: String, default: '' }) input!: string

  inputLocal: string = this.input

  onChange (input) {

  }
  onKeyPress (button: string) {
    if (button === '{bksp}') {
      this.inputLocal = this.inputLocal.substring(0, this.inputLocal.length - 1)
      this.$emit('update:input', this.inputLocal)
      return
    }
    if (button === '{enter}') {
      this.inputLocal += '\n'
        this.$emit('update:input', this.inputLocal)
      return
    }
    if (button.startsWith('{') && button.endsWith('}')) {
      return
    }
    this.inputLocal += button
    this.$emit('update:input', this.inputLocal)
  }
  onInputChange (input) {
    this.inputLocal = input.target.value
    this.$emit('update:input', this.inputLocal)
  }
}

</script>

<style scoped>
.v-btn {
  text-transform: none;
}
</style>