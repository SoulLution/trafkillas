<template>
  <v-menu v-model="open" :disabled="!items.length" bottom>
    <template #activator="{ on, attrs }">
      <v-btn color="transparent" elevation="0" v-bind="attrs" icon v-on="on">
        <v-icon color="notification"> mdi-bell-outline </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="item in items" :key="item.uid">
        <v-list-item-title>
          {{ $localize(item.body) }}
        </v-list-item-title>
        <span class="subtitle">
          {{ $moment(item.date).format("DD.MM.YYYY HH:mm") }}
        </span>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      open: false,
    }
  },
  computed: {
    ...mapState("notifications", ["notifications"]),
    items() {
      return this.notifications
    },
  },
  watch: {
    open() {
      // Nedd Logic to viewed notificate set Viewed by BackEnd
    },
  },
}
</script>

<style></style>
