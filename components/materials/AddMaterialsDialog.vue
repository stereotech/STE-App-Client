<template>
  <div>
    <v-btn color="primary" large round block @click="showForm">
      <v-icon>mdi-plus</v-icon>&nbsp;Add material
    </v-btn>
    <v-dialog
      v-model="dialog"
      max-width="425"
      persistent
      :fullscreen="$vuetify.breakpoint.xs"
      scrollable
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Add material</v-toolbar-title>
        </v-toolbar>
        <v-card-text style="height: 1000px;">
          <v-container grid-list-md fluid>
            <v-flex d-flex xs12>
              <div class="title text-xs-center">
                <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
              </div>
            </v-flex>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Getter, Action, Mutation, namespace } from 'vuex-class'

const scannerResult = namespace('addMaterialState')

@Component
export default class AddMaterialsDialog extends Vue {
  private dialog: boolean = false
  private confirmation: boolean = false

  async showForm () {
    this.dialog = true
  }

  private closeDialog () {
    this.dialog = false
  }
}
</script>

<style>
</style>
