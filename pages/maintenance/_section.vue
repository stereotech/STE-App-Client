<template>
  <v-container fluid>
      <v-row>
          <v-col cols="12" sm="3">
            <v-card class="overflow-hidden">
                <v-app-bar
                    :collapse="!collapseOnScroll"
                    :collapse-on-scroll="collapseOnScroll"
                    absolute
                    color="primary"
                    dark
                    scroll-target="#scrolling-techniques-6"
                    >
                    <v-app-bar-nav-icon></v-app-bar-nav-icon>

                    <v-toolbar-title>Collapsing Bar</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-checkbox v-model="collapseOnScroll" color="white" hide-details></v-checkbox>
                </v-app-bar>
                <v-sheet id="scrolling-techniques-6" class="overflow-y-auto" max-height="600">
                    <v-container style="height: 1000px;">
                        <v-list v-if="getManualsInformation.length > 0">
                            <v-list-item v-for="(manual, index) in getManualsInformation"
                            :key="index"
                            nuxt :to="`/maintenance/${this.$route.params.section}/${manual.path}`"
                            >
                                <v-list-item-title>{{manual.page.attrs.title}}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-container>
                </v-sheet>
            </v-card>
          </v-col>
          <v-col cols="12" sm="9">
              <nuxt-child/>
          </v-col>
      </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { State, Action, Getter, namespace } from 'vuex-class'
import { ManualSection, Manual, ManualPage, manualsPaths } from '~/types/manuals'

const userManuals = namespace('manualsState')

@Component
export default class SectionManual extends Vue{
 collapseOnScroll: boolean = true
 @userManuals.Action fetchManuals
 @userManuals.Getter getAllManuals!: (sectionName: string) => Manual[] | []

 //manualsInformation: Manual[] | undefined = []
 get getManualsInformation() {
     if (this.getAllManuals(this.$route.params.section).length == 0){
         console.log ('very null', this.$route.params.section)
     }
     return this.getAllManuals(this.$route.params.section)
    // if(this.getAllManuals(this.$route.params.section)!==undefined && this.$route.params.section!==undefined){
    //     this.manualsInformation.push(this.getAllManuals(this.$route.params.section))

    //         if (this.manualsInformation !== undefined){
    //             for (let i=0; i<this.manualsInformation.length; i++){
    //                 this.manualsInformation[i].path.replace(/\/ru/,"")
    //             }
    //             return this.manualsInformation
    //         }
    // }
    
    // else {
    //         console.log("undef")
    //     return
    // } 
 }  
 async mounted(){
     this.$store.dispatch('manualsState/fetchManuals')
} 
}
</script>

<style>

</style>