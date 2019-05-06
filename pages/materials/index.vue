<template>
  <v-layout row wrap>
    <v-flex xs12>
      <PrinterCard
        toolbar
        controlPanel
        v-for="printer in printers"
        :id="printer.id"
        :key="printer.id"
      />
      <AddMaterialDialog/>
      <v-data-table
              :headers="headers"
              :items="materials"
              class="elevation-1"
      >
        <template v-slot:items="props">
          <td class="text-xs-right">{{ props.item["metadata"]["name"]["brand"] }}</td>
          <td class="text-xs-right">{{ props.item["metadata"]["name"]["material"] }}</td>
          <td class="text-xs-right">{{ props.item["metadata"]["color_code"] }}</td>
          <td class="text-xs-right">{{ props.item["metadata"]["version"] }}</td>
          <td class="text-xs-right">{{ props.item["metadata"]["color_code"] }}</td>
          <td class="text-xs-right">{{ props.item["metadata"]["description"] }}</td>
          <td class="text-xs-right">{{ props.item["metadata"]["adhesion_info"] }}</td>
          <td class="text-xs-right">{{ props.item["properties"]["density"] }}</td>
          <td class="text-xs-right">{{ props.item["properties"]["diameter"] }}</td>
          <td class="justify-center layout px-0">
            <v-icon small>
              mdi-pencil
            </v-icon>
            <v-icon @click="deleteItem(props.item)" small>
              mdi-delete
            </v-icon>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import PrinterCard from '~/components/common/PrinterCard.vue'
import AddMaterialDialog from '~/components/materials/AddMaterialDialog.vue'
import { Action, Getter, namespace } from 'vuex-class'
import { PrinterInfo, PrinterStatus } from 'types/printer'
import fs from 'fs'

const printers = namespace('materialsState');


@Component({
  components: {
    PrinterCard,
    AddMaterialDialog
  }
})
export default class PrintersPage extends Vue {
  @printers.Getter printers!: PrinterInfo[];
  @printers.Getter printersStatus!: PrinterStatus[];

  headers = [
    { text: 'Brand', value: 'brand' },
    { text: 'Material', value: 'material' },
    { text: 'Color', value: 'color' },
    { text: 'Version', value: 'version' },
    { text: 'Color code', value: 'color_code' },
    { text: 'Description', value: 'description' },
    { text: 'Adhesion info', value: 'adhesion_info' },
    { text: 'Density', value: 'density' },
    { text: 'Diameter', value: 'diameter' },
    { text: 'Admin', value: 'admin', sortable: false }
  ];
  desserts = [] as any[];
  materials = [] as any[];

  private pollingStatus!: NodeJS.Timeout;

  private async pollData () {
    this.getData();
  }

  private getData(){
    fetch('/jsons/material_model.json')
    .then(function(response) {
      return response.json();
    })
    .then((data) => {
      for (var key in data) {
        this.materials.push(data[key]);
      }
    }).catch( alert );
  }

  async mounted () {
    await this.pollData()
  }

  deleteItem (item) {
    const index = this.materials.indexOf(item);
    confirm('Are you sure you want to delete this item?') && this.materials.splice(index, 1);
  }
}
</script>

<style>
</style>
