import Vue from "vue";
import Vuex from "vuex";
import apiUrls from "./apiUrls";
import tweetApi from "./tweetApi";
import dialogs from "./dialogs";
import profile from "./profile";
import axios from "axios";
import router from "@/router";

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
        axios
          .get(context.rootState.apiUrls.accounts.current)
          .then(response => {
            console.log("context.rootState.apiUrls.accounts.current");
            context.commit("setAuthUser", {
              authUser: response.data,
              isAuthenticated: true
            });
          })
          .catch(error => {
            console.error(
              "context.$store.state.apiUrls.accounts.current error",
              error
            );
            router.push({ name: "Home" });
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
    apiUrls,
    tweetApi,
    dialogs,
    profile
  }
});
