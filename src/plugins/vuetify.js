import Vue from "vue"
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#ffa13f",
        secondary: "#5148AA",
        purple: "#AF3A99",
        blue: "#1976D2",
        yellow: "#F4EA51",

        black: "#000000",
        gray_1: "#858C94",
        gray_2: "#595959",
        gray_3: "#535353",
        gray_4: "#212121",

        white: "#FFFFFF",
        gray_light_1: "#FBFBFB",
        gray_light_2: "#F5F5F7",
        gray_light_3: "#F3F3F3",
        gray_light_4: "#ECECEC",

        nav: "#424658",
        bg: "#F0F0F0",
        navigation: "#424658",
        sub_navigation: "#373B4E",
        error: "#FF5252",
        success: "#00B050",
        info: "#5887FF",
      },
    },
  },
})
