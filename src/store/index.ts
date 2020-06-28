import Vue from 'vue';
import Vuex from 'vuex';

import stack from './stack.ts';
import auth from './auth.ts';
import list from './list.ts';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    stack, auth, list,
  },
});
