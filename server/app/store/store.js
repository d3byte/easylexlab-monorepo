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
    currentGroup: {},
    games: {
      matching: false,
      flashcards: false,
      snake: false,
      scramble: false,
      attempts: 0,
      showTest: false,
      testAvailable: false
    }
  },
  getters,
  mutations,
  actions
});
