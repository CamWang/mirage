const state = () => ({
  user: window.sessionStorage.getItem('user') || null
});

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
   */
  login(context, user, success, logined) {
    if (context.state.user) {
      logined();
      return;
    }
    window.sessionStorage.setItem('user', user);
    context.commit('setUser', user);
    success();
  },

  /**
   * 
   * @param {object} context 
   * @param {function} success 
   * @param {function} logouted 
   */
  logout(context, success, logouted) {
    if (!context.state.user) {
      logouted();
      return;
    }
    window.sessionStorage.removeItem('user', user);
    context.commit('removeUser');
    success();
  }
}

const getters = {
  getLoginState(state) {
    return !!state.user;
  },
  getUser(state) {
    return state.user;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}