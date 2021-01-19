<template>
  <v-app>
    <!-- <v-app-bar app color="white" flat>
      
    </v-app-bar> -->

    <v-main class="fill-width grey lighten-4">
      <v-container>
        <v-row>
          <v-col cols="2">
            <LeftSideBar />
          </v-col>

          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
              max-width="50%"
              min-width="600px"
            >
              <MakeTweetField />

              <LogoutBtn />
              <br />
              <TweetCard />
              <br />
              <TweetCard />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TweetCard from "@/components//TweetCard.vue";
import LogoutBtn from "@/components//LogoutBtn.vue";
import LeftSideBar from "@/components//LeftSideBar.vue";

export default {
  name: "Home",
  components: {
    TweetCard,
    LogoutBtn,
    LeftSideBar
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
