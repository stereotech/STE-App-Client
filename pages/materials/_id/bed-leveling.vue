<template>
  <bedLevelingStepper/>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import bedLevelingStepper from '~/components/wizards/bedLeveling/Stepper.vue'

@Component({
  components: {
    bedLevelingStepper
  }
})
export default class extends Vue {
  layout () {
    return 'solid'
  }
}
</script>

<style>
</style>
