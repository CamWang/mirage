<template>
  <v-col class="col-md-10 col-12 mb-10 position-absolute max-height">
    <v-card class="no-scrollbar" :loading="isLoading">
      <v-toolbar dense flat>
        <v-app-bar-nav-icon>
          <v-btn icon @click="goBack">
            <v-icon>{{ mdiPostOutline }}</v-icon>
          </v-btn>
        </v-app-bar-nav-icon>
        <v-toolbar-title>{{ $t("blog.detail.name") }}</v-toolbar-title>
      </v-toolbar>
      <v-row>
      <div class="blog-content px-8 py-2">
        <h2>{{ blog.title?blog.title:"" }}</h2>
        <p class="subtitle-1">{{ blog.user?blog.user.nickname:"" }} - {{ blog.time?$d(new Date(blog.time), "short"):"" }}</p>
        <Marked
          class="text--primary text-news line-break"
          ref="highlight"
          >{{ blog.content }}</Marked>
      </div>
    </v-row>
    <v-row class="blog-reply py-2" v-for="reply in blog.replies" :key="reply.id">
      <div>
        <p class="subtitle-1 px-8">{{ reply.user?reply.user.nickname:"" }} - {{ reply.time?$d(new Date(reply.time), "short"):"" }}</p>
        <span class="px-8">{{ reply.content }}</span>
      </div>
    </v-row>
    </v-card>
  </v-col>
</template>

<script>
import {
  mdiPostOutline,
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

      isLoading: false,
      blog: {},
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