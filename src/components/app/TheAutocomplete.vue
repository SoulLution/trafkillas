<template>
  <v-autocomplete
    v-model="localValue"
    v-bind="$attrs"
    hide-details
    outlined
    dense
    :clearable="clearable"
    :items="generateItems"
    @update:search-input="changeSearch"
    @input="(e) => $emit('input', e)"
    @change="(e) => $emit('change', e)"
    @blur="(e) => $emit('blur')"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Object],
      default: "",
    },
    items: {
      type: Array,
      default: () => [],
    },
    clearable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      predicate: this.value
        ? JSON.parse(
            JSON.stringify(
              typeof this.value === "object"
                ? this.value[this.$attrs["item-text"]]
                : this.value
            )
          )
        : "",
      localValue: JSON.parse(JSON.stringify(this.value)),
    }
  },
  computed: {
    generateItems() {
      if (!this.value && this.predicate)
        return [].concat(
          {
            [this.$attrs["item-value"]]: this.predicate,
            [this.$attrs["item-text"]]: this.predicate,
          },
          this.items.filter(
            (x) =>
              !this.predicate ||
              ~x[this.$attrs["item-text"]]
                .toLowerCase()
                .indexOf(this.predicate.trim().toLowerCase())
          )
        )
      else if (
        this.items.find((x) => x[this.$attrs["item-value"]] === this.value) ||
        !this.value
      )
        return this.items.filter(
          (x) =>
            !this.predicate ||
            ~x[this.$attrs["item-text"]]
              .toLowerCase()
              .indexOf(this.predicate.trim().toLowerCase())
        )
      else
        return [].concat(
          {
            [this.$attrs["item-value"]]: this.predicate || this.value,
            [this.$attrs["item-text"]]: this.predicate || this.value,
          },
          this.items.filter(
            (x) =>
              !this.predicate ||
              ~x[this.$attrs["item-text"]]
                .toLowerCase()
                .indexOf(this.predicate.trim().toLowerCase())
          )
        )
    },
  },
  watch: {
    value(newData) {
      this.localValue = JSON.parse(JSON.stringify(newData))
    },
  },
  methods: {
    changeSearch(e) {
      this.predicate = e
      if (
        this.predicate &&
        !this.items.filter(
          (x) =>
            ~x[this.$attrs["item-text"]]
              .toLowerCase()
              .indexOf(this.predicate.trim().toLowerCase())
        ).length
      )
        this.$emit("input", e)
    },
  },
}
</script>

<style></style>
