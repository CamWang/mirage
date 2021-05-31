<template>
  <v-col class="contest-detail col-md-10 col-12">
    <v-card :loading="isLoading">
      <v-toolbar dense flat>
        <v-app-bar-nav-icon>
          <v-btn icon @click="goContestList">
            <v-icon>{{ mdiTrophy }}</v-icon>
          </v-btn>
        </v-app-bar-nav-icon>
        <v-toolbar-title>
          {{ $t("contest.detail.title") }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              class="mx-1"
              color="primary"
              label
              text-color="white"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left>
                {{ mdiPulse }}
              </v-icon>
              {{  }}
            </v-chip>
          </template>
          <span>{{ $t("contest.detail.status.name") }}</span>
        </v-tooltip>
      </v-toolbar>
    </v-card>
  </v-col>
</template>

<script>
import {
  mdiTrophyVariantOutline,
  mdiClipboardPulseOutline
} from "@mdi/js"

import { getStatusAbbrFromNumber } from "@/utils/status";

export default {
  name: "ProblemDetail",
  
  data() {
    return {
      mdiTrophy: mdiTrophyVariantOutline,
      mdiPulse: mdiClipboardPulseOutline,

      isLoading: false,
      contest: {},
    }
  },

  computed: {
    id() {
      return this.$route.params.id;
    },
  },

  mounted() {
    this.getContestDetail();
  },

  watch: {
    contest() {
      this.getContestStatusAbbr();
    }
  },

  methods: {
    goContestList() {
      this.$router.push("/contest");
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

    getContestStatusAbbr() {
      return getStatusAbbrFromNumber(this.contest.id);
    }
  }
}
</script>

<style scoped>
.contest-detail {
  position: absolute;
}
</style>