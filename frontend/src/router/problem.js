import Head from '../components/Head';
import Foot from '../components/Foot';

export default [{
  path: "/problem",
  components: {
    head: Head,
    default: () => import("../views/Problem.vue"),
    foot: Foot
  },
  children: [
    {
      path: '/',
      name: "problemList",
      component: () => import("../components/ProblemList.vue"),
    },
    {
      path: 'detail/:id',
      name: "problemDetail",
      component: () => import("../components/ProblemDetail.vue"),
    }
  ],
  meta: {
    requiresAuth: false
  }
}];