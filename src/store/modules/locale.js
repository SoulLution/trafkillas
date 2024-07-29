import moment from "moment"
import ru from "@/store/locales/ru.json"
import kk from "@/store/locales/kk.json"
import en from "@/store/locales/en.json"
const languages = ["ru", "kk", "en"]
export default {
  namespaced: true,
  state: {
    lang:
      localStorage.getItem("lang") &&
      languages.includes(localStorage.getItem("lang"))
        ? localStorage.getItem("lang")
        : languages[0],
    langs: languages,
    langs_arr: {
      ru,
      kk,
      en,
    },
    region: "kz",
    items: new Map(),
  },
  getters: {
    get: (state) => (key) => {
      if (!key) return
      if (!state.items || state.items.size === 0) return key
      const res = state.items.get(key)
      return res ? res : undefined
    },
    langs: (state) => {
      return state.langs
    },
  },
  actions: {
    async init(ctx) {
      moment.locale(ctx.state.lang)
      ctx.commit("init")
    },
    setLang(ctx, item) {
      if (item) ctx.commit("setLang", item)
      ctx.commit("init")
    },
    set(ctx, item) {
      if (item) ctx.commit("set", item)
    },
    delete(ctx, key) {
      if (key) ctx.commit("delete", key)
    },
    get(ctx, key) {
      if (!key) return
      const res = ctx.state.items.get(key)
      return res ? res : undefined
    },
  },
  mutations: {
    async init(state) {
      state.items = new Map(Object.entries(state.langs_arr[state.lang]))
      console.log("ctx.locale: initialized")
    },
    setLang(state, item) {
      if (!item || !state.langs.includes(item)) return
      state.lang = item
      localStorage.setItem("lang", item)
    },
    set(state, item) {
      if (item && item.key && item.label) state.items.set(item.key, item.label)
    },
    delete(state, key) {
      if (key) state.items.delete(key)
    },
  },
}
