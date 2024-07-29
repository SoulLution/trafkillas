<template>
  <v-app class="w-full">
    <v-main>
      <v-container fluid class="d-flex justify-center align-center mx-auto">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "AuthLayout",
}
</script>
