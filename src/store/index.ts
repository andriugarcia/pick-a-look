import Vue from 'vue';
import Vuex from 'vuex';

import stack from './stack';
import auth from './auth';
import list from './list';

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
