<template>
  <div>
    <Loading v-if="error.statusCode === 500 || error.statusCode === 502" />
    <v-flex xs12 v-else text-center>
      <h1 class="display-4">{{ error.statusCode }}</h1>
      <h4 class="display-1">{{ error.message }}</h4>
      <v-btn large color="accent" @click="refresh">Retry</v-btn>
    </v-flex>
  </div>
</template>

<script>
import Loading from '~/components/loading.vue'

export default {
  props: ['error'],
  layout: 'solid', // you can set a custom layout for the error page
  methods: {
    refresh() {

    }
  },
  components: {
    Loading
  },
  mounted: function () {
    setTimeout(function () {
      window.location.reload(true)
    }, 3000)
  }
}
</script>
