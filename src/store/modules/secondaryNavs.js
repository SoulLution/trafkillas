export default {
  namespaced: true,
  state: {
    secondaryNavs: [],
    gotoSecondaryNavs: "",
  },
  getters: {
    getSecondaryNavs: (state) => state.secondaryNavs,
    getGotoSecondaryNavs: (state) => state.gotoSecondaryNavs,
  },
  actions: {
    setSecondaryNavs(ctx, newData) {
      ctx.commit("mutateSecondaryNavs", newData)
    },
    setGotoSecondaryNavs(ctx, newData) {
      ctx.commit("mutateGotoSecondaryNavs", newData)
    },
  },
  mutations: {
    mutateSecondaryNavs(state, newData) {
      state.secondaryNavs = newData
    },
    mutateGotoSecondaryNavs(state, newData) {
      state.gotoSecondaryNavs = newData
    },
  },
}
