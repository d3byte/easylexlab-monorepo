'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = undefined;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _mutations = require('./mutations');

var _mutations2 = _interopRequireDefault(_mutations);

var _getters = require('./getters');

var _getters2 = _interopRequireDefault(_getters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

var store = exports.store = new _vuex2.default.Store({
  state: {
    user: {},
    requested: false,
    token: localStorage.token ? localStorage.token : '',
    logged: localStorage.token ? true : false,
    currentGroup: {},
    games: {
      matching: {
        show: false,
        win: false,
        attempts: 0,
        done: 0
      },
      flashcards: {
        show: false,
        win: false,
        attempts: 0,
        done: 0
      },
      snake: {
        show: false,
        win: false,
        attempts: 0,
        done: 0
      },
      scramble: {
        show: false,
        win: false,
        attempts: 0,
        done: 0
      },
      typein: {
        show: false,
        win: false,
        attempts: 0,
        done: 0
      },
      showTest: false,
      testAvailable: false
    },
    finishedGames: [false, false, false, false, false]
  },
  getters: _getters2.default,
  mutations: _mutations2.default,
  actions: _actions2.default
});
//# sourceMappingURL=store.js.map