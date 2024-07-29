<template>
  <v-card ref="date" class="rounded t-0">
    <div class="main w-100 d-flex flex-column align-center">
      <!-- <div
        class="header mb-4 w-100 d-flex align-center"
        :class="body === 1 ? ' justify-space-between' : 'justify-center'"
      >
        <svg
          v-if="body === 1"
          class="next"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          @click="
            getDays(new Date(date.setDate(1)).setMonth(date.getMonth() - 1))
          "
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.7807 12.3753L7.28067 8.00031L10.7807 3.62531C11.004 3.34629 11.0614 2.96933 10.9314 2.63645C10.8014 2.30356 10.5037 2.06531 10.1504 2.01145C9.79715 1.95758 9.44196 2.09629 9.21867 2.37531L5.21867 7.37531C4.92617 7.74065 4.92617 8.25998 5.21867 8.62531L9.21867 13.6253C9.56385 14.0566 10.1933 14.1265 10.6247 13.7813C11.056 13.4361 11.1258 12.8066 10.7807 12.3753Z"
            fill="inherit"
          />
        </svg>
        <div class="title flex row text-gray-700">
          <span class="hover:text-gray-500 mr-1" @click="changeBody(2)">{{
            $moment(date).format("MMMM")
          }}</span>
          <span class="hover:text-gray-500" @click="changeBody(3)">{{
            $moment(date).format("YYYY")
          }}</span>
        </div>
        <svg
          v-if="body === 1"
          class="next"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          @click="
            getDays(new Date(date.setDate(1)).setMonth(date.getMonth() + 1))
          "
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.7807 12.3753L7.28067 8.00031L10.7807 3.62531C11.004 3.34629 11.0614 2.96933 10.9314 2.63645C10.8014 2.30356 10.5037 2.06531 10.1504 2.01145C9.79715 1.95758 9.44196 2.09629 9.21867 2.37531L5.21867 7.37531C4.92617 7.74065 4.92617 8.25998 5.21867 8.62531L9.21867 13.6253C9.56385 14.0566 10.1933 14.1265 10.6247 13.7813C11.056 13.4361 11.1258 12.8066 10.7807 12.3753Z"
            fill="inherit"
          />
        </svg>
      </div> -->
      <v-col
        v-show="body === 1"
        class="body pa-0 d-flex flex-wrap justify-space-between"
      >
        <v-col
          class="d-flex flex-column px-2 px-sm-5 align-center"
          sm="6"
          cols="12"
        >
          <div class="d-flex">
            <div v-for="day in 7" :key="day" class="cell week">
              {{ $moment(getDate(day + 3)).format("dd") }}
            </div>
          </div>
          <div
            v-for="(i, index) in days.length / 7"
            :key="index"
            class="d-flex"
          >
            <div
              v-for="(j, index2) in 7"
              :key="index2"
              class="cell"
              @click="changeActivity(getDayByWeek(i, j))"
            >
              <div
                class="cell-item"
                :class="{
                  other:
                    days[getDayByWeek(i, j)].month ||
                    days[getDayByWeek(i, j)].disabled,
                  now: days[getDayByWeek(i, j)].now,
                  back:
                    new Date(prevent).valueOf() === days[getDayByWeek(i, j)].dt,
                  activ:
                    (value || activity) &&
                    days[getDayByWeek(i, j)].dt ==
                      (value
                        ? new Date(value).setHours(0, 0, 0, 0).valueOf()
                        : activity.dt),
                }"
              >
                {{ days[getDayByWeek(i, j)].day }}
              </div>
            </div>
          </div>
        </v-col>
        <v-divider vertical class="d-none d-sm-block" />
        <v-col class="d-flex flex-column p-0" sm="6" cols="12">
          <v-autocomplete
            v-model="month"
            :items="months"
            item-text="name"
            item-value="value"
            label="Месяц"
            class="d-flex align-center px-5"
          />
          <v-divider />
          <v-autocomplete
            v-model="year"
            :items="years"
            label="Год"
            class="d-flex align-center px-5"
          />
        </v-col>
      </v-col>

      <!-- <div v-show="body === 2" class="body w-100 d-flex flex-column">
        <div class="d-flex h-48 flex-column flex-wrap" @wheel="changeMonthList">
          <div
            v-for="i in 12"
            :key="i"
            class="d-flex px-8 justify-center align-center w-1/2 h-1/6"
          >
            <span
              class="w-100 text-center text-gray-500"
              :class="{ 'text-gray-700': i - 1 === date.getMonth() }"
              @click="changeHeader(i - 1)"
              >{{ $moment(oldDate.setMonth(i - 1)).format("MMMM") }}</span
            >
          </div>
        </div>
      </div>

      <div v-show="body === 3" class="body w-100 d-flex flex-column">
        <div class="d-flex h-48 flex-column overflow-auto" @wheel="changeYearsList">
          <div
            v-for="i in 5"
            :key="i"
            class="d-flex px-8 justify-center align-center w-1/2 h-1/5"
          >
            <span
              class="w-100 w-100 text-center text-gray-500 hover:text-gray-700"
              :class="{ 'text-gray-700 text-xl': i === 3 }"
              @click="changeHeader(date.getFullYear() + (i - 3), true)"
            >
              {{
                $moment(
                  oldDate.setFullYear(date.getFullYear() + (i - 3))
                ).format("YYYY")
              }}
            </span>
          </div>
        </div>
      </div> -->
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    value: {
      type: [Date, String, Object],
      default: new Date(),
    },
    prevent: {
      type: [Date, String],
      default: null,
    },
    min: {
      type: [Date, String],
      default: null,
    },
    max: {
      type: [Date, String],
      default: null,
    },
    weekends: {
      type: Boolean,
      default: false,
    },
  },
  name: "VDateSelect",
  data() {
    return {
      body: 1,
      oldDate: new Date(),
      date: this.value ? this.value : new Date(),
      days: [],
      activity: null,
      year: null,
      years: [],
      month: null,
      months: [
        {
          value: 0,
          name: "Январь",
        },
        {
          value: 1,
          name: "Февраль",
        },
        {
          value: 2,
          name: "Март",
        },
        {
          value: 3,
          name: "Апрель",
        },
        {
          value: 4,
          name: "Май",
        },
        {
          value: 5,
          name: "Июнь",
        },
        {
          value: 6,
          name: "Июль",
        },
        {
          value: 7,
          name: "Август",
        },
        {
          value: 8,
          name: "Сентябрь",
        },
        {
          value: 9,
          name: "Октябрь",
        },
        {
          value: 10,
          name: "Ноябрь",
        },
        {
          value: 11,
          name: "Декабрь",
        },
      ],
    }
  },
  watch: {
    year(newData) {
      if (newData && newData !== this.date.getFullYear()) {
        this.date = this.date.setFullYear(newData)
        this.getDays(this.date)
        this.changeActivity(this.days.findIndex((x) => !x.month))
      }
    },
    month(newData) {
      if (
        newData !== undefined &&
        newData !== null &&
        newData !== this.date.getMonth()
      ) {
        this.date = this.date.setMonth(newData)
        this.getDays(this.date)
        this.changeActivity(this.days.findIndex((x) => !x.month))
      }
    },
    value: {
      handler(newData) {
        if (newData) {
          this.date = new Date(newData)
          this.getDays(this.date)
          this.year = newData.getFullYear()
          this.month = newData.getMonth()
        } else this.date = new Date()
      },
    },
  },
  async created() {
    let year = 1899
    while (!this.years.find((x) => x == new Date().getFullYear()))
      this.years.unshift(year++)

    this.month = this.months.find(
      (x) => x.value == new Date(this.date).getMonth()
    ).value
    this.year = new Date(this.date).getFullYear()

    let date = this.date ? new Date(this.date) : new Date()
    this.getDays(date)
    this.$nextTick(function () {
      let position
      this.$refs["date"].ontouchstart = (e) => {
        position = e.targetTouches[0].clientY
      }
      this.$refs["date"].ontouchmove = (e) => {
        e.preventDefault()
        if (e.targetTouches[0].clientY <= position - 20) {
          position = e.targetTouches[0].clientY
          if (this.body === 3)
            this.changeYearsList({
              preventDefault: () => {},
              wheelDeltaY: -1,
            })
        } else if (e.targetTouches[0].clientY >= position + 20) {
          position = e.targetTouches[0].clientY
          if (this.body === 3)
            this.changeYearsList({ preventDefault: () => {}, wheelDeltaY: 1 })
        }
      }
    })
  },
  methods: {
    getDate(day) {
      let result = new Date(new Date().setTime(0))
      result = new Date(result).setDate(result.getDate() + day)
      return result
    },
    keyEnter(e) {
      if (this.body === 2) {
        if (e.keyCode === 13) this.changeHeader(this.date.getMonth())
        else if (e.keyCode === 38) this.date.setMonth(this.date.getMonth() - 1)
        else if (e.keyCode === 40) this.date.setMonth(this.date.getMonth() + 1)
      } else {
        if (e.keyCode === 13)
          this.changeHeader(
            new Date(
              this.oldDate.setFullYear(this.date.getFullYear())
            ).getFullYear(),
            true
          )
        else if (e.keyCode === 38)
          this.date.setFullYear(this.date.getFullYear() - 1)
        else if (e.keyCode === 40)
          this.date.setFullYear(this.date.getFullYear() + 1)
      }
      this.oldDate = new Date(JSON.parse(JSON.stringify(this.date)))
    },
    changeMonthList(e) {
      e.preventDefault()
      this.date.setMonth(this.date.getMonth() + (e.wheelDeltaY < 0 ? 1 : -1))
      this.oldDate = new Date(JSON.parse(JSON.stringify(this.date)))
    },
    changeYearsList(e) {
      e.preventDefault()
      this.date.setFullYear(
        this.date.getFullYear() + (e.wheelDeltaY < 0 ? 1 : -1)
      )
      this.oldDate = new Date(JSON.parse(JSON.stringify(this.date)))
    },
    changeBody(type) {
      this.oldDate = new Date(JSON.parse(JSON.stringify(this.date)))
      this.body = type
      if (type == 1) {
        document.removeEventListener("keydown", this.keyEnter)
      } else {
        document.removeEventListener("keydown", this.keyEnter)
        document.addEventListener("keydown", this.keyEnter)
      }
    },
    getDayByWeek(week, day) {
      return day - 1 + 7 * (week - 1)
    },
    changeActivity(i) {
      if (!this.days[i].disabled) {
        this.activity = {
          index: i,
          dt: this.days[i].dt,
        }
        this.setData()
      }
    },
    changeHeader(index, year) {
      this.date = this.date[year ? "setFullYear" : "setMonth"](index)
      this.getDays(this.date)
    },
    getDays(date1) {
      this.changeBody(1)
      let end = []
      this.date = new Date(date1)
      let date = new Date(date1)
      let first = new Date(date.setDate(1))
      let pre = []
      // this.activity = null
      while (first.getDay() !== 1) {
        first = new Date(first.setDate(first.getDate() - 1))
        let dis = false
        if (this.weekends) dis = first.getDay() > 5 || !first.getDay()
        if (this.min && !dis)
          dis =
            first.setHours(0, 0, 0, 0).valueOf() <
            this.min.setHours(0, 0, 0, 0).valueOf()
        if (this.max && !dis)
          dis =
            first.setHours(0, 0, 0, 0).valueOf() >
            this.max.setHours(0, 0, 0, 0).valueOf()
        pre.push({
          dt: first.setHours(0, 0, 0, 0).valueOf(),
          day: first.getDate(),
          month: -1,
          disabled: dis,
        })
      }
      for (let i = pre.length - 1; i >= 0; i--) end.push(pre[i])

      first = new Date(date.setDate(1))
      while (first.getMonth() === date.getMonth()) {
        let dis = false
        if (this.weekends) dis = first.getDay() > 5 || !first.getDay()
        if (this.min && !dis)
          dis =
            first.setHours(0, 0, 0, 0).valueOf() <
            this.min.setHours(0, 0, 0, 0).valueOf()
        if (this.max && !dis)
          dis =
            first.setHours(0, 0, 0, 0).valueOf() >
            this.max.setHours(0, 0, 0, 0).valueOf()
        end.push({
          dt: first.setHours(0, 0, 0, 0).valueOf(),
          day: first.getDate(),
          month: 0,
          disabled: dis,
          now: this.checkNow(first, new Date()),
        })
        first = new Date(first.setDate(first.getDate() + 1))
      }

      while (first.getDay() !== 1) {
        let dis = false
        if (this.weekends) dis = first.getDay() > 5 || !first.getDay()
        if (this.min && !dis)
          dis =
            first.setHours(0, 0, 0, 0).valueOf() <
            this.min.setHours(0, 0, 0, 0).valueOf()
        if (this.max && !dis)
          dis =
            first.setHours(0, 0, 0, 0).valueOf() >
            this.max.setHours(0, 0, 0, 0).valueOf()
        end.push({
          dt: first.setHours(0, 0, 0, 0).valueOf(),
          day: first.getDate(),
          month: 1,
          disabled: dis,
        })
        first = new Date(first.setDate(first.getDate() + 1))
      }
      this.days = end
    },
    checkNow(first, second) {
      let end = false
      if (first.getFullYear() === second.getFullYear())
        if (first.getMonth() === second.getMonth())
          if (first.getDate() === second.getDate()) end = true
      return end
    },
    setData() {
      this.$emit("input", new Date(this.activity.dt))
    },
    checkInp(type) {
      this.focus = type
    },
  },
}
</script>

