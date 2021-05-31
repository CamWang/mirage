<template>
  <v-col class="col-md-10 col-12">
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
          {{ $d(new Date(item.start), "long") }}
        </template>
        <!-- eslint-disable-next-line -->
        <template v-slot:item.end="{ item }">
          {{ $d(new Date(item.end), "long") }}
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

      headers: [
        {
          text: this.$t("contest.list.title"),
          align: "start",
          sortable: false,
          value: "title",
        },
        {
          text: this.$t("contest.list.start"),
          value: "start",
        },
        {
          text: this.$t("contest.list.end"),
          value: "end",
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
  },
};
</script>

<style></style>
