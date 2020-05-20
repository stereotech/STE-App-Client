<template>
  <v-container>
    <v-row v-if="certainPageTitle && certainPageBody === undefined">
      <v-col>
        <v-btn dark color="primary" nuxt :to="'/maintenance'">
          {{$t('Back')}}
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <h1>{{ certainPageTitle}}</h1>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-container>
            <HtmlParser :content="certainPageBody" />
          </v-container>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import HtmlParser from '@/components/HtmlParser.vue'
import { State, Action, Getter, namespace } from 'vuex-class'
import { ManualSection, Manual, ManualPage, manualsPaths } from '~/types/manuals'
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
  @userManuals.Getter getManualPage!: (sectionName: string, pageName: string) => Manual | undefined
  page: any = {}
  path: string = ''
  section: string = ''

  get certainPageTitle (){
    let curPage: Manual | undefined
    curPage = this.getManualPage(this.$route.params.section, this.$route.params.slug)
    if (curPage !== undefined){
      console.log(curPage.page.attrs.title)
      return curPage.page.attrs.title
    }
    else{
      return undefined
    }
    // console.log(this.$route.params.section)
    // console.log(this.$route.params.slug)
  }

get certainPageBody (){
  let curPage: Manual | undefined
  curPage = this.getManualPage(this.$route.params.section, this.$route.params.slug)
    function replaceImages(match) {
    return "https://stereotech.org" + match
  }
  if (curPage !== undefined){
    let str = curPage.page.body
    let res = str.replace(/\/docs\/[a-z0-9\/]*\.(jpg|png|webp)/g, replaceImages)
    console.log(str)
    return res
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

  mounted () {
    if (this.$route.params.slug==undefined) {
      this.$router.push(this.$route.fullPath + '/1-introduction')
    }
  }
}
</script>

<style>

</style>