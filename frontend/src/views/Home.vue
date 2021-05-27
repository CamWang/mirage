<template>
  <v-container class="ambient container fill-height d-flex flex-row align-start" fluid>
    <v-row class="d-flex pl-lg-12 pl-md-8 pl-0 flex-grow-0 flex-shrink-0">
      <v-col class="col-lg-8 col-md-10 col-12 pt-lg-14 pt-md-10 pt-8">
        <!-- <h1 class="text-lg-h2 my-lg-14 text-h2 my-md-10 my-8 ml-2">
            Mirage OJ
          </h1> -->
          <News />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import News from "../components/News";
export default {
  name: "home",
  components: {
    News,
  },
  data() {
    return {};
  },

  methods: {
    getIt() {
      this.axios
        .get("/new")
        .then((response) => {})
        .catch((error) => {
          this.$notify.error({
            title: "",
          });
        });
    },
    notify() {
      this.$notify({
        title: "Hello User!",
      });
    },
  },

  mounted() {},
};
</script>

<style scoped>
.container {
  background-image: url("../assets/bg.svg");
  background-position: top -180px right -240px;
}
</style>
