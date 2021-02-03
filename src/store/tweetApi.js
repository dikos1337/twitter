import Vue from "vue";
import axios from "axios";

export default {
  state: {
    feedTweets: {},
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
    setFeedTweets(state, { feedTweets }) {
      let urlNext = new URL(feedTweets.next);
      // let urlPrevious = new URL(tweetsToAppend.next) // FIX ME (condition) ? :

      state.feedTweets = {
        count: feedTweets.count,
        next: urlNext.pathname + urlNext.search,
        previous: feedTweets.previous,
        results: feedTweets.results
      };
    },
    feedTweetsAppend(state, { tweetsToAppend }) {
      let urlNext = tweetsToAppend.next ? new URL(tweetsToAppend.next) : null;
      // let urlPrevious = new URL(tweetsToAppend.next) // FIX ME (condition) ? :

      state.feedTweets = {
        ...state.feedTweets,
        count: tweetsToAppend.count,
        next: urlNext ? urlNext.pathname + urlNext.search : null,
        previous: tweetsToAppend.previous
      };
      state.feedTweets.results.push(...tweetsToAppend.results); // append tweets
    },
    clearFeedTweets(state) {
      state.feedTweets = {};
    }
  },
  actions: {
    fetchFeedTweets(context) {
      axios
        .get(context.rootState.apiUrls.tweet.feed)
        .then(response => {
          context.commit("setFeedTweets", {
            feedTweets: response.data
          });
          console.log("setFeedTweets", response.data);
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
    loadMoreFeedTweets(context) {
      console.log("loadMoreFeedTweets called", context.state.feedTweets);
      axios
        .get(context.state.feedTweets.next)
        .then(response => {
          context.commit("feedTweetsAppend", {
            tweetsToAppend: response.data
          });
          console.log("feedTweetsAppend", response.data);
        })
        .catch(error => {
          console.log("loadMoreFeedTweets eror", error);
        });
    },
    fetchProfileTweets(context, userSlug) {
      console.log("fetchProfileTweets called", userSlug);
      axios
        .get(context.rootState.apiUrls.tweet.user + userSlug)
        .then(response => {
          context.commit("setProfileTweets", { profileTweets: response.data });
          console.log("setProfileTweets", response.data);
        })
        .catch(error => {
          console.log("setProfileTweets erro", error);
        });
    }
  },
  getters: {
    getFeedTweets(state) {
      return state.feedTweets;
    },
    getTweetDetails(state) {
      return state.tweetDetails;
    },
    getCommentsToRender(state) {
      return state.commentsToRender;
    }
  }
};
