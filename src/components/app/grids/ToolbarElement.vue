<template>
  <div class="toolbar-element" :class="{ 'no-active': noActive }">
    <div v-if="title" class="toolbar-title">
      {{ title }}
    </div>
    <v-row no-gutters align="center">
      <slot></slot>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    noActive: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
  },
}
</script>

<style></style>
