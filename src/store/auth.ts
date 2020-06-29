import Axios from 'axios';

export default {
  namespaced: true,
  state: {
    user: {},
    logged: false,
  },

  mutations: {
    setToken(_, token) : void {
      localStorage.setItem('token', JSON.stringify(token));
      Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },

    setLogged(state, data) {
      state.logged = data;
    },

    clear(state) {
      state.user = {};
    },
  },

  getters: {
    getToken() : string | null {
      if (localStorage.getItem('token') === 'undefined') {
        // Si no hay ningún token en cache lo creamos vacío
        localStorage.setItem('token', JSON.stringify(''));
        return null;
      }

      return JSON.parse(localStorage.getItem('token'));
    },
  },

  actions: {
    async checkLogged({ commit, getters, dispatch }) {
      const token = getters.getToken;
      if (typeof token !== 'undefined') {
        try {
          // Hacemos que Axios lo incluya siempre en el header de todas las peticiones
          Axios.defaults.headers.common = {
            Authorization: `Bearer ${token}`,
          };
          commit('setLogged', true);

          if (!(await dispatch('stack/fetch', {}, { root: true }))) {
            commit('stack/updateCards', [
              // {
              //   type: 'welcome',
              // },
              {
                type: 'login',
              },
            ], { root: true });
            commit('setLogged', false);
          }
        } catch (err) {
          console.error('La sesión ha caducado', err);
          return false;
        }
      } else {
        commit('stack/updateCards', [
          {
            type: 'login',
          },
        ], { root: true });
      }
      return false;
    },

    async logout({ commit }) {
      commit('clear');
      commit('stack/clear', {}, { root: true });
      commit('setToken', '');
      commit('stack/updateCards', [
        {
          type: 'login',
        },
      ], { root: true });
    },
    async signin({ commit, dispatch }, { email, password }) : Promise<boolean> {
      console.log('SIGNIN');

      try {
        const { data } = await Axios.post('https://pickalook-server.herokuapp.com/signin', {
          email,
          password,
        });

        console.log(data);
        commit('setToken', data.token);
        const result = await dispatch('stack/fetch', {}, { root: true });
        commit('setLogged', result);
        return result;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    async signup({ commit, dispatch }, { email, password }) : Promise<boolean> {
      console.log('SIGNUP');

      try {
        const { data } = await Axios.post('https://pickalook-server.herokuapp.com/signup', {
          email,
          password,
        });

        console.log(data);
        commit('setToken', data.token);
        commit('setLogged', true);
        dispatch('stack/fetchPopulars', {}, { root: true });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
