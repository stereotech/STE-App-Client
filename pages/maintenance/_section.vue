<template>
  <v-container fluid>
      <v-row>
          <v-col cols="12">
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
import { ManualSection, manualsPaths } from '~/types/manuals'

@Component({

})
export default class SectionManual extends Vue{
 
 //@userManuals.Getter getManuals!: (sectionName: string) => ManualSection | undefined

}
</script>

<style>

</style>