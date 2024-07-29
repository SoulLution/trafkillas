<template>
  <div
    class="the-treeview w-full flex-column justify-start"
    :class="{ disabled, 'have-parent': !!parent }"
    :style="{
      '--left': indexes - 1,
      '--bottom':
        clientHeight +
        clientHeightChild +
        (search.length &&
        search.at(-1)[children] &&
        search.at(-1).open &&
        !onlyFolder
          ? 47
          : 0) +
        'px',
    }"
  >
    <v-row
      v-for="(item, i) in search"
      :key="item[itemKey]"
      class="w-full flex-column justify-start item"
      no-gutters
      :style="{
        '--left': indexes - 1,
      }"
    >
      <div :style="{ paddingLeft: 1 * indexes + 'rem' }">
        <v-card
          v-if="!onlyFolder || (onlyFolder && item[children])"
          :ref="item[itemKey]"
          v-inited="(e) => setClientHeight(e, i)"
          class="d-flex elevation-base align-center w-full"
          :class="{
            'cursor-default': item.disabled,
            'cursor-pointer': !item.disabled,
            'is-parent': !parent,
            active:
              value === item[itemKey] ||
              (value && value[itemKey] === item[itemKey]),
          }"
          @click.stop.prevent="clickActive(item)"
        >
          <v-icon
            v-if="item.open !== undefined"
            class="down mr-2"
            :class="{ active: item.open }"
            :style="{
              opacity: onlyFolder
                ? item.open !== undefined &&
                  item[children] &&
                  item[children].length
                  ? 1
                  : 0
                : 1,
            }"
            @click.stop="openMe(item)"
          >
            mdi-menu-right
          </v-icon>
          <v-icon v-if="item.open !== undefined" class="mr-4" size="20">
            mdi-folder
          </v-icon>
          <slot name="item" v-bind="item">
            <v-icon v-if="item[itemIcon]" class="mr-2">
              {{ item[itemIcon] }}
            </v-icon>
            <!-- 'pl-8': item.open === undefined && !item[itemIcon], -->
            <pre
              class="w-full ma-0 my-4 z-2 pr-2 relative"
              :class="{
                'pl-2': item.open === undefined && item[itemIcon],
              }"
              v-html="item[predicate ? itemText + '_real' : itemText]"
            ></pre>
          </slot>
        </v-card>
      </div>
      <div
        v-if="item[children] && item[children].length"
        v-inited="(e) => setClientHeightChild(e, i)"
        class="w-full d-flex flex-column justify-start"
      >
        <TheTreenode
          v-if="item.open"
          v-bind="$props"
          :items="items"
          :indexes="indexes + 1"
          :only-folder="onlyFolder"
          :value="value"
          :parent="item"
          :black-list="blackList"
          @input="(...e) => setActive(...e, true)"
          @openTree="itemOpen"
          @close="itemClose"
        >
          <template v-if="hasSlot" #item="prop">
            <slot name="item" v-bind="prop"></slot>
          </template>
        </TheTreenode>
      </div>
      <div
        v-else-if="item[children] && item.open && !onlyFolder"
        class="w-full d-flex flex-column justify-start"
      >
        <div
          class="the-treeview w-full flex-column justify-start have-parent"
          :style="{
            '--left': indexes,
            '--bottom': '23px',
          }"
        >
          <v-row
            class="w-full flex-column justify-start item"
            no-gutters
            :style="{
              '--left': indexes,
            }"
          >
            <div :style="{ paddingLeft: 1 * (indexes + 1) + 'rem' }">
              <v-card
                class="flex-nowrap py-4 relative align-center"
                @click.stop=""
              >
                <pre
                  class="w-full ma-0 z-2 pr-2 relative grey--text"
                  v-html="$localize('substrate_default_text')"
                ></pre>
              </v-card>
            </div>
          </v-row>
        </div>
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "TheTreenode",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    onlyFolder: {
      type: Boolean,
      default: false,
    },
    mainDirectory: {
      type: String,
      default: "",
    },
    mainDirectoryIcon: {
      type: String,
      default: "",
    },
    itemText: {
      type: String,
      default: "title",
    },
    itemIcon: {
      type: String,
      default: "icon",
    },
    itemKey: {
      type: String,
      default: "uid",
    },
    itemGroup: {
      type: String,
      default: "groupUid",
    },
    itemGroupCheck: {
      type: String,
      default: "",
    },
    itemIsGroup: {
      type: String,
      default: "isGroup",
    },
    children: {
      type: String,
      default: "children",
    },
    predicate: {
      type: String,
      default: "",
    },
    indexes: {
      type: Number,
      default: 0,
    },
    parent: {
      type: Object,
      default: () => null,
    },
    value: {
      type: Object,
      default: () => null,
    },
    items: {
      type: Array,
      default: () => [],
    },
    blackList: {
      type: Array,
      default: () => [],
    },
    selectable: {
      type: Boolean,
      default: true,
    },
    sortState: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      realItems: [],
      openItem: null,
      clientHeight: 0,
      clientHeightChild: 0,
    }
  },
  computed: {
    hasSlot() {
      return !!this.$scopedSlots.item
    },
    search() {
      if (this.predicate)
        return this.realItems.filter((x) => this.searchInItems(x))
      return this.realItems
    },
  },
  watch: {
    items: {
      deep: true,
      handler(newData) {
        this.realItems = this.nodeItems(newData, this.realItems, !!this.parent)
        this.sortItems()
      },
    },
    sortState() {
      this.sortItems()
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.realItems = this.nodeItems(this.items, null, !!this.parent)
      setTimeout(() => {
        this.realItems = this.nodeItems(
          this.items,
          this.realItems,
          !!this.parent
        )
        this.sortItems()
      }, 0)
    })
  },
  methods: {
    setClientHeightChild({ height, type }, index) {
      if (index === this.search.length - 1 && type === "updated")
        this.clientHeightChild = height
    },
    setClientHeight({ height, type }, index) {
      if (index === this.search.length - 1 && type === "inited")
        this.clientHeight = height / 2 + 2
    },
    sortItems() {
      if (this.sortState !== null) {
        this.realItems.sort((a, b) => {
          return !!a[this.itemIsGroup] === !!b[this.itemIsGroup]
            ? a[this.itemText] <= b[this.itemText]
              ? 1
              : -1
            : (!this.sortState ? a[this.itemIsGroup] : !a[this.itemIsGroup])
            ? -1
            : 1
        })
      } else this.$emit("orderBy", this.realItems)
    },
    nodeItems(items, real, isChild) {
      let final = []
      let items_map = items
      if (this.parent) {
        items_map = items.filter(
          (y) =>
            y[this.itemGroup] ==
            this.parent[this.itemGroupCheck || this.itemKey]
        )
      }
      if (!isChild) items_map = items.filter((x) => !x[this.itemGroup])
      items_map = items_map
        .map((x) => {
          let children = items.find(
            (y) => y[this.itemGroup] === x[this.itemGroupCheck || this.itemKey]
          )
          if (children) children = [children]
          else children = []
          let end = {
            open: x[this.itemIsGroup]
              ? real &&
                real.length &&
                real.find((y) => y[this.itemKey] == x[this.itemKey])
                ? !!real.find((y) => y[this.itemKey] == x[this.itemKey]).open
                : false
              : undefined,
            [this.itemText + "_real"]: x[this.itemText],
            [this.children]: x[this.itemIsGroup]
              ? children.length
                ? children
                : x.dontLoad
                ? [
                    {
                      [this.itemKey]: "loading",
                      [this.itemText]: this.$localize("loading"),
                      disabled: true,
                    },
                  ]
                : []
              : undefined,
            ...x,
          }
          if (this.value && this.value[this.itemKey] === x[this.itemKey]) {
            this.setActive(
              this.items.find(
                (x) => x[this.itemKey] === this.value[this.itemKey]
              ),
              end
            )
          }
          return end
        })
        .filter((x) => {
          return !this.blackList.find((y) => y === x[this.itemKey])
        })
      if (!this.parent && this.mainDirectory) {
        final = [
          {
            [this.itemKey]: null,
            [this.itemText]: this.mainDirectory,
            [this.itemIcon]: this.mainDirectoryIcon,
            open: true,
            [this.children]: items_map,
          },
        ]
        if (this.value === null) {
          this.setActive(
            this.items.find((x) => x[this.itemKey] === null),
            final[0]
          )
        }
      } else final = items_map
      return final
    },
    openMe(item) {
      item.open = !item.open
      this.openItem = item.open ? item[this.itemKey] : null
      if (item.open && !this.disabled)
        this.$emit(
          this.parent ? "openTree" : "open",
          this.items.find((x) => x[this.itemKey] === item[this.itemKey]),
          item
        )
      else
        this.$emit(
          "close",
          this.items.find((x) => x[this.itemKey] === item[this.itemKey])
        )
    },
    async itemOpen(real_item, item) {
      if (item && this.parent && this.parent[this.itemKey])
        this.parent.open = true
      if (!this.disabled)
        this.$emit(this.parent ? "openTree" : "open", real_item, item)
    },
    async itemClose(item) {
      this.$emit("close", item)
    },
    searchInItems(item) {
      let end = false
      if (
        ~item[this.itemText]
          .toUpperCase()
          .indexOf(this.predicate.toUpperCase() + "")
      ) {
        item[this.itemText + "_real"] = this.htmlStrong(item[this.itemText])
        end = true
      } else item[this.itemText + "_real"] = item[this.itemText]
      if (item[this.children])
        for (let x of item[this.children])
          if (this.searchInItems(x)) {
            item.open = true
            end = true
          }
      return end
    },
    htmlStrong(value) {
      if (value) {
        if (!this.predicate) return value
        let predicate = this.predicate.trim()
        const re = new RegExp(predicate.replace(/\s\d+|\d+\s/gi, ""), "gi")
        return value.replace(re, function (str) {
          return `<span style="background-color: #F4EA51">` + str + `</span>`
        })
      }
    },
    clickActive(item) {
      if (!item.disabled) {
        if (!this.value || item[this.itemKey] !== this.value[this.itemKey])
          this.setActive(
            this.items.find((x) => x[this.itemKey] === item[this.itemKey]),
            item
          )
        else {
          if (item.children && !item.children.find((x) => x.open))
            item.open = false
          this.$emit("input", null)
        }
      }
    },
    setActive(item, treeItem, new_item) {
      if (!this.selectable) return
      if (item) {
        let oppenedItem = treeItem || item
        if (
          oppenedItem.open !== undefined &&
          oppenedItem.open !== true &&
          !new_item
        ) {
          oppenedItem.open = true
        }
        if (this.parent && this.parent[this.itemKey]) this.parent.open = true
        if (!this.openItem || item[this.itemKey] !== this.openItem) {
          this.openItem = item[this.itemKey]
          if (!this.disabled && !new_item)
            this.$emit(this.parent ? "openTree" : "open", item, treeItem)
        }
        if (!this.disabled) this.$emit("input", item, treeItem)
      } else this.$emit("input", null)
    },
  },
}
</script>

<style lang="scss">
.the-treeview {
  display: flex;
  border-radius: 8px;
  position: relative;
  z-index: 0;
  &:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--v-gray_3-base);
    opacity: 0.1;
    z-index: 12;
    border-radius: inherit;
    display: none;
  }
  &.disabled {
    &:after {
      display: block;
    }
  }
  .row {
    &.active:before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: var(--v-primary-base);
      opacity: 0.6;
    }
  }
  .down {
    transition: 0.3s;
    z-index: 11;
    height: 24px;
    cursor: pointer;
    &.active {
      transform: rotate(90deg);
    }
  }
  pre {
    white-space: break-spaces;
  }
}
</style>
