import Head from '@/components/Head';
import Foot from '@/components/Foot';

export default [{
  path: "/profile",
  components: {
    head: Head,
    default: () => import("@/views/Profile.vue"),
    foot: Foot
  },
  children: [
    {
      path: '/',
      name: "problemList",
      component: () => import("@/components/Profile.vue"),
      // meta: { auth: true, teacher: true }
    }
  ],
}];