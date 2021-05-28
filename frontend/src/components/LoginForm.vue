<template>
  <v-card max-width="450" class="mx-auto my-lg-16 my-md-12 my-8">
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
          <v-btn
            color="secondary"
            class="mr-4"
            @click="goRegister"
          >
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

      valid: false,
      showPassword: false,

      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log("login");
      if (this.$refs.login.validate()) {
        
      } else {
        this.$notify({
          title: this.$t('notify.verify'),
          type: "warning"
        });
      }
    },
    goRegister() {
      this.$router.push("/register")
    },
  }
};
</script>

<style scoped></style>
