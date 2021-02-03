import axios from "axios";

export default {
  state: {
    profileData: {},
    profileTweets: {}
  },
  mutations: {
    setProfileData(state, { profileData }) {
      state.profileData = profileData;
    },
    setProfileTweets(state, { profileTweets }) {
      let urlNext = profileTweets.next ? new URL(profileTweets.next) : null;
      // let urlPrevious = new URL(tweetsToAppend.next) // FIX ME (condition) ? :

      state.profileTweets = {
        count: profileTweets.count,
        next: urlNext ? urlNext.pathname + urlNext.search : null,
        previous: profileTweets.previous,
        results: profileTweets.results
      };
      console.log("setProfileTweets INSIDE", profileTweets);
      //   state.profileTweets = profileTweets;
    },
    clearProfileData(state) {
      console.log("clearProfileData");
      state.profileData = {};
    },
    profileTweetsAppend(state, { tweetsToAppend }) {
      let urlNext = tweetsToAppend.next ? new URL(tweetsToAppend.next) : null;
      // let urlPrevious = new URL(tweetsToAppend.next) // FIX ME (condition) ? :

      state.profileTweets = {
        ...state.profileTweets,
        count: tweetsToAppend.count,
        next: urlNext ? urlNext.pathname + urlNext.search : null,
        previous: tweetsToAppend.previous
      };
      state.profileTweets.results.push(...tweetsToAppend.results); // append tweets
    }
  },
  actions: {
    fetchProfileData(context, userSlug) {
      // let context = this;
      axios
        .get(context.rootState.apiUrls.accounts.profile + userSlug)
        .then(response => {
          context.commit("setProfileData", { profileData: response.data });
          console.log("setProfileData", response.data);
          console.log("context.rootState", context);
          context.dispatch("fetchProfileTweets", userSlug);
        })
        .catch(error => {
          console.log("setProfileData error", error);
        });
    },
    loadMoreProfileTweets(context) {
      console.log("loadMoreProfileTweets called", context.state.profileTweets);
      axios
        .get(context.state.profileTweets.next)
        .then(response => {
          context.commit("profileTweetsAppend", {
            tweetsToAppend: response.data
          });
          console.log("setProfileTweets", response.data);
        })
        .catch(error => {
          console.log("loadMoreProfileTweets eror", error);
        });
    }
  },
  getters: {
    getProfileTweets(state) {
      return state.profileTweets;
    },
    getPofileData(state) {
      return state.profileData;
    }
  }
};
