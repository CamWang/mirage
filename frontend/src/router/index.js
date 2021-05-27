import Vue from 'vue';
import Router from 'vue-router';
import store from '../store'

import user from './user';
import problem from './problem';
import contest from './contest';
import blog from './blog';

import Head from '../components/Head';
import Foot from '../components/Foot';

Vue.use(Router);

const router = new Router({
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
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.getLoginState) {
      next({
        path: '/login',
      })
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router