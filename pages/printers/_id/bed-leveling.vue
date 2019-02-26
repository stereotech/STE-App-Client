<template>
  <bedLevelingStepper/>
</template>

<script lang="ts">
  import { Vue, Component } from 'nuxt-property-decorator'
  import bedLevelingStepper from '~/components/wizards/bedLeveling/Stepper.vue'

  @Component({
    layout: 'solid',
    components: {
      bedLevelingStepper
    }
  })
  export default class extends Vue {

  }
</script>

<style>
</style>
