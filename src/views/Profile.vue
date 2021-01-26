<template>
  <v-main>
    <v-container pa-0 fluid style="max-width: 1000px; min-width: 450px">
      <v-row class="mx-auto" no-gutters>
        <v-col cols="auto">
          <LeftSideBar />
        </v-col>
        <v-col>
          <!-- <v-container height="100vh" min-width="200px" xs8> -->
          <ProfileHeader :user-data="userData" />
          <v-list color="transparent" v-if="userTweets.length">
            <v-list-item v-for="tweet in userTweets" :key="tweet.id" link>
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
import { mapGetters, mapActions } from "vuex";

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
      userTweets: []
    };
  },
  methods: {
    ...mapActions(["checkAuthentication"]),
    fetchTweets() {
      let context = this;
      context.$axios
        .get(context.$store.state.apiUrls.tweet.user + context.userData.slug)
        .then(response => {
          this.userTweets = response.data.results;
          let date_options = { year: "numeric", month: "long" };
          this.userData.joined_at = new Date(
            this.userData.joined_at
          ).toLocaleDateString("en-US", date_options);

          console.log("userTweets", this.userTweets);
        })
        .catch(error => {
          console.log("/tweet/user/", error);
        });
    },
    fetchUserData() {
      let context = this;
      this.$axios
        .get(context.$store.state.apiUrls.accounts.profile + context.profileUrl)
        .then(response => {
          this.userData = response.data;
          console.log("userData", this.userData);

          context.fetchTweets();
        })
        .catch(error => {
          console.log("accounts.profile + context.profileUrl", error);
          // TODO redirect to 404
        });
    }
  },
  computed: { ...mapGetters(["getIsAuthenticatedStatus"]) },
  created() {
    // let context = this;
    /* FIX ME, запрос на /current/ уже происходит в ProfileHeader,
       там надо закидывать эти данные в стор, а тут брать данные из стора */
    if (!this.getIsAuthenticatedStatus) {
      this.checkAuthentication().then(this.fetchUserData());
    } else {
      this.fetchUserData();
    }
  }
};
</script>
