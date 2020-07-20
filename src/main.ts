import Vue from 'vue';
import VueMasonry from 'vue-masonry-css';
import App from './App.vue';
import './registerServiceWorker.ts';
import router from './router/index';
import store from './store/index';
import vuetify from './plugins/vuetify';
import VueMeta from 'vue-meta'

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

Vue.use(VueMasonry);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
