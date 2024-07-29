<template>
  <v-dialog
    :value="value"
    width="100%"
    max-width="850"
    transition="scroll-x-reverse-transition"
    scrollable
    @input="(e) => $emit('input', e)"
    @click:outside="$emit('input', false)"
  >
    <v-card color="bg">
      <v-card-title>
        {{ $localize("add_user") }}
        <v-spacer />
        <v-tooltip bottom center>
          <template #activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              class="d-none d-md-flex"
              icon
              v-on="on"
              @click="$emit('input', false)"
            >
              <v-icon color="black"> mdi-close </v-icon>
            </v-btn>
          </template>
          <span>{{ $localize("close") }}</span>
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        <MasterElement>
          <ScrollShadowElement>
            <v-card>
              <v-card-text>
                <v-row class="my-2">
                  <v-col cols="12" md="9">
                    <v-text-field
                      v-model="request.login"
                      outlined
                      clearable
                      hide-details
                      dense
                      :label="$localize('login')"
                    />
                  </v-col>
                </v-row>
                <v-row class="my-2">
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="request.password"
                      type="password"
                      outlined
                      clearable
                      hide-details
                      dense
                      :label="$localize('password')"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="request.repeatPassword"
                      type="password"
                      outlined
                      clearable
                      hide-details
                      dense
                      :label="$localize('repeat_password')"
                    />
                  </v-col>
                </v-row>
                <v-row class="my-2">
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="request.birthDate"
                      outlined
                      clearable
                      type="date"
                      hide-details
                      dense
                      :label="$localize('birth_date')"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="request.position"
                      outlined
                      clearable
                      hide-details
                      dense
                      :label="$localize('position')"
                    />
                  </v-col>
                </v-row>
                <v-row class="my-2">
                  <v-col cols="12">
                    <v-text-field
                      v-model="request.telegram"
                      outlined
                      clearable
                      hide-details
                      dense
                      :label="$localize('telegram')"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </ScrollShadowElement>
        </MasterElement>
      </v-card-text>
      <v-card-actions class="d-flex flex-wrap">
        <v-row class="ma-0">
          <v-spacer />
          <v-btn
            class="mr-2"
            color="gray_3"
            text
            @click="$emit('input', false)"
          >
            {{ $localize("cancel") }}
          </v-btn>
          <v-btn color="primary" :disabled="!valid" @click="save">
            {{ $localize("save") }}
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CreateDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      request: {
        login: "",
        password: "",
        repeatPassword: "",
        birthDate: "",
        position: "",
        telegram: "",
      },
      rules: {
        required: (value) => !!value || this.$localize("required"),
      },
    }
  },
  computed: {
    valid() {
      return (
        !!this.request.login &&
        !!this.request.password &&
        this.request.password === this.request.repeatPassword
      )
    },
  },
  methods: {
    async save() {
      let data = JSON.parse(JSON.stringify(this.request))
      data.items = this.items
      //   let res = await this.$fetch.post("/user/create", data)
      //   if (res && res.success) {
      this.$store.dispatch("setAlert", {
        type: "success",
      })
      this.$emit("input", false)
      //   this.$emit("map", res.content, true)
      //   }
    },
  },
}
</script>
