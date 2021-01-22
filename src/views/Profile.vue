<template>
  <v-main>
    <v-container pa-0 fluid style="max-width: 1000px; min-width: 450px">
      <v-row class="mx-auto" no-gutters>
        <v-col cols="auto">
          <LeftSideBar />
        </v-col>
        <v-col>
          <v-container height="100vh" min-width="200px" xs8>
            <ProfileHeader />
            <LogoutBtn />
            <br />
            <TweetCard />
            <br />
            <TweetCard />
          </v-container>
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
  name: "Home",
  components: {
    LeftSideBar,
    ProfileHeader,
    RightSideBar,
    TweetCard
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
