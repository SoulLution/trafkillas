<template>
  <v-dialog
    width="100%"
    max-width="500"
    :value="dialog"
    @input="$emit('close')"
  >
    <v-card elevation="0">
      <v-card-title class="text-h5 lighten-2">
        {{ message }}
      </v-card-title>
      <v-card-text class="px-4"> {{ submessage }} </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" text @click="$emit('close')">
          {{ $localize("cancel") }}
        </v-btn>
        <v-btn color="primary" @click="confirm">
          {{ $localize(buttontext) }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmDialog",
  props: {
    message: {
      type: String,
      default: "",
    },
    submessage: {
      type: String,
      default: "",
    },
    buttontext: {
      type: String,
      default: "",
    },
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    confirm() {
      this.$emit("action")
      this.$emit("close")
    },
  },
}
</script>
