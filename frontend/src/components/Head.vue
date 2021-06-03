<template>
  <v-app-bar app>
    <v-toolbar-title class="title">
      {{ $t("head.title") }}
    </v-toolbar-title>
    <v-tabs>
      <v-tabs-slider color="secondary"></v-tabs-slider>
      <v-tab class="tab" to="/">{{ $t("head.tab.home") }}</v-tab>
      <v-tab class="tab" to="/problem">{{ $t("head.tab.problem") }}</v-tab>
      <v-tab class="tab" to="/contest">{{ $t("head.tab.contest") }}</v-tab>
      <v-tab class="tab" to="/blog">{{ $t("head.tab.blog") }}</v-tab>
    </v-tabs>
    <v-spacer></v-spacer>
    <v-btn icon @click="changeTheme">
      <v-icon>{{ mdiDarkMode }}</v-icon>
    </v-btn>
    <v-menu offset-y open-on-hover>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon>
          <v-icon>{{ mdiWeb }}</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(locale, index) in locales"
          :key="index"
          @click="changeLang(locale)"
        >
          <v-list-item-title>{{ $t("name", locale) }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-menu bottom min-width="260px" rounded offset-y open-on-hover>
      <template v-slot:activator="{ on }">
        <v-btn icon x-large v-on="on" class="mx-lg-6 mx-md-4 mx-2">
          <v-avatar size="46">
            <img :src="getAvatarSrc()" />
          </v-avatar>
        </v-btn>
      </template>

      <v-card v-if="user">
        <v-list>
          <v-list-item>
            <v-list-item-avatar size="48">
              <img :src="getAvatarSrc()" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ user.nickname }}</v-list-item-title>
              <v-list-item-subtitle class="mt-1">{{ $t("auth." + user.role) }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn @click="logout" v-on="on" v-bind="attrs" icon>
                    <v-icon>{{ mdiLogout }}</v-icon>
                  </v-btn>
                </template>
                <span>{{ $t("logout.button") }}</span>
              </v-tooltip>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list dense>
        <v-list-item-group color="primary">
          <v-list-item @click="goProfile">
            <v-list-item-icon>
              <v-icon> {{ mdiProfile }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>{{ $t("head.profile") }}</v-list-item-content>
          </v-list-item>
          <v-list-item @click="goLogin">
            <v-list-item-icon>
              <v-icon> {{ mdiBalloon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>{{ $t("head.submit") }}</v-list-item-content>
          </v-list-item>
          <v-list-item @click="goLogin">
            <v-list-item-icon>
              <v-icon> {{ mdiTrophy }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>{{ $t("head.contest") }}</v-list-item-content>
          </v-list-item>
          <v-list-item @click="goLogin">
            <v-list-item-icon>
              <v-icon> {{ mdiDice }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>{{ $t("head.random") }}</v-list-item-content>
          </v-list-item>
          <v-list-item @click="openMessage">
            <v-list-item-icon>
              <v-icon> {{ mdiMessage }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>{{ $t("head.message") }}</v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      </v-card>

      <v-list v-else dense>
        <v-list-item-group color="primary">
          <v-list-item @click="goLogin">
            <v-list-item-icon>
              <v-icon> {{ mdiLogin }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>{{ $t("login.button") }}</v-list-item-content>
          </v-list-item>
          <v-list-item @click="goRegister">
            <v-list-item-icon>
              <v-icon>{{ mdiRegister }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>{{
              $t("register.button")
            }}</v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import {
  mdiBrightness6,
  mdiWeb,
  mdiLoginVariant,
  mdiLogoutVariant,
  mdiAccountPlusOutline,
  mdiCardAccountDetailsOutline,
  mdiMessageTextOutline,
  mdiTrophyOutline,
  mdiBalloon,
  mdiDice3Outline,
} from "@mdi/js";
import { mapGetters } from "vuex";
export default {
  name: "tophead",

  data() {
    return {
      mdiWeb,
      mdiBalloon,
      mdiDarkMode: mdiBrightness6,
      mdiLogin: mdiLoginVariant,
      mdiLogout: mdiLogoutVariant,
      mdiRegister: mdiAccountPlusOutline,
      mdiProfile: mdiCardAccountDetailsOutline,
      mdiTrophy: mdiTrophyOutline,
      mdiDice: mdiDice3Outline,
      mdiMessage: mdiMessageTextOutline,

      locales: [],
    };
  },

  computed: {
    ...mapGetters("user", {
      user: "getUser",
    }),
  },

  mounted() {
    this.locales = this.$i18n.availableLocales;
  },

  methods: {
    changeTheme() {
      let isDark = this.$vuetify.theme.dark;
      this.$vuetify.theme.dark = !isDark;
      window.sessionStorage.setItem("dark", isDark ? "false" : "true");
      if (isDark) {
        this.$notify({
          title: this.$t("notify.theme.light"),
          type: "success",
        });
      } else {
        this.$notify({
          title: this.$t("notify.theme.dark"),
          type: "success",
        });
      }
    },
    changeLang(locale) {
      this.$i18n.locale = locale;
      window.sessionStorage.setItem("lang", locale);
      this.$notify({
        title: this.$t("notify.lang.change"),
        type: "success",
      });
    },

    getAvatarSrc() {
      if (this.user && this.user.avatar) {
        return this.user.avatar;
      } else {
        return "static/default.svg";
      }
    },

    logout() {
      this.$store.dispatch("user/logout", {
        success: () => {
          this.$notify({
            title: this.$t('notify.logout.success'),
            type: 'success'
          });
          this.goLogin();
        },
        logouted: () => {
          this.$notify({
            title: this.$t('notify.logout.logouted'),
            type: 'warning'
          });
          this.goLogin();
        }
      });
    },

    goLogin() {
      (this.$route.path !== "/login") && this.$router.push("/login");
    },

    goRegister() {
      (this.$route.path !== "/register") && this.$router.push("/register");
    },

    goProfile() {
      (this.$route.path !== "/profile") && this.$router.push("/profile");
    },

    openMessage() {
      this.$eventBus.$emit("message");
    }
  },
};
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
