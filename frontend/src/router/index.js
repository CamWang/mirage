import Vue from 'vue';
import Router from 'vue-router';
import user from './user';
import problem from './problem';
import contest from './contest';
import blog from './blog';

import Head from '../components/Head';
import Foot from '../components/Foot';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    ...user,
    ...problem,
    ...contest,
    ...blog,
    {
      path: "/",
      name: "home",
      components: {
        head: Head,
        default: () => import("../views/Home"),
        foot: Foot
      },
      meta: {
        requiresAuth: false
      }
    }
  ]
})