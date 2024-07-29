<template>
  <!-- <div>
    {{ generateItems }} -->
  <v-data-table
    ref="excel-table"
    class="px-0"
    :headers="generateHeaders"
    :items="generateItems"
    hide-default-footer
    hide-default-header
    :no-data-text="$localize('there_is_nothing_here_yet')"
  >
    <template #header>
      <thead>
        <tr>
          <td>
            <div v-if="!notPlusItem" class="plus">
              <v-row no-gutters align="center">
                <v-col cols="12" class="d-flex justify-center px-8">
                  <v-tooltip v-if="!add" bottom>
                    <template #activator="{ on, attrs }">
                      <v-btn
                        icon
                        :ripple="false"
                        v-bind="attrs"
                        v-on="on"
                        @click="$emit('addItem')"
                      >
                        <v-icon color="black">mdi-pencil-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ $localize("edit") }}</span>
                  </v-tooltip>
                </v-col>
              </v-row>
            </div>
          </td>
          <td
            v-for="(item, i) in generateHeaders"
            :key="item[itemKey]"
            :class="checkCellClass(null, i)"
          >
            <slot
              name="header-item"
              v-bind="{ ...item, prev: generateHeaders[i - 1] }"
            >
              {{ item[headerTitle] }}
            </slot>
          </td>
          <div v-if="!notPlusHeader" class="plus">
            <v-row no-gutters align="center">
              <v-col cols="12" class="d-flex justify-center px-8">
                <v-tooltip v-if="!add" bottom>
                  <template #activator="{ on, attrs }">
                    <v-btn
                      icon
                      :ripple="false"
                      v-bind="attrs"
                      v-on="on"
                      @click="addColumn"
                    >
                      <v-icon color="black">mdi-plus</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ $localize("add") }}</span>
                </v-tooltip>
                <v-row
                  v-else-if="!noInputHeader"
                  no-gutters
                  align="center"
                  class="flex-nowrap"
                >
                  <v-text-field
                    v-model="addDate"
                    hide-details
                    dense
                    :type="addHeaderType"
                    min="1900-01-01"
                    class="mr-1"
                    small
                    :placeholder="$localize('start_date')"
                    :label="$localize('start_date')"
                  />
                  <v-spacer />
                  <v-tooltip bottom>
                    <template #activator="{ on, attrs }">
                      <v-btn
                        icon
                        :ripple="false"
                        v-bind="attrs"
                        v-on="on"
                        @click="
                          $emit(
                            'addHeader',
                            $moment(addDate).isValid()
                              ? $moment(addDate).toDate()
                              : addDate
                          ),
                            (add = false)
                        "
                      >
                        <v-icon> mdi-content-save-outline </v-icon>
                      </v-btn>
                    </template>
                    <span>{{ $localize("save") }}</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template #activator="{ on, attrs }">
                      <v-btn
                        icon
                        :ripple="false"
                        v-bind="attrs"
                        v-on="on"
                        @click="add = false"
                      >
                        <v-icon> mdi-close </v-icon>
                      </v-btn>
                    </template>
                    <span>{{ $localize("close") }}</span>
                  </v-tooltip>
                </v-row>
              </v-col>
            </v-row>
          </div>
        </tr>
      </thead>
    </template>
    <template #body>
      <tbody>
        <tr
          v-for="(item, i) in generateItems"
          :id="item[itemKey]"
          :key="item[itemKey]"
          :class="{ spacer: item.type === 'spacer' }"
        >
          <td :class="checkCellClass(i)">
            <slot
              name="item-title"
              v-bind="item"
              style="padding: 1rem 2.5rem !important"
            >
              {{ item[itemTitle] }}
            </slot>
          </td>
          <td
            v-for="(head, key) in generateHeaders"
            :id="item[itemKey] + '__' + head.value"
            :key="item[itemKey] + '__' + head.value"
            :class="checkCellClass(i, key)"
            class="item-value"
            @click="focusCell(i, key)"
            @mousedown="activeMoveStatus(item, head)"
            @mouseenter="checkMoveStatus(item, head)"
          >
            <!-- <v-lazy
              v-if="checkPosition(i, key)"
              class="d-flex align-center justify-center h-full w-full"
            > -->
            <slot name="item-value" v-bind="{ item, head }">
              {{ item[itemValue] }}
            </slot>
            <!-- </v-lazy> -->
          </td>
          <td :class="checkCellClass(i)"></td>
        </tr>
      </tbody>
    </template>

    <!-- <template #item="props">
      <tr :id="props.item[itemTitle]">
        <td v-for="head in props.headers" :key="head.value">
          <span v-if="head.value === itemTitle">
            {{ props.item[head.value] }}
          </span>
          <div
            v-else
            :id="props.item[itemTitle] + '-' + head.value"
            :class="{
              'active-row': props.item[head.value],
            }"
            @click="changeStatus(props.item, head.value)"
            @mousedown="(e) => moveStatus(e, props.item, head.value)"
          ></div>
        </td>
      </tr>
    </template> -->
  </v-data-table>
  <!-- </div> -->
