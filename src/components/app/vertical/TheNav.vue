<template>
  <div v-if="!groupLength" class="vertical-drawer">
    <v-row class="ma-0 flex-nowrap" style="height: 64px" align="center">
      <v-app-bar-nav-icon
        class="mr-3 ml-2"
        :class="{ 'v-app-bar__nav-icon-active': drawer }"
        @click="$emit('changeDrawer')"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="12" y="15.5" width="26" height="3" rx="1.5" fill="white" />
          <rect x="12" y="23.5" width="26" height="3" rx="1.5" fill="white" />
          <rect x="12" y="31.5" width="26" height="3" rx="1.5" fill="white" />
        </svg>
      </v-app-bar-nav-icon>
      <TheBrand v-show="!drawer" pr />
    </v-row>
    <ScrollShadowElement style="overflow-y: overlay">
      <v-list-item-group v-for="group in items" :key="group.key" class="group">
        <!-- <v-divider class="hr vertical"></v-divider> -->
        <div
          class="d-flex align-center cursor-pointer"
          :class="{
            'active-for_drawer': checkActive(group),
          }"
        >
          <v-tooltip transition="slide-x-transition" right>
            <template #activator="{ on, attrs }">
              <v-row
                class="flex-nowrap w-full"
                align="center"
                no-gutters
                v-bind="drawer ? attrs : ''"
                v-on="drawer ? on : ''"
                @click.stop="openShow(group)"
              >
                <v-icon size="8" color="primary" class="text--darken-1">
                  mdi-circle
                </v-icon>
                <v-subheader v-show="!drawer" class="pa-0 sub-group">
                  {{ $localize(group.key) }}
                </v-subheader>
                <v-spacer v-show="!drawer" />
                <v-btn
                  v-show="!drawer"
                  icon
                  class="mr-2"
                  :class="{ reverse: group.show }"
                  @click.stop="group.show = !group.show"
                >
                  <v-icon style="font-size: 16px"> mdi-chevron-down </v-icon>
                </v-btn>
              </v-row>
            </template>
            <span> {{ $localize(group.key) }} </span>
          </v-tooltip>
        </div>
        <v-divider class="hr vertical" :inset="!drawer"></v-divider>
        <v-expand-transition>
          <v-list v-show="drawer || group.show" nav dense class="pa-0">
            <v-list-item-group color="white">
              <v-tooltip
                v-for="(item, i) in group.items"
                :key="i"
                transition="slide-x-transition"
                right
              >
                <template #activator="{ on, attrs }">
                  <v-list-item
                    :to="item.path"
                    v-bind="drawer ? attrs : ''"
                    class="pa-0"
                    v-on="drawer ? on : ''"
                  >
                    <v-list-item-icon>
                      <v-icon style="font-size: 20px" v-text="item.meta.icon" />
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        style="font-size: 11px"
                        v-text="$localize(item.name)"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
                <span>{{ $localize(item.name) }}</span>
              </v-tooltip>
            </v-list-item-group>
          </v-list>
        </v-expand-transition>
      </v-list-item-group>
    </ScrollShadowElement>
  </div>
  <div v-else class="vertical-drawer">
    <v-row class="ma-0 flex-nowrap" style="height: 64px" align="center">
      <v-app-bar-nav-icon
        class="mr-3 ml-2"
        :class="{ 'v-app-bar__nav-icon-active': drawer }"
        @click="$emit('changeDrawer')"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="12" y="15.5" width="26" height="3" rx="1.5" fill="white" />
          <rect x="12" y="23.5" width="26" height="3" rx="1.5" fill="white" />
          <rect x="12" y="31.5" width="26" height="3" rx="1.5" fill="white" />
        </svg>
      </v-app-bar-nav-icon>
      <TheBrand v-show="!drawer" pr />
    </v-row>
    <ScrollShadowElement style="overflow-y: overlay">
      <v-list-item-group color="white" class="w-full">
        <v-tooltip
          v-for="(item, i) in items[0].items"
          :key="i"
          transition="slide-x-transition"
          right
        >
          <template #activator="{ on, attrs }">
            <v-list-item
              :to="item.path"
              class="px-3"
              v-bind="drawer ? attrs : ''"
              v-on="drawer ? on : ''"
            >
              <v-list-item-icon style="margin-left: 6px; margin-right: 12px">
                <v-icon style="font-size: 20px" v-text="item.meta.icon" />
              </v-list-item-icon>
              <v-list-item-content v-show="!drawer">
                <v-list-item-title
                  style="font-size: 11px"
                  v-text="$localize(item.name)"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <span>{{ $localize(item.name) }}</span>
        </v-tooltip>
      </v-list-item-group>
    </ScrollShadowElement>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "TheNav",
  props: {
    drawer: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      items: [],
      languages: ["RU", "EN", "KK"],
    }
  },
  computed: {
    ...mapGetters("app", { getNav: "getNav" }),
    groupLength() {
      return this.items.filter((x) => x.items.length).length == 1
    },
  },
  mounted() {
    this.items = this.getNav.map((x) => ({ ...x, show: true }))
  },
  methods: {
    logout() {
      return true
    },
    openShow(group) {
      if (this.drawer) return
      group.show = !group.show
    },
    checkActive(group) {
      if (!this.drawer && group.show) return false
      return group.items.find((x) => x.path == this.$route.path)
    },
  },
}
</script>

<style lang="scss" scoped>
.active-for_drawer {
  & > * {
    color: white !important;
  }
  &:before {
    background-color: white;
    opacity: 0.12;
    bottom: 0;
    content: "";
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: 0.3s;
  }
}
.reverse {
  transform: scaleY(-1);
}
.v-divider--inset.hr.vertical {
  max-width: calc(100% - 44px);
  margin-left: 44px !important;
}
.group {
  & > * {
    &:first-child {
      min-height: 48px;
    }
  }
  &:nth-last-child(-n + 2) {
    padding-bottom: 1rem;
  }
  & .sub-group {
    font-size: 11px;
    text-transform: uppercase;
  }
  &:nth-child(2) {
    margin-top: 0;
  }
}
</style>
