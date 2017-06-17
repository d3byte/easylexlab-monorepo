export default {
  login({ commit }, token) {
    commit('login', token);
  },
  logout({ commit }) {
    commit('logout');
  }
}
