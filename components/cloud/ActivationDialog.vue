<template>
  <v-dialog v-model="activating" persistent max-width="320">
    <v-card>
      <v-card-title class="headline">{{ $t("Stereotech Cloud") }}</v-card-title>
      <v-card-subtitle class="headline">{{ $t("Activation") }}</v-card-subtitle>
      <v-card-text v-if="!showPin" class="text-center">{{
        $t(
          "This dialog means that somebody requested access from Steroetech Cloud to this device. You can accept or reject this request"
        )
      }}</v-card-text>
      <v-card-text v-else class="text-center">
        {{ $t("Enter this pin code in order to give access to this device") }}
        <p class="text-h1">{{ pin }}</p>
      </v-card-text>
      <v-card-actions v-if="!showPin">
        <v-btn color="primary" text @click="accept">{{ $t("Agree") }} </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="reject">
          {{ $t("Disagree") }}
        </v-btn>
      </v-card-actions>
      <v-card-actions class="text-center" v-else>
        <v-btn color="primary" text @click="close"> {{ $t("Close") }} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator'

const cloud = namespace('cloudState')

@Component
export default class ActivationDialog extends Vue {
  @cloud.Getter pin!: number
  @cloud.Getter activating!: boolean
  @cloud.Action acceptActivation!: any
  @cloud.Action rejectActivation!: any
  @cloud.Mutation setActivating!: any

  showPin: boolean = false

  accept () {
    this.showPin = true
    this.acceptActivation()
  }

  reject () {
    this.showPin = false
    this.rejectActivation()
  }

  close () {
    this.setActivating(false)
    this.showPin = false
  }

}
</script>

<style>
</style>