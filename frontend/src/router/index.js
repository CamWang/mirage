import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store'
import i18n from '@/locale';

import user from './routers/user';
import problem from './routers/problem';
import contest from './routers/contest';
import blog from './routers/blog';
import profile from './routers/profile'

import Head from '@/components/Head';
import Foot from '@/components/Foot';

Vue.use(Router);

// catch redundant route error
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((error) => {
  });
};

const router = new Router({
  mode: 'history',
  routes: [
    ...user,
    ...problem,
    ...contest,
    ...blog,
    ...profile,
    {
      path: "/",
      name: "home",
      components: {
        head: Head,
        default: () => import("../views/Home"),
        foot: Foot
      },
      meta: {             // meta for route filter
        auth: false,      // need login to access
        teacher: false,   // need teacher to access
        admin: false,     // need admin to access
      }
    }
  ]
});

/**
 * login guard
 * @description use meta in route defination to do an auth filter
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (!store.getters["user/getLoginState"]) {
      Vue.notify({
        title: i18n.t("auth.login"),
        type: "warning"
      });
      next({
        path: '/login',
      });
    } else {
      if (to.matched.some(record => record.meta.teacher)) {
        if (!(store.getters["user/isTeacher"] || store.getters["user/isAdmin"])) {
          Vue.notify({
            title: i18n.t("auth.denied"),
            text: i18n.t("auth.toolow.teacher"),
            type: "warning"
          });
          return;
        }
      } else if (to.matched.some(record => record.meta.teacher)) {
        if (!(store.getters["user/isTeacher"] || store.getters["user/isAdmin"])) {
          Vue.notify({
            title: i18n.t("auth.denied"),
            text: i18n.t("auth.toolow.admin"),
            type: "warning"
          });
          return;
        }
      }
    }
  }
  next();
});

export default router