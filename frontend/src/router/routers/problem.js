import Head from '@/components/Head';
import Foot from '@/components/Foot';

export default [{
  path: "/problem",
  components: {
    head: Head,
    default: () => import("@/views/Problem.vue"),
    foot: Foot
  },
  children: [
    {
      path: '/',
      name: "problemList",
      component: () => import("@/components/ProblemList.vue"),
      meta: { auth: true, teacher: true }
    },
    {
      path: 'detail/:id',
      name: "problemDetail",
      component: () => import("@/components/ProblemDetail.vue"),
    }
  ],
}];