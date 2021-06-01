<template>
  <v-col class="blog-list col-md-10 col-12">
    <v-card :loading="isLoading">
      <v-toolbar dense flat>
        <v-app-bar-nav-icon>
          <v-btn icon @click="refreshBlogs">
            <v-icon>{{ mdiPostOutline }}</v-icon>
          </v-btn>
        </v-app-bar-nav-icon>
        <v-toolbar-title>{{ $t("blog.title") }}</v-toolbar-title>
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

      <v-card-text class="py-0">
        <v-chip-group
          class="py-2"
          column
        >
          <v-chip
            v-for="(tag, index) in blogTags"
            :key="index"
            :color="tag.color"
            class="mr-2"
            text-color="white"
            small
          >
            {{ tag.text }}
          </v-chip>
        </v-chip-group>
        <v-divider></v-divider>
      </v-card-text>

      <v-data-table :headers="headers" :items="blogList">
        <!-- eslint-disable-next-line -->
        <template v-slot:item.title="{ item }">
          <a style="color: inherit" @click="goDetail(item)">{{ item.title }}</a>
        </template>
        <!-- eslint-disable-next-line -->
        <template v-slot:item.time="{ item }">
          {{ $d(new Date(item.time), "blog") }}
        </template>
        <!-- eslint-disable-next-line -->
        <template v-slot:item.tags="{ item }">
          <v-chip
            v-for="(tag, index) in item.tags"
            :key="index"
            :color="tag.color"
            class="mr-1"
            text-color="white"
            small
          >
            {{ tag.text }}
          </v-chip>
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
  mdiPostOutline,
} from "@mdi/js";
import { debounce } from "lodash-es";

export default {
  name: "BlogList",

  data() {
    return {
      mdiMagnify,
      mdiClose,
      mdiChevronLeft,
      mdiChevronRight,
      mdiPostOutline,

      headers: [
        {
          text: this.$t("blog.list.date"),
          align: "start",
          sortable: true,
          value: "time",
        },
        {
          text: this.$t("blog.list.title"),
          value: "title",
        },
        {
          text: this.$t("blog.list.author"),
          value: "author",
        },
        {
          text: this.$t("blog.list.tags"),
          value: "tags",
        },
      ],

      isLoading: false,
      blogList: [],
      blogTags: [],
      total: 1,
      page: 1,
      selected: 0,
    };
  },

  mounted() {
    this.getBlogs();
    this.getTags();
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
    getBlogs() {
      this.isLoading = true;
      this.axios
        .get("/blog", { params: { page: this.page } })
        .then((response) => {
          this.blogList = response.data.blog;
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
    getTags() {
      this.isLoading = true;
      this.axios
        .get("/blog/tags")
        .then((response) => {
          this.blogTags = response.data.tags;
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
    refreshBlogs: debounce(
      function() {
        this.getBlogs();
      },
      1000,
      { leading: true, maxWait: 2000 }
    ),
    nextPage() {
      this.page++;
      this.getBlogs();
    },
    lastPage() {
      this.page--;
      this.getBlogs();
    },
    goDetail(item) {
      this.$router.push(`/blog/detail/${item.id}`);
    },
  },
};
</script>

<style>
.blog-list {
  position: absolute;
}
</style>
