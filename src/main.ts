import Vue from "vue"
import App from "./App.vue"
import "./registerServiceWorker"
import "./plugins/components"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import "@mdi/font/css/materialdesignicons.css"

Vue.config.productionTip = false

import moment from "moment"
require("moment/locale/ru")

Vue.use(require("vue-moment"), {
  moment,
})

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
