<template>
  <div>
    <v-btn color="primary" large round block @click="startScan">
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
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="closeDialog(!editMode)">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text style="height: 1000px;">
          <v-container grid-list-md fluid>
              <v-flex d-flex xs12>
                <div class="title text-xs-center">
                  <v-layout>
                    <div class="code_color_txt">
                      Color code
                    </div>
                    <v-flex class="code_color">
                      <swatches v-model="color"></swatches>
                    </v-flex>
                  </v-layout>

                  <v-text-field label="Brand"></v-text-field>
                  <v-text-field label="Material"></v-text-field>
                  <v-text-field label="Color"></v-text-field>
                  <v-textarea label="Description" no-resize="1"></v-textarea>
                  <v-text-field label="Adhesion info"></v-text-field>

                  <v-layout>
                    <v-flex>
                      <v-slider
                              label="Density"
                              v-model="densityVal"
                              :max="15"
                              :min="1"
                              :step="0.1"
                      ></v-slider>
                    </v-flex>
                    <v-flex
                            shrink
                            style="width: 60px"
                    >
                      <v-text-field
                              class="slider_val"
                              v-model="densityVal"
                              hide-details
                              type="number"
                              :max="15"
                              :min="1"
                              :step="0.1"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout>
                    <v-flex>
                      <v-slider
                              label="Diameter"
                              v-model="diameterVal"
                              :max="5"
                              :min="1"
                              :step="0.1"
                      ></v-slider>
                    </v-flex>
                    <v-flex
                            shrink
                            style="width: 60px"
                    >
                      <v-text-field
                              class="slider_val"
                              v-model="diameterVal"
                              hide-details
                              type="number"
                              :max="5"
                              :min="1"
                              :step="0.1"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
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
import { ScannerResult } from '~/types/scannerResult'

import Swatches from 'vue-swatches'
import "vue-swatches/dist/vue-swatches.min.css"

const scannerResult = namespace('scannerResultState')

@Component({
  components: {
    Swatches
  },
  data () {
    return {
      color: '#1CA085'
    }
  }
})
export default class AddPrinterDialog extends Vue {
  @scannerResult.Getter results?: ScannerResult[]
  @scannerResult.Action fetchResults: any
  @scannerResult.Action connect: any
  @scannerResult.Mutation clearResults: any

  private dialog: boolean = false
  private confirmation: boolean = false
  private densityVal: number = 1
  private diameterVal: number = 1.75

  async startScan () {
    this.dialog = true
    await this.fetchResults()
  }

  async startConnection (printer: ScannerResult) {
    this.confirmation = false
    this.dialog = false
    this.connect(printer)
  }

  private closeDialog () {
    this.dialog = false
    this.clearResults()
  }
}
</script>

<style>
  .slider_val {
    width: 50px!important;
  }
  .code_color_txt {
    text-align: left;
    color: gray;
    font-size: 16px;
    display: block;
    padding-right: 30px;
    padding-top: 18px;
    padding-left: 3px;
  }
</style>
