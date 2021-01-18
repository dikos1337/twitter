<template>
  <v-app>
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <LogoutBtn />
        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <!-- <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          >
          </v-text-field> -->
        </v-responsive>
        <v-btn text>{{ name }}</v-btn>
        <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <LeftSideBar />
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <!--  -->
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
  components: { TweetCard, LogoutBtn, LeftSideBar },

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
