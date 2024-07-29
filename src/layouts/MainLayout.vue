<template>
  <v-row
    v-if="!isInited"
    class="vertical ma-0"
    style="min-height: 100vh; background-color: var(--v-notification-base)"
    align="center"
    justify="center"
  >
    <v-row class="ma-0 flex-column" align="center" justify="center">
      <TheBrand />
      <v-progress-circular
        :size="50"
        color="white"
        indeterminate
      ></v-progress-circular>
    </v-row>
  </v-row>
  <v-app v-else>
    <v-navigation-drawer
      app
      permanent
      :mini-variant.sync="drawer"
      color="navigation"
      width="256px"
      class="d-none d-md-flex"
      dark
    >
      <the-nav :drawer="drawer" @changeDrawer="drawer = !drawer"></the-nav>
    </v-navigation-drawer>
    <v-app-bar class="vertical pa-0" color="bg" elevation="0" app>
      <v-app-bar-nav-icon
        class="d-flex d-md-none"
        :class="{
          'v-app-bar__nav-icon-active': drawer_mobile,
          'v-app-bar__nav-icon-active reverse':
            (getSubNavigation && !getSubNavigationOpen) ||
            (getDetail && getDetailOpen),
        }"
        @click="openDrawer()"
      >
        <svg
          v-if="getSubNavigation || getDetailOpen"
          width="40"
          height="40"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="12" y="15.5" width="26" height="3" rx="1.5" fill="black" />
          <rect x="12" y="23.5" width="26" height="3" rx="1.5" fill="black" />
          <rect x="12" y="31.5" width="26" height="3" rx="1.5" fill="black" />
        </svg>
      </v-app-bar-nav-icon>
      <v-card-title class="pa-0 ma-0 d-flex flex-row align-center">
        <template v-if="secondaryNavs && secondaryNavs.length">
          <v-breadcrumbs :items="secondaryNavs" divider=">" large>
            <template #item="{ item }">
              <v-breadcrumbs-item
                :disabled="
                  secondaryNavs.findLast((x) => x.status).title === item.title
                "
                @click="goToElem(item)"
              >
                {{ item.title }}
              </v-breadcrumbs-item>
            </template>
          </v-breadcrumbs>
        </template>
      </v-card-title>
      <v-spacer />
      <div class="mr-6 d-flex flex-column">
        <static-title> Login of user </static-title>
        <static-text>
          {{ $moment(date).format("DD.MM.YY HH:mm") }}
        </static-text>
      </div>
      <v-btn
        v-if="getAuxilarium"
        class="ml-2"
        icon
        @click="$store.dispatch('app/setAuxilariumOpen', true)"
      >
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
      <!-- <the-account /> -->
    </v-app-bar>
    <v-main :class="{ drawer }">
      <router-view @closeDrawer="drawer = true"></router-view>
    </v-main>
    <v-snackbar
      v-model="error"
      class="status"
      timeout="1500"
      :class="'status-' + getError.type"
      top
      color="white"
    >
      <div>
        <div class="notification-font-title mb-1">{{ title }}</div>
        <div class="notification-font-text">
          {{
            originalError.message !== !!error
              ? getError.message
              : $localize(errorMessage)
          }}
        </div>
      </div>
      <template #action="{ attrs }">
        <v-btn v-bind="attrs" icon @click="closeSnackbar()">
          <v-icon color="black"> mdi-close </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <!-- <mobile-navigation v-model="drawer_mobile" /> -->
  </v-app>
</template>

<script>
import { mapGetters } from "vuex"
import TheAccount from "@/components/app/TheAccount"
import TheNav from "@/components/app/vertical/TheNav"
import TheBrand from "@/components/app/TheBrand"

export default {
  name: "MainLayout",
  // eslint-disable-next-line vue/no-unused-components
  components: { TheAccount, TheNav, TheBrand },
  data() {
    return {
      date: new Date().valueOf(),
      drawer_mobile: false,
      drawer: false,
      error: false,
      originalError: {},
      secondaryNavs: [],
      errorMessage: this.$localize(
        "oops_something_went_wrong_please_try_again_later"
      ),
    }
  },
  computed: {
    ...mapGetters(["getError", "isInited"]),
    ...mapGetters("secondaryNavs", { getSecondaryNavs: "getSecondaryNavs" }),
    ...mapGetters("app", { getMobileDrawer: "getMobileDrawer" }),
    ...mapGetters("app", { getAuxilarium: "getAuxilarium" }),
    ...mapGetters("app", { getSubNavigation: "getSubNavigation" }),
    ...mapGetters("app", { getSubNavigationOpen: "getSubNavigationOpen" }),
    ...mapGetters("app", { getDetail: "getDetail" }),
    ...mapGetters("app", { getDetailOpen: "getDetailOpen" }),
    title() {
      let title = ""
      switch (this.getError.type) {
        case "success":
          title = "success"
          break
        case "warning":
          title = "warning"
          break
        case "error":
          title = "error"
          break
        case "info":
          title = "info"
          break
      }
      return title
    },
  },
  watch: {
    getMobileDrawer(value) {
      this.drawer_mobile = value
    },
    getError(err) {
      this.error = err
      this.originalError = err
    },
    getSecondaryNavs(value) {
      this.secondaryNavs = value
    },
  },
  created() {
    setInterval(() => {
      this.date += 1000
    }, 1000)
  },
  methods: {
    goToElem(item) {
      this.$store.dispatch("secondaryNavs/setGotoSecondaryNavs", item.id)
    },
    openDrawer() {
      if (this.getSubNavigation && !this.getSubNavigationOpen)
        this.$store.dispatch("app/setSubNavigationOpen", true)
      else if (this.getDetail && this.getDetailOpen)
        this.$store.dispatch("app/setDetailOpen", false)
      else {
        // if (this.getSubNavigationOpen)
        //   this.$store.dispatch("app/setSubNavigationOpen", false)
        this.drawer_mobile = !this.drawer_mobile
      }
    },
    toUser() {
      if (this.$route.name !== "user") {
        this.$router.push("/user")
      }
    },
    closeSnackbar() {
      this.$store.dispatch("setError", false)
    },
  },
}
</script>
