<template>
  <v-card
    max-width="450"
    class="mx-auto my-lg-16 my-md-12 my-8"
    :loading="isLoading"
  >
    <v-list-item>
      <v-list-item-content class="mt-lg-10 mt-md-8 mt-4 mb-4 px-2">
        <v-list-item-title class="headline">
          {{ $t("login.title") }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ $t("login.subtitle") }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-form class="pb-5" v-model="valid" ref="login">
      <v-container class="px-4">
        <v-text-field
          class="my-1"
          :append-icon="mdiAccountCircleOutline"
          :label="$t('form.username')"
          v-model="username"
          :rules="ruleUsername"
          clearable
          outlined
          required
        ></v-text-field>
        <v-text-field
          class="my-1"
          :label="$t('form.password')"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? mdiEye : mdiEyeOff"
          v-model="password"
          :rules="rulePassword"
          clearable
          outlined
          required
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <div class="my-lg-5 my-md-3 my-2 text-center">
          <v-btn color="secondary" class="mr-4" @click="goRegister">
            {{ $t("register.button") }}
          </v-btn>

          <v-btn color="success" class="mr-4" @click="login">
            {{ $t("login.button") }}
          </v-btn>
        </div>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { mdiAccountCircleOutline, mdiEye, mdiEyeOff, mdiEmailOutline } from "@mdi/js";
import verifyObj from "@/utils/verify";

export default {
  name: "LoginForm",
  data() {
    return {
      ruleUsername: verifyObj.ruleUsername,
      rulePassword: verifyObj.rulePassword,
      mdiAccountCircleOutline,
      mdiEye,
      mdiEyeOff,

      isLoading: false,
      valid: false,
      showPassword: false,

      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (this.$refs.login.validate()) {
        this.isLoading = true;
        this.axios
          .post("/login", { params: { username: this.username, password: this.password} })
          .then((reponse) => {
            this.$store.dispatch("user/login", {
              data: reponse.data.user,
              success: () => {
                this.$notify({
                  title: this.$t('notify.login.success'),
                  type: "success"
                });
                this.goHome();
              },
              logined:() => {
                this.$notify({
                  title: this.$t('notify.login.logined'),
                  type: "warning"
                });
              }
            })
          })
          .catch((error) => {

          })
          .finally(() => {
            this.isLoading = false;
          });
      } else {
        this.$notify({
          title: this.$t('notify.verify'),
          type: "warning"
        });
      }
    },
    goRegister() {
      (this.$route.path !== "/register") && this.$router.push("/register");
    },
    goHome() {
      (this.$route.path !== "/home") && this.$router.push("/");
    }
  }
};
</script>

<style scoped></style>
