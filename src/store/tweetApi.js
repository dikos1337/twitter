import Vue from "vue";
import axios from "axios";

export default {
  state: {
    tweetsToRender: {},
    commentsToRender: {},
    tweetDetails: {}
  },
  mutations: {
    setTweetDetails(state, { tweetDetails }) {
      Vue.set(state, "tweetDetails", tweetDetails);
    },
    setCommentsToRender(state, { commentsToRender }) {
      Vue.set(state, "commentsToRender", commentsToRender);
    },
    setTweetsToRender(state, { tweetsToRender }) {
      Vue.set(state, "tweetsToRender", tweetsToRender);
    }
  },
  actions: {
    fetchTweetDetails(context, { userSlug, tweetId }) {
      axios
        .get(context.rootState.apiUrls.tweet.detail + `${userSlug}/${tweetId}`)
        .then(response => {
          context.commit("setTweetDetails", {
            tweetDetails: response.data
          });
          console.log("setTweetDetails", response.data);
        })
        .catch(error => {
          console.log("/tweet/detail/", error);
        });
    },
    fetchTweetComments(context, { userSlug, tweetId }) {
      axios
        .get(
          context.rootState.apiUrls.tweet.comments + `${userSlug}/${tweetId}`
        )
        .then(response => {
          context.commit("setCommentsToRender", {
            commentsToRender: response.data.results
          });
          console.log("commentsToRender", response.data);
        })
        .catch(error => {
          console.log("/tweet/comments/", error);
        });
    }
  },
  getters: {
    getTweetsToRender(state) {
      return state.tweetsToRender;
    },
    getTweetDetails(state) {
      return state.tweetDetails;
    },
    getCommentsToRender(state) {
      return state.commentsToRender;
    }
  }
};
