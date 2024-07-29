<template>
  <div
    class="master-element"
    :class="{
      ['master-element-cols-' + cols]: true,
      ['master-element-cols-md-' + md]: !!md,
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
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
}
</script>

<style></style>
