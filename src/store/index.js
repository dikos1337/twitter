import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default new Vuex.Store({
  state: {
    authUser: {},
    isAuthenticated: false,
    jwt: localStorage.getItem("token"),
    endpoints: {
      obtainJWT: "/api/v1/auth/obtain_token/",
      refreshJWT: "/api/v1/auth/refresh_token/",
      baseUrl: "/api/v1/"
    }
  },
  // getters: {
  //   isAuthenticated: () => {
  //     return this.state.isAuthenticated;
  //   }
  // },
  mutations: {
    // toggleStateFIXME(state) {
    //   state.isAuthenticated = !state.isAuthenticated;
    // },
    setAuthUser(state, { authUser, isAuthenticated }) {
      Vue.set(state, "authUser", authUser);
      Vue.set(state, "isAuthenticated", isAuthenticated);
    },
    updateToken(state, newToken) {
      // TODO: For security purposes, take localStorage out of the project.
      localStorage.setItem("token", newToken);
      state.jwt = newToken;
    },
    removeToken(state) {
      // TODO: For security purposes, take localStorage out of the project.
      localStorage.removeItem("token");
      state.jwt = null;
    }
  },
  actions: {},
  modules: {}
});
