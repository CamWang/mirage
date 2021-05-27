<template>
  <v-card max-width="430" class="mx-auto my-lg-16 my-md-12 my-8">
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
    <v-form v-model="valid">
      <v-container class="px-4">
        <v-text-field :append-icon="mdiAccountCircleOutline" :label="$t('form.username')" v-model="username" :rules="ruleName" clearable outlined required></v-text-field>
        <v-text-field :append-icon="mdiLockOutline" :label="$t('form.password')" v-model="password" :rules="rulePassword" clearable outlined required></v-text-field>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { mdiAccountCircleOutline, mdiLockOutline } from '@mdi/js';
export default {
  name: "RegisterForm",
  data() {
    return {
      mdiAccountCircleOutline,
      mdiLockOutline,

      valid: false,

      username: "",
      password: "",

      ruleName: [],
      rulePassword: []
    }
  }
}
</script>

<style scoped>

</style>