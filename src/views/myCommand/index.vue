<template>
  <container>
    <MasterElement>
      <ScrollShadowElement scroll-x>
        <view-table :headers="headers" :items="items" :loading="loading">
          <template #toolbar>
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
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    :disabled="!items.filter((x) => x.select).length"
                    v-bind="attrs"
                    v-on="on"
                    @click="openDialog('remove')"
                  >
                    <v-icon>mdi-delete-outline</v-icon>
                  </v-btn>
                </template>
                <span>
                  {{ $localize("remove") }}
                </span>
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
          </template>
          <template #[`item.actions`]="">
            <div class="d-flex align-start">
              <v-btn icon>
                <v-icon
                  style="
                    background: #f5f5f7;
                    border-radius: 15px;
                    min-width: 32px;
                    min-height: 32px;
                  "
                >
                  mdi-dots-vertical
                </v-icon>
              </v-btn>
            </div>
          </template>
          <template #[`item.birthDate`]="props">
            <span>
              {{ $moment(props.item.birthDate).format("DD.MM.YYYY") }}
            </span>
          </template>
        </view-table>
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
      loading: false,
      headers: [
        {
          text: "№",
          value: "index",
          align: "start",
          sortable: false,
        },
        {
          text: this.$localize("login"),
          align: "start",
          sortable: false,
          value: "login",
        },
        {
          text: this.$localize("birth_date"),
          align: "start",
          sortable: false,
          value: "birthDate",
        },
        {
          text: this.$localize("position"),
          align: "start",
          sortable: false,
          value: "position",
        },
        {
          text: this.$localize("rating"),
          align: "start",
          sortable: false,
          value: "rating",
        },
      ],
      items: [],
      dialogs: {
        add: false,
        remove: false,
      },
    }
  },
  created() {
    for (let i = 0; i < 25; i++)
      this.items.push({
        uid: i + 1,
        login: "Lorem ipsum",
        rating: (Math.random() * 1000) ^ 0,
        birthDate: new Date(),
        position: "Junior",
        select: false,
      })
  },
  methods: {
    add(item) {
      this.items.splice(0, 0, item)
    },
    remove() {
      this.items = this.items.filter((x) => !x.select)
    },
    openDialog(...keys) {
      Object.keys(this.dialogs).forEach((x) => {
        this.dialogs[x] = !!~keys.indexOf(x)
      })
    },
    search() {
      this.loading = true
      this.items = []
      setTimeout(() => {
        for (let i = 0; i < 25; i++)
          this.items.push({
            uid: i + 1,
            login: "Lorem ipsum",
            rating: (Math.random() * 1000) ^ 0,
            birthDate: new Date(),
            position: "Junior",
            select: false,
          })
        this.loading = false
      }, 2000)
    },
  },
}
</script>
