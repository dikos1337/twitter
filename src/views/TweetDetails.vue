<template>
  <v-main>
    <v-container pa-0 fluid style="max-width: 1000px; min-width: 450px">
      <v-row class="mx-auto" no-gutters>
        <v-col cols="auto">
          <LeftSideBar />
        </v-col>
        <v-col>
          <v-list color="transparent">
            <v-list-item>
              <v-list-item-content>
                <TweetCard :tweet="tweet" />
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
import LeftSideBar from "@/components/LeftSideBar.vue";
import RightSideBar from "@/components/RightSideBar/RightSideBar.vue";

export default {
  name: "TweetDetails",
  components: {
    LeftSideBar,
    RightSideBar,
    TweetCard
  },
  data() {
    return {
      userSlug: this.$route.params.userSlug,
      tweetId: this.$route.params.tweetId,
      userData: {},
      tweet: {}
    };
  },
  methods: {},
  created() {
    /* FIX ME, запрос на /current/ уже происходил в ProfileHeader,
       там надо закидывать эти данные в стор, а тут брать данные из стора */
    let context = this;
    this.$axios
      .get(context.$store.state.apiUrls.accounts.current)
      .then(response => {
        this.userData = response.data;
        console.log(this.userData);

        context.$axios
          .get(
            context.$store.state.apiUrls.tweet.detail +
              `${context.userSlug}/${context.tweetId}`
          )
          .then(response => {
            this.tweet = response.data;
            console.log("tweet", this.tweet);
          })
          .catch(error => {
            console.log("/tweet/detail/", error);
            context.$router.push({ name: "NotFound" });
          });
      })
      .catch(error => {
        console.log("current", error);
      });
  }
};
</script>
