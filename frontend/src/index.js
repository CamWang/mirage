import Vue from 'vue';
import App from './App';
import router from './router';
import vuetify from '@/plugins/vuetify';
import axios from 'axios';

new Vue({
  el: "#app",
  components: {
    App
  },
  template: "<App/>",
  vuetify,
  router,
});

window.axios = axios;