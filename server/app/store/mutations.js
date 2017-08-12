import _ from 'lodash';

export default {
  login(state, token) {
    state.user.logged = true;
    state.token = token;
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
    state.games.flashcards = false;
    state.games.snake = false;
    state.games.matching = true;
    state.games.srcamble = false;
  },
  showFlashcards(state) {
    state.games.snake = false;
    state.games.matching = false;
    state.games.flashcards = true;
    state.games.srcamble = false;
  },
  showSnake(state) {
    state.games.flashcards = false;
    state.games.matching = false
    state.games.snake = true;
    state.games.srcamble = false;
  },
  showScramble(state) {
    state.games.flashcards = false;
    state.games.matching = false
    state.games.snake = false;
    state.games.scramble = true;
  },
  hideGames(state) {
    state.games.flashcards = false;
    state.games.matching = false;
    state.games.scramble = false;
    state.games.snake = false;
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
