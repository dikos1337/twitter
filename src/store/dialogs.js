import Vue from "vue";

export default {
  state: {
    signup: false,
    login: false,
    makeTweet: false,
    makeReply: { state: false, tweetData: {} }
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
    },
    toggleReplyDialogState(state) {
      state.makeReply.state = !state.makeReply.state;
    },
    setReplyTweetData(state, tweetData) {
      state.makeReply.tweetData = tweetData;
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
    },
    getDialogReplyState(state) {
      return state.makeReply.state;
    },
    getReplyTweetData(state) {
      return state.makeReply.tweetData;
    }
  }
};
