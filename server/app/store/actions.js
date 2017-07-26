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
  },
  showMatching({ commit }) {
    commit('showMatching');
  },
  showFlashcards({ commit }) {
    commit('showFlashcards');
  },
  hideGames({ commit }) {
    commit('hideGames');
  },
  showTest({ commit }) {
    commit('showOrHideTest');
  },
  incrementAttemps({ commit }) {
    commit('incrementAttemps');
  },
  zeroAttempts({ commit }) {
    commit('zeroAttempts');
  },
  testAvailable({ commit }) {
    commit('testAvailable');
  },
  testNotAvailable({ commit }) {
    commit('testNotAvailable');
  }
}
