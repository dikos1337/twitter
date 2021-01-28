<template>
  <v-main>
    <v-container pa-0 fluid style="max-width: 1000px; min-width: 450px">
      <v-row class="mx-auto" no-gutters>
        <v-col cols="auto">
          <LeftSideBar />
        </v-col>
        <v-col>
          <v-list color="transparent" class="py-0">
            <v-list-item class="pa-0">
              <v-list-item-content class="py-0">
                <TweetCard :tweet="getTweetDetails" />
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="pa-0"
              v-for="comment in getCommentsToRender"
              :key="comment.id"
            >
              <v-list-item-content class="py-0">
                <CommentCard :comment="comment" />
              </v-list-item-content>
            </v-list-item>
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
import CommentCard from "@/components/CommentCard.vue";
import LeftSideBar from "@/components/LeftSideBar.vue";
import RightSideBar from "@/components/RightSideBar/RightSideBar.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TweetDetails",
  components: {
    LeftSideBar,
    RightSideBar,
    TweetCard,
    CommentCard
  },
  data() {
    return {
      userSlug: this.$route.params.userSlug,
      tweetId: this.$route.params.tweetId,
      userData: {},
      tweet: {},
      comments: {}
    };
  },
  methods: {
    ...mapActions(["fetchTweetDetails", "fetchTweetComments"])
    // fetchTweetDetails() {
    //   let context = this;
    //   this.$axios
    //     .get(
    //       context.$store.state.apiUrls.tweet.detail +
    //         `${context.userSlug}/${context.tweetId}`
    //     )
    //     .then(response => {
    //       this.tweet = response.data;
    //       console.log("tweet", this.tweet);
    //     })
    //     .catch(error => {
    //       console.log("/tweet/detail/", error);
    //       context.$router.push({ name: "NotFound" });
    //     });
    // },
    // fetchTweetComments() {
    //   let context = this;
    //   this.$axios
    //     .get(
    //       context.$store.state.apiUrls.tweet.comments +
    //         `${context.userSlug}/${context.tweetId}`
    //     )
    //     .then(response => {
    //       this.comments = response.data.results;
    //       console.log("comments", this.comments);
    //     })
    //     .catch(error => {
    //       console.log("/tweet/comments/", error);
    //     });
    // }
  },
  computed: {
    ...mapGetters([
      "getIsAuthenticatedStatus",
      "getTweetDetails",
      "getCommentsToRender"
    ])
  },
  created() {
    /* FIXME Возможно убрать проверку авторизации,
    чтобы можно было смотреть твит без авторизации */
    const payload = {
      userSlug: this.userSlug,
      tweetId: this.tweetId
    };
    if (this.getIsAuthenticatedStatus) {
      this.fetchTweetDetails(payload);
      this.fetchTweetComments(payload);
    } else {
      let interval = setInterval(() => {
        if (this.getIsAuthenticatedStatus) {
          this.fetchTweetDetails(payload);
          this.fetchTweetComments(payload);
          clearInterval(interval);
        }
      }, 100);
    }
  }
};
</script>
