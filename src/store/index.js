import Vue from "vue"
import Vuex from "vuex"
import locale from "@/store/modules/locale"
import app from "@/store/modules/app"
import router from "../router"
import secondaryNavs from "./modules/secondaryNavs"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    locale,
    secondaryNavs,
  },
  actions: {
    async init(ctx) {
      // if (!ctx.getters.isMainLayout || ctx.getters.isInited) return
      console.log("ctx: loaded")
      ctx.dispatch("app/init")
      ctx.dispatch("locale/init")
      ctx.commit("setInited")
    },
    setError(ctx, newObject) {
      ctx.commit("mutateError", newObject)
    },
  },
  mutations: {
    setInited(state) {
      setTimeout(() => {
        state.inited = true
        console.log("ctx: initialized")
      }, 2000)
    },
    mutateError(state, boolean) {
      state.$error = boolean
    },
  },
  getters: {
    isInited: (state) => state.inited,
    isMainLayout: () => {
      return router.history.current.meta.requiredAuth
        ? router.history.current.meta.requiredAuth
        : router.history.pending.meta.requiredAuth
    },
    getError: (state) => state.$error,
  },
  state: {
    inited: false,
    $error: false,
  },
})
