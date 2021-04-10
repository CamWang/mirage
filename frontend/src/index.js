import Vue from 'vue';
import App from './App'
import vuetify from '@/plugins/vuetify';
import axios from 'axios';

new Vue({
  el: "#app",
  components: {
    App
  },
  template: "<App/>",
  vuetify,
});

window.axios = axios;