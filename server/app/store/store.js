import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: {
    },
    requested: false,
    token: (localStorage.token ? localStorage.token : ''),
    logged: (localStorage.token ? true : false),
    games: {
      id: '',
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
  getters,
  mutations,
  actions
});
