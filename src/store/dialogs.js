import Vue from "vue";

export default {
  state: {
    signup: false,
    login: false,
    makeTweet: false
  },
  mutations: {
    toggleSignupDialogState(state) {
      Vue.set(state, "signup", !state.signup);
    },
    toggleLoginDialogState(state) {
      Vue.set(state, "login", !state.login);
    },
    toggleMakeTweetDialogState(state) {
      Vue.set(state, "makeTweet", !state.makeTweet);
    }
  },
  actions: {},
  getters: {
    getDialogSignupState(state) {
      return state.signup;
    },
    getDialogLoginState(state) {
      return state.login;
    },
    getDialogMakeTweetState(state) {
      return state.makeTweet;
    }
  }
};
