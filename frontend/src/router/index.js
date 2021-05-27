import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store'
import i18n from '@/locale';

import user from './user';
import problem from './problem';
import contest from './contest';
import blog from './blog';

import Head from '@/components/Head';
import Foot from '@/components/Foot';

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

/**
 * login guard
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
            text: i18n.t("auth.toolow", { role: "teacher" }),
            type: "warning"
          });
          return;
        }
      } else if (to.matched.some(record => record.meta.teacher)) {
        if (!(store.getters["user/isTeacher"] || store.getters["user/isAdmin"])) {
          Vue.notify({
            title: i18n.t("auth.denied"),
            text: i18n.t("auth.toolow", { role: "admin" }),
            type: "warning"
          });
          return;
        }
      }
    }
  } else {
    next();
  }
});

export default router