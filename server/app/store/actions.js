export default {
  login({ commit }, token) {
    commit('login', token);
  },
  logout({ commit }) {
    commit('logout');
  },
  hideOrShowLogin({ commit }) {
    commit('hideOrShowLogin');
  },
  changeGroup({ commit }, group) {
    commit('changeGroup', group);
  },
  addTests({ commit }, stacks) {
    commit('addTests', stacks);
  }
}
