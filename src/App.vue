<template>
  <div id="app" class="v-application">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import AuthLayout from "@/layouts/AuthLayout"
import MainLayout from "@/layouts/MainLayout"
import ErrorLayout from "@/layouts/ErrorLayout"
import EmptyLayout from "@/layouts/EmptyLayout"
import ctx from "@/store"
export default {
  components: {
    AuthLayout,
    MainLayout,
    ErrorLayout,
    EmptyLayout,
  },
  computed: {
    layout() {
      if (this.$route.name === "error") return "error-layout"
      if (this.$route.meta.isLogin) return "auth-layout"
      return "main-layout"
    },
  },
  created() {
    ctx.dispatch("init")
    // if (
    //   (!localStorage.getItem("token") ||
    //     localStorage.getItem("token") === "null") &&
    //   !this.$route.meta.isLogin
    // )
    //   this.$router.push("/login")
    // else this.$store.dispatch("app/setToken", localStorage.getItem("token"))
  },
}
</script>
<style lang="scss">
@import "assets";
</style>
