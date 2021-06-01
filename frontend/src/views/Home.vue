<template>
  <v-container
    class="ambient position-absolute max-height"
    fluid
  >
    <v-row class="d-flex justify-center flex-grow-0 flex-shrink-0">
      <v-col class="col-md-10 col-12">
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

  methods: {},

  mounted() {},
};
</script>

<style scoped>
.container {
  background: url("../assets/bg.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
