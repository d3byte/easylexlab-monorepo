'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  login: function login(state, token) {
    state.logged = true;
    state.token = token;
    localStorage.token = token;
  },
  logout: function logout(state) {
    state.user = {};
    state.logged = false;
    state.user.requested = false;
    state.token = '';
    state.currentGroup = {};
    localStorage.token = '';
    localStorage.city = '';
    localStorage.firstName = '';
    localStorage.lastName = '';
  },
  hideOrShowLogin: function hideOrShowLogin(state) {
    state.header.showLogin = !state.header.showLogin;
  },
  addTests: function addTests(state, stack) {
    state.currentGroup._tests = stack;
  },
  showMatching: function showMatching(state) {
    state.games.flashcards.show = false;
    state.games.snake.show = false;
    state.games.matching.show = true;
    state.games.scramble.show = false;
    state.games.typein.show = false;
  },
  showFlashcards: function showFlashcards(state) {
    state.games.snake.show = false;
    state.games.matching.show = false;
    state.games.flashcards.show = true;
    state.games.scramble.show = false;
    state.games.typein.show = false;
  },
  showSnake: function showSnake(state) {
    state.games.flashcards.show = false;
    state.games.matching.show = false;
    state.games.snake.show = true;
    state.games.scramble.show = false;
    state.games.typein.show = false;
  },
  showScramble: function showScramble(state) {
    state.games.flashcards.show = false;
    state.games.matching.show = false;
    state.games.snake.show = false;
    state.games.scramble.show = true;
    state.games.typein.show = false;
  },
  showTypein: function showTypein(state) {
    state.games.flashcards.show = false;
    state.games.matching.show = false;
    state.games.snake.show = false;
    state.games.scramble.show = false;
    state.games.typein.show = true;
  },
  setGames: function setGames(state, attempts) {
    state.games.flashcards.attempts = attempts.flashcards;
    state.games.matching.attempts = attempts.matching;
    state.games.snake.attempts = attempts.snake;
    state.games.scramble.attempts = attempts.scramble;
    state.games.typein.attempts = attempts.typein;
  },
  hideGames: function hideGames(state) {
    state.games.flashcards.show = false;
    state.games.matching.show = false;
    state.games.scramble.show = false;
    state.games.snake.show = false;
    state.games.typein.show = false;
  },
  showTest: function showTest(state) {
    state.games.showTest = true;
  },
  hideTest: function hideTest(state) {
    state.games.showTest = false;
  },
  incrementAttempts: function incrementAttempts(state, game) {
    if (game == 'matching') state.games.matching.done++;else if (game == 'snake') state.games.snake.done++;else if (game == 'flashcards') state.games.flashcards.done++;else if (game == 'scramble') state.games.scramble.done++;else if (game == 'typein') state.games.typein.done++;
  },
  gameFinished: function gameFinished(state, game) {
    if (game == 'matching') state.games.matching.win = true;else if (game == 'snake') state.games.snake.win = true;else if (game == 'flashcards') state.games.flashcards.win = true;else if (game == 'scramble') state.games.scramble.win = true;else if (game == 'typein') {
      state.games.typein.win = true;
    }
  },
  zeroAttempts: function zeroAttempts(state) {
    state.games.flashcards.done = 0;
    state.games.snake.done = 0;
    state.games.scramble.done = 0;
    state.games.matching.done = 0;
    state.games.typein.done = 0;
  },
  testAvailable: function testAvailable(state) {
    state.games.testAvailable = true;
  },
  testNotAvailable: function testNotAvailable(state) {
    state.games.testAvailable = false;
    state.finishedGames = state.finishedGames.map(function (game) {
      return false;
    });
    state.games.matching.win = false;
    state.games.snake.win = false;
    state.games.flashcards.win = false;
    state.games.scramble.win = false;
    state.games.typein.win = false;
  },
  requestedIsTrue: function requestedIsTrue(state) {
    state.user.requested = true;
  },
  changeCurrentGroup: function changeCurrentGroup(state, newGroup) {
    state.currentGroup = newGroup;
  },
  userInfo: function userInfo(state, _userInfo) {
    _lodash2.default.assign(state.user, _userInfo);
    state.requested = true;
  }
};
//# sourceMappingURL=mutations.js.map