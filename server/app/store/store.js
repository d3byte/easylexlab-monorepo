import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: {
      logged: (localStorage.token ? true : false),
      token: (localStorage.token ? localStorage.token : ''),
      groups: []
    },
    header: {
      showLogin: false
    },
    currentGroup: {},
    games: {
      matching: false,
      flashcards: false
    }
  },
  getters,
  mutations,
  actions
});
