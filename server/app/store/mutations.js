import _ from 'lodash';

export default {
  login(state, token) {
    state.logged = true;
    state.token = token;
    localStorage.token = token;
  },
  logout(state) {
    state.user = {};
    state.logged = false;
    state.user.requested = false;
    state.token = '';
    state.currentGroup = {};
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
  incrementAttemps(state, game) {
    if(game == 'matching')
      state.games.matching.done += 1;
    else if(game == 'snake')
      state.games.snake.done += 1;
    else if(game == 'flashcards')
      state.games.flashcards.done += 1;
    else if(game == 'scramble')
      state.games.scramble.done += 1;
  },
  gameFinished(state, game) {
    state.games[game].win = true;
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
    state.requested = true;
  }
}
