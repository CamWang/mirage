import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import vuetify from '@/plugins/vuetify';
import Hljs from "@/plugins/highlight";
import i18n from "@/locale";
import axios from '@/api';
import store from '@/store';
import { io } from "socket.io-client";

window.io = io;

Vue.use(Hljs);

Vue.prototype.$eventBus = new Vue();

Vue.prototype.axios = axios;

new Vue({
  el: "#app",
  components: {
    App
  },
  template: "<App/>",
  vuetify,
  router,
  i18n,
  store
});