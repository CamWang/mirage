<template>
  <v-app-bar app>
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="changeTheme">
      <v-icon>{{ darkMode }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mdiBrightness6 } from '@mdi/js';
export default {
  name: "header",

  data: () => ({
    darkMode: mdiBrightness6
  }),

  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  }
}
</script>

<style>

</style>