</template>

<script>
export default {
  name: "TimeTableEditor",
  props: {
    itemTitle: {
      type: String,
      default: "title",
    },
    headerTitle: {
      type: String,
      default: "title",
    },
    itemValue: {
      type: String,
      default: "value",
    },
    itemKey: {
      type: String,
      default: "uid",
    },
    itemTasks: {
      type: String,
      default: "tasks",
    },
    taskValue: {
      type: String,
      default: "value",
    },
    taskDeleted: {
      type: String,
      default: "deleted",
    },
    startDate: {
      type: String,
      default: "s_date",
    },
    addHeaderType: {
      type: String,
      default: "date",
    },
    notPlusHeader: {
      type: Boolean,
      default: false,
    },
    notPlusItem: {
      type: Boolean,
      default: true,
    },
    notNullTasks: {
      type: Boolean,
      default: false,
    },
    notCopyValue: {
      type: Boolean,
      default: false,
    },
    withTime: {
      type: Boolean,
      default: false,
    },
    noInputHeader: {
      type: Boolean,
      default: false,
    },
    fullItems: {
      type: Boolean,
      default: false,
    },
    start: {
      type: Date,
      default: null,
    },
    end: {
      type: Date,
      default: null,
    },
    interval: {
      type: [Number, String],
      default: "1",
    },
    intervalType: {
      type: String,
      default: "day",
    },
    items: {
      type: Array,
      default: () => [],
    },
    headers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      add: false,
      addDate: new Date(),
      localItems: JSON.parse(JSON.stringify(this.items)),
      headIndex: -1,
      itemIndex: -1,
      position: {
        start: {
          col: 0,
          row: 0,
        },
        end: {
          col: 8,
          row: 12,
        },
      },
      move: {
        row: null,
        target: null,
        inter: null,
      },
    }
  },
  computed: {
    valueFormat() {
      return this.withTime ? "YYYY/MM/DD/HH/mm" : "YYYY/MM/DD"
    },
    generateHeaders() {
      let end = [
        // {
        //   text: "",
        //   sortable: false,
        //   value: this.itemTitle,
        // },
      ]
      if (this.start && this.end) {
        end = [
          {
            text: this.$moment(this.start).format("DD.MM.YYYY"),
            sortable: false,
            value: this.$moment(this.start).format(this.valueFormat),
            [this.startDate]: this.start,
          },
        ]
        let inter = 0
        while (
          !this.$moment(this.end).isSameOrBefore(
            end[end.length - 1][this.startDate]
          ) &&
          inter < 90
        ) {
          let value = this.$moment(end[end.length - 1][this.startDate])
            .add(this.interval, this.intervalType)
            .toDate()
          end.push({
            text: this.$moment(value).format("DD.MM.YYYY"),
            sortable: false,
            value: this.$moment(value).format(this.valueFormat),
            [this.startDate]: value,
          })
          inter++
        }
      }
      // else {
      let tasks = this.items.reduce(
        (pre, item) => pre.concat(item[this.itemTasks]),
        []
      )
      let allCurrentDate = tasks.every(
        (x) =>
          this.$moment(x[this.startDate]).format("DD.MM.YYYY") ===
          this.$moment(tasks[0][this.startDate]).format("DD.MM.YYYY")
      )
      for (let x of tasks) {
        let value = this.$moment(x[this.startDate]).format(this.valueFormat)
        if (!end.find((x) => x.value === value))
          end.push({
            text: this.$moment(x[this.startDate]).format(
              allCurrentDate ? "HH:mm" : "DD.MM.YYYY"
            ),
            sortable: false,
            value,
            [this.startDate]: new Date(x[this.startDate]),
          })
      }
      // }
      for (let x of this.headers) {
        let value = this.$moment(x[this.startDate]).format(this.valueFormat)
        if (!end.find((y) => y.value === value))
          end.push({
            text: this.$moment(x[this.startDate]).format("DD.MM.YYYY"),
            sortable: false,
            value,
            [this.startDate]: x[this.startDate],
          })
      }
      end = end.sort(
        (a, b) => a[this.startDate].valueOf() - b[this.startDate].valueOf()
      )
      this.$emit("updateHeaders", end)
      return end
    },
    generateItems() {
      let end = this.localItems.map((x) => {
        let res = {
          [this.itemTitle]: x[this.itemTitle],
          [this.itemKey]: x[this.itemKey],
        }
        if (this.fullItems) {
          res = {
            ...x,
            [this.itemTitle]: x[this.itemTitle],
            [this.itemKey]: x[this.itemKey],
          }
          delete res[this.itemTasks]
        }
        for (let i = 0; i < this.generateHeaders.length; i++) {
          let find = x[this.itemTasks].filter(
            (y) =>
              this.$moment(y[this.startDate]).format(this.valueFormat) ===
                this.generateHeaders[i].value && !y[this.taskDeleted]
          )
          if (find.length) {
            res[this.generateHeaders[i].value] = find
          } else {
            res[this.generateHeaders[i].value] = this.notNullTasks
              ? JSON.parse(
                  JSON.stringify([
                    {
                      [this.taskValue]: null,
                      [this.startDate]: this.generateHeaders[i][this.startDate],
                      [this.itemKey]: this._uid++,
                      entry_uid: x[this.itemKey],
                    },
                  ])
                )
              : null
          }
        }
        return res
      })
      return end
    },
  },
  watch: {
    items: {
      handler(newData) {
        this.localItems = JSON.parse(JSON.stringify(newData))
      },
      deep: true,
    },
    generateItems: {
      deep: true,
      handler(newData) {
        this.$emit("updateItems", newData)
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      let table = this.$refs["excel-table"].$el.children[0]
      console.log()
      table.onscroll = () => {
        let width =
          table.children[0].children[2].children[0].children.length > 1
            ? table.children[0].children[2].children[0].children[1].clientWidth
            : 60
        let height =
          table.children[0].children[2].children[0].children.length > 1
            ? table.children[0].children[2].children[0].children[1].clientHeight
            : 71
        this.position.start.row = Math.floor(table.scrollTop / height) - 2
        this.position.end.row =
          Math.floor((table.clientHeight + table.scrollTop) / height) + 2
        this.position.start.col = Math.floor(table.scrollLeft / width) - 2
        this.position.end.col =
          Math.floor((table.clientWidth + table.scrollLeft) / width) + 2
      }
    })
  },
  methods: {
    addColumn() {
      if (this.noInputHeader) return this.$emit("addHeader")
      this.add = true
      this.addDate = this.$moment(
        this.generateHeaders[this.generateHeaders.length - 1][this.startDate]
      )
        .add(1, "day")
        .format("YYYY-MM-DD")
    },
    activeMoveStatus(item, head) {
      if (this.notCopyValue) return
      if (this.move.inter) {
        clearTimeout(this.move.inter)
        this.move.row = item[this.itemKey]
        this.move.target = item[head.value]
        const clear = (e) => {
          e.preventDefault()
          e.stopPropagation()
          this.move.row = null
          this.move.target = null
          this.move.inter = null
          window.removeEventListener("mouseup", clear)
        }
        window.addEventListener("mouseup", clear)
      } else
        this.move.inter = setTimeout(() => {
          clearTimeout(this.move.inter)
          this.move.inter = null
        }, 300)
    },
    checkMoveStatus(item, head) {
      if (this.notCopyValue) return
      if (this.move.row && this.move.row == item[this.itemKey]) {
        // item[head.value][this.itemValue] = this.move.target[0][this.itemValue]
        this.$emit("updateItem", { item, head, target: this.move.target[0] })
      }
    },
    checkPositionRow(row) {
      return row >= this.position.start.row && row <= this.position.end.row
    },
    checkPosition(row, col) {
      return (
        row >= this.position.start.row &&
        row <= this.position.end.row &&
        col >= this.position.start.col &&
        col <= this.position.end.col
      )
    },
    focusCell(itemIndex, headIndex) {
      this.itemIndex = itemIndex
      this.headIndex = headIndex
    },
    checkCellClass(itemIndex, headIndex) {
      let data = {
        "active-row": itemIndex === this.itemIndex,
        "active-column": headIndex === this.headIndex,
      }
      return data
    },
  },
}
</script>
