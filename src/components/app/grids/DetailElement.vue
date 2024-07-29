<template>
  <div
    class="detail-element"
    :class="{
      'detail-element-mobile': !is,
      'detail-element-open': drawer,
      ['detail-element-cols-' + cols]: true,
      ['detail-element-cols-md-' + md]: !!md,
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  props: {
    cols: {
      type: [String, Number],
      default: "auto",
    },
    md: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      drawer: true,
      is: true,
    }
  },
  computed: {
    ...mapGetters("app", { getDetailOpen: "getDetailOpen" }),
  },
  watch: {
    drawer(newData) {
      if (newData !== this.getDetailOpen)
        this.$store.dispatch("app/setDetailOpen", false)
    },
    getDetailOpen(newData) {
      if (newData !== this.drawer) this.drawer = true
    },
  },
  destroyed() {
    this.$store.dispatch("app/setDetailOpen", false)
    this.$store.dispatch("app/setDetail", false)
  },
  created() {
    window.addEventListener("resize", this.onResize)
    this.is = this.windowWidth >= 960
    if (this.windowWidth < 960) this.$store.dispatch("app/setDetail", true)
    else this.$store.dispatch("app/setDetail", false)
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
      this.is = this.windowWidth >= 960
      if (this.windowWidth < 960) this.$store.dispatch("app/setDetail", true)
      else this.$store.dispatch("app/setDetail", false)
    },
  },
}
</script>

<style></style>
