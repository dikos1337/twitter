<template>
  <v-main>
    <v-container pa-0 fluid style="max-width: 1000px; min-width: 450px">
      <v-row class="mx-auto" no-gutters>
        <v-col cols="auto">
          <LeftSideBar />
        </v-col>
        <v-col>
          <TweetInputForm />
          <v-list color="transparent" v-if="getFeedTweets.count">
            <div
              v-infinite-scroll="loadMoreFeedTweets"
              infinite-scroll-disabled="isInfiniteScrollPossible"
              infinite-scroll-distance="10"
            >
              <v-list-item
                v-for="tweet in getFeedTweets.results"
                :key="tweet.id"
                :to="`/${tweet.user.slug}/status/${tweet.id}`"
                class="pa-0"
              >
                <v-list-item-content class="pa-0">
                  <TweetCard :tweet="tweet" />
                </v-list-item-content>
              </v-list-item>
            </div>
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

  data: () => ({ busy: false }),
  methods: {
    ...mapActions(["fetchFeedTweets", "loadMoreFeedTweets"])
  },
  computed: {
    ...mapGetters(["getIsAuthenticatedStatus", "getFeedTweets"]),
    isInfiniteScrollPossible() {
      /* Флаг для того, чтобы  Infinite Scroll 
      перестал пытаться загрузить новые данные*/
      return this.getFeedTweets.next ? false : true;
    }
  },
  created() {
    this.fetchFeedTweets();
  }
};
</script>
