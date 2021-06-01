<template>
  <v-col class="blog-detail col-md-10 col-12">
    <v-card :loading="isLoading">
      <v-toolbar dense flat>
        <v-app-bar-nav-icon>
          <v-btn icon @click="goBack">
            <v-icon>{{ mdiPostOutline }}</v-icon>
          </v-btn>
        </v-app-bar-nav-icon>
        <v-toolbar-title>{{ $t("blog.detail.name") }}</v-toolbar-title>
      </v-toolbar>
      <Marked
              class="text--primary text-news line-break"
              ref="highlight"
              >
            {{ blog.content }}
            </Marked>
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
.blog-detail {
  position: absolute;
}
</style>