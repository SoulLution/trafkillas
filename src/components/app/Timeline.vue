<template>
  <v-row id="tl" class="ma-0">
    <v-row class="tl-body flex-wrap-nowrap ma-0 relative" align="center">
      <v-row id="tl-group" ref="tl-group" class="tl-group">
        <div class="tl-item align-start">
          <v-tooltip
            bottom
            nudge-right="0"
            transition="slide-y-transition"
            content-class="tl-tooltip-con"
          >
            <template #activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                <div class="tl-item-circle color-default active"></div>
              </div>
            </template>
          </v-tooltip>
          <div class="tl-tooltip-card mx-0 d-flex color-default">
            <div class="tl-text">
              <v-card-title class="pa-4 pb-0 ma-0" primary-title>
                <span>{{ "Тип не указан" }}</span>
              </v-card-title>
              <v-divider />
              <v-card-text class="d-flex flex-column">
                <span>Всего дней:</span>
              </v-card-text>
            </div>
          </div>
        </div>
        <!-- <v-spacer /> -->
        <!-- <div class="tl-end-line"></div> -->
        <!-- <v-spacer style="max-width: 50px" /> -->
      </v-row>
      <div class="tl-line"></div>
    </v-row>
  </v-row>
</template>

<script>
export default {
  name: "Timeline",
  data: () => ({
    uid: undefined,
    loader: false,
    items: undefined,
    isDetail: false,
    tlEnum: [
      {
        type: "TREATMENT_COURSES",
        text: "Госпитализация - форма 012/у",
        link: "treatment-courses",
      },
      {
        type: "PATIENT_ACCOUNT",
        text: "Постановление на диспансерное наблюдение - форма 30/у",
      },
      {
        type: "CANCER",
        text: "Извещение - форма 034/у",
        link: "cancer-notice",
      },
    ],
  }),
  watch: {
    uid(val) {
      if (val) {
        this.fetchItems(val)
      }
    },
  },
  mounted() {
    this.uid = this.$route.params.uid
    this.$nextTick(() => {
      let tl = document.getElementById("tl"),
        group = document.getElementById("tl-group")
      tl.addEventListener("wheel", (e) => {
        if (window.innerWidth && window.innerWidth > 960) {
          let scroll = -90
          if (e.deltaY > 0) scroll = 90
          group.scrollTo({
            left: group.scrollLeft + scroll,
            behavior: "smooth",
          })
        }
      })
    })
  },
  methods: {
    async fetchItems(uid) {
      this.loader = true
      const res = await this.$fetch.get("/api/profile/get-timeline?uid=" + uid)
      if (res && res.length > 0) this.items = res
      this.loader = true
    },
    getDaysName(days) {
      let res = "дней"
      let day = days + ""
      if (days != 11 || days != 12 || days != 13 || days != 14)
        switch (day[day.length - 1]) {
          case "1":
            {
              res = "день"
            }
            break
          case "2":
            {
              res = "дня"
            }
            break
          case "3":
            {
              res = "дня"
            }
            break
          case "4":
            {
              res = "дня"
            }
            break
        }
      return res
    },
    checkByType(type) {
      let index = this.tlEnum.findIndex((r) => r.type === type)
      return index
    },
  },
}
</script>

