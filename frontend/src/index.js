import Vue from 'vue';
import App from './App';
import router from './router';
import { vuetify, i18n } from '@/plugins/vuetify';
import axios from './api';
// import '../mock';

Vue.prototype.axios = axios;

window.vm = new Vue({
  el: "#app",
  components: {
    App
  },
  template: "<App/>",
  vuetify,
  router,
  i18n
});