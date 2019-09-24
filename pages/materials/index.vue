<template>
  <v-layout row wrap>
    <v-flex xs12>

      <v-dialog
        v-model="isOpen"
        max-width="425"
        persistent
        :fullscreen="$vuetify.breakpoint.smAndDown"
      >

            <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="closeDialog(undefined)">
                <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ editMode ? 'Edit' : 'Create' }} Material</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn :disabled="!valid" dark text @click="closeDialog(!editMode)">Save</v-btn>
            </v-toolbar>
            
                <v-form v-model="valid">
                  <v-container fluid grid-list-sm>
                    <v-layout row wrap justify-center>
                        <!-- <v-layout> -->
                      <v-flex xs12>
                        <div>
                          Color code
                        </div>
                      </v-flex> 
                        <v-flex xs12 class="mb-8">
                          <v-color-picker mode="hexa" value="string" v-model="editedMaterial.metadata.colorCode"></v-color-picker>
                        </v-flex>
                        

                      <!-- </v-layout> -->
                      <v-flex xs12>
                        <v-text-field label="Brand" :rules='brandRules' filled clearable v-model="editedMaterial.metadata.name.brand"></v-text-field>
                      </v-flex>
                      
                      <v-flex xs12>
                        <v-text-field label="Material name" :rules='materialNameRules' filled clearable v-model="editedMaterial.metadata.name.materialName"></v-text-field>
                      </v-flex>

                      <v-flex xs12>
                        <v-text-field label="Color" :rules='colorRules' filled clearable v-model="editedMaterial.metadata.name.color"></v-text-field>
                      </v-flex>

                    <!-- <v-flex xs12>
                        <v-text-field label="Version" filled clearable v-model="material.metadata.version"></v-text-field>
                      </v-flex> -->
                      <v-flex xs12>
                        <v-textarea label="Description" filled clearable auto-grow v-model="editedMaterial.metadata.description"></v-textarea>
                      </v-flex>
                      
                      <v-flex xs12>
                        <v-text-field label="Adhesion info" filled clearable v-model="editedMaterial.metadata.adhesionInfo"></v-text-field>
                      </v-flex>
                      
                      <v-flex xs12>
                        <v-text-field label="Density" filled clearable v-model="editedMaterial.properties.density"></v-text-field>
                      </v-flex>
      
                </v-layout>
                  </v-container>
                </v-form>
            </v-card>
        </v-dialog>    
      <v-data-table
              :headers="headers"
              :items="materials"
              class="elevation-1"
      >

         <template v-slot:item.action="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
      </template>
      </v-data-table>
      <v-speed-dial v-model="fab" absolute bottom right>
        <template v-slot:activator>
          <v-btn
           
            v-model="fab"
            color="blue darken-2"
            dark
            fab
          
          >
            <v-icon v-if="fab">mdi-close</v-icon>
            <v-icon v-else>mdi-plus</v-icon>
          </v-btn>

      </template>

      <v-btn
          fab
          dark
          small
          color="green"
        >
          <v-icon>mdi-folder-edit</v-icon>
      </v-btn>
      <v-btn
          fab
          dark
          small
          color="indigo"
          @click="isOpen=true"
          
        >
          <v-icon>mdi-plus</v-icon>
      </v-btn>

  </v-speed-dial>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Action, Getter, namespace } from 'vuex-class'

import {Material} from 'types/material'
import fs from 'fs'

const Materials = namespace ('materialsState')

@Component({
})

export default class MaterialsPages extends Vue {

 @Materials.Getter materials!:Material[]
 @Materials.Action removeMaterial :any
 @Materials.Action addMaterial:any
 @Materials.Action editMaterial: any
 @Materials.Action fetchMaterials:any
  //private isOpen: boolean = this.value
  private overlay: boolean = false
  private valid: boolean = false
  private editMode: boolean = false
  headers = [
    { text: 'Brand', value: 'metadata.name.brand' },
    { text: 'Material', value: 'metadata.name.materialName' },
    { text: 'Color', value: 'metadata.name.color' },
    { text: 'Version', value: 'metadata.version' },
    { text: 'Color code', value: 'metadata.color_code' },
    { text: 'Description', value: 'metadata.description' },
    { text: 'Adhesion info', value: 'metadata.adhesionInfo' },
    { text: 'Density', value: 'properties.density' },
    { text: 'Actions', value: 'action', sortable: false}
  ];

  editedIndex = -1;
   private editedMaterial:Material = {
     id:0,
     metadata:{ 
       name:{
         brand: '',
        materialName:'',
        color:'',
       },
       version:'',
        colorCode:'',
        description:'',
        adhesionInfo:'',
     },
    properties:{
        density:1
    }
  }
  private fab:boolean = false
  private isOpen:boolean = false

    private async closeDialog (add:boolean|undefined) {
    this.$emit('input', false)
    this.isOpen = false
    if (add!==undefined){
      if(add){
        let mtrl: Material = this.editedMaterial
        this.overlay=true
        await this.addMaterial(mtrl)
        this.overlay = false
      }else{
        this.overlay = true
        await this.editMaterial(this.editedMaterial)
        this.overlay = false
      }

    }
    this.editedMaterial={
      id:0,
     metadata:{ 
       name:{
         brand: '',
        materialName:'',
        color:'',
       },
       version:'',
        colorCode:'',
        description:'',
        adhesionInfo:'',
     },
    properties:{
        density:1
    }
    }
  }
public mounted(){
  this.fetchMaterials()
}

  editItem(item){
      this.isOpen = true
      this.editMode = true
      Object.assign(this.editedMaterial, item)
  }
  deleteItem (item) {
    const index = this.materials.indexOf(item);
    confirm('Are you sure you want to delete this item?') && this.removeMaterial(item);
    //this.materials.splice(index,1)
  }
  private brandRules=[
    v=> !!v || 'Brand is required'
  ]
  private materialNameRules=[
    v=> !!v ||'Material name required'
  ]
  private colorRules=[
    v=> !!v ||'Color name required'
  ]
}

</script>

<style>
  .crud_panel {
    margin-top:25px;
  }
</style>
