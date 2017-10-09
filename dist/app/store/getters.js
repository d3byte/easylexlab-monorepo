"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  userToken: function userToken(state) {
    return state.token;
  },
  loginState: function loginState(state) {
    return state.logged;
  },
  currentGroup: function currentGroup(state) {
    return state.currentGroup;
  },
  user: function user(state) {
    return state.user;
  },
  showTest: function showTest(state) {
    return state.games.showTest;
  },
  games: function games(state) {
    return state.games;
  },
  attempts: function attempts(state) {
    return state.games.attempts;
  },
  finishedGames: function finishedGames(state) {
    var gamesConditions = [];
    gamesConditions.push(state.games.matching.win);
    gamesConditions.push(state.games.flashcards.win);
    gamesConditions.push(state.games.snake.win);
    gamesConditions.push(state.games.scramble.win);
    gamesConditions.push(state.games.typein.win);
    return gamesConditions;
  },
  testAvailable: function testAvailable(state) {
    return state.games.testAvailable;
  },
  requested: function requested(state) {
    return state.requested;
  }
};
//# sourceMappingURL=getters.js.map