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
  addTests({ commit }, stacks) {
    commit('addTests', stacks);
  },
  showMatching({ commit }) {
    commit('showMatching');
  },
  showFlashcards({ commit }) {
    commit('showFlashcards');
  },
  showSnake({ commit }) {
    commit('showSnake');
  },
  showScramble({ commit }) {
    commit('showScramble');
  },
  showTypein({ commit }) {
    commit('showTypein');
  }
  setGames({ commit }, attempts) {
    commit('setGames', attempts);
  },
  gameFinished({ commit }, game) {
    commit('gameFinished', game);
  },
  hideGames({ commit }) {
    commit('hideGames');
  },
  showTest({ commit }) {
    commit('showTest');
  },
  hideTest({ commit }) {
    commit('hideTest');
  },
  incrementAttempts({ commit }, game) {
    commit('incrementAttempts', game);
  },
  zeroAttempts({ commit }) {
    commit('zeroAttempts');
  },
  testAvailable({ commit }) {
    commit('testAvailable');
  },
  testNotAvailable({ commit }) {
    commit('testNotAvailable');
  },
  requestedIsTrue({ commit }) {
    commit('requestedIsTrue');
  },
  changeCurrentGroup({ commit }, newGroup) {
    commit('changeCurrentGroup', newGroup);
  },
  userInfo({ commit }, userInfo) {
    commit('userInfo', userInfo);
  }
}
