<template>
  <v-list-item-group
    v-bind="$attrs"
    class="w-full list-cards"
    color="black"
    :value="value"
    :item-value="itemValue"
    :multiple="multiple"
    @change="
      (e) => {
        $emit('input', e), $emit('change', e)
      }
    "
  >
    <v-list-item
      v-for="item in items"
      :key="item[itemKey]"
      :disabled="disabled"
      :aria-selected="false"
      :value="itemValue ? item[itemValue] : item"
    >
      <v-list-item-content>
        <div
          class="pa-4 w-full"
          @dblclick="$emit('dblclick', item)"
          @click="(e) => selectItem(e, item)"
        >
          <slot name="item" v-bind="item">
            <v-list-item-title
              v-html="item[itemText + (predicate ? '_real' : '')]"
            ></v-list-item-title>
          </slot>
        </div>
      </v-list-item-content>
    </v-list-item>
  </v-list-item-group>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [Object, Array],
      default: () => null,
    },
    itemKey: {
      type: String,
      default: "uid",
    },
    itemValue: {
      type: String,
      default: "",
    },
    itemText: {
      type: String,
      default: "",
    },
    predicate: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    selectItem(e, item) {
      if (this.readonly) {
        e.stopPropagation()
        e.preventDefault()
      }
      this.$emit("click", item)
    },
  },
}
</script>

<style></style>
