<template>
  <container>
    <MasterElement cols="12">
      <ScrollShadowElement>
        <v-card v-if="!loading" outlined class="elevation-base pa-4 pb-12">
          <v-row no-gutters align="center">
            <v-col cols="auto" class="d-flex align-start justify-start">
              <img src="@/assets/Wight_short_LogoTRAFFKILLAS.png" height="75" />
              <static-text class="d-flex flex-column align-start mr-8">
                <span>{{ item.state }}</span>
                <span>{{ item.geo }}</span>
                {{ "B $" + item.baseLine + " CPA $" + item.cpa }}
              </static-text>
            </v-col>
            <v-col cols="auto" class="d-flex align-start justify-start">
              <static-text class="d-flex flex-column align-start">
                <span class="d-flex align-center">
                  <v-text-field
                    v-if="isEditLabel"
                    v-model="label"
                    :label="$localize('label')"
                    dense
                    hide-details
                    outlined
                  />
                  <span v-else>
                    {{ $localize("stream_label") + ": " + item.label }}
                  </span>
                  <div class="ml-2">
                    <v-icon @click="isEditLabel = !isEditLabel">
                      mdi-pencil</v-icon
                    >
                  </div>
                </span>
                <span>{{ $localize("cap") + ": " + item.cap }}</span>
              </static-text>
            </v-col>
          </v-row>
          <v-row no-gutters class="flex-column">
            <static-title class="my-2">
              {{ $localize("main_info") }}
            </static-title>
            <static-text v-html="item.mainInfo" />
          </v-row>
          <v-row justify="space-between" class="mt-4" no-gutters>
            <static-subtext>
              {{ $localize("domen") }}
            </static-subtext>
            <static-subtext>
              {{ $localize("trackink_link") }}
            </static-subtext>
            <static-subtext>
              {{ $localize("integration_with_trackers") }}
            </static-subtext>
          </v-row>
          <v-row justify="space-between" class="mt-4" no-gutters>
            <v-col cols="4">
              <v-autocomplete
                v-model="item.domen"
                :items="domens"
                :label="$localize('domen')"
                dense
                hide-details
                outlined
              />
            </v-col>
            <v-col cols="8" class="d-flex">
              <v-btn icon class="mx-4" @click="copyLink">
                <v-icon> mdi-content-copy </v-icon>
              </v-btn>
              <v-text-field
                id="tradingLink"
                :value="item.tradingLink"
                disabled
                dense
                hide-details
                outlined
              />
            </v-col>
          </v-row>
        </v-card>
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
      isEditLabel: false,
      items: [],
      domens: ["amlinks.online", "bpmlinks.online"],
      label: "",
    }
  },
  created() {
    this.loading = true
    this.loading = false
    this.item = {
      uid: "1",
      label: "Мой поток 1",
      cap: "nnn/300 Qual",
      link: "https://web.telegram.org/",
      user: "My user",
      state: "Pin-up",
      geo: "UZ",
      mainInfo: `
Доступные ГЕО- Уз<br>
Накопительный бейслайн 5 долларов<br>
Минимальный кап для получения первой выплаты 20 депозитов<br>
Холд до 30 дней<br>
Не оплачиваются: вывод первого депозита, оставленная на балансе сумма первого депозита, дубли<br>
      `,
      domen: "amlinks.online",
      tradingLink: "https://amlinks.online/click?pid=123@offer_id=12345",
      baseLine: 5,
      cpa: 30,
    }
    this.label = this.item.label + ""
  },
  methods: {
    copyLink() {
      navigator.clipboard.writeText(this.item.tradingLink)
    },
  },
}
</script>
