<template>
  <div v-bind:class="{ crud_panel: !isAdded }">
    <v-btn color="primary" large round block @click="showModal" v-if="isAdded">
      <v-icon>mdi-plus</v-icon>&nbsp
      Add material
    </v-btn>
    <v-icon small @click="showModal" v-if="!isAdded">
      mdi-pencil
    </v-icon>

    <v-dialog
      v-model="dialog"
      max-width="425"
      persistent
      :fullscreen="$vuetify.breakpoint.xs"
      scrollable
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closeDialog()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title v-if="isAdded">Add material</v-toolbar-title>
          <v-toolbar-title v-if="!isAdded">Update material</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="closeDialog(true)">Save</v-btn>
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
                      <swatches v-model="material.metadata.color_code"></swatches>
                    </v-flex>
                  </v-layout>

                  <v-text-field label="Brand" v-model="material.metadata.name.brand"></v-text-field>
                  <v-text-field label="Material" v-model="material.metadata.name.material"></v-text-field>
                  <v-text-field label="Color" v-model="material.metadata.name.color"></v-text-field>
                  <v-textarea label="Description" auto-grow v-model="material.metadata.description"></v-textarea>
                  <v-text-field label="Adhesion info" v-model="material.metadata.adhesion_info"></v-text-field>

                  <v-layout>
                    <v-flex>
                      <v-slider
                              label="Density"
                              v-model="material.properties.density"
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
                              v-model="material.properties.density"
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
                              v-model="material.properties.diameter"
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
                              v-model="material.properties.diameter"
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
import { Vue, Component, Prop} from 'nuxt-property-decorator'
import { Getter, Action, Mutation, namespace } from 'vuex-class'
import { ScannerResult } from '~/types/scannerResult'

import Swatches from 'vue-swatches'
import "vue-swatches/dist/vue-swatches.min.css"

@Component({
  components: {
    Swatches
  }
})

export default class MaterialDialog extends Vue {
  @Prop({ type: Function }) addMaterial?: any
  @Prop({ default: false, type: Boolean }) isAdded?: boolean

  @Prop({ type: Function }) updateMaterial?: any
  @Prop({ default: 0, type: Number }) materialId?: number
  @Prop({ type: Object }) valMaterial?: any

  private dialog: boolean = false

  private material: any = {
    "metadata": {
      "name": {
        "brand": "",
        "material": "",
        "color": ""
      },
      "GUID": "",
      "version": "",
      "color_code": "#ffc924",
      "description": "",
      "adhesion_info": ""
    },
    "properties": {
      "density": "1.5",
      "diameter": "1.5"
    }
  }


  async showModal () {
    this.dialog = true
    if (!this.isAdded){
      this.setMaterial();
    }
  }

  private setMaterial(){
    this.material = Object.assign({}, this.valMaterial);
  }


  private closeDialog (save = false) {
    if (save && this.isAdded){
      this.addMaterial(this.material);
    } else if (save && !this.isAdded){
      this.updateMaterial(this.material, this.materialId)
    }
    this.dialog = false;
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
