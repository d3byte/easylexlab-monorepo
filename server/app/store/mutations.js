import _ from 'lodash';

export default {
  login(state, token) {
    state.user.logged = true;
    state.user.token = token;
    localStorage.token = token;
  },
  logout(state) {
    state.header.showLogin = false;
    state.user.logged = false;
    state.user.token = '';
    localStorage.token = '';
  },
  hideOrShowLogin(state) {
    state.header.showLogin = !state.header.showLogin;
  },
  addTests(state, stack) {
    state.currentGroup._tests = stack;
  },
  showMatching(state) {
    state.games.matching = true;
    state.games.flashcards = false;
  },
  showFlashcards(state) {
    state.games.flashcards = true;
    state.games.matching = false;
  },
  hideGames(state) {
    state.games.flashcards = false;
    state.games.matching = false;
  },
  showOrHideTest(state) {
    state.games.showTest = !state.games.showTest;
  },
  incrementAttemps(state) {
    state.games.attempts += 1;
  },
  zeroAttempts(state) {
    state.games.attempts = 0;
  },
  testAvailable(state) {
    state.games.testAvailable = true;
  },
  testNotAvailable(state) {
    state.games.testAvailable = false;
  },
  requestedIsTrue(state) {
    state.user.requested = true;
  },
  changeCurrentGroup(state, newGroup) {
    state.currentGroup = newGroup;
  },
  userInfo(state, userInfo) {
    _.assign(state.user, userInfo);
    state.user.requested = true;
  }
}
