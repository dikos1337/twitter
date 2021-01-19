<template>
  <v-app>
    <!-- <v-app-bar app color="white" flat>
      
    </v-app-bar> -->

    <v-main class="grey lighten-4">
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
              <ProfileHeader />
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
import LeftSideBar from "@/components/LeftSideBar.vue";
import ProfileHeader from "@/components/Profile/ProfileHeader.vue";

export default {
  name: "Home",
  components: {
    LeftSideBar,
    ProfileHeader
  },
  data() {
    return {
      profileUrl: this.$route.params.profileUrl,
      name: "",
      joined_at: ""
    };
  },
  methods() {},
  mounted() {}
};
</script>
