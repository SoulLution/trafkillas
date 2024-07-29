<template>
  <div>
    <v-avatar :size="size" :color="gender ? '' : getRangomHex">
      <v-img v-if="getAvatarByCode" :src="getAvatarByCode" />
      <span v-else class="white--text text-subtitle-1 text-uppercase">
        {{ getFirstLetters }}
      </span>
    </v-avatar>
  </div>
</template>

<script>
export default {
  name: "TheAvatar",
  props: {
    gender: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "32",
    },
    title: {
      type: String,
      default: "",
    },
  },

  data: () => ({
    avatarMale: require("@/assets/pm.svg"),
    avatarFemale: require("@/assets/pf.svg"),
    user: require("@/assets/user.svg"),
    colors: [
      "#6377B2",
      "#8094CC",
      "#5A6790",
      "#79ACA9",
      "#9AC9C8",
      "#5F58B1",
      "#64AAE2",
      "#9882CB",
      "#9AA3CB",
      "#E2B85E",
    ],
  }),

  computed: {
    getFirstLetters() {
      if (this.title)
        return this.title
          .split(" ")
          .map((x) => x[0])
          .splice(0, 2)
          .join("")
      return "Ф"
    },
    getRangomHex() {
      // return "#" + ((Math.random() * 256 ** 3) ^ 0).toString(16).padStart(6, 0)
      return this.colors[Math.floor(Math.random() * this.colors.length)]
    },
    getAvatarByCode() {
      if (this.gender === "female" || this.gender === "200")
        return this.avatarFemale
      if (this.gender === "male" || this.gender === "300")
        return this.avatarMale
      if (this.gender === "user") return this.user
      return false
    },
  },
}
</script>
