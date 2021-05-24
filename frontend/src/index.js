import Vue from 'vue';
import App from './App';
import router from './router';
import { vuetify, i18n } from '@/plugins/vuetify';
import Hljs from "@/plugins/highlight";
import axios from './api';
// import '../mock';

Vue.use(Hljs);

Vue.prototype.axios = axios;

new Vue({
  el: "#app",
  components: {
    App
  },
  template: "<App/>",
  vuetify,
  router,
  i18n
});