<template>
  <v-list-item-group
    v-bind="$attrs"
    class="w-full"
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
    <template v-for="group in items">
      <v-list
        v-if="!noEmpty || (noEmpty && group[children].length)"
        :key="group[groupKey || itemKey]"
        class="list-cards pa-0"
        color="transparent"
      >
        <slot name="group" v-bind="group">
          <v-card-title>
            {{ group[groupText || itemText] }}
          </v-card-title>
        </slot>
        <v-list-item
          v-for="item in group[children]"
          :key="item[itemKey]"
          :disabled="disabled"
          :value="itemValue ? item[itemValue] : item"
        >
          <v-list-item-content>
            <div
              class="pa-4 w-full"
              @dblclick="$emit('dblclick', item)"
              @click="$emit('click', item)"
            >
              <slot name="item" v-bind="item">
                <v-list-item-title
                  v-html="item[itemText + (predicate ? '_real' : '')]"
                ></v-list-item-title>
              </slot>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
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
    groupKey: {
      type: String,
      default: "",
    },
    itemKey: {
      type: String,
      default: "uid",
    },
    children: {
      type: String,
      default: "children",
    },
    itemValue: {
      type: String,
      default: "",
    },
    itemText: {
      type: String,
      default: "",
    },
    groupText: {
      type: String,
      default: "",
    },
    predicate: {
      type: String,
      default: "",
    },
    noEmpty: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style></style>
