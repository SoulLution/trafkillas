<template>
  <table class="edit-table">
    <thead
      ref="thead"
      :style="{
        '--top': openToolbarTitle ? '76px' : openToolbar ? '44px' : 0,
      }"
    >
      <tr v-if="$slots.toolbar && $slots.toolbar.length">
        <th
          :style="{
            height: toolbarTitle ? '6rem' : '',
          }"
        >
          <ToolbarElement :title="toolbarTitle">
            <slot name="toolbar"></slot>
          </ToolbarElement>
        </th>
      </tr>
      <tr>
        <th
          v-for="i in headers"
          :key="i.uid"
          :class="i.align ? 'text-' + i.align : ''"
        >
          <span>
            {{ i.text }}
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in items"
        :key="item[itemKey]"
        @click="$emit('click:row', item)"
      >
        <td
          v-for="head in generateHeaders"
          :key="head.uid"
          :class="head.align ? 'text-' + head.align : ''"
        >
          <slot
            v-if="head.value === 'index'"
            v-bind="{ item, index, head }"
            :name="'item.' + head.value"
          >
            <div>
              <v-checkbox
                v-model="item.select"
                :label="index + 1 + ''"
                dense
                @click.stop=""
              />
            </div>
          </slot>
          <slot
            v-else
            v-bind="{ item, index, head }"
            :name="'item.' + head.value"
          >
            <slot name="item" v-bind="{ item, index, head }">
              <div class="pa-2">
                {{ item[head.value] }}
              </div>
            </slot>
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    itemKey: {
      type: String,
      default: "uid",
    },
    toolbarTitle: {
      type: String,
      default: "",
    },
    openToolbar: {
      type: Boolean,
      default: false,
    },
    openToolbarTitle: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    generateHeaders() {
      return this.headers.map((x) => ({ ...x, uid: this._uid++ }))
    },
  },
}
</script>
