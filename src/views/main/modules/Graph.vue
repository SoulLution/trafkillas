<template>
  <v-card v-if="!loading" outlined class="elevation-base">
    <apexchart
      width="100%"
      height="400"
      type="area"
      :options="options"
      :series="series"
    ></apexchart>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      options: {
        chart: {
          height: 350,
          id: "vuechart-example",
        },
        xaxis: {
          categories: [
            this.$moment().subtract(6, "days").format("DD.MM.YY"),
            this.$moment().subtract(5, "days").format("DD.MM.YY"),
            this.$moment().subtract(4, "days").format("DD.MM.YY"),
            this.$moment().subtract(3, "days").format("DD.MM.YY"),
            this.$moment().subtract(2, "days").format("DD.MM.YY"),
            this.$moment().subtract(1, "days").format("DD.MM.YY"),
            this.$moment().format("DD.MM.YY"),
          ],
        },
      },
      series: [],
      loading: true,
    }
  },
  created() {
    this.loading = true
    const Graphs = (Math.random() * 8) ^ 0
    for (let i = 0; i < Graphs; i++) {
      this.series.push({
        name: "series-" + (i + 1),
        data: this.getRandomArray(),
      })
    }
    this.loading = false
  },
  methods: {
    getRandomArray() {
      return [
        (Math.random() * 100) ^ 0,
        (Math.random() * 100) ^ 0,
        (Math.random() * 100) ^ 0,
        (Math.random() * 100) ^ 0,
        (Math.random() * 100) ^ 0,
        (Math.random() * 100) ^ 0,
        (Math.random() * 100) ^ 0,
      ]
    },
  },
}
</script>
