<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="6">
      <v-card class="rotate">
        <v-img contain :src="webcamUrl"></v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Getter } from 'nuxt-property-decorator'

@Component
export default class WebcamPage extends Vue {
  @Getter api!: string
  @Getter isApiAbsolute!: boolean

  get webcamUrl () {
    if (this.isApiAbsolute) {
      let addressItems = this.api.split('/')
      addressItems.pop()
      addressItems.pop()
      return `${addressItems.join('/')}:8080/?action=stream`
    }
    let link = window.location.origin
    if (link.endsWith('/')) {
      link = link.substring(0, link.length - 1)
    }
    let linkParts = link.split(':')
    if (linkParts.length > 2) {
      linkParts.pop()
    }
    return `${linkParts.join(':')}:8080/?action=stream`
  }
}

</script>

<style scoped>
.rotate {
  transform: translateY(50px) rotate(-90deg);
}
</style>