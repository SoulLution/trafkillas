<template>
  <container>
    <MasterElement cols="12">
      <ScrollShadowElement>
        <ToolbarElement>
          <v-spacer />
          <v-text-field
            v-model="predicate"
            class="search"
            :placeholder="$localize('search')"
            hide-details
            prepend-inner-icon="mdi-magnify"
            single-line
            dense
            solo
            clearable
            :disabled="false"
            @keydown.enter="search"
          ></v-text-field>
        </ToolbarElement>
        <ListItems
          v-if="items.length > 0"
          :predicate="predicate"
          :items="searchDictResult"
          color="black"
          item-text="label"
          @click="toItem"
        >
          <template #item="item">
            <v-row no-gutters align="center">
              <v-col cols="auto" class="d-flex align-start justify-start">
                <img
                  src="@/assets/Wight_short_LogoTRAFFKILLAS.png"
                  height="75"
                />
                <static-text class="d-flex flex-column align-start mr-8">
                  <span> {{ item.partner.partner_name }} </span>
                  <!-- <span>{{ item.geo }}</span> -->
                  {{ item.terms }}
                </static-text>
              </v-col>
              <v-spacer />
              <div class="d-flex align-center">
                <v-btn>
                  {{ $localize("view_conditions") }}
                </v-btn>
              </div>
            </v-row>
          </template>
        </ListItems>
        <v-card-title v-else-if="loading">{{
          $localize("loading")
        }}</v-card-title>
        <v-card-title v-else>{{
          $localize("substrate_default_text")
        }}</v-card-title>
      </ScrollShadowElement>
    </MasterElement>
  </container>
</template>

<script>
export default {
  data() {
    return {
      predicate: "",
      items: [],
      analysisItems: [],
    }
  },
  computed: {
    searchDictResult() {
      if (this.predicate)
        return this.items.filter((x) =>
          this.$searchInItems(x, "label", this.predicate)
        )
      return this.items
    },
  },
  async created() {
    this.loading = true
    await this.init()
    this.loading = false
    // this.items = [
    //   {
    //     uid: "1",
    //     state: "Pin-up",
    //     geo: "UZ",
    //     baseLine: 5,
    //     cpa: 30,
    //   },
    //   {
    //     uid: "2",
    //     state: "Pin-up",
    //     geo: "UZ",
    //     baseLine: 5,
    //     cpa: 50,
    //   },
    //   {
    //     uid: "3",
    //     state: "Pin-up",
    //     geo: "UZ",
    //     baseLine: 5,
    //     cpa: 50,
    //   },
    // ]
    this.items = this.items.map((x) => ({
      ...x,
      label: x.key,
      label_real: x.key,
    }))
  },
  methods: {
    async init() {
      // let res = await this.$axios.get('/offer/getAvailableOffers')
      // this.items = res.data
      this.items = [
        {
          id: 1,
          terms: "CPA 5/30 KZ",
          capacity: 200,
          cpa: 0,
          partner: {
            id: 1,
            partner_name: "Vavada",
          },
        },
      ]
    },
    search() {},
    toItem(item) {
      // load item from back
      this.$router.push({
        name: "offers_offer",
        params: { id: item.id },
      })
    },
  },
}
</script>
