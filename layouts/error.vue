<template>
  <div>
    <Loading v-if="error.statusCode === 500 || error.statusCode === 502" />
    <v-col v-else class="text-center" cols="12">
      <h1 class="display-4">
        {{ error.statusCode }}
      </h1>
      <h4 class="display-1">
        {{ error.message }}
      </h4>
      <v-btn large color="accent" @click="refresh">
        {{$t("layout.retry")}}
      </v-btn>
    </v-col>
  </div>
</template>

<script>
import Loading from '~/components/loading.vue'

export default {
  components: {
    Loading
  },
  props: ['error'],
  layout: 'solid',
  mounted () {
    setTimeout(function () {
      window.location.reload(true)
    }, 5000)
  }, // you can set a custom layout for the error page
  methods: {
    refresh () {

    }
  }
}
</script>
