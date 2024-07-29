<template>
  <div
    class="the-treeview w-full flex-column justify-start"
    :class="{ disabled }"
  >
    <v-row
      v-for="item in search"
      :key="item[itemKey]"
      class="w-full flex-column justify-start ma-0"
      :class="item.disabled ? 'cursor-default' : 'cursor-pointer'"
      @click.stop="clickActive(item)"
    >
      <v-card
        class="d-flex flex-column"
        :class="{ 'is-parent elevation-base': !parent, 'elevation-0': parent }"
      >
        <v-row
          v-if="!onlyFolder || (onlyFolder && item[children])"
          class="ma-0 flex-nowrap relative align-center w-full"
          :style="{
            paddingLeft: !item.researchUid ? 1 * indexes + 'rem' : '1rem',
          }"
          style="padding-bottom: 1px"
          :class="{
            active:
              (value === item[itemKey] && !item.researchUid) ||
              (value && value[itemKey] === item[itemKey] && !item.researchUid),
          }"
        >
          <slot name="item" v-bind="item">
            <v-icon class="mr-2" v-text="item[itemIcon]" />
            <pre
              class="w-full ma-0 my-4 z-2 pr-2 relative"
              :class="{
                'pl-8': item.open === undefined && !item[itemIcon],
                'pl-2': item.open === undefined && item[itemIcon],
              }"
              v-html="item[predicate ? itemText + '_real' : itemText]"
            ></pre>
          </slot>
          <v-spacer />
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
        </v-row>
        <div
          v-if="item[children] && item[children].length"
          class="w-full d-flex flex-column justify-start"
        >
          <TheTreeview
            v-show="item.open"
            v-bind="$props"
            :indexes="indexes + 1"
            :items="item[children]"
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
          </TheTreeview>
        </div>
        <div
          v-else-if="item[children] && item.open && !onlyFolder"
          class="w-full d-flex flex-column justify-start"
        >
          <div class="the-treeview w-full flex-column justify-start">
            <v-row
              class="w-full flex-column justify-start ma-0 cursor-default"
              @click.stop=""
            >
              <v-row
                class="ma-0 flex-nowrap py-4 relative align-center"
                :style="{ paddingLeft: 1 * (indexes + 4) + 'rem' }"
              >
                <pre
                  class="w-full ma-0 z-2 pr-2 relative grey--text"
                  v-html="$localize('substrate_default_text')"
                ></pre>
              </v-row>
            </v-row>
          </div>
        </div>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "TheTreeview",
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
    itemText: {
      type: String,
      default: "",
    },
    itemIcon: {
      type: String,
      default: "icon",
    },
    itemKey: {
      type: String,
      default: "uid",
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
      default: 1,
    },
    parent: {
      type: Object,
      default: () => null,
    },
    value: {
      type: Object,
      default: () => {},
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
  },
  data() {
    return {
      realItems: [],
      openItem: null,
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
        this.realItems = this.setRealItems(newData, this.realItems)
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.realItems = this.setRealItems(this.items, null)
      setTimeout(() => {
        this.realItems = this.setRealItems(this.items, this.realItems)
      }, 0)
    })
  },
  methods: {
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
        // eslint-disable-next-line vue/no-mutating-props
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
    setRealItems(items, real) {
      // this.openItem = null
      let final = []
      let items_map = items
        .map((x) => {
          let end = {
            open: x[this.children]
              ? real &&
                real.length &&
                real.find((y) => y[this.itemKey] == x[this.itemKey])
                ? !!real.find((y) => y[this.itemKey] == x[this.itemKey]).open
                : false
              : undefined,
            [this.itemText + "_real"]: x[this.itemText],
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
        // if(this.value && item[this.itemKey] === this.value[this.itemKey])
        //   this.$emit("input", null)
        // else {
        let oppenedItem = treeItem || item
        if (
          oppenedItem.open !== undefined &&
          oppenedItem.open !== true &&
          !new_item
        ) {
          oppenedItem.open = true
        }
        // eslint-disable-next-line vue/no-mutating-props
        if (this.parent && this.parent[this.itemKey]) this.parent.open = true
        if (!this.openItem || item[this.itemKey] !== this.openItem) {
          this.openItem = item[this.itemKey]
          if (!this.disabled && !new_item)
            this.$emit(this.parent ? "openTree" : "open", item, treeItem)
        }
        if (!this.disabled) this.$emit("input", item, treeItem)
        // }
      } else this.$emit("input", null)
    },
  },
}
</script>

<style lang="scss">
.the-treeview {
  display: flex;
  border-radius: 6px;
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
    //border-radius: inherit;
    // overflow: hidden;
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
