<template>
  <v-card outlined class="elevation-base mt-4">
    <v-card-title>
      {{ $localize("leaders") }}
    </v-card-title>
    <v-card-text class="pa-4 pb-8">
      <v-row
        v-for="leader in leaders"
        :key="leader.uid"
        class="flex-column"
        no-gutters
      >
        <static-text class="w-full d-flex justify-space-between py-2">
          <span>
            {{ leader.fullName }}
          </span>
          <span>
            {{ leader.value }}
          </span>
        </static-text>
        <v-divider />
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      leaders: [],
    }
  },
  created() {
    this.leaders = [
      {
        uid: 1,
        value: 100,
        fullName: "User 1",
      },
      {
        uid: 2,
        value: 200,
        fullName: "User 2",
      },
      {
        uid: 3,
        value: 300,
        fullName: "User 3",
      },
      {
        uid: 4,
        value: 400,
        fullName: "User 4",
      },
      {
        uid: 5,
        value: 500,
        fullName: "User 5",
      },
    ]
  },
}
</script>
