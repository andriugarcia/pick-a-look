import Vue from 'vue';
import VueMasonry from 'vue-masonry-css';
import App from './App.vue';
import './registerServiceWorker.ts';
import router from './router/index';
import store from './store/index';
import vuetify from './plugins/vuetify';
import VueMeta from 'vue-meta'
import VueI18n from 'vue-i18n'
import messages from './locales/index'

console.log(messages)
Vue.use(VueI18n)
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
})

Vue.use(VueMasonry);

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
