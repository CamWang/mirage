<template>
    <v-card :loading="isLoading">
      <v-toolbar dense flat>
        <v-app-bar-nav-icon>
          <v-btn icon @click="refreshProblems">
            <v-icon>{{ mdiBookEducation }}</v-icon>
          </v-btn>
        </v-app-bar-nav-icon>
        <v-toolbar-title>{{ $t("problem.title") }}</v-toolbar-title>
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

      <v-data-table :headers="headers" :items="problemList" >
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
      </v-data-table>
    </v-card>
</template>

<script>
import {
  mdiMagnify,
  mdiClose,
  mdiChevronLeft,
  mdiChevronRight,
  mdiBookEducation,
} from "@mdi/js";
import { debounce } from "lodash-es";

export default {
  name: "ProblemList",

  data() {
    return {
      mdiMagnify,
      mdiClose,
      mdiChevronLeft,
      mdiChevronRight,
      mdiBookEducation,

      headers: [
        {
          text: this.$t("problem.list.number"),
          align: "start",
          sortable: true,
          value: "id",
        },
        {
          text: this.$t("problem.list.title"),
          value: "title",
        },
        {
          text: this.$t("problem.list.tags"),
          value: "tags",
        },
        {
          text: this.$t("problem.list.submit"),
          value: "submit",
        },
        {
          text: this.$t("problem.list.success"),
          value: "success",
        },
      ],

      isLoading: false,
      problemList: [],
      total: 1,
      page: 1,
      selected: 0,
    };
  },

  mounted() {
    this.getProblems();
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
    getProblems() {
      this.isLoading = true;
      this.axios
        .get("/problem", { params: { page: this.page } })
        .then((response) => {
          this.problemList = response.data.problem;
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
    refreshProblems: debounce(
      function() {
        this.getProblems();
      },
      1000,
      { leading: true, maxWait: 2000 }
    ),
    nextPage() {
      this.page++;
      this.getProblems();
    },
    lastPage() {
      this.page--;
      this.getProblems();
    },
  },
};
</script>

<style></style>
