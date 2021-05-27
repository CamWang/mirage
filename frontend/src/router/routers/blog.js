import Head from '@/components/Head';
import Foot from '@/components/Foot';

export default [{
  path: "/blog",
  components: {
    head: Head,
    default: () => import("@/views/Blog.vue"),
    foot: Foot
  },
  children: [
    {
      path: '/',
      name: "blogList",
      component: () => import("@/components/BlogList.vue"),
    },
    {
      path: 'detail',
      name: 'blogDetail',
      component: () => import("@/components/BlogDetail.vue"),
    }
  ],
  meta: {
    requiresAuth: false
  }
}];