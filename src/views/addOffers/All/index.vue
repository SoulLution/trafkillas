<template>
  <container>
    <MasterElement cols="12">
      <ScrollShadowElement>
        <ToolbarElement>
          <v-btn-toggle dense>
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn
                  :disabled="false"
                  v-bind="attrs"
                  v-on="on"
                  @click="openDialog('add')"
                >
                  <v-icon>mdi-plus</v-icon>
                  {{ $localize("add") }}
                </v-btn>
              </template>
              <span>{{ $localize("add") }}</span>
            </v-tooltip>
          </v-btn-toggle>
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
              <v-spacer />
              <div class="d-flex align-center">
                <v-chip v-if="item.streams" color="info" class="mr-4">
                  {{ item.streams }}
                </v-chip>
                <v-btn>
                  {{ $localize("create_stream") }}
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
      <CreateDialog v-if="dialogs.add" v-model="dialogs.add" @map="add" />
    </MasterElement>
  </container>
</template>

<script>
import CreateDialog from "./modules/CreateDialog"
export default {
  components: { CreateDialog },
  data() {
    return {
      predicate: "",
      items: [],
      analysisItems: [],
      dialogs: {
        add: false,
      },
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
        state: "Pin-up",
        geo: "UZ",
        streams: 1,
        baseLine: 5,
        cpa: 30,
      },
      {
        uid: "2",
        state: "Pin-up",
        geo: "UZ",
        streams: 2,
        baseLine: 5,
        cpa: 50,
      },
      {
        uid: "3",
        state: "Pin-up",
        geo: "UZ",
        streams: 0,
        baseLine: 5,
        cpa: 50,
      },
    ]
    this.items = this.items.map((x) => ({
      ...x,
      label: x.key,
      label_real: x.key,
    }))
  },
  methods: {
    add(item) {
      this.items.splice(0, 0, item)
    },
    openDialog(...keys) {
      Object.keys(this.dialogs).forEach((x) => {
        this.dialogs[x] = !!~keys.indexOf(x)
      })
    },
    search() {},
    toItem(item) {
      // load item from back
      this.$router.push({
        name: "add_offers_offer",
        params: { uid: item.uid },
      })
    },
  },
}
</script>
