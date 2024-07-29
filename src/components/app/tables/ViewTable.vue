<template>
  <table class="view-table">
    <thead ref="thead">
      <tr v-if="$slots.toolbar && $slots.toolbar.length">
        <th
          :style="{
            height: toolbarTitle ? '6rem' : '',
            zIndex: 100,
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
            {{ item[head.value] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- <v-data-table
    ref="table"
    :headers="headers"
    :items="items"
    hide-default-footer
    hide-default-header
    :loading="loading"
    :items-per-page="-1"
    fixed-header
    :no-data-text="$localize('there_is_nothing_here_yet')"
    :item-key="itemKey"
    @click:row="(e) => $emit('click:row', e)"
  >
    <template #top>
      <thead>
        <tr v-if="$slots.toolbar && $slots.toolbar.length">
          <th
            :style="{
              height: toolbarTitle ? '6rem' : '',
            }"
          >
            <ToolbarElement :title="toolbarTitle" :width="width">
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
            {{ i.text }}
          </th>
        </tr>
      </thead>
    </template>
    <template #body>
      <tbody>
        <tr v-for="(item, index) in items" :key="item[itemKey]">
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
              <div :class="{ selected: item.select }">
                <div class="number">{{ index + 1 }}</div>
                <v-checkbox
                  v-model="item.select"
                  class="checkbox"
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
              {{ item[head.value] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </template>
  </v-data-table> -->
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
  },
  computed: {
    generateHeaders() {
      return this.headers.map((x) => ({ ...x, uid: this._uid++ }))
    },
  },
}
</script>
