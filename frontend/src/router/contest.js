import Head from '../components/Head';
import Foot from '../components/Foot';

export default [{
  path: "/contest",
  name: "contest",
  components: {
    head: Head,
    default: () => import("../views/Contest.vue"),
    foot: Foot
  },
  children: [
    {
      path: '/',
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