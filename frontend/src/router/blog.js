import Head from '../components/Head';
import Foot from '../components/Foot';

export default [{
  path: "/blog",
  name: "blog",
  components: {
    head: Head,
    default: () => import("../views/Blog.vue"),
    foot: Foot
  },
  children: [
    {
      path: '/',
      component: () => import("../components/BlogList.vue"),
    },
    {
      path: 'detail',
      component: () => import("../components/BlogDetail.vue"),
    }
  ],
  meta: {
    requiresAuth: false
  }
}];