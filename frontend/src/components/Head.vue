<template>
  <v-app-bar app>
    <v-toolbar-title class="title">
      {{ $t('head.title') }}
    </v-toolbar-title>
    <v-tabs>
      <v-tabs-slider color="secondary"></v-tabs-slider>
      <v-tab class="tab" to="/">{{ $t('head.tab.home') }}</v-tab>
      <v-tab class="tab" to="/problem">{{ $t('head.tab.problem') }}</v-tab>
      <v-tab class="tab" to="/contest">{{ $t('head.tab.contest') }}</v-tab>
      <v-tab class="tab" to="/blog">{{ $t('head.tab.blog') }}</v-tab>
    </v-tabs>
    <v-spacer></v-spacer>
    <v-btn icon @click="changeTheme">
      <v-icon>{{ mdiDarkMode }}</v-icon>
    </v-btn>
    <v-menu offset-y open-on-hover>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          icon
        >
          <v-icon>{{ mdiWeb }}</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(locale, index) in locales"
          :key="index"
          @click="changeLang(locale)"
        >
          <v-list-item-title>{{ $t('name', locale) }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mdiBrightness6, mdiWeb } from '@mdi/js';
export default {
  name: "tophead",

  data() {
    return {
      mdiDarkMode: mdiBrightness6,
      mdiWeb: mdiWeb,

      locales: []
    }
  },

  mounted() {
    this.locales = this.$i18n.availableLocales;
  },

  methods: {
    changeTheme() {
      let isDark = this.$vuetify.theme.dark;
      this.$vuetify.theme.dark = !isDark;
      if (isDark) {
        this.$notify({
          title: this.$t('notify.theme.light'),
          type: "success"
        });
      } else {
        this.$notify({
          title: this.$t('notify.theme.dark'),
          type: "success"
        });
      }
    },
    changeLang(locale) {
      this.$i18n.locale = locale;
      this.$notify({
        title: this.$t('notify.lang.change'),
        type: "success"
      });
    }
  }
}
</script>

<style scoped>
  .title {
    width: 180px;
    padding-left: 10px;
    text-align: left;
  }
  .tab {
    width: 100px;
  }
</style>