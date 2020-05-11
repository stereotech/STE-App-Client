<template>
  <div v-html="content" />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, } from 'nuxt-property-decorator'

@Component
export default class HtmlParser extends Vue {
  @Prop({ type: String, required: true, default: '' }) content!: string
  _links: any[] | HTMLCollectionOf<HTMLAnchorElement> = []
  @Watch('content') contentUpdated () {

    this.removeListeners()
    this.$nextTick(() => {
      this.addListeners()
    })

  }

  navigate (event: any) {
    let target = event.target
    let i = 0

    while (i < 5 && !(target instanceof HTMLAnchorElement) && target.parentNode) {
      target = target.parentNode
      i++
    }

    if (!(target instanceof HTMLAnchorElement)) { return }

    const href = target.getAttribute('href')

    // Get link target, if local link, navigate with router link
    if (href && href[0] === '/') {
      event.preventDefault()
      this.$router.push(href)
    }
  }

  mounted () {
    this.$nextTick(this.addListeners)
  }

  beforeDestroy () {
    this.removeListeners()
  }

  addListeners () {
    this._links = this.$el.getElementsByTagName('a')
    for (let i = 0; i < this._links.length; i++) {
      this._links[i].addEventListener('click', this.navigate, false)
    }
  }

  removeListeners () {
    for (let i = 0; i < this._links.length; i++) {
      this._links[i].removeEventListener('click', this.navigate, false)
    }
    this._links = []

  }
}
</script>

<style>
</style>