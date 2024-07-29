<template>
  <div
    class="auxilarium"
    :class="{
      'auxilarium-mobile': !is,
      'auxilarium-open': drawer,
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
    ...mapGetters("app", { getAuxilariumOpen: "getAuxilariumOpen" }),
  },
  watch: {
    drawer(newData) {
      if (newData !== this.getAuxilariumOpen)
        this.$store.dispatch("app/setAuxilariumOpen", false)
    },
    getAuxilariumOpen(newData) {
      if (newData !== this.drawer) this.drawer = true
    },
  },
  destroyed() {
    this.$store.dispatch("app/setAuxilariumOpen", false)
    this.$store.dispatch("app/setAuxilarium", false)
  },
  created() {
    window.addEventListener("resize", this.onResize)
    this.is = this.windowWidth >= 960
    if (this.windowWidth < 960) this.$store.dispatch("app/setAuxilarium", true)
    else this.$store.dispatch("app/setAuxilarium", false)
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
      this.is = this.windowWidth >= 960
      if (this.windowWidth < 960)
        this.$store.dispatch("app/setAuxilarium", true)
      else this.$store.dispatch("app/setAuxilarium", false)
    },
  },
}
</script>
