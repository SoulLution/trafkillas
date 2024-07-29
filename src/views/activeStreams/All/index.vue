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
                  <span>{{ item.state }}</span>
                  <span>{{ item.geo }}</span>
                  {{ "B $" + item.baseLine + " CPA $" + item.cpa }}
                </static-text>
              </v-col>
              <v-col cols="auto" class="d-flex align-start justify-start">
                <static-text class="d-flex flex-column align-start">
                  <span>{{ item.label }}</span>
                  <span>{{ $localize("bayer") + ": " + item.user }}</span>
                  <span>{{ $localize("telegram") + ": " + item.link }}</span>
                  <span>{{ $localize("cap") + ": " + item.cap }}</span>
                </static-text>
              </v-col>
              <v-spacer />
              <v-btn>
                {{ $localize("view_my_link") }}
              </v-btn>
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
  created() {
    this.loading = true
    this.loading = false
    this.items = [
      {
        uid: "1",
        label: "Мой поток 1",
        cap: "nnn/300 Qual",
        link: "https://web.telegram.org/",
        user: "My user",
        state: "Pin-up",
        geo: "UZ",
        baseLine: 5,
        cpa: 30,
      },
      {
        uid: "2",
        label: "Мой поток 2",
        cap: "nnn/NO CAP",
        link: "https://web.telegram.org/",
        user: "My user",
        state: "Pin-up",
        geo: "UZ",
        baseLine: 5,
        cpa: 50,
      },
    ]
  },
  methods: {
    search() {},
    toItem(item) {
      // load item from back
      this.$router.push({
        name: "active_streams_stream",
        params: { uid: item.uid },
      })
    },
  },
}
</script>
