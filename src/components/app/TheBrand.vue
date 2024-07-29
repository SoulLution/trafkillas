<template>
  <v-row class="ma-0 flex-nowrap" align="center" justify="start">
    <img
      src="@/assets/Wight_long_LogoTRAFFKILLAS.png"
      style="height: 20px"
      alt="logo"
    />
  </v-row>
</template>

<script>
export default {
  name: "TheBrand",
  props: {
    colorFirst: {
      type: String,
      default: "white",
    },
    colorSecond: {
      type: String,
      default: "var(--v-primary-base)",
    },
  },
}
</script>

<style lang="scss" scoped>
.text-uppercase {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  height: 22px !important;
  line-height: 10px;
  display: flex;
  align-items: center;
}
</style>