<style scoped lang="scss">
#tl {
  overflow: hidden;
  min-width: 0;
  height: 56px;
}
.relative {
  position: relative;
}
.tl-item-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  min-width: calc(22px + 4rem);
  min-height: calc(22px + 4rem);
  max-width: calc(22px + 4rem);
  max-height: calc(22px + 4rem);
  border-radius: 100%;
  border-style: solid;
  border-width: 2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  // &.active
  &:hover,
  &.active {
    & > * {
      color: white !important;
    }
  }
  &.color-default {
    border-color: white;
    // border: none;
    background-color: #f3f3f3;
    &.active {
      background-color: var(--v-primary-base);
    }
  }
  &.color-0 {
    border-color: #00b050;
    &:hover {
      background-color: #00b050;
    }
  }
  &.color-1 {
    border-color: #5887ff;
    &:hover {
      background-color: #5887ff;
    }
  }
  &.color-2 {
    border-color: #ff5252;
    &:hover {
      background-color: #ff5252;
    }
  }
}
.tl-line {
  z-index: 1;
  position: absolute;
  top: 32px;
  left: 0px;
  width: 100%;
  border-bottom: solid 2px #aaa;
  border-radius: 0;
}
.icon {
  position: absolute;
  top: 2px;
  right: 4px;
  z-index: 2;
  border-radius: 50%;
  i {
    background: #fff;
    border-radius: 50%;
  }
}
.tl-end-line {
  z-index: 2;
  width: 100%;
  right: 48px;
  margin: 0;
  min-width: 38px;
  max-width: 38px;
  height: 34px;
  background: white;
  border-bottom: dashed 2px #aaa;
  border-radius: 0;
}
.tl-group {
  height: 56px;
  display: flex;
  overflow-y: hidden;
  overflow-x: auto;
  margin: 0 !important;
  padding-right: 0 !important;
  width: 100%;
  flex-wrap: nowrap;
  .tl-item {
    z-index: 2;
    width: 100%;
    top: 20px;
    position: relative;
    margin: 0 32px;
    min-width: 24px;
    max-width: 24px;
    height: 24px;
    border-radius: 100%;
    // background: white;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .tl-date {
    position: absolute;
    top: -16px;
    z-index: 1;
    font-size: 12px;
    white-space: nowrap;
  }
}

.tl-tooltip-card {
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%) !important;
  border-style: solid !important;
  border-width: 0 0 0 4px !important;
  opacity: 1;
  background: #fff;
  &.color-0 {
    border-left-color: #00b050 !important;
  }
  &.color-1 {
    border-left-color: #5887ff !important;
  }
  &.color-2 {
    border-left-color: #ff5252 !important;
  }
}

.tl-tooltip-con {
  padding: 0;
  margin: 0;
  z-index: 100;
  &.menuable__content__active:not(.slide-y-transition-enter-active) {
    transition: 0.1s !important;
    opacity: 1 !important;
  }
}

.tl-text {
  display: flex;
  flex-direction: column;

  span {
    color: #212121;
  }
}

@media (min-width: 1px) {
  .tl-group {
    height: 100%;
    flex-direction: column;
    overflow: hidden scroll;
    padding-right: 0;
    margin: 0;
    padding-bottom: 86px;
    width: 90%;
    .tl-item {
      margin: 0 0px 32px -30px;
      max-width: 100%;
      height: auto;
      justify-content: flex-start;
    }
    .tl-date {
      top: unset;
      transform: translate(-25%, -100%);
      font-size: 14px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      &:after {
        content: "";
        z-index: -1;
        position: absolute;
        height: 90%;
        width: 50%;
        background: white;
      }
    }
  }
  #tl {
    height: 100%;
    border-radius: 0 !important;
  }
  .tl-body {
    height: 100%;
  }
  .tl-line {
    top: 24px;
    left: 10px;
    width: auto;
    height: 100%;
    border-bottom: solid 0px #aaa;
    border-left: solid 2px var(--v-primary-base);
    border-radius: 0;
  }
  .tl-tooltip-card {
    box-shadow: none !important;
    border-width: 1px 1px 1px 4px !important;
    border-bottom-color: rgba(0, 0, 0, 0.12);
    border-right-color: rgba(0, 0, 0, 0.12);
    border-top-color: rgba(0, 0, 0, 0.12);
  }
  .icon {
    position: absolute;
    right: 8px;
    top: 8px;
  }
  .tl-end-line {
    min-width: 0px;
    max-width: 0px;
    min-height: 34px;
    max-height: 34px;
    margin-top: 16px;
    margin-left: 37.5px;
    border-bottom: dashed 0px #aaa;
    border-right: dashed 2px #aaa;
  }
}
</style>
