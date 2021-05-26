import Head from '../components/Head';
import Foot from '../components/Foot';

export default [{
  path: "/contest",
  components: {
    head: Head,
    default: () => import("../views/Contest.vue"),
    foot: Foot
  },
  children: [
    {
      path: '/',
      name: "contestList",
      component: () => import("../components/ContestList.vue"),
    },
    {
      path: 'detail',
      component: () => import("../components/ContestDetail.vue"),
    }
  ],
  meta: {
    requiresAuth: false
  }
}];