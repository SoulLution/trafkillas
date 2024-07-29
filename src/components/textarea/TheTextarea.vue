<template>
  <div class="label-inp" :class="{ icon_active: icon }">
    <div style="color: rgba(0, 0, 0, 0.6); font-size: 12px" class="label">
      {{ label }}
    </div>
    <div v-if="!item" class="placeholder">
      {{ placeholder }}
    </div>
    <textarea
      v-model="item"
      v-mask="mask"
      :readonly="readonly"
      @focus="focus"
      @blur="blur"
      @input="checkHeight"
    ></textarea>
    <div class="pre-span" :class="{ loading }">
      <v-icon v-if="icon" class="icon">{{ icon }}</v-icon>
      {{ item }}
    </div>
    <div
      v-if="loading"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      class="
        v-progress-linear v-progress-linear--absolute v-progress-linear--visible
        theme--light
      "
      style="height: 2px"
    >
      <div
        class="v-progress-linear__background primary"
        style="opacity: 0.3; left: 0%; width: 100%"
      ></div>
      <div class="v-progress-linear__buffer"></div>
      <div
        class="
          v-progress-linear__indeterminate
          v-progress-linear__indeterminate--active
        "
      >
        <div class="v-progress-linear__indeterminate long primary"></div>
        <div class="v-progress-linear__indeterminate short primary"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "TheTextarea",
  props: {
    mask: null,
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      item: this.value,
    }
  },
  computed: {
    ...mapGetters(["styles"]),
  },
  watch: {
    value(newData) {
      if (this.item !== newData) this.item = newData
    },
    item(newData) {
      if (this.value !== newData) this.$emit("input", newData)
    },
  },
  methods: {
    focus(e) {
      this.checkHeight(e)
      this.$emit("focus")
    },
    blur(e) {
      this.checkHeight(e)
      this.$emit("blur")
    },
    checkHeight(e) {
      if (e && e.target && e.target.nextElementSibling) {
        e.target.style.height = e.target.nextElementSibling.clientHeight + "px"
        e.target.style.width = e.target.nextElementSibling.clientWidth + "px"
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.pre-span {
  font-size: 16px;
  padding: 8px 2px;
  min-height: 40px;
  white-space: pre-line;
  position: relative;
  display: flex;
  width: 100%;
  margin-bottom: -1px;
  &::before,
  &::after {
    // content: "";
    position: absolute;
    left: 0;
    width: 100%;
    bottom: -1px;
    height: 0px;
    border-style: solid;
    border-width: thin 0 0 0;
    border-color: rgb(167, 167, 167);
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    background: rgb(167, 167, 167);
  }
  &::after {
    border-width: thin 0 thin 0;
    bottom: -1.5px;
    background-color: var(--v-primary-base);
    border-color: var(--v-primary-base);
    transform: scaleX(0);
  }
  &.loading {
    padding-bottom: 6px;
    &::before,
    &::after {
      opacity: 0;
    }
  }
}

.label-inp {
  width: 100%;
  position: relative;
  & .placeholder {
    position: absolute;
    top: 6px;
    left: 6px;
  }
  & .label {
    position: absolute;
    left: 0;
    top: -6px;
  }
  &.icon_active {
    margin-left: 24px;
    width: calc(100% - 24px);
  }
  &:hover > .pre-span::before {
    border-color: rgba(0, 0, 0, 0.87);
  }
  & .icon {
    position: absolute;
    left: -26px;
  }
  & textarea {
    width: 100%;
    position: absolute;
    padding: 8px 2px;
    font-size: 16px;
    bottom: 0;
    right: 0;
    z-index: 10;
    outline: none;
    resize: none;
    opacity: 0;
    &:focus {
      opacity: 1;
      & + .pre-span {
        color: #00000000;
      }
      & + .pre-span::before {
        border-color: rgba(0, 0, 0, 0.87);
      }
      & + .pre-span::after {
        transform: scaleX(1);
      }
    }
  }
}
</style>
