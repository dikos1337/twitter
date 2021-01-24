<template>
  <v-main>
    <v-container pa-0 fluid style="max-width: 1000px; min-width: 450px">
      <v-row class="mx-auto" no-gutters>
        <v-col cols="auto">
          <LeftSideBar />
        </v-col>
        <v-col>
          <LogoutBtn />
          <v-list color="transparent">
            <v-list-item v-for="n in 10" :key="n" link>
              <v-list-item-content>
                <!-- <TweetCard /> -->
                TweetCard
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
// import TweetCard from "@/components/TweetCard.vue";
import LogoutBtn from "@/components/LogoutBtn.vue";
import LeftSideBar from "@/components/LeftSideBar.vue";
import RightSideBar from "@/components/RightSideBar/RightSideBar.vue";

export default {
  name: "Feed",
  components: {
    // TweetCard,
    LogoutBtn,
    LeftSideBar,
    RightSideBar
  },

  data: () => ({
    name: ""
  }),
  methods: {},
  mounted() {
    let context = this;

    this.$axios
      .get(context.$store.state.apiUrls.accounts.current)
      .then(function(response) {
        console.log("current", response);
        context.name = response.data.name; // Может быть брать из стора
      })
      .catch(() => {
        context.$router.push({ name: "Home" });
      });
  }
};
</script>
