<template>
  <v-col class="contest-detail col-md-10 col-12">
    <v-card :loading="isLoading">
      <v-toolbar dense flat>
        <v-app-bar-nav-icon>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon @click="goContestList" v-bind="attrs" v-on="on">
                <v-icon>{{ mdiTrophy }}</v-icon>
              </v-btn>
            </template>
            <span>{{ $t("route.back") }}</span>
          </v-tooltip>
        </v-app-bar-nav-icon>
        <v-toolbar-title>
          {{ $t("contest.detail.title") }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-chip
          v-if="isRank"
          class="mx-3"
          label
          color="warning"
          text-color="white"
          @click="goRank"
        >
          <v-icon left>
            {{ mdiPodium }}
          </v-icon>
          {{ $t("contest.detail.rank") }}
        </v-chip>
        <v-chip
          v-else
          class="mx-3"
          label
          color="warning"
          text-color="white"
          @click="goRank"
        >
          <v-icon left>
            {{ mdiPodium }}
          </v-icon>
          {{ $t("contest.detail.rank") }}
        </v-chip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              class="mx-1"
              label
              :color="getStatusColor()"
              text-color="white"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left>
                {{ mdiPulse }}
              </v-icon>
              <span v-t="status"></span>
            </v-chip>
          </template>
          <span>{{ $t("contest.detail.status.name") }}</span>
        </v-tooltip>
      </v-toolbar>
      <router-view :contest="contest"></router-view>
    </v-card>
  </v-col>
</template>

<script>
import {
  mdiTrophyVariantOutline,
  mdiClipboardPulseOutline,
  mdiPodium,
} from "@mdi/js";
import Detail from "./contest/Detail";

export default {
  name: "ProblemDetail",

  components: {
    Detail,
  },

  data() {
    return {
      mdiPodium,
      mdiTrophy: mdiTrophyVariantOutline,
      mdiPulse: mdiClipboardPulseOutline,

      isLoading: false,
      isRank: false,
      contest: {},
    };
  },

  computed: {
    id: function() {
      return this.$route.params.id;
    },
    status: function() {
      const base = "contest.detail.status.";
      if (this.contest) {
        const now = Date.now();
        const start = this.contest.start;
        const end = this.contest.end;
        if (end < now) {
          return base + "finished";
        } else if (start > now) {
          return base + "waiting";
        } else {
          return base + "inProgress";
        }
      }
    },
  },

  mounted() {
    this.getContestDetail();
  },

  watch: {
    contest() {},
  },

  methods: {
    goContestList() {
      this.$router.push("/contest");
    },

    goRank() {
      this.$router.push(`/contest/detail/${this.id}/rank`);
      this.isRank = true;
    },

    getContestDetail() {
      this.axios
        .get("/contest/detail", { params: { id: this.id } })
        .then((response) => {
          this.contest = response.data.contest;
        })
        .catch((error) => {})
        .finally(() => {
          this.isLoading = false;
        });
    },
    getStatusColor() {
      if (this.contest) {
        const now = Date.now();
        const start = this.contest.start;
        const end = this.contest.end;
        if (end < now) {
          return "deep";
        } else if (start > now) {
          return "orange";
        } else {
          return "success";
        }
      }
    },
  },
};
</script>

<style scoped>
/* .contest-detail {
  position: absolute;
} */
</style>
