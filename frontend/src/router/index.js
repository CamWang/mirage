import Vue from 'vue';
import Router from 'vue-router';
import user from './user';
import Head from '../components/Head';
import Foot from '../components/Foot';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    ...user,
    {
      path: "/",
      name: "home",
      components: {
        head: Head,
        default: () => import("../views/Home"),
        foot: Foot
      }
    }
  ]
})