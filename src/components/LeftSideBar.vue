<template>
  <v-card
    height="100vh"
    min-width="200px"
    max-width="10vw"
    style="position: sticky; top: 0; overflow-y: auto;"
    tile
    flat
  >
    <v-list color="transparent">
      <v-list-item v-for="link in links" :key="link.id" :to="link.url" link>
        <v-list-item-content>
          <v-list-item-title>
            <v-icon left color="blue"> {{ link.icon }} </v-icon>{{ link.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-2"></v-divider>
    </v-list>
    <v-card-actions class="justify-center pa-0 ma-0">
      <v-btn
        color="blue lighten-1"
        style="color:white;"
        width="90%"
        rounded
        large
        append
        depressed
        @click="toggleMakeTweetDialogState"
      >
        Tweet
      </v-btn>
    </v-card-actions>
    <TweetInputFormDialog />
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import TweetInputFormDialog from "@/components/TweetInputFormDialog.vue";

export default {
  name: "LeftSideBar",
  components: {
    TweetInputFormDialog
  },
  data() {
    return {
      links: [
        { id: 1, name: "Home", icon: "mdi-home-variant", url: "/feed" },
        { id: 2, name: "Explore", icon: "mdi-pound", url: "/explore" },
        {
          id: 3,
          name: "Notifications",
          icon: "mdi-bell",
          url: "/notifications"
        },
        { id: 4, name: "Messages", icon: "mdi-email", url: "/messages" },
        { id: 5, name: "Bookmarks", icon: "mdi-bookmark", url: "/bookmarks" },
        {
          id: 6,
          name: "Lists",
          icon: "mdi-format-list-bulleted",
          url: `/${this.getUserSlug}/lists`
        },
        {
          id: 7,
          name: "Profile",
          icon: "mdi-account",
          url: `/${this.getUserSlug}`
        }
      ]
    };
  },
  computed: { ...mapGetters(["getUserSlug", "getIsAuthenticatedStatus"]) },
  methods: {
    ...mapActions(["checkAuthentication"]),
    ...mapMutations(["toggleMakeTweetDialogState"]),
    setUserSlug(slug) {
      this.links[5].url = `/${slug}/lists`;
      this.links[6].url = `/${slug}`;
    }
  },
  created() {
    if (!this.getIsAuthenticatedStatus) {
      console.log("THEN this.getUserSlug ==", this.getUserSlug);
      // Ждем авторизацию которая делается в роутер хуке
      let interval = setInterval(() => {
        if (this.getUserSlug) {
          this.setUserSlug(this.getUserSlug);
          clearInterval(interval);
        }
      }, 100);
    } else {
      this.setUserSlug(this.getUserSlug);
    }
  }
};
</script>

<style scoped>
.v-card.v-sheet.theme--light {
  border-right: 1px solid rgba(0, 0, 0, 0.12) !important;
}
</style>
