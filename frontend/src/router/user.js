import Head from '../components/Head';
import Foot from '../components/Foot';

export default [{
  path: "/register",
  name: "register",
  components: {
    head: Head,
    default: () => import("../views/Register.vue"),
    foot: Foot
  }
},{
  path: "/login",
  name: "login",
  components: {
    head: Head,
    default: () => import("../views/Login.vue"),
    foot: Foot
  }
}];