<template>
  <v-container class="ambient" fluid>
    <v-row class="d-flex justify-center">
      <v-col class="col-lg-8 col-md-10 col-12">
        <v-row class="d-flex align-center">
          <h1 class="text-lg-h2 my-lg-14 text-h2 my-md-10 my-8 ml-4">Mirage OJ</h1>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col class="col-lg-8 col-md-10 col-12">
        <News/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import News from '../components/News';
export default {
  name: "home",
  components: {
    News,
  },
  data() {
    return {

    }
  },

  methods: {
    getIt() {
      this.axios.get('/new')
      .then(response => {
        
      })
      .catch(error => {
        this.$notify.error({
          title: ""
        })
      });
    },
    notify() {
      this.$notify({
        title: 'Hello User!'
      });
    }
  },
  
  mounted() {
    
  }
};
</script>

<style></style>
