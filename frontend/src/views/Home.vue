<template>
  <v-container class="ambient" fluid>
    <v-row class="d-flex justify-center">
      <v-col class="col-lg-8 col-md-10 col-12">
        <v-sheet min-height="20vh" rounded="lg">
          <v-btn @click="getIt"></v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "home",
  data() {
    return {

    }
  },

  methods: {
    getIt() {
      this.axios.get('/news')
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    }
  },
  
  mounted() {
    
  }
};
</script>

<style></style>
