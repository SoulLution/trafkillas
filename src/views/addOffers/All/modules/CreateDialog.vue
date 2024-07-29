<template>
  <v-dialog
    :value="value"
    width="100%"
    max-width="850"
    transition="scroll-x-reverse-transition"
    scrollable
    @input="(e) => $emit('input', e)"
    @click:outside="$emit('input', false)"
  >
    <v-card color="bg">
      <v-card-title>
        {{ $localize("add_offer") }}
        <v-spacer />
        <v-tooltip bottom center>
          <template #activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              class="d-none d-md-flex"
              icon
              v-on="on"
              @click="$emit('input', false)"
            >
              <v-icon color="black"> mdi-close </v-icon>
            </v-btn>
          </template>
          <span>{{ $localize("close") }}</span>
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        <MasterElement>
          <ScrollShadowElement>
            <v-card>
              <v-card-text>
                <v-row class="my-2">
                  <v-col cols="12">
                    <the-load-file :multiple="false" />
                  </v-col>
                </v-row>
                <v-row class="my-2">
                  <v-col cols="12">
                    <v-autocomplete
                      v-model="request.partner"
                      :items="partners"
                      :label="$localize('partner')"
                      dense
                      hide-details
                      outlined
                    />
                  </v-col>
                </v-row>
                <v-row class="my-2">
                  <v-col cols="6" md="3">
                    <v-text-field
                      v-model="request.geo"
                      :label="$localize('geo')"
                      dense
                      hide-details
                      outlined
                    />
                  </v-col>
                  <v-col cols="6" md="3">
                    <v-text-field
                      v-model="request.baseLine"
                      type="number"
                      :label="$localize('base_line')"
                      dense
                      hide-details
                      outlined
                    />
                  </v-col>
                  <v-col cols="6" md="3">
                    <v-text-field
                      v-model="request.cpa"
                      type="number"
                      :label="$localize('cpa')"
                      dense
                      hide-details
                      outlined
                    />
                  </v-col>
                  <v-col cols="6" md="3">
                    <v-autocomplete
                      v-model="request.currency"
                      :items="currencies"
                      :label="$localize('currency')"
                      dense
                      hide-details
                      outlined
                    />
                  </v-col>
                </v-row>
                <v-row class="my-2">
                  <v-col cols="12">
                    <v-text-field
                      v-model="request.link"
                      :label="$localize('link')"
                      dense
                      hide-details
                      outlined
                    />
                  </v-col>
                </v-row>
                <v-row class="my-2">
                  <v-col cols="12" md="6">
                    <v-textarea
                      v-model="request.mainInfo"
                      :label="$localize('main_info')"
                      dense
                      hide-details
                      outlined
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-textarea
                      v-model="request.kpi"
                      :label="$localize('kpi')"
                      dense
                      hide-details
                      outlined
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </ScrollShadowElement>
        </MasterElement>
      </v-card-text>
      <v-card-actions class="d-flex flex-wrap">
        <v-row class="ma-0">
          <v-spacer />
          <v-btn
            class="mr-2"
            color="gray_3"
            text
            @click="$emit('input', false)"
          >
            {{ $localize("cancel") }}
          </v-btn>
          <v-btn color="primary" :disabled="!valid" @click="save">
            {{ $localize("save") }}
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CreateDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      request: {
        img: "",
        link: "",
        partner: "",
        geo: "",
        mainInfo: "",
        kpi: "",
        cpa: "",
        baseLine: "",
        currency: "",
      },
      partners: ["Pin-up"],
      currencies: ["$", "KZT"],
      rules: {
        required: (value) => !!value || this.$localize("required"),
      },
    }
  },
  computed: {
    valid() {
      return !!this.request.partner && !!this.request.mainInfo
    },
  },
  methods: {
    async save() {
      let data = JSON.parse(JSON.stringify(this.request))
      data.items = this.items
      //   let res = await this.$fetch.post("/user/create", data)
      //   if (res && res.success) {
      this.$store.dispatch("setAlert", {
        type: "success",
      })
      this.$emit("input", false)
      const res = {
        ...this.request,
        state: this.request.partner,
        uid: (Math.random() * 10000) ^ 0,
      }
      this.$emit("map", res)
      //   }
    },
  },
}
</script>
