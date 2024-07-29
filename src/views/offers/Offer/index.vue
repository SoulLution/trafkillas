<template>
  <container>
    <MasterElement cols="12">
      <ScrollShadowElement>
        <template v-if="!loading">
          <v-card outlined class="elevation-base pa-4 pb-12">
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
              <v-col class="d-flex">
                <v-text-field
                  v-model="request.link"
                  :label="$localize('telegram')"
                  dense
                  hide-details
                  outlined
                />
                <v-text-field
                  v-model="request.capa"
                  :label="$localize('capa')"
                  dense
                  type="number"
                  style="max-width: 150px"
                  hide-details
                  outlined
                  class="mx-4"
                />
                <v-btn
                  color="primary"
                  :disabled="!valid"
                  @click="openDialog('accept')"
                >
                  {{ $localize("save") }}
                </v-btn>
              </v-col>
            </v-row>
            <v-row no-gutters class="flex-column">
              <static-title class="my-2">
                {{ $localize("main_info") }}
              </static-title>
              <static-text v-html="item.mainInfo" />
            </v-row>
          </v-card>
        </template>
        <v-card-title v-else-if="loading">{{
          $localize("loading")
        }}</v-card-title>
        <v-card-title v-else>{{
          $localize("substrate_default_text")
        }}</v-card-title>
      </ScrollShadowElement>
      <ConfirmDialog
        v-if="dialogs.accept"
        :dialog="dialogs.accept"
        :message="$localize('are_you_sure_you_want_to_send_request')"
        buttontext="confirm"
        @close="openDialog()"
        @action="accept"
      />
    </MasterElement>
  </container>
</template>

<script>
export default {
  data() {
    return {
      item: null,
      loading: true,
      request: {
        link: "",
        capa: "",
      },
      dialogs: {
        accept: false,
      },
    }
  },
  computed: {
    valid() {
      return !!this.request.link && !!this.request.capa
    },
  },
  async created() {
    this.loading = true
    await this.init()
    this.loading = false
    this.item = {
      uid: "1",
      label: "Мой поток 1",
      cap: "nnn/300 Qual",
      state: "Pin-up",
      geo: "UZ",
      mainInfo: `
    Доступные ГЕО- Уз<br>
    Накопительный бейслайн 5 долларов<br>
    Минимальный кап для получения первой выплаты 20 депозитов<br>
    Холд до 30 дней<br>
    Не оплачиваются: вывод первого депозита, оставленная на балансе сумма первого депозита, дубли<br>
          `,
      baseLine: 5,
      cpa: 30,
    }
  },
  methods: {
    async init() {
      // let res = await this.$axios.get('/offer/getAvailableOffers')
      // this.items = res.data.find(x => x.id === this.$route.params.id)

      this.items = {
        id: 1,
        terms: "CPA 5/30 KZ",
        capacity: 200,
        cpa: 0,
        partner: {
          id: 1,
          partner_name: "Vavada",
        },
      }
    },
    accept() {
      this.$router.push({ name: "offers_all" })
    },
    openDialog(...keys) {
      Object.keys(this.dialogs).forEach((x) => {
        this.dialogs[x] = !!~keys.indexOf(x)
      })
    },
  },
}
</script>
