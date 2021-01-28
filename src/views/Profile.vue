<template>
  <v-main>
    <v-container pa-0 fluid style="max-width: 1000px; min-width: 450px">
      <v-row class="mx-auto" no-gutters>
        <v-col cols="auto">
          <LeftSideBar />
        </v-col>
        <v-col>
          <ProfileHeader :user-data="userData" />
          <v-list color="transparent" v-if="userTweets.length">
            <v-list-item
              v-for="tweet in userTweets"
              :key="tweet.id"
              :to="`/${tweet.user.slug}/status/${tweet.id}`"
              class="pa-0"
            >
              <v-list-item-content class="pa-0">
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
      userSlug: this.$route.params.userSlug,
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
        .get(context.$store.state.apiUrls.accounts.profile + context.userSlug)
        .then(response => {
          this.userData = response.data;
          console.log("userData", this.userData);

          context.fetchTweets();
        })
        .catch(error => {
          console.log("accounts.profile + context.userSlug", error);
          context.$router.push({ name: "NotFound" });
        });
    }
  },
  computed: { ...mapGetters(["getIsAuthenticatedStatus"]) },
  created() {
    if (this.getIsAuthenticatedStatus) {
      this.fetchUserData();
    } else {
      let interval = setInterval(() => {
        if (this.getIsAuthenticatedStatus) {
          this.fetchUserData();
          clearInterval(interval);
        }
      }, 100);
    }
  }
};
</script>
