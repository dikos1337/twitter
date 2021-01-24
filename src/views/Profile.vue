<template>
  <v-main>
    <v-container pa-0 fluid style="max-width: 1000px; min-width: 450px">
      <v-row class="mx-auto" no-gutters>
        <v-col cols="auto">
          <LeftSideBar />
        </v-col>
        <v-col>
          <!-- <v-container height="100vh" min-width="200px" xs8> -->
          <ProfileHeader />
          <v-list color="transparent">
            <v-list-item v-for="tweet in userTweets" :key="tweet.id" link>
              <v-list-item-content>
                <TweetCard :tweet="tweet"
                :user-data="userData"
                :profile-url="profileUrl" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <!-- </v-container> -->
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
import ProfileHeader from "@/components/Profile/ProfileHeader.vue";

export default {
  name: "Profile",
  components: {
    LeftSideBar,
    ProfileHeader,
    RightSideBar,
    TweetCard
  },
  data() {
    return {
      profileUrl: this.$route.params.profileUrl,
      userData: {},
      userTweets: {}
    };
  },
  methods: {},
  created() {
    /* FIX ME, запрос на /current/ уже происходит в ProfileHeader,
       там надо закидывать эти данные в стор, а тут брать данные из стора */
    let context = this;
    this.$axios
      .get(context.$store.state.apiUrls.accounts.current)
      .then(response => {
        this.userData = response.data;
        console.log(this.userData);

        context.$axios
          .get(context.$store.state.apiUrls.tweet.user + context.userData.id)
          .then(response => {
            this.userTweets = response.data.tweets;
            console.log("userTweets", this.userTweets);
          })
          .catch(error => {
            console.log("/tweet/user/", error);
          });
      })
      .catch(error => {
        console.log("current", error);
      });
  }
};
</script>
