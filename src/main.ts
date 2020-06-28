import Vue from 'vue';
import VueMasonry from 'vue-masonry-css';
import App from './App.vue';
import './registerServiceWorker.ts';
import router from './router/index.ts';
import store from './store/index.ts';
import vuetify from './plugins/vuetify.ts';

Vue.use(VueMasonry);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
