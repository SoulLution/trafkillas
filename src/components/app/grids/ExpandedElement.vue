<template>
  <div class="expanded-element" :class="{ open: value, 'has-title': !!title }">
    <ToolbarElement :title="title">
      <v-divider class="no-active" />
      <v-btn class="expand-button no-active" icon @click="value = !value">
        <v-icon :class="{ expanded: value }"> mdi-chevron-down </v-icon>
      </v-btn>
      <slot name="toolbar"></slot>
    </ToolbarElement>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    default: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: !!this.default,
    }
  },
}
</script>
