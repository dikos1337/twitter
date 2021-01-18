import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authUser: {
      name: "store name"
    },
    isAuthenticated: false
  },
  mutations: {
    // setAuthUser(state, { authUser, isAuthenticated }) {
    //   Vue.set(state, "authUser", authUser);
    //   Vue.set(state, "isAuthenticated", isAuthenticated);
    // }
    SET_NAME: (state, { name, isAuthenticated }) => {
      state.authUser.name = name;
      state.isAuthenticated = isAuthenticated;
    }
  },
  actions: {
    SET_NAME: (context, payload) => {
      context.commit("SET_NAME", payload);
    }
  },
  getters: {
    NAME: state => {
      return state.authUser.name;
    }
  },
  modules: {}
});
