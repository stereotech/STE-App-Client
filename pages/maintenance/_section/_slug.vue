<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>{{ page.attrs.title }}</h1>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-container>
            <HtmlParser :content="page.body" />
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-btn outlined color="primary" v-if="prevLink" nuxt @click="goBack">
          <v-icon left>mdi-chevron-left</v-icon>
          {{ prevLink.name }}
        </v-btn>
        <v-btn
          outlined
          color="primary"
          class="inline-block float-right"
          v-if="nextLink"
          nuxt
          @click="goNext"
        >
          {{ nextLink.name }}
          <v-icon right>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import HtmlParser from '@/components/HtmlParser.vue'
import { State, Action, Getter, namespace } from 'vuex-class'
import { ManualSection, Manual, manualsPaths } from '~/types/manuals'
import { VAlert } from 'vuetify/lib'

const userManuals = namespace('manualsState')
@Component({
    components: {
     HtmlParser,
     VAlert
  },
  // async asyncData(context: any){
  //     const slug = context.params.slug || '1-introduction'
  //     const path = `/${context.params.section}/${slug}`
  //     const data = {
  //         path,
  //         section: context.params.section,
  //         page: {}
  //     }
  // }
})

export default class ManualSlug extends Vue{ 
  @userManuals.Getter getManuals!: (sectionName: string) => ManualSection | undefined
  page: any = {}
  path: string = ''
  section: string = ''

  get sectionManuals (){
    let array: any
    array = this.getManuals(this.section)
    if (array === undefined){
      return
    }
    else if (array !== undefined){
      return array.manuals
    }
  }

  get baseLink () {
    return '/maintenance/' + this.$route.params.section
  }
  get list() {
    return this.$store.state.menu[this.$route.params.section].reduce((links: any, section: any) => links.concat(section.links), [])
  }

  get lastPathPart (): string {
    return this.$route.path.replace(/\/$/, '').split('/')[4] || ''
  }

  get prevLink (): any {
    const index = this.list.findIndex(link => (link.to || '') === `/${this.lastPathPart}`)
    return this.list[index - 1] || null
  }

  get nextLink (): any {
    const index = this.list.findIndex(link => (link.to || '') === `/${this.lastPathPart}`)

    return this.list[index + 1] || null
  }

  goBack () {
    this.$router.push(this.baseLink + this.prevLink.to)
    this.$vuetify.goTo(0)
  }

  goNext () {
    this.$router.push(this.baseLink + this.nextLink.to)
    this.$vuetify.goTo(0)
  }

  mounted () {
    if (!this.$route.params.slug) {
      this.$router.push(this.$route.fullPath + '/1-introduction')
    }
  }
}
</script>

<style>

</style>