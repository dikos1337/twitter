<template>
  <v-main>
    <v-container ma-0 pa-0 fluid>
      <v-row class="ma-0">
        <v-row
          align="center"
          no-gutters
          style="height: 100vh; background-color:rgba(29,161,242,1.00);"
        >
          <v-col class="leftsidecol">
            <v-card class="leftsidecard" flat tile>
              <v-card-text class="leftsidetext">
                <v-icon color="white">mdi-magnify</v-icon>
                Follow your interests.
              </v-card-text>
              <v-card-text class="leftsidetext">
                <v-icon color="white">mdi-account-multiple</v-icon>
                Hear what people are talking about.
              </v-card-text>
              <v-card-text class="leftsidetext">
                <v-icon color="white">mdi-message-outline</v-icon>
                Join the conversation.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="ma-0" align="center">
          <v-col class="rightsidecol">
            <v-card flat>
              <v-icon color="blue" size="48" class="ml-1">mdi-twitter</v-icon>
              <v-card-text class="rightsidetext px-1">
                See what’s happening in the world right now
              </v-card-text>
              <v-card-text class="rightsidetext small px-1">
                Join Twitter today.
              </v-card-text>
              <v-btn
                color="blue lighten-1"
                style="color:white"
                width="100%"
                depressed
                rounded
                @click="toggleSignupDialogState"
              >
                Sign up
              </v-btn>
              <v-btn
                color="blue lighten-1"
                style="color:white"
                width="100%"
                depressed
                rounded
                outlined
                @click="toggleLoginDialogState"
              >
                Log in
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
    <SignUpDialog />
    <LoginDialog />
  </v-main>
</template>

<script>
import SignUpDialog from "@/components/SignUpDialog.vue";
import LoginDialog from "@/components/LoginDialog.vue";
import { mapMutations } from "vuex";

export default {
  name: "Home",
  components: {
    SignUpDialog,
    LoginDialog
  },
  data: () => ({}),
  methods: {
    ...mapMutations(["toggleLoginDialogState", "toggleSignupDialogState"])
  },

  created() {
    let context = this;
    this.$axios
      .get(context.$store.state.apiUrls.accounts.current)
      .then(response => {
        console.log("current", response);
        if (response.status == 200) {
          context.$router.push({ name: "Feed" }).catch(() => {});
        }
      })
      .catch(error => {
        console.log("current", error);
      });
  }
};
</script>

<style scoped>
.col {
  width: 50vh;
}
.leftsidecol {
  padding-left: 25% !important;
  padding-right: 25% !important;
}
.rightsidecol {
  padding-left: 30% !important;
  padding-right: 30% !important;
}
.leftsidecard {
  background-color: rgba(29, 161, 242, 1) !important;
}
.leftsidetext {
  color: white !important;
  font-weight: 700;
  font-size: 19px;
}
.rightsidetext {
  color: rgb(15, 20, 25) !important;
  font-weight: 700;
  font-size: 30px;
  line-height: 1.3125;
}
.rightsidetext.small {
  color: rgb(15, 20, 25) !important;
  font-weight: 700;
  font-size: 15px;
  line-height: 1.3125;
  margin-top: 59px;
  margin-bottom: 0px;
}
.v-btn {
  margin-bottom: 15px;
}
</style>
