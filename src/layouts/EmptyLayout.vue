<template>
  <v-app>
    <v-app-bar app color="#FFF" elevation="0">
      <TheBrand color-first="black" color-second="var(--v-primary-base)" />
    </v-app-bar>
    <v-main class="horizontal">
      <v-container class="d-flex flex-column" fluid>
        <router-view />
        <the-footer />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TheFooter from "@/components/app/TheFooter"
import TheBrand from "@/components/app/TheBrand"

export default {
  name: "ErrorLayout",
  components: { TheFooter, TheBrand },
}
</script>

<style scoped lang="scss">
.toolbar-no-padding {
  padding-top: 64px !important;
}
</style>
