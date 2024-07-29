<template>
  <v-card outlined class="elevation-base">
    <v-card-title>
      {{ $localize("statistic_for_today") }}
    </v-card-title>
    <v-card-text class="pa-4 pb-8">
      <static-text>
        <v-row>
          <v-col cols="4">
            <v-icon :color="req.isBig ? 'success' : 'error'">
              {{ "mdi-" + (req.isBig ? "arrow-up-bold" : "arrow-down-bold") }}
            </v-icon>
            <span>{{ $localize("req") }}</span>
            <span>{{ " " + req.value }}</span>
          </v-col>
          <v-col cols="4">
            <v-icon :color="fd.isBig ? 'success' : 'error'">
              {{ "mdi-" + (fd.isBig ? "arrow-up-bold" : "arrow-down-bold") }}
            </v-icon>
            <span>{{ $localize("fd") }}</span>
            <span>{{ " " + fd.value }}</span>
          </v-col>
          <v-col cols="4">
            <v-icon :color="quals.isBig ? 'success' : 'error'">
              {{ "mdi-" + (quals.isBig ? "arrow-up-bold" : "arrow-down-bold") }}
            </v-icon>
            <span>{{ $localize("quals") }}</span>
            <span>{{ " " + quals.value }}</span>
          </v-col>
        </v-row>
      </static-text>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      req: {},
      fd: {},
      quals: {},
    }
  },
  created() {
    this.req = {
      value: (Math.random() * 10) ^ 0,
      isBig: Math.random() > 0.5,
    }
    this.fd = {
      value: (Math.random() * 10) ^ 0,
      isBig: Math.random() > 0.5,
    }
    this.quals = {
      value: (Math.random() * 10) ^ 0,
      isBig: Math.random() > 0.5,
    }
  },
}
</script>
