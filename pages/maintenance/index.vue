<template>
    <v-card>
        <v-card-title class="font-weight-light">{{$t('User Manuals')}}</v-card-title>
            <v-card-text>
                <v-container fluid>
                    <v-row justify="center">
                        <v-col v-for="(manualSection, index) in manualSections" :key="index" cols="12" sm="6" md="3">
                            <v-card hover ripple nuxt exact :to="`/maintenance/${manualSection.section}`">
                            <v-img
                                :src="manualSection.image"
                                gradient="to top, rgba(100,115,201,.0), rgba(38, 50, 56, 1)"
                            >
                                <v-container fluid>
                                <v-row dense>
                                    <v-col class="align-end flexbox" cols="12">
                                    <span class="white--text title font-weight-light">{{ manualSection.name }}</span>
                                    </v-col>
                                </v-row>
                                </v-container>
                            </v-img>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
    </v-card>
    
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { State, Action, Getter, namespace } from 'vuex-class'
import { ManualSection, manualsPaths } from '~/types/manuals'
const userManuals = namespace('manualsState')

export default class Maintenance extends Vue {
    @userManuals.Action fetchManuals

 manualSections: ManualSection[] = [
    {
        name: 'STE 320',
        section: 'ste320',
        image: 'manuals/banner.webp',
        manuals: []
    },
    {
        name: 'STE App',
        section: 'steapp',
        image: 'manuals/cluster1.webp',
        manuals: []
    },
    {
        name: 'STE Slicer',
        section: 'steslicer',
        image: 'manuals/steslicer.jpg',
        manuals: []
    }
  ]

async mounted(){
    await this.fetchManuals
}

}
</script>

<style>

</style>