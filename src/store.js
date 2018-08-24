import Vuex from "vuex";
import { $http } from "./plugins/httpClient";

export default () => {
  return new Vuex.Store({
    state: {
      token: null,
      user: null,
      data: null
    },
    mutations: {
      setToken(state, value) {
        state.token = value;
      },
      setUser(state, value) {
        state.user = value;
      },
      setData(state, value) {
        state.data = value;
      }
    },
    actions: {
      async onHttpRequest({ dispatch }, { route }) {
        if (route.fullPath === "/private") {
          await dispatch("getData", "from onHttpRequest");
        }
      },

      async login({ commit }, name) {
        const { data } = await $http.login(name);

        commit("setToken", data.token);
        commit("setUser", data.user);
      },

      async logout() {
        $http.logout();

        commit("setToken", null);
        commit("setUser", null);
      },

      async getData({ commit }, from) {
        const { data } = await $http.private();
        data.from = from;
        commit("setData", data);
      }
    }
  });
};
