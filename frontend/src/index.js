import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import vuetify from '@/plugins/vuetify';
import Hljs from "@/plugins/highlight";
import i18n from "@/locale";
import axios from '@/api';
import store from '@/store'

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