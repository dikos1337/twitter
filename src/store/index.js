import Vue from "vue";
import Vuex from "vuex";
import apiUrls from "./apiUrls";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {
    // setAuthUser(state, { authUser, isAuthenticated }) {
    //   Vue.set(state, "authUser", authUser);
    //   Vue.set(state, "isAuthenticated", isAuthenticated);
    // }
    // SET_NAME: (state, { name, isAuthenticated }) => {
    //   state.authUser.name = name;
    //   state.isAuthenticated = isAuthenticated;
    // }
  },
  actions: {
    // SET_NAME: (context, payload) => {
    //   context.commit("SET_NAME", payload);
    // }
  },
  getters: {
    // NAME: state => {
    //   return state.authUser.name;
    // },
    // IS_AUTHENTICATED: state => {
    //   return state.isAuthenticated;
    // }
  },
  modules: {
    apiUrls
  }
});
