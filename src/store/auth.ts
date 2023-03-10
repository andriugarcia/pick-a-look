import Axios from "axios";

export default {
  namespaced: true,
  state: {
    user: {},
    logged: false,
  },

  mutations: {
    setToken(_, token): void {
      localStorage.setItem("token", JSON.stringify(token));
      Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },

    setLogged(state, data) {
      state.logged = data;
    },

    setUser(state, data) {
      state.user = data;
    },

    setFilters(state, data) {
      state.user.filters = data;
    },

    setGenre(state, data) {
      state.user.genre = data;
    },

    setCountry(_, country) {
      console.log(country);
      Axios.defaults.headers.common.Country = country;
    },

    clear(state) {
      state.user = {};
    },
  },

  getters: {
    getToken(): string | null {
      if (localStorage.getItem("token") === "undefined") {
        // Si no hay ningún token en cache lo creamos vacío
        localStorage.setItem("token", JSON.stringify(""));
        return null;
      }

      return JSON.parse(localStorage.getItem("token"));
    },
  },

  actions: {
    async getUser({ commit }) {
      console.log("GETTING USER");
      try {
        let { data } = await Axios.get(`${process.env.VUE_APP_ENDPOINT}/getMe`);
        console.log(data);
        commit("setUser", data);
        commit("setLogged", true);
      } catch (err) {
        commit("setLogged", false);
        console.error(err);
      }
    },
    async checkLogged({ commit, getters, dispatch }) {
      const token = getters.getToken;
      if (typeof token !== "undefined") {
        try {
          // Hacemos que Axios lo incluya siempre en el header de todas las peticiones
          Axios.defaults.headers.common = {
            Authorization: `Bearer ${token}`,
          };
          dispatch("getUser");

          if (!(await dispatch("stack/fetch", {}, { root: true }))) {
            commit(
              "stack/updateCards",
              [
                {
                  type: "welcome",
                },
                {
                  type: "login",
                },
              ],
              { root: true }
            );
          }
        } catch (err) {
          console.error("La sesión ha caducado", err);
          return false;
        }
      } else {
        commit(
          "stack/updateCards",
          [
            {
              type: "login",
            },
          ],
          { root: true }
        );
      }
      return false;
    },

    async logout({ commit }) {
      commit("clear");
      commit("stack/clear", {}, { root: true });
      commit("setToken", "");
      commit("setLogged", false);
      commit("setUser", {});
      commit(
        "stack/updateCards",
        [
          {
            type: "login",
          },
        ],
        { root: true }
      );
    },
    async signinGoogle({ commit, dispatch }, token): Promise<boolean> {
      try {
        commit("setToken", token);
        await dispatch("getUser");
        const result = await dispatch("stack/fetch", {}, { root: true });
        return result;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    async signin({ commit, dispatch }, { email, password }): Promise<boolean> {
      console.log("SIGNIN");

      try {
        const { data } = await Axios.post(
          `${process.env.VUE_APP_ENDPOINT}/signin`,
          {
            email,
            password,
          },
          {
            auth: {
              username: email,
              password,
            },
          }
        );

        console.log(data.accessToken);
        commit("setToken", data.accessToken);
        await dispatch("getUser");
        const result = await dispatch("stack/fetch", {}, { root: true });
        return result;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    async signup({ commit, dispatch }, { email, password }): Promise<boolean> {
      console.log("SIGNUP");

      try {
        const { data } = await Axios.post(
          `${process.env.VUE_APP_ENDPOINT}/signup`,
          {
            email,
            password,
          }
        );

        console.log(data);
        commit("setToken", data.token);
        await dispatch("getUser");
        dispatch("stack/fetchPopulars", {}, { root: true });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
