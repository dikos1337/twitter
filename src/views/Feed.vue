<template>
  <v-main>
    <v-container pa-0 fluid style="max-width: 1000px; min-width: 450px">
      <v-row class="mx-auto" no-gutters>
        <v-col cols="auto">
          <LeftSideBar />
        </v-col>
        <v-col>
          <TweetInputForm />
          <v-list color="transparent" v-if="feedTweets.length">
            <v-list-item
              v-for="tweet in feedTweets"
              :key="tweet.id"
              :to="`/${tweet.user.slug}/status/${tweet.id}`"
              class="pa-0"
            >
              <v-list-item-content>
                <TweetCard :tweet="tweet" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list color="transparent" v-else>
            <v-list-item-content
              ><v-list-item>
                Нет твитов
                <!-- TODO FIXME придумать что нибудь -->
              </v-list-item></v-list-item-content
            >
          </v-list>
        </v-col>
        <v-col cols="auto">
          <RightSideBar />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import TweetCard from "@/components/TweetCard.vue";
import LeftSideBar from "@/components/LeftSideBar.vue";
import RightSideBar from "@/components/RightSideBar/RightSideBar.vue";
import TweetInputForm from "@/components/TweetInputForm.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Feed",
  components: {
    TweetCard,
    LeftSideBar,
    RightSideBar,
    TweetInputForm
  },

  data: () => ({
    feedTweets: []
  }),
  methods: {
    ...mapActions(["checkAuthentication"]),
    fetchTweets() {
      let context = this;
      this.$axios
        .get(context.$store.state.apiUrls.tweet.feed)
        .then(response => {
          this.feedTweets = response.data.results;
          console.log("feedTweets", this.feedTweets);
        })
        .catch(error => {
          console.log("/tweet/feed/", error);
        });
    }
  },
  computed: { ...mapGetters(["getIsAuthenticatedStatus"]) },
  created() {
    // TODO check authenticated if false then redirect
    if (this.getIsAuthenticatedStatus) {
      this.fetchTweets();
    } else {
      let interval = setInterval(() => {
        if (this.getIsAuthenticatedStatus) {
          this.fetchTweets();
          clearInterval(interval);
        }
      }, 100);
    }
  }
};
</script>
