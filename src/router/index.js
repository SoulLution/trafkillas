import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./routes"
import ctx from "../store"
import localize from "@/filters/localize"

Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes.get(),
})

router.beforeEach((to, from, next) => {
  ctx.dispatch("init").then(() => {
    ctx.dispatch("app/setNavGroupByPath", to.path).then(() => {
      let windowWidth = window.innerWidth
      if (windowWidth < 960) {
        if (ctx.getters["app/getSubNavigationOpen"]) {
          ctx.dispatch("app/setSubNavigationOpen", false)
          return false
        } else if (ctx.getters["app/getDetailOpen"]) {
          ctx.dispatch("app/setDetailOpen", false)
          return false
        } else next()
      } else next()
      next()
    })
  })
})

router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title =
      to.meta.label !== undefined
        ? localize(to.meta.label) + " - " + process.env.VUE_APP_NAME
        : process.env.VUE_APP_NAME
  })
})

export default router
