<template>
  <v-form @submit.prevent="send">
    <v-card class="pa-4" rounded="16" elevation="0" max-width="464px">
      <v-card-title>
        {{ $localize("signin") }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-card-subtitle class="pa-0">
              {{ $localize("welcome") }}
            </v-card-subtitle>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="user.username"
              :label="$localize('email')"
              filled
              rounded
              dense
              :error="errorText"
              hide-details
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="user.password"
              :label="$localize('password')"
              :type="showPassword ? 'text' : 'password'"
              filled
              dense
              rounded
              hide-details
              :error="errorText"
              :append-icon="
                showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
              "
              @click:append="showPassword = !showPassword"
            />
          </v-col>
          <v-col v-if="error" cols="12" class="error--text">
            <v-icon size="24" color="error"> mdi-alert-circle-outline </v-icon>
            <span>
              {{ $localize("signin_error") }}
            </span>
          </v-col>
          <!-- <v-col cols="12">
            <router-link to="restore-password">
              {{ $localize("forgot") }}
            </router-link>
          </v-col> -->
          <v-col cols="12">
            <v-btn
              color="primary"
              class="pa-4 mt-4"
              width="100%"
              rounded
              height="auto"
              type="submit"
            >
              {{ $localize("signin_button") }}
            </v-btn>
          </v-col>
          <!-- <v-col cols="12" class="text-center">
            <span>
              {{ $localize("no_acc") }}
            </span>
            <router-link to="registrate">
              {{ $localize("registrate") }}
            </router-link>
          </v-col> -->
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mt-6" rounded="16" elevation="0" max-width="464px">
      <v-card-text>
        <v-row no-gutters align="center">
          <v-btn
            height="36"
            width="36"
            class="mr-4"
            fab
            color="bg"
            elevation="0"
          >
            <v-icon size="20" color="gray"> mdi-alert-circle-outline </v-icon>
          </v-btn>
          <span class="left">
            {{ $localize("questions") }} <br />
            {{ $localize("by_email") }}
            <a style="" href="mailto:support@tkillas.kz»"
              >support@tkillas.kz»</a
            >
          </span>
        </v-row>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
      error: false,
      errorText: false,
      user: {
        username: "",
        password: "",
      },
    }
  },
  watch: {
    user: {
      deep: true,
      handler() {
        this.errorText = false
      },
    },
  },
  methods: {
    async send() {
      this.error = false
      this.errorText = false
      this.$axios
        .post("/auth/signin", this.user)
        .then((res) => {
          if (res && res.data.token) {
            this.$store.dispatch("app/setToken", res.data.token)
            this.$router.push("/")
          } else {
            this.error = true
            this.errorText = true
          }
        })
        .catch(() => {
          this.error = true
          this.errorText = true
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
