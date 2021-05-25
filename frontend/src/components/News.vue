<template>
  <div>
    <v-card :loading="isLoading">
      <v-toolbar dense flat>
        <v-app-bar-nav-icon><v-btn icon @click="refreshNews"><v-icon>{{ mdiNews }}</v-icon></v-btn></v-app-bar-nav-icon>
        <v-toolbar-title>News</v-toolbar-title>
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

      <v-list class="pt-0" two-line flat>
        <v-list-item-group color="primary" v-model="selected">
          <div v-for="news in newsList" :key="news.id">
            <v-divider></v-divider>
            <v-list-item @click="dialog = true">
              <v-list-item-content>
                <v-list-item-title class="mb-lg-2 mt-lg-1"
                  >{{ news.title
                  }}<span class="subtitle-2">{{
                    " - " + news.author
                  }}</span></v-list-item-title
                >
                <v-list-item-subtitle
                  v-text="news.subtitle"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list-item-group>
      </v-list>
    </v-card>

    <div class="text-center">
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog = false">
              <v-icon>{{ mdiClose }}</v-icon>
            </v-btn>
            <v-toolbar-title>{{ $t("home.news") }}</v-toolbar-title>
          </v-toolbar>
          <v-row>
            <v-col class="col-lg-7 col-md-9 col-12 p-0">
              <v-card-text class="pt-5">
                <h5 class="text-lg-h4 text-h5 my-3 text--primary">
                  {{ newsList[selected ? selected : 0].title }}
                </h5>
                <p class="mb-lg-10 mb-6">
                  {{ newsList[selected ? selected : 0].author }} -
                  {{
                    $d(
                      new Date(newsList[selected ? selected : 0].time),
                      "short"
                    )
                  }}
                </p>
                <vue-markdown
                  class="text--primary text-news"
                  :source="newsList[selected ? selected : 0].content"
                  ref="highlight"
                >
                </vue-markdown>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown/src/VueMarkdown";
import { mdiMagnify, mdiClose, mdiChevronLeft, mdiChevronRight, mdiNewspaperVariantMultipleOutline } from "@mdi/js";
import { debounce } from "lodash-es";

export default {
  components: {
    VueMarkdown,
  },
  data() {
    return {
      mdiMagnify,
      mdiClose,
      mdiChevronRight,
      mdiChevronLeft,
      mdiNews: mdiNewspaperVariantMultipleOutline,

      dialog: false,
      isLoading: false,
      newsList: [
        {
          id: 0,
          title: "",
          subtitle: "",
          author: "",
          time: 0,
          content: "",
          type: "",
        },
      ],
      selected: 0,

      page: 1,
      total: 1,
    };
  },
  mounted() {
    this.getNews();
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
    getNews() {
      this.isLoading = true;
      this.axios
        .get("/news", { params: { page: this.page } })
        .then((response) => {
          this.newsList = response.data.news;
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
    refreshNews:debounce(function() {
      this.getNews()
    }, 1000, {leading: true, maxWait: 2000}),
    nextPage() {
      this.page++;
      this.getNews();
    },
    lastPage() {
      this.page--;
      this.getNews();
    },
  },
};
</script>

<style scoped>
</style>