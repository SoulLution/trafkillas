<template>
  <div class="d-none d-md-flex align-center">
    <v-btn
      elevation="0"
      style="background: transparent"
      @click="openMore = true"
    >
      <v-row align="center" class="flex-nowrap ma-0" dense>
        <v-col class="d-flex align-center" cols="auto">
          <ProfileAvatar :title="profile.fullName" />
        </v-col>
        <v-col class="d-flex align-center" cols="auto">
          <v-card-text
            class="pa-0 d-none d-sm-block"
            style="white-space: nowrap"
          >
            {{ profile.fullName }}
          </v-card-text>
        </v-col>
        <v-col class="d-flex align-center pa-0" cols="auto">
          <v-icon small>mdi-chevron-down</v-icon>
        </v-col>
      </v-row>
    </v-btn>
    <v-navigation-drawer
      v-model="openMore"
      color="white"
      right
      absolute
      temporary
      app
    >
      <div class="d-flex flex-column justify-start sub-left">
        <v-row class="ma-0 py-2 pl-2 pr-2 flex-grow-0" align="start">
          <ProfileAvatar :title="profile.fullName" />
          <span class="py-2 subtitle"> {{ profile.fullName }} </span>
          <v-spacer></v-spacer>
          <v-btn icon small @click="openMore = false">
            <v-icon size="20" color="black"> mdi-close </v-icon>
          </v-btn>
        </v-row>
        <v-divider />
        <MasterElement style="background: white">
          <ScrollShadowElement class="pa-0">
            <v-btn-toggle
              :value="$store.state.locale.lang"
              tile
              color="primary"
              group
            >
              <v-btn
                v-for="lang in langs"
                :key="lang"
                class="ma-0"
                :value="lang"
                @click="setLang(lang)"
              >
                {{ lang }}
              </v-btn>
            </v-btn-toggle>
            <v-divider class="ma-0" />
            <v-list dense>
              <v-list-item-title class="my-2 px-4 text-h6">
                {{ $localize("catalogs") }}
              </v-list-item-title>
              <v-list-item-group
                v-model="profile.curentCatalog"
                color="primary"
              >
                <v-list-item
                  v-for="item in profile.catalogs"
                  :key="item.catalogUid"
                  @click="changeCatalog(item)"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.sysname }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-divider />
            <v-list dense>
              <v-list-item-title class="my-2 px-4 text-h6">{{
                $localize("security_audit")
              }}</v-list-item-title>
              <v-list-item-group>
                <v-list-item v-for="item in profile.security" :key="item.title">
                  <v-list-item-content>
                    <div class="text-body-1 text-nowrap">
                      {{ $localize(item.title) }}
                    </div>
                    <div
                      v-if="item.title == 'security_audit_password_error_count'"
                      class="subtitle-2 gray_1--text"
                    >
                      {{ item.value ? item.value : "0" }}
                    </div>
                    <div v-else class="subtitle-2 gray_1--text">
                      {{
                        item.value
                          ? $moment(item.value).format("DD.MM.YYYY HH:mm")
                          : "n/a"
                      }}
                    </div>
                    <div v-if="item.src" class="subtitle-2 gray_1--text">
                      {{ $localize(item.src) }}
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </ScrollShadowElement>
        </MasterElement>
        <v-btn color="error" class="rounded-0" @click="exit()">
          {{ $localize("exit") }}
        </v-btn>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
let Item = function (vm, d, sec) {
  let self = this

  d.fullName = ""
  self.fullName2vm = () => {
    let fullName = ""
    if (d.lastName) fullName += d.lastName + " "
    if (d.firstName) fullName += d.firstName + " "
    if (d.middleName) fullName += d.middleName + " "
    return fullName
  }
  self.catalogs2vm = () => {
    let catalogs = JSON.parse(d.catalogs)
    return catalogs
  }
  d.curentCatalog = null
  self.curentCatalog2vm = () => {
    let catalogs = JSON.parse(d.catalogs)
    return catalogs.findIndex(
      (x) => x.sysname === top.location.pathname.split("/")[1]
    )
  }
  d.security = []
  self.security2vm = () => {
    if (!sec || !sec.length) return []
    let security = JSON.parse(sec)
    let res = [
      {
        title: "security_audit_success",
        value: security["SUCCESS"]
          ? new Date(parseInt(security["SUCCESS"]))
          : 0,
        src: "security_audit_browser",
      },
      {
        title: "security_audit_password_error",
        value: security["PASSWORD_ERROR"]
          ? new Date(parseInt(security["PASSWORD_ERROR"]))
          : 0,
        src: "security_audit_browser",
      },
      {
        title: "security_audit_password_error_count",
        value: security["UNAUTHORIZED"] ? security["UNAUTHORIZED"] : 0,
      },
      {
        title: "security_audit_user_locked",
        value: security["USER_LOCKED"]
          ? new Date(parseInt(security["USER_LOCKED"]))
          : 0,
        src: "security_audit_browser",
      },
    ]
    return res
  }

  vm.$js2vm(self, d)
}
import { mapGetters } from "vuex"
export default {
  name: "TheAccount",
  data() {
    return {
      profile: {},
      openMore: false,
    }
  },
  computed: {
    ...mapGetters("locale", { langs: "langs" }),
  },
  created() {
    this.profile = new Item(
      this,
      this.$jwtParser.parse(this.$localStorage.getItem("value")),
      this.$localStorage.getItem("security")
    )
  },
  methods: {
    setLang(lang) {
      this.$store.dispatch("locale/setLang", lang)
    },
    changeCatalog(item) {
      document.location.href =
        "/" +
        item.sysname +
        top.location.pathname.split(
          this.profile.catalogs[this.profile.curentCatalog].sysname
        )[1]
    },
    exit() {
      this.$logout()
    },
  },
}
</script>

<style lang="scss" scoped>
.chevron {
  transition: 0.3s;
  &[aria-expanded="true"] {
    transform: scaleY(-1);
  }
}
.openMore {
  font-size: 0.8em;
  &:hover {
    color: var(--v-primary-base);
  }
}
</style>
