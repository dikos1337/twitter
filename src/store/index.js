import Vue from "vue";
import Vuex from "vuex";
import apiUrls from "./apiUrls";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    authUser: {}
  },
  mutations: {
    setAuthUser(state, { authUser, isAuthenticated }) {
      Vue.set(state, "authUser", authUser);
      Vue.set(state, "isAuthenticated", isAuthenticated);
    }
    // SET_NAME: (state, { name, isAuthenticated }) => {
    //   state.authUser.name = name;
    //   state.isAuthenticated = isAuthenticated;
    // }
  },
  actions: {
    checkAuthentication(context) {
      console.log("checkAuthentication called from store");
      console.log("checkAuthentication context", context);

      if (context.state.isAuthenticated === false) {
        // let context = this;
        axios
          .get(context.rootState.apiUrls.accounts.current)
          .then(response => {
            console.log("context.rootState.apiUrls.accounts.current");
            // FIXME use mutations
            context.commit("setAuthUser", {
              authUser: response.data,
              isAuthenticated: true
            });
            // context.state.authUser = response.data;
            // context.state.isAuthenticated = true;
          })
          .catch(error => {
            console.error(
              "context.$store.state.apiUrls.accounts.current error",
              error
            );
            // TODO redirect to /
          });
      }
    }
  },
  getters: {
    getUserSlug(state) {
      return state.authUser.slug;
    },
    getIsAuthenticatedStatus(state) {
      return state.isAuthenticated;
    }
  },
  modules: {
    apiUrls
  }
});
