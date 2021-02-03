<template>
  <v-main>
    <v-container pa-0 fluid style="max-width: 1000px; min-width: 450px">
      <v-row class="mx-auto" no-gutters>
        <v-col cols="auto">
          <LeftSideBar />
        </v-col>
        <v-col>
          <ProfileHeader :user-data="getPofileData" />
          <div
            v-infinite-scroll="loadMoreProfileTweets"
            infinite-scroll-disabled="isInfiniteScrollPossible"
            infinite-scroll-distance="10"
          >
            <v-list color="transparent" v-if="getProfileTweets.count">
              <v-list-item
                v-for="tweet in getProfileTweets.results"
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
                </v-list-item></v-list-item-content
              >
            </v-list>
          </div>
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
    ...mapActions([
      "checkAuthentication",
      "fetchProfileData",
      "fetchProfileTweets",
      "loadMoreProfileTweets"
    ])
  },
  computed: {
    ...mapGetters([
      "getIsAuthenticatedStatus",
      "getProfileTweets",
      "getPofileData"
    ]),
    isInfiniteScrollPossible() {
      /* Флаг для того, чтобы  Infinite Scroll 
      перестал пытаться загрузить новые данные */
      return this.getProfileTweets.next ? false : true;
    }
  },
  created() {
    /* FIXME Возможно убрать проверку авторизации,
    чтобы можно было смотреть профиль без авторизации */
    let context = this;
    console.log("$route.params.userSlug", this.userSlug);
    if (this.getIsAuthenticatedStatus) {
      this.fetchProfileData(context.userSlug);
      console.log("getPofileData ", this.getPofileData);
    } else {
      let interval = setInterval(() => {
        if (this.getIsAuthenticatedStatus) {
          this.fetchProfileData(context.userSlug);
          console.log("getPofileData ", this.getPofileData);

          clearInterval(interval);
        }
      }, 100);
    }
  }
};
</script>
