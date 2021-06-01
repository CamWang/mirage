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
      <v-row class="d-flex">
        <v-col class="col-md-8 col-12 pl-9 pr-4 pt-6">
          <h2>{{ this.contest.title }}</h2>
          <p class="mb-2">{{ this.contest.description }}</p>
        </v-col>
        <v-col class="col-md-4 col-12 pr-6 pl-md-0 pl-9 pt-md-6 pt-0">
          <p class="mb-2">{{ $t("contest.list.start") }}: {{ $d(new Date(contest.start?contest.start:0), "long") }}</p>
          <p class="mb-2">{{ $t("contest.list.end") }}: {{ $d(new Date(contest.end?contest.end:0), "long") }}</p>
          <p class="mb-2">{{ $t("contest.detail.type") }}: {{ contest.type === 0?"OI":"ACM" }}</p>
        </v-col>
      </v-row>

      <v-progress-linear
          v-model="progress"
          class="mt-2"
          color="primary"
          height="8"
          striped
        >
      </v-progress-linear>

      <v-data-table
        :headers="headers"
        :items="contest.problems"
        hide-default-footer
        class="elevation-1"
      >
        <!-- eslint-disable-next-line -->
        <template v-slot:item.status="{ item }">
          <v-chip
            :color="getProblemStatusColor(item.status)"
            text-color="white"
            label
          >
            {{ $t(`status.full[${item.status}]`) }}
          </v-chip>
        </template>
        <!-- eslint-disable-next-line -->
        <template v-slot:item.name="{ item }">
          <a style="color: inherit" @click="goProblemDetail(item)">{{ item.name }}</a>
        </template>
      </v-data-table>
    </v-card>
  </v-col>
</template>

<script>
import {
  mdiTrophyVariantOutline,
  mdiClipboardPulseOutline
} from "@mdi/js"

export default {
  name: "ProblemDetail",
  
  data() {
    return {
      mdiTrophy: mdiTrophyVariantOutline,
      mdiPulse: mdiClipboardPulseOutline,

      isLoading: false,
      contest: {},

      headers: [
        { text: this.$t("contest.detail.status.code"), value: "code" },
        { text: this.$t("problem.list.title"), value: "name" },
        { text: this.$t("contest.detail.status.name"), value: "status" }
      ]
    }
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
    progress: function() {
      const now = Date.now();
      const start = this.contest.start;
      const end = this.contest.end;
      if (end < now) {
        return 100
      } else if (start > now) {
        return 0
      } else {
        return (((end - now)/(end - start)) * 100).toFixed(0);
      }
    }
  },

  mounted() {
    this.getContestDetail();
  },

  watch: {
    contest() {
    },
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
    getProblemStatusColor(status) {
      if (status === 0) {
        return "deep"
      } else if (status === 8) {
        return "error"
      } else if (status === 9) {
        return "success"
      } else {
        return "warning"
      }
    },
    goProblemDetail(item) {
      this.$router.push(`/problem/detail/${item.id}`);
    },
  }
}
</script>

<style scoped>
.contest-detail {
  position: absolute;
}
</style>