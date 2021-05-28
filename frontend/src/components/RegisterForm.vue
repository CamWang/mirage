<template>
  <v-card max-width="450" class="mx-auto my-lg-16 my-md-12 my-8">
    <v-list-item>
      <v-list-item-content class="mt-lg-10 mt-md-8 mt-4 mb-4 px-2">
        <v-list-item-title class="headline">
          {{ $t("register.title") }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ $t("register.subtitle") }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-form class="pb-5" v-model="valid" ref="register">
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
        <v-text-field
          class="my-1"
          :append-icon="mdiEmailOutline"
          :label="$t('form.email')"
          v-model="email"
          :rules="ruleEmail"
          clearable
          outlined
          required
        ></v-text-field>
        <v-checkbox
          v-model="term"
          class="mt-0 mb-6"
          :rules="ruleTerm"
          :label="$t('form.term')"
          required
        ></v-checkbox>
        <div class="my-lg-5 my-md-3 my-2 text-center">
          <v-btn color="secondary" class="mr-4" @click="goLogin">
            {{ $t("login.button") }}
          </v-btn>

          <v-btn color="success" class="mr-4" @click="register">
            {{ $t("register.button") }}
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
  name: "RegisterForm",
  data() {
    return {
      ruleUsername: verifyObj.ruleUsername,
      rulePassword: verifyObj.rulePassword,
      ruleEmail: verifyObj.ruleEmail,
      ruleTerm: verifyObj.ruleTerm,
      mdiAccountCircleOutline,
      mdiEye,
      mdiEyeOff,
      mdiEmailOutline,

      valid: false,
      showPassword: false,

      username: "",
      password: "",
      email: "",
      term: false,
    };
  },
  methods: {
    register() {
      if (this.$refs.register.validate()) {

      } else {
        this.$notify({
          title: this.$t('notify.verify'),
          type: "warning"
        });
      }
    },
    goLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped></style>
