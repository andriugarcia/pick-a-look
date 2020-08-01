import Vue from 'vue';
import Vuex from 'vuex';

import stack from './stack';
import auth from './auth';
import list from './list';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    deferredPrompt: {}, // Almacena la gestión instalación de App
    appNotInstalled: false,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    stack, auth, list,
  },
});
