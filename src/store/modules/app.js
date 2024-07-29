import Vue from "vue"
import router from "@/router"

import routes from "@/router/routes"

export default {
  namespaced: true,
  state: {
    activeNavGroup: 0,
    mobileDrawer: false,
    auxilarium: false,
    auxilariumOpen: false,
    subNavigation: false,
    subNavigationOpen: false,
    detail: false,
    detailOpen: false,
    navGroups: [
      {
        label: "Разметка",
        key: "grid",
        icon: "mdi-monitor-dashboard",
        items: [],
        clazz: "",
      },
      {
        label: "Примеры",
        key: "examples",
        icon: "mdi-monitor-dashboard",
        items: [],
        clazz: "",
      },
      {
        label: "Ядро",
        key: "core",
        icon: "mdi-constructor-select",
        items: [],
        clazz: "",
      },
      {
        key: "all",
        items: [],
      },
    ],
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    profile: null,
  },
  getters: {
    getToken(state) {
      return state.token
    },
    getNav(state) {
      return state.navGroups.filter((g) => {
        return g.items.length > 0
      })
    },
    getMobileDrawer(state) {
      return state.mobileDrawer
    },
    getAuxilarium(state) {
      return state.auxilarium
    },
    getAuxilariumOpen(state) {
      return state.auxilariumOpen
    },
    getSubNavigation(state) {
      return state.subNavigation
    },
    getSubNavigationOpen(state) {
      return state.subNavigationOpen
    },
    getDetail(state) {
      return state.detail
    },
    getDetailOpen(state) {
      return state.detailOpen
    },
  },
  actions: {
    init(ctx) {
      ctx.commit("init")
      if (ctx.state.token) {
        // ctx.commit("setProfile")
      }
    },
    async setToken(ctx, token) {
      await ctx.commit("setToken", token)
      // ctx.commit("setProfile")
    },
    setProfile(ctx) {
      ctx.commit("setProfile")
    },
    setMobileDrawer(ctx) {
      ctx.commit("mutateMobileDrawer")
    },
    setAuxilarium(ctx, val) {
      ctx.commit("mutateAuxilarium", val)
    },
    setAuxilariumOpen(ctx, val) {
      ctx.commit("mutateAuxilariumOpen", val)
    },
    setSubNavigation(ctx, val) {
      ctx.commit("mutateSubNavigation", val)
    },
    setSubNavigationOpen(ctx, val) {
      ctx.commit("mutateSubNavigationOpen", val)
    },
    setDetail(ctx, val) {
      ctx.commit("mutateDetail", val)
    },
    setDetailOpen(ctx, val) {
      ctx.commit("mutateDetailOpen", val)
    },
    setLayoutType(ctx) {
      ctx.commit("mutateLayoutType")
      ctx.commit("init")
    },
    setNavGroupByPath(ctx, val) {
      ctx.commit("mutateNavGroupByPath", val)
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      Vue.prototype.$axios.defaults.headers.common[
        "Authorization"
        // ] = `Bearer ${token}`
      ] = `${token}`
      localStorage.setItem("token", token)
    },
    async setProfile(state) {
      if (state.token)
        Vue.prototype.$axios.defaults.headers.common[
          "Authorization"
          // ] = `Bearer ${state.token}`
        ] = `${state.token}`
      Vue.prototype.$axios
        .get("/profile/")
        .then((res) => {
          if (!res || !res.data.is_success) state.profile = state.token = null
          else {
            let profile = res.data.data
            if (profile.img && !profile.img.includes("data:"))
              profile.img = "data:image/*;base64," + profile.img
            state.profile = profile
          }
        })
        .catch(() => {
          state.profile = state.token = null
          router.push("/login")
        })
    },
    init(state) {
      // let my = My_dostupes[0].pages
      // let spliced = JSON.parse(JSON.stringify(My_dostupes)).splice(
      //   1,
      //   My_dostupes.length - 1
      // )
      // for (let j of spliced) my = my.concat(j.pages)
      // let final = {}
      // for (const index of my) {
      //   final[index] = index
      // }
      // final = Object.keys(final)
      // final = final.map((x) => routes.get()[x])
      state.navGroups.forEach((g) => {
        g.items = []
      })

      let all = state.navGroups.find((x) => x.key == "all")
      routes
        .get()
        .filter((x) => x.meta.group && !x.meta.isLogin)
        .forEach((i) => {
          return all.items.push(i)
        })
      console.log("ctx.app: initialized")
    },
    mutateMobileDrawer(state) {
      state.mobileDrawer = !state.mobileDrawer
    },
    mutateAuxilarium(state, val) {
      state.auxilarium = val
    },
    mutateAuxilariumOpen(state, val) {
      state.auxilariumOpen = val
    },
    mutateSubNavigation(state, val) {
      state.subNavigation = val
    },
    mutateSubNavigationOpen(state, val) {
      state.subNavigationOpen = val
    },
    mutateDetail(state, val) {
      state.detail = val
    },
    mutateDetailOpen(state, val) {
      state.detailOpen = val
    },
    mutateNavGroupByPath(state, val) {
      if (!val) return
      const n = routes.get().find((i) => i.path === val)
      if (!n) return (state.activeNavGroup = 0)
      const g = state.navGroups
        .filter((x) => x.items.length)
        .find((i) => i.key === n.meta.group)
      if (!g) return (state.activeNavGroup = 0)
      let idx = state.navGroups.filter((x) => x.items.length).indexOf(g)
      state.activeNavGroup = idx
    },
  },
}
