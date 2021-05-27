import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

// TODO theme manage, language manage
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    user,
  },
  strict: debug,
})