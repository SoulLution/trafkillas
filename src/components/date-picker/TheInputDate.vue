<template>
  <div v-click-outside="closePopup" class="relative">
    <div
      class="imitate d-flex justify-space-between align-center sm:mx-0"
      :class="{ active: popup }"
    >
      <v-icon class="down" :class="{ active: popup }" @click="popup = !popup">
        mdi-menu-down
      </v-icon>
      <!-- :mask="'##.##.####'" -->
      <the-textarea
        v-model="localVisualDate"
        :mask="mask"
        class="name"
        :class="{
          active: localDate,
        }"
        :icon="icon"
        :loading="loading"
        :label="label"
        :placeholder="placeholder ? placeholder : 'Дд.мм.гггг'"
        @focus="openPopup()"
        @blur="checkNull()"
      />
    </div>

    <div v-show="popup" ref="popup" class="popup">
      <div v-if="popup" class="popup-bg" @click="popup = false"></div>
      <the-date-picker
        v-show="popup"
        v-model="localDate"
        :min="min"
        :weekends="weekends"
        :max="max"
      />
    </div>
  </div>
</template>

<script>
function dateMask(value) {
  let len = value.split(".")
  let dd = [
    len[0] && len[0].length > 1 ? /[0-3]/ : /[0-9]/,
    len[0].charAt(0) === "3"
      ? /[0-1]/
      : len[0].charAt(0) === "0"
      ? /[1-9]/
      : /[0-9]/,
  ]
  let mm = [
    ".",
    len[1] && len[1].length > 1 ? /[0-1]/ : /[0-9]/,
    len[1] && len[1].charAt(0) == "1" ? /[0-2]/ : /[1-9]/,
  ]
  let yy = [".", /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]
  if (len.length > 1) dd = dd.splice(0, len[0].length)
  if (len.length > 2) mm = mm.splice(0, len[1].length + 1)
  if (len[2]) yy = yy.splice(0, len[2].length + 1)

  return [...dd, ...mm, ...yy]
  // return value.length > 5
  //   ? [...dd, ".", ...mm, ".", ...yy]
  //   : value.length > 2
  //   ? [...dd, ".", ...mm]
  //   : dd
}
export default {
  props: {
    value: {
      type: [String, Number, Date],
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    visualDate: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    min: {
      type: [Date, String],
      default: null,
    },
    max: {
      type: [Date, String],
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    weekends: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mask: dateMask,
      localDate: this.value,
      localVisualDate: this.visualDate,
      popup: false,
    }
  },
  watch: {
    visualDate: function (newString) {
      if (this.localVisualDate !== newString) this.localVisualDate = newString
    },
    localVisualDate: {
      handler(newData) {
        if (newData.length === 10) {
          let data = newData.split(".")
          this.localDate = new Date(data[2], parseInt(data[1]) - 1, data[0])
        }
      },
    },
    localDate: {
      handler(newData) {
        this.localVisualDate = this.$moment(newData).format("DD.MM.YYYY")
        // this.popup = false
        if (this.$moment(newData).format("DD.MM.YYYY") !== this.value)
          this.$emit("input", newData)
        this.closePopup()
      },
    },
  },
  methods: {
    checkNull() {
      if (!this.localVisualDate) {
        this.localDate = new Date()
        this.$emit("input", this.localDate)
      }
    },
    openPopup() {
      this.$refs.popup.style.transform = "translateY(101%)"
      this.popup = true
      this.$nextTick(() => {
        let html = document.querySelector("html"),
          popup = this.$refs.popup,
          left =
            html.clientWidth -
            popup.clientWidth -
            popup.getBoundingClientRect().left

        let top = "101%"
        if (
          popup.getBoundingClientRect().top + popup.clientHeight >
          html.clientHeight
        )
          top = "-15%"
        popup.style.transform =
          left < 0 ? `translate(${left - 16}px, ${top})` : `translateY(${top})`
      })
    },
    closePopup(e) {
      if (e !== undefined) {
        // if (
        //   !e.path.find(
        //     (x) =>
        //       x.classList &&
        //       x.classList.value ===
        //         "v-menu__content theme--light v-autocomplete__content"
        //   )
        // ) {
        this.popup = false
        // }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.popup {
  position: absolute;
  width: 100vw;
  max-width: 590px;
  bottom: 0;
  background-color: white;
  transform: translateY(101%);
  border-radius: 8px;
  z-index: 3;
}
input.name {
  width: 100%;
  margin-left: -16px;
  padding-left: 16px;
  height: 100%;
  z-index: 0;
  background: transparent;
  border: none;
  outline: none;
  font-size: 15px;
  line-height: 150%;
  &::placeholder {
    color: #979797;
  }
}
@media (max-width: 768px) {
  .popup {
    // display: none !important;
    position: fixed;
    top: 0;
    bottom: 0;
    bottom: unset;
    left: 0rem;
    width: 100vw;
    height: 100vh;
    max-width: none;
    transform: translateY(0%) !important;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent !important;
    z-index: 1000;
    & > label {
      z-index: 1;
      width: calc(100% - 0.5rem);
      background-color: #ffffff !important;
    }
    &-bg {
      content: "";
      position: fixed;
      background-color: #00000056;
      height: 100vh !important;
      width: 100vw !important;
      top: 0;
      left: 0;
      z-index: 0;
    }
  }
}
.relative {
  position: relative;
}
.imitate {
  position: relative;
  z-index: 0;
  background: transparent !important;
}
.down {
  position: absolute;
  right: 0;
  bottom: 8px;
  transition: 0.3s;
  z-index: 11;
  cursor: pointer;
  &.active {
    transform: scaleY(-1);
  }
}
</style>
