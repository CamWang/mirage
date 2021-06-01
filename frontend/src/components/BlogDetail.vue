<template>
  <v-col class="col-md-10 col-12 mb-10 position-absolute max-height">
    <v-card class="no-scrollbar" :loading="isLoading">
      <v-app-bar dense flat>
        <v-app-bar-nav-icon>
          <v-btn icon @click="goBack">
            <v-icon>{{ mdiPostOutline }}</v-icon>
          </v-btn>
        </v-app-bar-nav-icon>
        <v-toolbar-title>{{ $t("blog.detail.name") }}</v-toolbar-title>
      </v-app-bar>
    <v-row class="ma-0">
      <div class="blog-content px-md-8 px-6 pt-8 pb-6">
        <h2>{{ blog.title?blog.title:"" }}</h2>
        <p class="subtitle-2 mb-8">{{ blog.user?blog.user.nickname:"" }}{{ blog.time?" - " + $d(new Date(blog.time), "short"):"" }}</p>
        <Marked
          class="text--primary text-news line-break"
          ref="highlight"
          >{{ blog.content }}</Marked>
      </div>
    </v-row>
    <v-row class="blog-reply px-0 ma-0 pb-4 d-flex flex-column" v-for="reply in blog.replies" :key="reply.id">
      <v-divider class="pb-4"></v-divider>
      <div>
        <p class="subtitle-2 px-md-8 px-6 mb-2">{{ reply.user?reply.user.nickname:"" }}{{ reply.time?" - " + $d(new Date(reply.time), "short"):"" }}</p>
        <span class="px-10 subtitle-1">{{ reply.content }}</span>
      </div>
    </v-row>
    <v-row class="px-0 ma-0 pb-6 d-flex flex-column">
      <v-divider></v-divider>
      <v-col class="px-8">
        <v-textarea
        name="comment"
        clearable
        :clear-icon="mdiCloseCircle"
        :prepend-inner-icon="mdiComment"
        :label="$t('blog.comment.name')"
        auto-grow
        v-model="comment"
      ></v-textarea>
      <v-btn
        class="success"
        elevation="2"
      >{{ $t("problem.detail.submit") }}</v-btn>
      </v-col>
    </v-row>
    </v-card>
  </v-col>
</template>

<script>
import {
  mdiPostOutline,
  mdiCommentProcessingOutline,
  mdiCloseCircle
} from "@mdi/js";
import Marked from "@/plugins/marked/Marked";

export default {
  name: "BlogDetail",
  components: {
    Marked
  },
  data() {
    return {
      mdiPostOutline,
      mdiComment: mdiCommentProcessingOutline,
      mdiCloseCircle,

      isLoading: false,
      blog: {},

      comment: "",
    }
  },

  computed: {
    id() {
      return this.$route.params.id;
    },
  },

  mounted() {
    this.getBlog()
  },

  methods: {
    getBlog() {
      this.isLoading = true;
      this.axios
        .get("/blog/detail", { params: { id: this.id } })
        .then((response) => {
          this.blog = response.data.blog;
        })
        .catch((error) => {})
        .finally(() => {
          this.isLoading = false;
        });
    },
    goBack() {
      this.$router.push("/blog");
    }
  }
}
</script>

<style scoped>
</style>