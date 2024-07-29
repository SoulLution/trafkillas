<template>
  <container>
    <MasterElement>
      <ScrollShadowElement scroll-x>
        <view-table :headers="headers" :items="items" :loading="loading">
          <template #toolbar>
            <the-input-date
              v-model="filter.startDate"
              :placeholder="$localize('start_date')"
              style="width: 120px"
            />
            <the-input-date
              v-model="filter.endDate"
              class="mx-2"
              :placeholder="$localize('end_date')"
              style="width: 120px"
            />
            <v-spacer />
            <v-autocomplete
              v-model="filter.stream"
              :items="streams"
              multiple
              :placeholder="$localize('streams')"
              hide-details
              single-line
              dense
              solo
              clearable
              :disabled="false"
              @keydown.enter="search"
            />
          </template>
        </view-table>
      </ScrollShadowElement>
    </MasterElement>
  </container>
</template>
<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "№",
          value: "index",
          align: "start",
          sortable: false,
        },
        {
          text: this.$localize("day"),
          value: "date",
          align: "start",
          sortable: false,
        },
        {
          text: this.$localize("registration_amount"),
          value: "registrationAmount",
          align: "start",
          sortable: false,
        },
        {
          text: this.$localize("first_deposit_amount"),
          value: "firstDepositAmount",
          align: "start",
          sortable: false,
        },
        {
          text: this.$localize("first_deposit_cr"),
          value: "firstDepositCR",
          align: "start",
          sortable: false,
        },
        {
          text: this.$localize("quots_amount"),
          value: "quotsAmount",
          align: "start",
          sortable: false,
        },
        {
          text: this.$localize("quots_cr"),
          value: "quotsCR",
          align: "start",
          sortable: false,
        },
        {
          text: this.$localize("quality_trafic_redirects"),
          value: "qualityTraficRedirects",
          align: "start",
          sortable: false,
        },
        {
          text: this.$localize("quality_trafic_unique_redirects"),
          value: "qualityTraficUniqueRedirects",
          align: "start",
          sortable: false,
        },
        {
          text: this.$localize("quality_trafic_sum"),
          value: "qualityTraficSum",
          align: "start",
          sortable: false,
        },
        {
          text: this.$localize("average_bill"),
          value: "averageBill",
          align: "start",
          sortable: false,
        },
      ],
      items: [{}],
      filter: {
        stream: null,
        startDate: null,
        endDate: null,
      },
      streams: ["stream1", "stream2"],
      loading: false,
    }
  },
  methodsd: {
    search() {},
  },
}
</script>
