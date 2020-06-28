import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@fortawesome/fontawesome-free/css/all.css';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'fa',
  },
  theme: {
    themes: {
      light: {
        tred: '#F44336',
        tgreen: '#4CAF50',
        tblue: '#2196F3',
        tyellow: '#FFC107',
        hookle: '#f50057',
      },
    },
  },
});
