<template>
  <div>
    <v-menu :location="location">
      <template #activator="{ on, attrs }">
        <v-card
          max-width="100px"
          color="transparent"
          elevation="0"
          class="pa-0"
          v-bind="attrs"
          v-on.stop.prevent="on"
        >
          <v-row no-gutters class="flex-nowrap">
            <ProfileAvatar
              v-for="(item, i) in maxCountItems"
              :key="item[itemKey]"
              :title="item[itemTitle]"
              :class="'move-on-' + i"
            />
          </v-row>
        </v-card>
      </template>
      <v-list disabled>
        <v-list-item v-for="item in items" :key="item[itemKey]">
          <slot name="list-item" v-bind="item">
            <v-list-item-title>{{ item[itemTitle] }}</v-list-item-title>
          </slot>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    location: {
      type: String,
      default: "bottom",
    },
    itemTitle: {
      type: String,
      default: "title",
    },
    itemKey: {
      type: String,
      default: "uid",
    },
  },
  computed: {
    maxCountItems() {
      if (this.items.length > 5) {
        return this.items.slice(0, 5)
      }
      return this.items
    },
  },
}
</script>

<style lang="scss" scoped>
@for $i from 0 through 4 {
  .move-on-#{$i} {
    transform: translateX(calc(-16px * #{$i}));
    z-index: calc(6 - #{$i});
  }
}
</style>