<style lang="scss" scoped>
.rounded {
  border: 1px solid #f0f0f0;
}
.title > * {
  display: block;
  cursor: pointer;
  &:hover {
    color: var(--v-primary-base);
  }
  &:first-letter {
    text-transform: uppercase;
  }
}
.text-gray-500 {
  color: #666666;
  &:hover {
    color: var(--v-primary-base);
  }
  &.text-gray-700 {
    color: var(--v-primary-base);
  }
}
.header {
  margin-top: unset;
  width: 100%;
  justify-content: space-between;
  & > div {
    color: #000000;
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    width: auto;
    align-items: flex-start;
    display: block;
    &:first-letter {
      text-transform: uppercase;
    }
  }
  & .next {
    min-height: 32px;
    max-height: 32px;
    min-width: 32px;
    max-width: 32px;
    margin: 0 10px;
    border-radius: 50%;
    background-color: #fff;
    fill: #1f2d3d;
    cursor: pointer;
    &:last-child {
      transform: rotate(180deg);
    }
    &:hover {
      background-color: var(--v-primary-base);
      fill: #ffffff;
    }
  }
}
.body {
  & > .row {
    margin: unset;
    // max-width: calc(68px * 7);
    justify-content: space-between;
  }
}
.cell {
  color: #000000;
  min-height: 32px;
  max-height: 32px;
  min-width: 32px;
  max-width: 32px;
  margin: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  &-item {
    min-height: 32px;
    max-height: 32px;
    min-width: 32px;
    max-width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background-color: #dadada;
    }
    &.week {
      background-color: transparent;
      border-color: transparent;
      cursor: default;
    }
    &.other {
      opacity: 0.25;
    }
    &.now {
      color: var(--v-primary-base);
      border-color: var(--v-primary-base);
    }
    &.activ {
      opacity: 1;
      color: #fff;
      background-color: var(--v-primary-base);
      border-color: var(--v-primary-base);
    }
  }
}
@media (max-width: 768px) {
  .d-flex {
    width: 100%;
  }
  .cell {
    max-width: unset;
    flex: 1 1 auto;
    min-height: 32px;
    max-height: unset;
    min-width: 32px;
    // max-width: 32px;
    margin: 5px 2px;
  }
}
</style>
