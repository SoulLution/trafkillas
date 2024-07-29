<template>
  <v-card outlined class="elevation-base ml-md-4">
    <v-card-title>
      {{ $localize("news_for_today") }}
    </v-card-title>
    <v-card-text class="pa-4 pb-8">
      {{ $localize("no_news") }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      news: [],
    }
  },
}
</script>
