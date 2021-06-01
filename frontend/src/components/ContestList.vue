<template>
  <v-col class="contest-list col-md-10 col-12">
    <v-card :loading="isLoading">
      <v-toolbar dense flat>
        <v-app-bar-nav-icon>
          <v-btn icon @click="refreshContests">
            <v-icon>{{ mdiTrophy }}</v-icon>
          </v-btn>
        </v-app-bar-nav-icon>
        <v-toolbar-title>{{ $t("contest.title") }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon :disabled="isFirstPage" @click="!isFirstPage && lastPage">
          <v-icon>{{ mdiChevronLeft }}</v-icon>
        </v-btn>
        <v-btn icon :disabled="isLastPage" @click="!isLastPage && nextPage">
          <v-icon>{{ mdiChevronRight }}</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>{{ mdiMagnify }}</v-icon>
        </v-btn>
      </v-toolbar>

      <v-data-table :headers="headers" :items="contestList">
        <!-- eslint-disable-next-line -->
        <template v-slot:item.title="{ item }">
          <a style="color: inherit" @click="goDetail(item)">{{ item.title }}</a>
        </template>
        <!-- eslint-disable-next-line -->
        <template v-slot:item.tags="{ item }">
          <v-chip
            v-for="(tag, index) in item.tags"
            :key="index"
            :color="tag.color"
            text-color="white"
            small
          >
            {{ tag.text }}
          </v-chip>
        </template>
        <!-- eslint-disable-next-line -->
        <template v-slot:item.mode="{ item }">
          <v-chip
            v-if="item.mode === 'public'"
            class="mx-2"
            color="green"
            label
            outlined
          >
            <v-icon left>
              {{ mdiPublic }}
            </v-icon>
            {{ $t("contest.list.mode.public") }}
          </v-chip>
          <v-chip v-else class="mx-2" color="red" label outlined>
            <v-icon left>
              {{ mdiLockOutline }}
            </v-icon>
            {{ $t("contest.list.mode.private") }}
          </v-chip>
        </template>
        <!-- eslint-disable-next-line -->
        <template v-slot:item.start="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-chip
              class="mx-1"
              :color="getStatusColor(item.start, item.end)"
              label
              small
              text-color="white"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left>
                {{ mdiPulse }}
              </v-icon>
              <span v-t="getStatus(item.start, item.end)"></span>
            </v-chip>
            </template>
            <span>{{ $d(new Date(item.start), "long") }}</span> - <br/>
            <span>{{ $d(new Date(item.end), "long") }}</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
  </v-col>
</template>

<script>
import {
  mdiMagnify,
  mdiClose,
  mdiChevronLeft,
  mdiChevronRight,
  mdiTrophyVariantOutline,
  mdiAccountMultipleCheckOutline,
  mdiClipboardPulseOutline,
  mdiLockOutline,
} from "@mdi/js";
import { debounce } from "lodash-es";

export default {
  name: "ContestList",

  data() {
    return {
      mdiMagnify,
      mdiClose,
      mdiChevronLeft,
      mdiChevronRight,
      mdiTrophy: mdiTrophyVariantOutline,
      mdiPublic: mdiAccountMultipleCheckOutline,
      mdiLockOutline,
      mdiPulse: mdiClipboardPulseOutline,

      headers: [
        {
          text: this.$t("contest.list.title"),
          align: "start",
          sortable: "deep",
          value: "title",
        },
        {
          text: this.$t("contest.list.status"),
          value: "start",
        },
        {
          text: this.$t("contest.list.tags"),
          value: "tags",
        },
        {
          text: this.$t("contest.list.mode.name"),
          value: "mode",
        },
      ],

      isLoading: false,
      contestList: [],
      total: 1,
      page: 1,
      selected: 0,
    };
  },

  mounted() {
    this.getContests();
  },

  computed: {
    isLastPage() {
      return this.page == this.total;
    },
    isFirstPage() {
      return this.page == 1;
    },
  },

  methods: {
    getContests() {
      this.isLoading = true;
      this.axios
        .get("/contest", { params: { page: this.page } })
        .then((response) => {
          this.contestList = response.data.contest;
          this.total = response.data.total;
        })
        .catch((error) => {
          this.$notify({
            title: error.message,
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    refreshContests: debounce(
      function() {
        this.getContests();
      },
      1000,
      { leading: true, maxWait: 2000 }
    ),
    nextPage() {
      this.page++;
      this.getContests();
    },
    lastPage() {
      this.page--;
      this.getContests();
    },
    goDetail(item) {
      this.$router.push(`/contest/detail/${item.id}`);
    },
    getStatus: function(start, end) {
      const base = "contest.detail.status.";
      if (start && end) {
        const now = Date.now();
        if (end < now) {
          return base + "finished";
        } else if (start > now) {
          return base + "waiting";
        } else {
          return base + "inProgress";
        }
      }
    },
    getStatusColor: function(start, end) {
      if (start && end) {
        const now = Date.now();
        if (end < now) {
          return "deep";
        } else if (start > now) {
          return "orange";
        } else {
          return "success";
        }
      }
    }
  },
};
</script>

<style scoped>
.contest-list {
  position: absolute;
}
</style>
