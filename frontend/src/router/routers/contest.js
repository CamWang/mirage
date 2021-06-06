import Head from '@/components/Head';
import Foot from '@/components/Foot';

export default [{
  path: "/contest",
  components: {
    head: Head,
    default: () => import("@/views/Contest.vue"),
    foot: Foot
  },
  children: [
    {
      path: '/',
      name: "contestList",
      component: () => import("@/components/ContestList.vue"),
    },
    {
      path: 'detail/:id',
      name: "contestDetail",
      component: () => import("@/components/ContestDetail.vue"),
      children: [
        {
          path: "/",
          name: "contestDetail",
          component: () => import("@/components/contest/Detail.vue")
        },
        {
          path: "rank",
          name: "contestRank",
          component: () => import("@/components/contest/Rank.vue")
        }
      ]
    }
  ],
}];