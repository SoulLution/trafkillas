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
            </v-row>
            <v-row no-gutters class="flex-column">
              <static-title class="my-2">
                {{ $localize("main_info") }}
              </static-title>
              <static-text v-html="item.mainInfo" />
            </v-row>
          </v-card>
          <view-table :headers="headers" :items="streams">
            <template #[`item.date`]="props">
              <span>
                {{ $moment(props.item.date).format("DD.MM.YYYY HH:mm") }}
              </span>
            </template>
            <template #[`item.actions`]="props">
              <div class="d-flex justify-end">
                <v-btn color="success" class="mr-4" @click="accept(props.item)">
                  {{ $localize("create_stream") }}
                </v-btn>
                <v-btn color="error" @click="openRemove(props.item)">
                  {{ $localize("decline") }}
                </v-btn>
              </div>
            </template>
          </view-table>
        </template>
        <v-card-title v-else-if="loading">{{
          $localize("loading")
        }}</v-card-title>
        <v-card-title v-else>{{
          $localize("substrate_default_text")
        }}</v-card-title>
      </ScrollShadowElement>
      <CreateDialog v-if="dialogs.add" v-model="dialogs.add" @map="add" />
      <ConfirmDialog
        v-if="dialogs.remove"
        :dialog="dialogs.remove"
        :message="$localize('are_you_sure_you_want_to_delete')"
        buttontext="confirm"
        @close="openDialog()"
        @action="remove"
      />
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
      streams: [],
      headers: [
        {
          text: "№",
          value: "index",
          align: "start",
          sortable: false,
        },
        {
          text: "date",
          align: "start",
          sortable: false,
          value: "date",
        },
        {
          text: "user",
          align: "start",
          sortable: false,
          value: "user",
        },
        {
          text: "telegram",
          align: "start",
          sortable: false,
          value: "link",
        },
        {
          text: "",
          align: "start",
          sortable: false,
          value: "actions",
        },
      ],
      stream: null,
      dialogs: {
        add: false,
        remove: false,
      },
    }
  },
  created() {
    this.loading = true
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
    this.streams = [
      {
        uid: "1",
        date: new Date(),
        user: "My user",
        link: "https://web.telegram.org/",
      },
      {
        uid: "2",
        date: new Date(),
        user: "Another user",
        link: "https://web.telegram.org/",
      },
    ]
  },
  methods: {
    accept(item) {
      this.stream = { ...item }
      this.openDialog("add")
    },
    openRemove(item) {
      this.stream = item
      this.openDialog("remove")
    },
    add() {
      this.removeFromList()
    },
    remove() {
      this.removeFromList()
    },
    removeFromList() {
      if (!this.stream) return
      this.streams.splice(
        this.streams.findIndex((x) => x.uid === this.stream.uid),
        1
      )
      this.stream = null
    },
    openDialog(...keys) {
      Object.keys(this.dialogs).forEach((x) => {
        this.dialogs[x] = !!~keys.indexOf(x)
      })
    },
  },
}
</script>
