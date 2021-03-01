<template>
  <div :class="keyboardClass" />
</template>

<script>
import Keyboard from 'simple-keyboard'
import 'simple-keyboard/build/css/index.css'
import 'simple-keyboard/build/css/simple-keyboard.css'

export default {
  name: 'SimpleKeyboard',
  props: {
    keyboardClass: {
      default: 'simple-keyboard',
      type: String
    },
    input: {
      default: '',
      type: String
    },
    theme: {
      type: String
    }
  },
  data: () => ({
    keyboard: null
  }),
  mounted() {
    console.log('Keyboard mounted')
    this.keyboard = new Keyboard({
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
      layout: {
        'default': [
          '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
          'q w e r t y u i o p [ ] \\',
          'a s d f g h j k l ; \' {enter}',
          '{shift} z x c v b n m , . /',
          '{space}'
        ],
        'shift': [
          '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
          'Q W E R T Y U I O P { } |',
          'A S D F G H J K L : " {enter}',
          '{shift} Z X C V B N M < > ?',
          '{space}'
        ]
      },
      theme: this.theme
    })
  },
  methods: {
    onChange(input) {
      this.$emit('onChange', input)
    },
    onKeyPress(button) {
      this.$emit('onKeyPress', button)

      /**
       * If you want to handle the shift and caps lock buttons
       */
      if (button === '{shift}' || button === '{lock}') { this.handleShift() }
      if (button === '{enter}') {
        this.$emit('enterPressed')
      }
    },
    handleShift() {
      const currentLayout = this.keyboard.options.layoutName
      const shiftToggle = currentLayout === 'default' ? 'shift' : 'default'

      this.keyboard.setOptions({
        layoutName: shiftToggle
      })
    }
  },

  input(input) {
    this.keyboard.setInput(input)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
