<template>
  <v-container fill-height>
    <v-card class="mx-auto my-12" max-width="600" flat color="blue lighten-5">
      <v-card-title>Узнайте, что происходит в мире прямо сейчас</v-card-title>
      <v-card-text>Присоединяйтесь к Твиттеру прямо сейчас!</v-card-text>
      <v-divider class="mx-4"></v-divider>
      <div data-app>
        <br />
        <v-row justify="center">
          <v-dialog v-model="signupDialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Sign Up
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">SignUp</span>
              </v-card-title>
              <SignUp v-if="signupDialog" />
            </v-card>
          </v-dialog>
          <v-dialog v-model="loginDialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Login
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Login</span>
              </v-card-title>
              <Login v-if="loginDialog" />
            </v-card>
          </v-dialog>
        </v-row>
        <br />
        <!-- <LogoutBtn /> -->
      </div>
    </v-card>
  </v-container>
</template>

<script>
import SignUp from "@/components/SignUp.vue";
import Login from "@/components//Login.vue";
// import LogoutBtn from "@/components//LogoutBtn.vue";

export default {
  name: "Home",
  components: { SignUp, Login },
  data: () => ({
    // dialog: false,
    loginDialog: false,
    signupDialog: false
  }),

  methods: {},
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
