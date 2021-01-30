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
      let urlNext = new URL(tweetsToRender.next);
      // let urlPrevious = new URL(tweetsToAppend.next) // FIX ME (condition) ? :

      state.tweetsToRender = {
        count: tweetsToRender.count,
        next: urlNext.pathname + urlNext.search,
        previous: tweetsToRender.previous,
        results: tweetsToRender.results
      };
    },
    tweetsToRenderAppend(state, { tweetsToAppend }) {
      let urlNext = tweetsToAppend.next ? new URL(tweetsToAppend.next) : null;
      // let urlPrevious = new URL(tweetsToAppend.next) // FIX ME (condition) ? :

      state.tweetsToRender = {
        ...state.tweetsToRender,
        count: tweetsToAppend.count,
        next: urlNext ? urlNext.pathname + urlNext.search : null,
        previous: tweetsToAppend.previous
      };
      state.tweetsToRender.results.push(...tweetsToAppend.results); // append tweets
    }
  },
  actions: {
    fetchFeedTweets(context) {
      axios
        .get(context.rootState.apiUrls.tweet.feed)
        .then(response => {
          context.commit("setTweetsToRender", {
            tweetsToRender: response.data
          });
          console.log("setTweetsToRender", response.data);
        })
        .catch(error => {
          console.log("/tweet/feed/", error);
        });
    },
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
    },
    loadMoreTweets(context) {
      console.log("loadMoreTweets called", context.state.tweetsToRender);
      axios
        .get(context.state.tweetsToRender.next)
        .then(response => {
          context.commit("tweetsToRenderAppend", {
            tweetsToAppend: response.data
          });
          console.log("tweetsToRenderAppend", response.data);
        })
        .catch(error => {
          console.log("loadMoreTweets eror", error);
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
