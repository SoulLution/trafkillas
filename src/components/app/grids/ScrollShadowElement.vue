<template>
  <div
    ref="nav"
    class="scroll-shadow-element"
    :class="{ 'scroll-x': scrollX }"
    @scroll="scrollMe"
  >
    <div
      class="absolute elevation-special"
      :style="{
        opacity: opacityTop,
        boxShadow:
          bg && bg !== 'rgba(0, 0, 0, 0)' ? '0 0px 9px 12px ' + bg : '',
        top: haveToolbar
          ? haveToolbar === true
            ? '46px'
            : haveToolbar + 5 + 'px'
          : 0,
      }"
    ></div>
    <div class="scroll-shadow-element-body">
      <slot class="z-0"></slot>
    </div>
    <div
      class="absolute elevation-special"
      :style="{
        opacity: opacityBottom,
        boxShadow:
          bg && bg !== 'rgba(0, 0, 0, 0)' ? '0 0px 9px 12px ' + bg : '',
      }"
    ></div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  props: {
    isLoadData: {
      type: Boolean,
      default: true,
    },
    scrollX: {
      type: Boolean,
      default: false,
    },
    navs: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      opacityTop: 0,
      opacityBottom: 1,
      haveToolbar: null,
      bg: "",
    }
  },
  computed: {
    ...mapGetters("secondaryNavs", {
      getGotoSecondaryNavs: "getGotoSecondaryNavs",
    }),
  },
  watch: {
    getGotoSecondaryNavs(newId) {
      if (newId && this.navs && this.navs.length) {
        const nav = this.$refs.nav,
          item = document.getElementById(newId)
        nav.scrollTo({
          top: item.offsetTop - item.clientHeight / 2,
          behavior: "smooth",
        })
        this.$store.dispatch("secondaryNavs/setGotoSecondaryNavs", "")
      }
    },
  },
  mounted() {
    this.checkNavs()
    const nav = this.$refs.nav
    if (!this.bg)
      this.bg = window
        .getComputedStyle(nav.parentNode, null)
        .getPropertyValue("background-color")
    if (!this.bg)
      this.bg = window
        .getComputedStyle(nav.parentNode, null)
        .getPropertyValue("background")
    if (nav.clientHeight === nav.scrollHeight) this.opacityBottom = 0
  },
  beforeDestroy() {
    if (this.navs && this.navs.length)
      this.$store.dispatch("secondaryNavs/setSecondaryNavs", [])
  },
  methods: {
    checkNavs() {
      if (this.navs && this.navs.length) {
        this.$nextTick(() => {
          this.$store.dispatch("secondaryNavs/setSecondaryNavs", this.navs)
        })
      }
    },
    scrollMe() {
      const nav = this.$refs.nav,
        body = this.$refs.nav.children[1]
      if (!this.bg)
        this.bg = window
          .getComputedStyle(nav.parentNode, null)
          .getPropertyValue("background-color")
      if (!this.bg)
        this.bg = window
          .getComputedStyle(nav.parentNode, null)
          .getPropertyValue("background")
      if (this.haveToolbar === null)
        this.haveToolbar =
          body.children.length && body.children[0].classList
            ? body.children[0].classList.contains("toolbar-element")
            : false
      if (
        this.haveToolbar &&
        body.children[0].classList.contains("toolbar-element")
      )
        this.haveToolbar = body.children[0].clientHeight
      else if (
        body.children.length &&
        body.children[0].children.length > 1 &&
        body.children[0].children[0].classList.contains("toolbar-element")
      )
        this.haveToolbar = body.children[0].children[0].clientHeight

      if (
        this.isLoadData &&
        nav.scrollTop + nav.clientHeight > nav.scrollHeight * 0.9
      )
        this.$emit("fetchData", true)
      if (nav.scrollTop + nav.clientHeight < nav.scrollHeight - 5)
        this.opacityBottom = 1
      else this.opacityBottom = 0
      if (nav.scrollTop > 20)
        // this.opacity = (nav.scrollTop + nav.clientHeight) / nav.scrollHeight
        this.opacityTop = 1
      else this.opacityTop = 0

      if (this.navs && this.navs.length) {
        let navs = JSON.parse(JSON.stringify(this.navs))
        navs.forEach((x) => {
          let item = document.getElementById(x.id)
          x.status =
            nav.scrollTop + nav.clientHeight >=
            item.offsetTop + item.clientHeight / 4
        })
        this.$store.dispatch("secondaryNavs/setSecondaryNavs", navs)
      }
    },
  },
}
</script>
