<template>
  <v-col class="profile-list col-md-8 col-12 pt-16">
    <v-card :loading="isLoading" class="no-scrollbar profile-card">
      <v-avatar
        class="profile-avatar"
        color="ambient"
        size="90"
      ><img class="avatar-image" :src="getAvatarSrc()" /></v-avatar>
        <v-col class="pt-14">
          <v-row>
            <span>123</span>
          </v-row>
        </v-col>
    </v-card>
  </v-col>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ProfileDetail",
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    ...mapGetters("user", {
      user: "getUser",
    }),
  },

  mounted() {
    if (this.user) {

    }
  },

  methods: {
    getAvatarSrc() {
      if (this.user && this.user.avatar) {
        return this.user.avatar;
      } else {
        return "static/default.svg";
      }
    },
  }
}
</script>

<style scoped>
.profile-avatar {
  position: absolute;
  left: calc(50% - 45px);
  top: -50px;
  border-radius: 50%!important;
}

.profile-card {
  overflow: visible!important;;
}

.avatar-image {
  border-radius: 50%;
}
</style>