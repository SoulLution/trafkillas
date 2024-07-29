<template>
  <div
    class="sub-navigation"
    :class="{
      'sub-navigation-mobile': !is,
      'sub-navigation-open': drawer,
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  data() {
    return {
      windowWidth: window.innerWidth,
      drawer: false,
      is: true,
    }
  },
  computed: {
    ...mapGetters("app", { getSubNavigationOpen: "getSubNavigationOpen" }),
  },
  watch: {
    drawer(newData) {
      if (newData !== this.getSubNavigationOpen)
        this.$store.dispatch("app/setSubNavigationOpen", false)
    },
    getSubNavigationOpen(newData) {
      if (newData !== this.drawer) this.drawer = true
    },
  },
  destroyed() {
    this.$store.dispatch("app/setSubNavigationOpen", false)
    this.$store.dispatch("app/setSubNavigation", false)
  },
  created() {
    this.$emit("closeDrawer", true)
    window.addEventListener("resize", this.onResize)
    this.is = this.windowWidth >= 960
    if (this.windowWidth < 960)
      this.$store.dispatch("app/setSubNavigation", true)
    else this.$store.dispatch("app/setSubNavigation", false)
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
      this.is = this.windowWidth >= 960
      if (this.windowWidth < 960)
        this.$store.dispatch("app/setSubNavigation", true)
      else this.$store.dispatch("app/setSubNavigation", false)
    },
  },
}
</script>

<style lang="scss"></style>
