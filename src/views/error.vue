<template>
  <div class="container px-4">
    <v-row class="ma-0 toolbar-element w-full flex-column" align="center">
      <h1 class="text-h2 text-center mt-4 gray_3--text">
        Страница не найдена:(
      </h1>
      <router-link
        to="/"
        class="text-h4 blue--text text-decoration-none"
        replace
      >
        <v-icon color="blue">mdi-arrow-left</v-icon>
        На главную
      </router-link>
    </v-row>
  </div>
</template>
