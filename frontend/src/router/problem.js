import Head from '../components/Head';
import Foot from '../components/Foot';

export default [{
  path: "/problem",
  name: "problem",
  components: {
    head: Head,
    default: () => import("../views/Problem.vue"),
    foot: Foot
  },
  children: [
    {
      path: '/',
      component: () => import("../components/ProblemList.vue"),
    },
    {
      path: 'detail',
      component: () => import("../components/ProblemDetail.vue"),
    }
  ],
  meta: {
    requiresAuth: false
  }
}];