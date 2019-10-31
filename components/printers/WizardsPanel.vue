<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <span class="headline font-weight-light">{{$t("printers.wizardsPanel.title")}}</span>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex xs6 sm3 lg2 v-for="wizard in data" :key="wizard.id">
            <WizardCard
              :name="wizard.name"
              :image="wizard.image"
              :description="wizard.description"
              :to="'/printers/' + $route.params.id + '/' + wizard.link"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import WizardCard from '~/components/printers/WizardCard.vue'


@Component({
  components: {
    WizardCard
  }
})
export default class WizardsPanel extends Vue {

  @Prop({ default: '', type: String }) id?: string

  private data: any[] = [
    {
      id: 1,
      name: 'Bed leveling',
      image: 'bed_leveling/bed_leveling',
      link: 'bed-leveling',
      description: 'This wizard will help you to calibrate the build plate for good adhesion of the print to the build plate.'
    },
    {
      id: 2,
      name: 'Change material',
      image: 'change_material/change_material',
      link: 'change-material',
      description: 'This wizard will help you to change, insert or remove the material'
    }
  ]
}
</script>

<style>
</style>
