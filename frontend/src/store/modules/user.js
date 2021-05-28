const state = {
  user: null
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  removeUser(state) {
    state.user = null;
  }
}

const actions = {
  /**
   * login action
   * @param {object} context Vuex context, {commit,state} commit is for mutations.
   * @param {object} user    user entity
   * @param {function} success success callback
   * @param {function} logined already logined callback
   * @example store.dispatch('login', user)
   */
  login(context, params) {
    if (context.state.user) {
      params.logined();
      return;
    }
    if (process.env.NODE_ENV === "development") {
      console.log("[vuex] user login: ", params.data);
    }
    window.sessionStorage.setItem('user', params.data);
    context.commit('setUser', params.data);
    params.success();
  },

  /**
   * 
   * @param {object} context 
   * @param {function} success  success logout callback
   * @param {function} logouted logout callback
   */
  logout(context, params) {
    if (!context.state.user) {
      params.logouted();
      return;
    }
    window.sessionStorage.removeItem('user', user);
    context.commit('removeUser');
    params.success();
  }
}

const getters = {
  getLoginState(state) {
    return !!state.user;
  },
  getUser(state) {
    return state.user;
  },
  isAdmin(state) {
    return state.user && state.user.role === "admin";
  },
  isTeacher(state) {
    return state.user && state.user.role === "teacher";
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}