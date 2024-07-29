<template>
  <div class="the-container">
    <slot></slot>
    <Loader v-if="loading" />
  </div>
</template>

<script>
import Loader from "./../Loader.vue"
export default {
  components: { Loader },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // ...mapGetters("app", { getContentLoader: "getContentLoader" }),
  },
}
</script>

<style></style>
