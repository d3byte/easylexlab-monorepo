'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  login: function login(_ref, token) {
    var commit = _ref.commit;

    commit('login', token);
  },
  logout: function logout(_ref2) {
    var commit = _ref2.commit;

    commit('logout');
  },
  hideOrShowLogin: function hideOrShowLogin(_ref3) {
    var commit = _ref3.commit;

    commit('hideOrShowLogin');
  },
  addTests: function addTests(_ref4, stacks) {
    var commit = _ref4.commit;

    commit('addTests', stacks);
  },
  showMatching: function showMatching(_ref5) {
    var commit = _ref5.commit;

    commit('showMatching');
  },
  showFlashcards: function showFlashcards(_ref6) {
    var commit = _ref6.commit;

    commit('showFlashcards');
  },
  showSnake: function showSnake(_ref7) {
    var commit = _ref7.commit;

    commit('showSnake');
  },
  showScramble: function showScramble(_ref8) {
    var commit = _ref8.commit;

    commit('showScramble');
  },
  showTypein: function showTypein(_ref9) {
    var commit = _ref9.commit;

    commit('showTypein');
  },
  setGames: function setGames(_ref10, attempts) {
    var commit = _ref10.commit;

    commit('setGames', attempts);
  },
  gameFinished: function gameFinished(_ref11, game) {
    var commit = _ref11.commit;

    commit('gameFinished', game);
  },
  hideGames: function hideGames(_ref12) {
    var commit = _ref12.commit;

    commit('hideGames');
  },
  showTest: function showTest(_ref13) {
    var commit = _ref13.commit;

    commit('showTest');
  },
  hideTest: function hideTest(_ref14) {
    var commit = _ref14.commit;

    commit('hideTest');
  },
  incrementAttempts: function incrementAttempts(_ref15, game) {
    var commit = _ref15.commit;

    commit('incrementAttempts', game);
  },
  zeroAttempts: function zeroAttempts(_ref16) {
    var commit = _ref16.commit;

    commit('zeroAttempts');
  },
  testAvailable: function testAvailable(_ref17) {
    var commit = _ref17.commit;

    commit('testAvailable');
  },
  testNotAvailable: function testNotAvailable(_ref18) {
    var commit = _ref18.commit;

    commit('testNotAvailable');
  },
  requestedIsTrue: function requestedIsTrue(_ref19) {
    var commit = _ref19.commit;

    commit('requestedIsTrue');
  },
  changeCurrentGroup: function changeCurrentGroup(_ref20, newGroup) {
    var commit = _ref20.commit;

    commit('changeCurrentGroup', newGroup);
  },
  userInfo: function userInfo(_ref21, _userInfo) {
    var commit = _ref21.commit;

    commit('userInfo', _userInfo);
  }
};
//# sourceMappingURL=actions.js.map