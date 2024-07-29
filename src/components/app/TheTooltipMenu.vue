<template>
  <v-menu
    open-on-hover
    bottom
    offset-y
    :close-on-content-click="false"
    nudge-bottom="14"
    origin="center center"
    transition="scale-transition"
    close-delay="100"
  >
    <template #activator="{ on, attrs }">
      <slot name="activator" v-bind="{ attrs, on }"></slot>
    </template>
    <v-card color="nav" class="px-4 py-2" style="opacity: 0.9">
      <slot></slot>
    </v-card>
  </v-menu>
</template>
